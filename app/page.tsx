"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 font-sans tracking-normal bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50 via-slate-50 to-slate-50">
      <div className="max-w-3xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-100/80 text-teal-700 font-semibold text-sm mb-2 border border-teal-200">
          <Sparkles className="w-4 h-4 mr-2" /> Persona-X Prototype
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Build <span className="text-teal-600">AI-Powered</span> Personas in Minutes
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Stop guessing what your users want. Generate hyper-specific, data-driven personas and dynamic interview questionnaires tailored to your exact product.
        </p>
        
        <div className="pt-8">
          <Link href="/setup">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 h-14 text-lg rounded-xl transition-all shadow-[0_8px_30px_rgb(13,148,136,0.3)] hover:shadow-[0_8px_30px_rgb(13,148,136,0.5)] flex items-center mx-auto hover:-translate-y-0.5">
              Start Building <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

      </div>
    </main>
  );
}