"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Box, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePersonaStore } from "../../store/usePersonaStore";

export default function Setup() {
  const router = useRouter();
  const store = usePersonaStore(); // Pull in the whole store to read existing data
  const setKindAndPurpose = usePersonaStore((state) => state.setKindAndPurpose);
  
  // Initialize state with the store's data (if it exists) instead of null
  const [selectedKind, setSelectedKind] = useState<string | null>(store.kind);
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(store.purpose);

  const purposes = [
    { id: "understand", title: "Understand Users", desc: "Helps teams understand user behaviors, motivations, and needs." },
    { id: "focus", title: "Focus Design Decisions", desc: "Ensures design decisions are made for a specific user rather than generic." },
    { id: "prioritize", title: "Prioritize Features", desc: "Helps product teams decide which features are most important." },
    { id: "empathy", title: "Build Empathy in Teams", desc: "Helps stakeholders relate to users as real people." },
    { id: "align", title: "Align Cross-functional Teams", desc: "Creates a shared understanding between design, product, marketing, etc." },
    { id: "journeys", title: "Guide User Journeys", desc: "Personas help map realistic user journeys and scenarios." },
    { id: "decisions", title: "Support Decision Making", desc: "Helps evaluate design or product options against user needs." }
  ];

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50 font-sans tracking-normal pb-24">
      <div className="w-full max-w-4xl space-y-8 mt-8">
        
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-3">
            <span>Step 1 of 7: Persona Foundation</span>
            <span>15%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mb-8 overflow-hidden">
            <div className="bg-teal-600 h-1.5 rounded-full transition-all duration-500" style={{ width: '15%' }}></div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-slate-900">Persona Foundation</h1>
            <p className="text-lg text-slate-600">Let's define the core objective of your persona.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">1. Kind of Persona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <Card onClick={() => setSelectedKind("design")} className={`cursor-pointer transition-all border-2 ${selectedKind === "design" ? "border-teal-600 bg-teal-50/50" : "border-slate-200 hover:border-teal-200 shadow-sm"}`}>
              <CardContent className="p-5 flex flex-col items-center text-center space-y-3">
                <div className={`p-3 rounded-full transition-colors ${selectedKind === "design" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500"}`}><Palette size={24} /></div>
                <div className={`font-semibold ${selectedKind === "design" ? "text-teal-700" : "text-slate-700"}`}>Design Persona</div>
              </CardContent>
            </Card>

            <Card onClick={() => setSelectedKind("product")} className={`cursor-pointer transition-all border-2 ${selectedKind === "product" ? "border-teal-600 bg-teal-50/50" : "border-slate-200 hover:border-teal-200 shadow-sm"}`}>
              <CardContent className="p-5 flex flex-col items-center text-center space-y-3">
                <div className={`p-3 rounded-full transition-colors ${selectedKind === "product" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500"}`}><Box size={24} /></div>
                <div className={`font-semibold ${selectedKind === "product" ? "text-teal-700" : "text-slate-700"}`}>Product Persona</div>
              </CardContent>
            </Card>

            <Card onClick={() => setSelectedKind("business")} className={`cursor-pointer transition-all border-2 ${selectedKind === "business" ? "border-teal-600 bg-teal-50/50" : "border-slate-200 hover:border-teal-200 shadow-sm"}`}>
              <CardContent className="p-5 flex flex-col items-center text-center space-y-3">
                <div className={`p-3 rounded-full transition-colors ${selectedKind === "business" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500"}`}><Briefcase size={24} /></div>
                <div className={`font-semibold ${selectedKind === "business" ? "text-teal-700" : "text-slate-700"}`}>Business Persona</div>
              </CardContent>
            </Card>

          </div>
        </div>

        {selectedKind && (
          <div className="space-y-4 pt-6 animate-in slide-in-from-top-4 fade-in duration-500">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">2. Purpose of Persona</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {purposes.map((p) => (
                <div key={p.id} onClick={() => setSelectedPurpose(p.id)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-center ${selectedPurpose === p.id ? "border-teal-600 bg-teal-50/50 shadow-md" : "border-slate-200 bg-white hover:border-teal-200 shadow-sm"}`}>
                  <div className={`font-bold text-sm mb-1 ${selectedPurpose === p.id ? "text-teal-700" : "text-slate-900"}`}>{p.title}</div>
                  <div className="text-xs text-slate-500">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-8 border-t border-slate-200 flex justify-end">
          <Button 
            onClick={() => {
              if (selectedKind && selectedPurpose) {
                setKindAndPurpose(selectedKind, selectedPurpose);
                router.push("/product-context");
              }
            }}
            disabled={!selectedKind || !selectedPurpose} 
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 h-12 text-lg disabled:opacity-50 transition-colors shadow-md"
          >
            Next: Product Context
          </Button>
        </div>

      </div>
    </main>
  );
}