"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePersonaStore } from "../../store/usePersonaStore";

export default function ProductContext() {
  const router = useRouter();
  const store = usePersonaStore(); // Read the whole store
  const setProductContext = usePersonaStore((state) => state.setProductContext);
  const personaKind = usePersonaStore((state) => state.kind); 
  
  // Initialize state with store data instead of empty strings
  const [name, setName] = useState(store.productName || "");
  const [desc, setDesc] = useState(store.productDescription || "");
  const [market, setMarket] = useState(store.targetMarket || "");
  const [competitors, setCompetitors] = useState(store.competitors || "");

  const getPlaceholders = () => {
    if (personaKind === "business") {
      return { name: "e.g., Enterprise Payroll SaaS", desc: "e.g., Automates tax compliance for HR teams", market: "e.g., Mid-sized companies (50-500 employees)", comp: "e.g., Workday, Gusto, ADP" };
    }
    if (personaKind === "design") {
      return { name: "e.g., Smart Home App", desc: "e.g., A mobile interface to control smart lights and thermostats", market: "e.g., Tech-savvy homeowners", comp: "e.g., Google Home, Apple HomeKit" };
    }
    return { name: "e.g., Travel Rewards Credit Card", desc: "e.g., Offers zero foreign transaction fees and lounge access", market: "e.g., Frequent international travelers", comp: "e.g., Chase Sapphire, Amex Platinum" };
  };

  const placeholders = getPlaceholders();

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50 font-sans tracking-normal pb-24">
      <div className="w-full max-w-2xl space-y-8 mt-8">
        
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-3">
            <span>Step 2 of 7: Product Overview</span>
            <span>30%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mb-8 overflow-hidden">
            <div className="bg-teal-600 h-1.5 rounded-full transition-all duration-500" style={{ width: '30%' }}></div>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900">Persona-X</h1>
            <p className="text-slate-600">Let's set up the foundation for your persona.</p>
          </div>
        </div>

        <Card className="bg-white border border-slate-200 shadow-sm rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-slate-900">Product Overview</CardTitle>
            <CardDescription className="text-slate-600 text-sm mt-1.5">
              Please tell us a bit about what you are building. This helps us ask the right questions later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              
              <div className="space-y-2">
                <Label htmlFor="productName" className="text-slate-700 font-medium">Product Name</Label>
                <Input id="productName" value={name} onChange={(e) => setName(e.target.value)} placeholder={placeholders.name} className="bg-white border-slate-300 focus-visible:ring-teal-600" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productDesc" className="text-slate-700 font-medium">Product Description</Label>
                <Input id="productDesc" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={placeholders.desc} className="bg-white border-slate-300 focus-visible:ring-teal-600" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetMarket" className="text-slate-700 font-medium">Target Market</Label>
                <Input id="targetMarket" value={market} onChange={(e) => setMarket(e.target.value)} placeholder={placeholders.market} className="bg-white border-slate-300 focus-visible:ring-teal-600" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="competitors" className="text-slate-700 font-medium">Competitors</Label>
                <Input id="competitors" value={competitors} onChange={(e) => setCompetitors(e.target.value)} placeholder={placeholders.comp} className="bg-white border-slate-300 focus-visible:ring-teal-600" />
              </div>

              <div className="pt-4">
                <Button 
                  type="button" 
                  onClick={() => {
                    setProductContext({ name, desc, market, competitors });
                    router.push("/parameters");
                  }}
                  disabled={!name || !desc}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium text-base h-11 transition-colors disabled:opacity-50"
                >
                  Next: Select Data Parameters
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}