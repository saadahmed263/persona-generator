import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Grab the exact variables straight out of the Zustand store
    const { 
      kind, purpose, parameters, 
      productName, productDescription, targetMarket, competitors, 
      portalData 
    } = body;

    const systemPrompt = `You are a Senior UX Researcher synthesizing qualitative data into a polished, realistic ${kind} persona.

    Product Context:
    - Name: ${productName || "Not specified"}
    - Description: ${productDescription || "Not specified"}
    - Target Market: ${targetMarket || "Not specified"}
    - Competitors: ${competitors || "Not specified"}

    // Replace the "User Input Data" lines with this in generate-persona/route.ts:
    User Input Data (Use this as the foundation, but intelligently fill in gaps if fields are empty):
    ${JSON.stringify(portalData, null, 2)}
    - Role: ${portalData?.role || "Not specified"}
    - Industry: ${portalData?.industry || "Not specified"}
    - Age Range: ${portalData?.age || "Not specified"}
    - Tech Savviness: ${portalData?.tech || "Not specified"}
    - Primary Task: ${portalData?.task || "Not specified"}
    - Context of Use: ${portalData?.context || "Not specified"}
    - Biggest Frustration: ${portalData?.frustration || "Not specified"}
    - Primary Goal: ${portalData?.goal || "Not specified"}
    - Workarounds: ${portalData?.workaround || "Not specified"}

    Required Parameters to emphasize: ${parameters?.join(", ") || "General profile"}
    Persona Purpose: ${purpose || "General understanding"}

    Generate a highly realistic, specific persona. 
    Return ONLY a valid JSON object matching exactly this structure:
    {
      "name": "A catchy, descriptive persona name (e.g. The Overwhelmed Optimizer)",
      "quote": "A realistic quote in the first person",
      "demographics": {
        "role": "Job title",
        "industry": "Industry",
        "ageRange": "Age range",
        "techSavviness": 85,
        "techSavvinessLabel": "Short text label e.g., Advanced (Power User)"
      },
      "contextOfUse": "A short paragraph describing their environment and context of use.",
      "coreNeeds": ["Need 1", "Need 2", "Need 3"],
      "topFrustrations": ["Frustration 1", "Frustration 2", "Frustration 3"],
      "behaviors": ["Behavior/Workaround 1", "Behavior/Workaround 2"]
    }`;

    const msg = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1500,
      temperature: 0.7,
      system: "You are a senior UX researcher. Output only raw valid JSON. Do not wrap in markdown blocks.",
      messages: [{ role: "user", content: systemPrompt }],
    });

    const rawContent = msg.content[0].type === "text" ? msg.content[0].text : "{}";
    const cleanJson = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
    const persona = JSON.parse(cleanJson);

    return NextResponse.json({ persona });
    
  } catch (error: any) {
    console.error("🚨 PERSONA SYNTHESIS FAILED:", error?.error?.error || error?.message || error);
    return NextResponse.json({ error: "Failed to generate persona" }, { status: 500 });
  }
}