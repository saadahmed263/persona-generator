"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePersonaStore } from "../../store/usePersonaStore";

export default function SelectRespondent() {
  const router = useRouter();
  const setRespondentType = usePersonaStore((state) => state.setRespondentType);

  const handleSelection = (type: string) => {
    setRespondentType(type);
    router.push("/questionnaire");
  };

  return (
    <main className="min-h-screen p-6 bg-slate-50 font-sans tracking-normal pb-24">
      <div className="max-w-4xl mx-auto space-y-8 mt-8">
        
        {/* Header & Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-3">
            <span>Step 6 of 7: Questionnaire Target</span>
            <span>90%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mb-8 overflow-hidden">
            <div className="bg-teal-600 h-1.5 rounded-full transition-all duration-500" style={{ width: '90%' }}></div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900">Who will answer the follow-up questions?</h1>
            <p className="text-slate-600">This determines how the AI frames the generated questionnaire.</p>
          </div>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Card 1: Target User */}
          <div onClick={() => handleSelection("Target User")} className="block h-full">
            <Card className="bg-white border border-slate-200 shadow-sm rounded-xl hover:border-teal-600 hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
              <CardContent className="p-8 flex flex-col flex-1">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-6 text-teal-600">
                  <User size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">The Target User</h2>
                <p className="text-slate-600 mb-6">
                  The questionnaire will be framed as a direct interview with the end user.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-8 italic text-slate-500 text-sm flex-1">
                  "What do you like about using this product? What challenges do you face while completing this task?"
                </div>
                <Button variant="outline" className="w-full border-slate-300 text-slate-700 mt-auto hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200">
                  Select Target User
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Card 2: Internal Team */}
          <div onClick={() => handleSelection("Internal Team")} className="block h-full">
            <Card className="bg-white border border-slate-200 shadow-sm rounded-xl hover:border-teal-600 hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
              <CardContent className="p-8 flex flex-col flex-1">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-6 text-teal-600">
                  <Users size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Internal Team</h2>
                <p className="text-slate-600 mb-6">
                  The questionnaire will be framed for Designers, PMs, or Business stakeholders.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-8 italic text-slate-500 text-sm flex-1">
                  "Where do you think users struggle the most? What motivations do you believe drive them?"
                </div>
                <Button variant="outline" className="w-full border-slate-300 text-slate-700 mt-auto hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200">
                  Select Internal Team
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </main>
  );
}