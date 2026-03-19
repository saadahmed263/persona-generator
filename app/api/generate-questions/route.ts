import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { kind, purpose, parameters, productContext, respondentType, portalData } = body;

    const systemPrompt = `You are an elite Senior UX Researcher. Your task is to design a qualitative interview guide to build a ${kind || 'product'} persona.

    THE GOAL:
    The primary purpose of this persona is: ${purpose || 'understanding users'}.

    THE PRODUCT CONTEXT (CRITICAL):
    You must anchor your questions in this reality. Do not ask generic questions that ignore what we are building.
    - Product Name: ${productContext?.name || 'Not specified'}
    - What it is: ${productContext?.desc || 'Not specified'}
    - Target Market: ${productContext?.market || 'Not specified'}
    - Competitors: ${productContext?.competitors || 'Not specified'}

    KNOWN DATA (Do NOT ask basic questions to gather this data, as we already have it. Instead, use this as a foundation to ask deeper questions):
    ${JSON.stringify(portalData || {}, null, 2)}

    FOCUS AREAS (The specific parameters we need to uncover or flesh out):
    ${parameters?.join(", ") || 'General user behaviors'}

    RULES FOR QUESTIONS:
    1. Audience: You are asking these to the ${respondentType || 'Target User'}. Frame the phrasing appropriately.
    2. MUST BE NON-LEADING: Do not embed assumptions into the questions.
    3. Quantity: Generate between 7 and 8 distinct, open-ended questions.
    4. Synthesis: Every question should feel deeply rooted in the Product Context and the Known Data.

    CRITICAL FORMATTING RULE: 
    Return ONLY a valid JSON array. Do NOT wrap it in markdown. Do NOT add conversational text. Ensure all quotation marks inside your text are properly escaped. 
    Format: [{"question": "...", "rationale": "..."}]`;

    const msg = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1500,
      temperature: 0.7,
      system: "You output only valid, pristine JSON arrays. No markdown, no preambles.",
      messages: [{ role: "user", content: systemPrompt }],
    });

    const rawContent = msg.content[0].type === "text" ? msg.content[0].text : "[]";
    
    // BULLETPROOF JSON EXTRACTION
    let cleanJson = rawContent;
    // Find the first '[' and the last ']' to extract just the array
    const jsonMatch = rawContent.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      cleanJson = jsonMatch[0];
    }

    const questions = JSON.parse(cleanJson);

    return NextResponse.json({ questions });
  } catch (error: any) {
    console.error("🚨 QUESTION API ERROR:", error?.message || error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}