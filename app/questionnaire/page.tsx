"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { usePersonaStore } from "../../store/usePersonaStore";

interface GeneratedQuestion {
  question: string;
  rationale: string;
}

export default function Questionnaire() {
  // Grab the entire store object at once
  const store = usePersonaStore();
  
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // The Steel Door: Prevents infinite loops
  const hasFetched = useRef(false);

  useEffect(() => {
    async function generateQuestions() {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const response = await fetch("/api/generate-questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kind: store.kind,
            purpose: store.purpose,
            parameters: store.parameters,
            productContext: { 
              name: store.productName, 
              desc: store.productDescription, 
              market: store.targetMarket, 
              competitors: store.competitors 
            },
            respondentType: store.respondentType,
            // 🚨 TypeScript now perfectly recognizes this!
            portalData: store.portalData 
          }),
        });

        if (!response.ok) throw new Error("Failed to generate questions");
        
        const data = await response.json();
        setQuestions(data.questions);
      } catch (err) {
        console.error(err);
        setError("We hit a snag generating your questions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    if (store.kind && store.productName) {
      generateQuestions();
    } else {
      setIsLoading(false);
      setError("Missing persona data. Please start from Step 1.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <main className="min-h-screen p-6 bg-slate-50 font-sans tracking-normal pb-32">
      <div className="max-w-4xl mx-auto space-y-8 mt-8">
        
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-3">
            <span>Step 7 of 7: AI-Targeted Questionnaire</span>
            <span>95%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mb-8 overflow-hidden">
            <div className="bg-teal-600 h-1.5 rounded-full transition-all duration-500" style={{ width: '95%' }}></div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 flex items-center">
                <Sparkles className="w-6 h-6 text-teal-600 mr-2" /> AI-Generated Questionnaire
              </h1>
              <p className="text-slate-600">Based on your parameters, we generated targeted questions for the {store.respondentType || "user"}.</p>
            </div>
            {!isLoading && !error && (
              <div className="bg-teal-50 text-teal-700 px-3 py-1.5 rounded-md text-sm font-bold border border-teal-100">
                {questions.length} Questions
              </div>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-teal-600 animate-spin" />
            <p className="text-lg font-medium text-slate-600 animate-pulse">Analyzing context and generating questions...</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-xl flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-lg mb-1">Oops! Something went wrong.</h3>
              <p>{error}</p>
              <Link href="/setup">
                <Button className="mt-4 bg-rose-600 hover:bg-rose-700 text-white">Return to Setup</Button>
              </Link>
            </div>
          </div>
        )}

        {!isLoading && !error && questions.length > 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {questions.map((q, index) => (
              <Card key={index} className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-400 transition-all">
                <CardContent className="p-0">
                  <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100">
                    <h3 className="font-semibold text-slate-900 text-lg">{index + 1}. {q.question}</h3>
                    <p className="text-sm text-teal-700 font-medium mt-1.5 italic">
                      <span className="text-slate-500 font-normal">Why ask this: </span>{q.rationale}
                    </p>
                  </div>
                  <div className="p-6">
                    <Textarea 
                      placeholder="Record interview notes or user quotes here..." 
                      className="min-h-[120px] resize-y border-slate-200 focus-visible:ring-teal-600 text-base"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] z-10">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="text-sm font-medium text-slate-500">
              Review and finalize answers to build persona.
            </div>
            <Link href="/final-persona">
              <Button type="button" disabled={isLoading || !!error} className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 transition-colors shadow-sm disabled:opacity-50">
                Synthesize Final Persona <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}