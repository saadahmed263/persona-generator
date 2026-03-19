"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Copy, Download, Zap, Target, AlertTriangle, Loader2, AlertCircle } from "lucide-react";
import { usePersonaStore } from "../../store/usePersonaStore";
import Link from "next/link";

interface PersonaData {
  name: string;
  quote: string;
  demographics: {
    role: string;
    industry: string;
    ageRange: string;
    techSavviness: number;
    techSavvinessLabel: string;
  };
  contextOfUse: string;
  coreNeeds: string[];
  topFrustrations: string[];
  behaviors: string[];
}

export default function FinalPersona() {
  const store = usePersonaStore();
  const [persona, setPersona] = useState<PersonaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function generatePersona() {
      try {
        const response = await fetch("/api/generate-persona", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(store),
        });

        if (!response.ok) throw new Error("Failed to generate persona");
        
        const data = await response.json();
        setPersona(data.persona);
      } catch (err) {
        console.error(err);
        setError("We encountered an issue synthesizing the persona. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    if (store.kind && store.productName) {
      generatePersona();
    } else {
      setIsLoading(false);
      setError("Missing source data. Please complete the previous steps.");
    }
  }, [store]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Synthesizing Data...</h2>
        <p className="text-slate-600 animate-pulse">Building your persona based on parameters and context.</p>
      </main>
    );
  }

  if (error || !persona) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-xl max-w-lg text-center">
          <AlertCircle className="w-10 h-10 mx-auto mb-4 text-rose-500" />
          <h3 className="font-bold text-xl mb-2">Synthesis Failed</h3>
          <p className="mb-6">{error}</p>
          <Link href="/setup">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white">Start Over</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-slate-50 font-sans tracking-normal pb-24">
      <div className="max-w-5xl mx-auto space-y-8 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-slate-200 pb-6">
          <div>
            <div className="text-teal-600 font-bold tracking-wider text-xs uppercase mb-2">Generated Persona</div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">{persona.name}</h1>
            <p className="text-xl text-slate-500 italic">"{persona.quote}"</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none border-slate-300 text-slate-700 hover:bg-teal-50 hover:text-teal-700">
              <Copy className="w-4 h-4 mr-2" /> Copy Text
            </Button>
           <Button onClick={() => window.print()} className="flex-1 md:flex-none bg-teal-600 hover:bg-teal-700 text-white shadow-sm print:hidden">
              <Download className="w-4 h-4 mr-2" /> Export PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
              <div className="bg-slate-50/80 p-6 flex justify-center border-b border-slate-100">
                <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 border-4 border-white shadow-sm">
                  <User size={40} />
                </div>
              </div>
              <CardContent className="p-6 space-y-5">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Role</div>
                  <div className="font-semibold text-slate-900">{persona.demographics.role}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Industry</div>
                  <div className="text-slate-700">{persona.demographics.industry}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Age Range</div>
                  <div className="text-slate-700">{persona.demographics.ageRange}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tech Savviness</div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                    <div className="bg-teal-600 h-2 rounded-full" style={{ width: `${persona.demographics.techSavviness}%` }}></div>
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{persona.demographics.techSavvinessLabel}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 shadow-sm rounded-xl">
              <CardHeader className="pb-3 pt-5 border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="text-base text-slate-900 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-teal-600" /> Context of Use
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 text-sm text-slate-600 leading-relaxed">
                {persona.contextOfUse}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="bg-white border border-slate-200 shadow-sm rounded-xl h-full">
                <CardHeader className="pb-4 pt-5 border-b border-slate-100 bg-slate-50/50">
                  <CardTitle className="text-base text-slate-900 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-teal-600" /> Core Needs & Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <ul className="space-y-3 text-sm text-slate-700">
                    {persona.coreNeeds.map((need, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-teal-500 mr-2 font-bold">•</span> 
                        <span>{need}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200 shadow-sm rounded-xl h-full">
                <CardHeader className="pb-4 pt-5 border-b border-slate-100 bg-slate-50/50">
                  <CardTitle className="text-base text-slate-900 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-rose-500" /> Top Frustrations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <ul className="space-y-3 text-sm text-slate-700">
                    {persona.topFrustrations.map((frustration, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-rose-400 mr-2 font-bold">•</span> 
                        <span>{frustration}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white border border-slate-200 shadow-sm rounded-xl">
              <CardHeader className="pb-4 pt-5 border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="text-base text-slate-900 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-amber-500" /> Observed Behaviors & Workarounds
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
                {persona.behaviors.map((behavior, i) => (
                  <p key={i}>{behavior}</p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}