"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, Download } from "lucide-react";
import Link from "next/link";

export default function ExcelUpload() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50 font-sans tracking-normal pb-24">
      <div className="w-full max-w-2xl space-y-8 mt-8">
        
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-3">
            <span>Step 5 of 7: Data Entry</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mb-8 overflow-hidden">
            <div className="bg-teal-600 h-1.5 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900">Upload Persona Data</h1>
            <p className="text-slate-600">Download the template, fill it offline, and drop it back here.</p>
          </div>
        </div>

        <Card className="bg-white border border-slate-200 shadow-sm rounded-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <FileSpreadsheetIcon className="w-5 h-5 text-teal-600" />
              <CardTitle className="text-xl text-slate-900">Data Template</CardTitle>
            </div>
            <CardDescription className="text-slate-600 mt-1">
              Download the formatted file below, add your data, and upload it back here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-lg">
              <div>
                <div className="font-semibold text-slate-900">1. Get the Template</div>
                <div className="text-sm text-slate-500">.xlsx format, pre-formatted columns</div>
              </div>
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200">
                <Download className="w-4 h-4 mr-2" /> Download Blank Template
              </Button>
            </div>

            <div>
              <div className="font-semibold text-slate-900 mb-2">2. Upload Completed File</div>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-teal-300 transition-colors cursor-pointer bg-white group">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud size={24} />
                </div>
                <div className="font-medium text-slate-900 mb-1">Click to upload or drag and drop</div>
                <div className="text-sm text-slate-500">XLSX or CSV (max. 10MB)</div>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-slate-100 mt-6">
              <Link href="/step-2">
                <Button type="button" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                  Back to Method
                </Button>
              </Link>
              <Link href="/select-respondent">
                <Button type="button" className="bg-teal-600 hover:bg-teal-700 text-white font-medium">
                  Next: Select Respondent
                </Button>
              </Link>
            </div>

          </CardContent>
        </Card>

      </div>
    </main>
  );
}

function FileSpreadsheetIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/>
    </svg>
  );
}