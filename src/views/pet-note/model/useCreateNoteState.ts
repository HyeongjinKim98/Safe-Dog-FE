"use client";
import { useState } from "react";
import { BasicCareType, DiseaseCareType, ModeType, CareType } from "./type";
export type TabType = "basic" | "disease";
export const useCreateNoteState = (initialTab: TabType = "basic") => {
  const [careTab, setCareTab] = useState<CareType>("basic");
  const [mode, setMode] = useState<ModeType>("create");
  const [activeBasicNotes, setActiveBasicNotes] = useState<BasicCareType[]>([]);
  const [activeDiseaseNotes, setActiveDiseaseNotes] = useState<
    DiseaseCareType[]
  >([]);

  const toggleBasicNote = (key: BasicCareType) => {
    setActiveBasicNotes((prev) =>
      prev.includes(key) ? prev.filter((v) => v !== key) : [...prev, key],
    );
  };

  const toggleDiseaseNote = (key: DiseaseCareType) => {
    setActiveDiseaseNotes((prev) =>
      prev.includes(key) ? prev.filter((v) => v !== key) : [...prev, key],
    );
  };

  return {
    mode,
    setMode,
    careTab,
    setCareTab,
    activeBasicNotes,
    activeDiseaseNotes,
    toggleBasicNote,
    toggleDiseaseNote,
  };
};
