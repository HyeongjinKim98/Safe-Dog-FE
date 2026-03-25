"use client";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { useCreateNoteState } from "../model/useCreateNoteState";
import { TabType } from "../model/useCreateNoteState";
import { BasicCareType, DiseaseCareType, ModeType } from "../model/type";
import { Button } from "@/shared/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { SelectBasicCare } from "./selectBasicCare";
import { BASIC_CARE_ITEMS } from "../model/constants";
import { MealNoteForm } from "@/features/basicCare/MealNoteForm";
import { SnackNoteForm } from "@/features/basicCare/SnackNoteForm";
import { SupplementNoteForm } from "@/features/basicCare/SupplementNoteForm";
import { MedicineNoteForm } from "@/features/basicCare/MedicineNoteForm";
import { PadNoteForm } from "@/features/basicCare/PadNoteForm";
import { WaterNoteForm } from "@/features/basicCare/WaterNoteForm";
import { WalkNoteForm } from "@/features/basicCare/WalkNoteForm";
import { WeightNoteForm } from "@/features/basicCare/WeightNoteForm";
import {
  DiseaseCareForm,
  DISEASE_TEMPLATES,
} from "@/features/diseaseCare/diseaseCareForm";
import { SelectDiseaseCare } from "./selectDiseaseCare";
import { applyTemplates } from "@/shared/demo/demoCareStore"; // ← 경로 조정

export interface FormProps {
  onDelete: () => void;
  onDataChange: (data: unknown) => void;
}

const BASIC_FORM_COMPONENTS: Partial<
  Record<BasicCareType, React.ComponentType<FormProps>>
> = {
  meal: MealNoteForm,
  snack: SnackNoteForm,
  supplement: SupplementNoteForm,
  medicine: MedicineNoteForm,
  pad: PadNoteForm,
  water: WaterNoteForm,
  walk: WalkNoteForm,
  weight: WeightNoteForm,
};

interface PrevButtonProps {
  mode: ModeType;
  setMode: (type: ModeType) => void;
}

const TABS: { key: TabType; label: string }[] = [
  { key: "basic", label: "기본케어" },
  { key: "disease", label: "질병케어" },
];

const DISEASE_KEY_MAP: Record<DiseaseCareType, string> = {
  heart: "heart",
  kidney: "kidney",
  cancer: "cancer",
  eye: "eye",
  cushing: "cushing",
  arthritis: "arthritis",
  other: "etc",
};

const PrevButton = ({ mode, setMode }: PrevButtonProps) => {
  const router = useRouter();
  return (
    <button
      onClick={() => (mode === "select" ? setMode("create") : router.back())}
    >
      <ArrowLeft />
    </button>
  );
};

interface Props {
  petId: number;
}

export const CreatePetNotePage = ({ petId }: Props) => {
  const {
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
  } = useCreateNoteState();

  const router = useRouter();

  const handleSave = () => {
    const today = new Date().toISOString().split("T")[0];

    // ── 시연용: demoCareStore에 직접 반영 ──────────────────────────
    applyTemplates(today, activeBasicNotes, activeDiseaseNotes);
    // ──────────────────────────────────────────────────────────────

    // 실제 서비스라면 아래 서버 액션도 같이 호출
    // await saveCareTemplates(petId, activeBasicNotes, activeDiseaseNotes);

    router.push("/pet-note");
  };

  return (
    <CommonLayout>
      <Header
        title="체크리스트 입력"
        left={<PrevButton mode={mode} setMode={setMode} />}
      />

      <div className="flex w-full h-16 px-4 text-center items-center">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setCareTab(key)}
            className={`flex-1 h-12 flex items-center justify-center transition-colors ${
              careTab === key
                ? "border-b-2 border-[#1F1F1F] font-semibold text-[#1F1F1F]"
                : "border-b border-[#E0E0E0] font-normal text-[#6B6B6B]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "select" && careTab === "basic" && (
        <SelectBasicCare
          selected={activeBasicNotes}
          toggle={toggleBasicNote}
          onConfirm={() => setMode("create")}
        />
      )}
      {mode === "select" && careTab === "disease" && (
        <SelectDiseaseCare
          selected={activeDiseaseNotes}
          toggle={toggleDiseaseNote}
          onConfirm={() => setMode("create")}
        />
      )}

      {mode === "create" && careTab === "basic" && (
        <div className="flex flex-col gap-[14px] px-5 py-2">
          {activeBasicNotes.map((noteKey) => {
            const FormComponent = BASIC_FORM_COMPONENTS[noteKey];
            const label = BASIC_CARE_ITEMS.find(
              (e) => e.key === noteKey,
            )?.label;
            return (
              <div key={noteKey}>
                {FormComponent ? (
                  <FormComponent
                    onDelete={() => removeBasicNote(noteKey)}
                    onDataChange={(data) => setBasicData(noteKey, data)}
                  />
                ) : (
                  <div>{label} 폼</div>
                )}
              </div>
            );
          })}
          <button
            onClick={() => setMode("select")}
            className="flex items-center justify-center gap-2 w-full bg-[#F7F7F7] rounded-[8px] px-[10px] py-[8px] text-[#3D3D3D] text-[16px] font-medium"
          >
            <Plus className="w-5 h-5" />
            기본케어 항목 추가
          </button>
        </div>
      )}

      {mode === "create" && careTab === "disease" && (
        <div className="flex flex-col gap-[14px] px-5 py-2">
          {activeDiseaseNotes.map((noteKey) => {
            const templateKey = DISEASE_KEY_MAP[noteKey];
            const template = DISEASE_TEMPLATES.find(
              (t) => t.key === templateKey,
            );
            if (!template) return null;
            return (
              <DiseaseCareForm
                key={noteKey}
                template={template}
                onDelete={() => removeDiseaseNote(noteKey)}
                onDataChange={(data) => setDiseaseData(noteKey, data)}
              />
            );
          })}
          <button
            onClick={() => setMode("select")}
            className="flex items-center justify-center gap-2 w-full bg-[#F7F7F7] rounded-[8px] px-[10px] py-[8px] text-[#3D3D3D] text-[16px] font-medium"
          >
            <Plus className="w-5 h-5" />
            질병케어 항목 추가
          </button>
        </div>
      )}

      <div className="flex justify-center px-5 py-4 mt-auto">
        <Button
          className="w-[350px] h-[58px] rounded-[30px] bg-primary-600 text-white disabled:bg-[#EEEEEE] disabled:text-[#6B6B6B]"
          disabled={
            activeBasicNotes.length === 0 && activeDiseaseNotes.length === 0
          }
          onClick={handleSave}
        >
          저장하기
        </Button>
      </div>
    </CommonLayout>
  );
};
