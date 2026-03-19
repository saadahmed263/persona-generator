"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MonitorSmartphone, FileSpreadsheet } from "lucide-react";
import Link from "next/link";

export default function DataEntryMethod() {
  return (
    <main className="min-h-screen p-6 bg-slate-50 font-sans tracking-normal pb-24">
      <div className="max-w-4xl mx-auto space-y-8 mt-8">
        
        {/* Header & Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-3">
            <span>Step 4 of 7: Data Entry Method</span>
            <span>60%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mb-8 overflow-hidden">
            <div className="bg-teal-600 h-1.5 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900">How do you want to input data?</h1>
            <p className="text-slate-600">Choose the method that works best for your current research data.</p>
          </div>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Web Portal */}
          <Link href="/web-portal" className="block">
            <Card className="bg-white border border-slate-200 shadow-sm rounded-xl hover:border-teal-600 hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-2">
                  <MonitorSmartphone size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Web Portal</h2>
                <p className="text-slate-600 mb-6">
                  Fill out a dynamic, step-by-step digital form. Best for quick inputs or building from scratch.
                </p>
                <Button variant="outline" className="w-full border-slate-300 text-slate-700 mt-auto hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200">
                  Select Web Portal
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Card 2: Excel Upload */}
          <Link href="/step-3-excel" className="block">
            <Card className="bg-white border border-slate-200 shadow-sm rounded-xl hover:border-teal-600 hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-2">
                  <FileSpreadsheet size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Excel Upload</h2>
                <p className="text-slate-600 mb-6">
                  Download a template and upload your existing research. Best for bulk data or migrating tools.
                </p>
                <Button variant="outline" className="w-full border-slate-300 text-slate-700 mt-auto hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200">
                  Select Excel Upload
                </Button>
              </CardContent>
            </Card>
          </Link>

        </div>

      </div>
    </main>
  );
}