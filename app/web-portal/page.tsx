"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePersonaStore } from "../../store/usePersonaStore";

export default function WebPortalDataEntry() {
  const router = useRouter();
  const store = usePersonaStore();
  const setPortalData = usePersonaStore((state) => state.setPortalData);
  
  const [currentTab, setCurrentTab] = useState(1);
  const [data, setData] = useState<Record<string, string>>(store.portalData || {});

  const updateField = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const handleNext = () => {
    if (currentTab === 1) {
      setCurrentTab(2);
    } else {
      setPortalData(data);
      router.push("/select-respondent");
    }
  };

  // The Core Baseline fields we ALWAYS want to capture
  const coreFields = ["Role", "Industry", "Age Range", "Tech Savviness"];

  // The Custom fields, minus any that overlap with the Core Fields
  const customParameters = store.parameters?.filter(
    (param) => !coreFields.some(core => core.toLowerCase() === param.toLowerCase())
  ) || [];

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50 font-sans tracking-normal pb-24">
      <div className="w-full max-w-3xl space-y-8 mt-8">
        
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-3">
            <span>Step 5 of 7: Data Entry</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mb-8 overflow-hidden">
            <div className="bg-teal-600 h-1.5 rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900">
              {currentTab === 1 ? "Core Demographics" : "Custom Focus Areas"}
            </h1>
            <p className="text-slate-600">
              {currentTab === 1 
                ? "Let's establish the human baseline for this persona." 
                : "Now, fill in known details for the specific parameters you selected."}
            </p>
          </div>
        </div>

        <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <div className="flex border-b border-slate-100 bg-slate-50/50 px-6 pt-4">
            <button 
              onClick={() => setCurrentTab(1)} 
              className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-colors ${currentTab === 1 ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              1. Core Profile
            </button>
            <button 
              onClick={() => setCurrentTab(2)} 
              className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-colors ${currentTab === 2 ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              2. Custom Parameters
              {customParameters.length > 0 && (
                <span className="ml-2 bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">{customParameters.length}</span>
              )}
            </button>
          </div>

          <CardContent className="p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              
              {/* TAB 1: Baseline Demographics */}
              {currentTab === 1 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">Role / Job Title</Label>
                      <Input value={data["Role"] || ""} onChange={(e) => updateField("Role", e.target.value)} placeholder="e.g., Senior Analyst" className="focus-visible:ring-teal-600" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">Industry</Label>
                      <Input value={data["Industry"] || ""} onChange={(e) => updateField("Industry", e.target.value)} placeholder="e.g., Fintech" className="focus-visible:ring-teal-600" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">Age Range</Label>
                      <Input value={data["Age Range"] || ""} onChange={(e) => updateField("Age Range", e.target.value)} placeholder="e.g., 28-35" className="focus-visible:ring-teal-600" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">Tech Savviness</Label>
                      <Input value={data["Tech Savviness"] || ""} onChange={(e) => updateField("Tech Savviness", e.target.value)} placeholder="e.g., Power User" className="focus-visible:ring-teal-600" />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Dynamic Custom Parameters */}
              {currentTab === 2 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-2 duration-300">
                  {customParameters.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-slate-500 text-sm">No additional custom parameters selected in Step 3.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {customParameters.map((param) => (
                        <div key={param} className="space-y-2">
                          <Label className="text-slate-700 font-medium">{param}</Label>
                          <Input 
                            value={data[param] || ""} 
                            onChange={(e) => updateField(param, e.target.value)} 
                            placeholder={`Known details about ${param.toLowerCase()}...`} 
                            className="bg-white border-slate-300 focus-visible:ring-teal-600" 
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-slate-400 italic pt-2">*Leave gaps blank—the AI will formulate questions to fill them in.</p>
                </div>
              )}

            </form>

            <div className="pt-8 flex justify-between items-center border-t border-slate-100 mt-8">
              {currentTab === 1 ? (
                <Link href="/step-2">
                  <Button variant="outline" onClick={() => setPortalData(data)} className="border-slate-300 text-slate-700 hover:bg-slate-50">Back to Method</Button>
                </Link>
              ) : (
                <Button variant="outline" onClick={() => setCurrentTab(1)} className="border-slate-300 text-slate-700 hover:bg-slate-50">Back to Profile</Button>
              )}
              
              <Button onClick={handleNext} className="bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-sm px-6">
                {currentTab === 1 ? "Next: Custom Parameters" : "Lock Data & Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}