import { create } from 'zustand';

interface PersonaState {
  kind: string | null;
  purpose: string | null;
  setKindAndPurpose: (kind: string, purpose: string) => void;

  parameters: string[];
  setParameters: (params: string[]) => void;

  productName: string; productDescription: string; targetMarket: string; competitors: string;
  setProductContext: (data: { name: string; desc: string; market: string; competitors: string }) => void;

  respondentType: string | null;
  setRespondentType: (type: string) => void;

  // NEW: Dynamic Data Object (Accepts any parameter name as a key)
  portalData: Record<string, string>;
  setPortalData: (data: Record<string, string>) => void;
}

export const usePersonaStore = create<PersonaState>((set) => ({
  kind: null, purpose: null,
  parameters: [],
  productName: "", productDescription: "", targetMarket: "", competitors: "",
  respondentType: null,
  
  portalData: {}, // Starts empty

  setKindAndPurpose: (kind, purpose) => set({ kind, purpose }),
  setParameters: (parameters) => set({ parameters }),
  setProductContext: (data) => set({ 
    productName: data.name, productDescription: data.desc, targetMarket: data.market, competitors: data.competitors 
  }),
  setRespondentType: (type) => set({ respondentType: type }),
  setPortalData: (data) => set({ portalData: data }),
}));