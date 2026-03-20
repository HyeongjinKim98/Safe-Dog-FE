"use client";
import { useState, useMemo } from "react";
import { BasicCareType, DiseaseCareType, ModeType, CareType } from "./type";
import { toApiTemplates } from "./toApiTemplates";
export type TabType = "basic" | "disease";
export const useCreateNoteState = () => {
  const [careTab, setCareTab] = useState<CareType>("basic");
  const [mode, setMode] = useState<ModeType>("create");
  const [activeBasicNotes, setActiveBasicNotes] = useState<BasicCareType[]>([]);
  const [activeDiseaseNotes, setActiveDiseaseNotes] = useState<
    DiseaseCareType[]
  >([]);
  const [basicFormData, setBasicFormData] = useState<
    Partial<Record<BasicCareType, unknown>>
  >({});
  const [diseaseFormData, setDiseaseFormData] = useState<
    Partial<Record<DiseaseCareType, unknown>>
  >({});

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

  const removeBasicNote = (key: BasicCareType) => {
    setActiveBasicNotes((prev) => prev.filter((v) => v !== key));
    setBasicFormData((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const removeDiseaseNote = (key: DiseaseCareType) => {
    setActiveDiseaseNotes((prev) => prev.filter((v) => v !== key));
    setDiseaseFormData((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const setBasicData = (key: BasicCareType, data: unknown) => {
    setBasicFormData((prev) => ({ ...prev, [key]: data }));
  };

  const setDiseaseData = (key: DiseaseCareType, data: unknown) => {
    setDiseaseFormData((prev) => ({ ...prev, [key]: data }));
  };

  const apiTemplates = toApiTemplates(
    activeBasicNotes,
    activeDiseaseNotes,
    basicFormData,
    diseaseFormData,
  );

  return {
    mode,
    setMode,
    careTab,
    setCareTab,
    activeBasicNotes,
    activeDiseaseNotes,
    toggleBasicNote,
    toggleDiseaseNote,
    removeBasicNote,
    removeDiseaseNote,
    setBasicData,
    setDiseaseData,
    apiTemplates,
  };
};
