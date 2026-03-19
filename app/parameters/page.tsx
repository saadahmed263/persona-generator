"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePersonaStore } from "../../store/usePersonaStore"; // Zustand store

// Data categories
const parameterCategories = [
  { title: "Personal Profile", items: ["Name", "Age", "Education qualification", "Gender", "Location", "Occupation", "Family status", "Language", "Hobbies", "Typical day", "What is success?", "Motivation", "Daily routine", "Values and beliefs"] },
  { title: "Banking Profile", items: ["Primary bank", "Banking channels", "Frequency of banking", "Transaction type"] },
  { title: "Financial Profile", items: ["Income range", "Saving behaviour", "Investments preferences", "Products owned", "Decision making", "Financial goals", "Motivation", "Spending pattern", "Influences"] },
  { title: "Technology Profile", items: ["Digital comfort", "Devices used", "Apps used", "Digital literacy level", "Preferred platform (Web/App)", "Internet access", "Accessibility needs"] },
  { title: "Product Based Profile", items: ["Pain points", "User needs", "Challenges", "Usage", "Frequency", "Purpose", "Feature preference", "Usage scenarios"] },
];

export default function ParametersSelection() {
  const router = useRouter();
  const setStoreParameters = usePersonaStore((state) => state.setParameters);
  
  const store = usePersonaStore();
  const [selectedChips, setSelectedChips] = useState<string[]>(store.parameters || []);
  const [activeCategory, setActiveCategory] = useState(parameterCategories[0].title);
  const [otherValue, setOtherValue] = useState("");

  const MIN_REQUIRED = 3;

  // Toggle chip selection
  const toggleChip = (item: string) => {
    setSelectedChips((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Add custom parameter
  const handleAddOther = () => {
    if (otherValue.trim() && !selectedChips.includes(otherValue.trim())) {
      setSelectedChips([...selectedChips, otherValue.trim()]);
      setOtherValue("");
    }
  };

  // Get active category data
  const currentCategoryData = parameterCategories.find(c => c.title === activeCategory);

  return (
    <main className="min-h-screen p-6 bg-slate-50 font-sans tracking-normal pb-32">
      <div className="max-w-5xl mx-auto space-y-8 mt-8">
        
        {/* Header & Progress Indicator */}
        <div className="mb-8 mt-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-3">
            <span>Step 3 of 7: Data Parameters</span>
            <span>45%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mb-8 overflow-hidden">
            <div className="bg-teal-600 h-1.5 rounded-full transition-all duration-500" style={{ width: '45%' }}></div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900">Customize Parameters</h1>
            <p className="text-slate-600">Select the attributes that matter most for defining this persona.</p>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* LEFT: Categories (Vertical Tabs) */}
          <div className="w-full md:w-1/3 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 ml-3">Categories</div>
            {parameterCategories.map((cat) => {
              const selectedCount = cat.items.filter(item => selectedChips.includes(item)).length;
              
              return (
                <button
                  key={cat.title}
                  onClick={() => setActiveCategory(cat.title)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex justify-between items-center ${
                    activeCategory === cat.title 
                      ? "bg-white border-l-4 border-teal-600 text-teal-700 font-semibold shadow-sm" 
                      : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 border-l-4 border-transparent"
                  }`}
                >
                  <span>{cat.title}</span>
                  {selectedCount > 0 && (
                    <span className="bg-teal-50 text-teal-700 border border-teal-100 text-xs font-bold px-2 py-0.5 rounded-full">
                      {selectedCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT: Chips & Inputs */}
          <div className="w-full md:w-2/3">
            <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden min-h-[400px] flex flex-col">
              
              {/* Active Category Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900">{activeCategory}</h2>
                <div className="text-sm font-medium text-slate-500">
                  <span className="text-teal-600 font-bold">{selectedChips.length}</span> total selected
                </div>
              </div>

              {/* Chips Area */}
              <CardContent className="p-6 flex-1">
                <div className="flex flex-wrap gap-2.5">
                  {currentCategoryData?.items.map((item) => {
                    const isSelected = selectedChips.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleChip(item)}
                        className={`px-4 py-2 rounded-full text-sm transition-all border ${
                          isSelected 
                            ? "bg-teal-600 border-teal-600 text-white shadow-sm font-medium" 
                            : "bg-white border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-50"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                  
                  {/* Render Custom Chips added in this view */}
                  {selectedChips
                    .filter(chip => !parameterCategories.flatMap(c => c.items).includes(chip))
                    .map(customChip => (
                      <button
                        key={customChip}
                        type="button"
                        onClick={() => toggleChip(customChip)}
                        className="px-4 py-2 rounded-full text-sm transition-all border bg-teal-600 border-teal-600 text-white shadow-sm font-medium flex items-center"
                      >
                        {customChip} <span className="ml-2 text-xs opacity-70 hover:opacity-100">✕</span>
                      </button>
                  ))}
                </div>
              </CardContent>

              {/* Add Custom Parameter Bar */}
              <div className="p-4 border-t border-slate-100 bg-slate-50">
                <div className="flex gap-3">
                  <Input 
                    value={otherValue}
                    onChange={(e) => setOtherValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddOther()}
                    placeholder={`Add a custom ${activeCategory.toLowerCase()} parameter...`}
                    className="bg-white border-slate-300 focus-visible:ring-teal-600"
                  />
                  <Button onClick={handleAddOther} variant="outline" className="border-slate-300 text-teal-600 hover:bg-teal-50 hover:border-teal-200">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
              </div>

            </Card>
          </div>
        </div>

        {/* Smart Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] z-10">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            
            <div className="flex-1 w-full">
              {selectedChips.length < MIN_REQUIRED ? (
                <div className="flex items-center text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-lg text-sm font-medium w-full sm:w-auto inline-flex">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  Select at least {MIN_REQUIRED - selectedChips.length} more parameter{MIN_REQUIRED - selectedChips.length !== 1 ? 's' : ''} to continue.
                </div>
              ) : (
                <div className="text-sm font-medium text-slate-500">
                  Perfect. You've selected <span className="text-teal-600 font-bold">{selectedChips.length}</span> parameters.
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Link href="/product-context" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                Back
              </Link>
              
              <Button 
                onClick={() => {
                  if (selectedChips.length >= MIN_REQUIRED) {
                    setStoreParameters(selectedChips); 
                    router.push("/step-2");
                  }
                }}
                disabled={selectedChips.length < MIN_REQUIRED}
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 disabled:opacity-50 w-full sm:w-auto shadow-sm"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}