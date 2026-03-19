"use client";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { useCreateNoteState } from "../model/useCreateNoteState";
import { TabType } from "../model/useCreateNoteState";
import { BasicCareType, DiseaseCareType, ModeType } from "../model/type";
import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import { ArrowLeft } from "lucide-react";
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

  const handleClick = () => {
    if (mode === "select") {
      setMode("create");
    } else {
      router.back();
    }
  };

  return (
    <button onClick={handleClick}>
      <ArrowLeft />
    </button>
  );
};

export const CreatePetNotePage = () => {
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
    submitPayload,
  } = useCreateNoteState();
  return (
    <CommonLayout>
      <Header
        title={"체크리스트 입력"}
        left={<PrevButton mode={mode} setMode={setMode} />}
      />
      <div className="flex w-full h-16 px-4 text-center items-center">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setCareTab(key)}
            className={`flex-1 h-16  flex items-center justify-center border-b-2 transition colors ${
              careTab === key
                ? "border-black font-semibold"
                : "border-gray-300 font-normal opacity-70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {mode === "create" && (
        <div className="flex ml-auto m-4">
          <Button
            onClick={() => setMode("select")}
            className="w-28 bg-gray-200 text-gray-600 rounded-full"
          >
            <Plus />
            항목 추가
          </Button>
        </div>
      )}
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
        <div className="flex flex-col gap-4 p-4">
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
                    onDataChange={(data: unknown) =>
                      setBasicData(noteKey, data)
                    }
                  />
                ) : (
                  <div>{label} 폼</div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {mode === "create" && careTab === "disease" && (
        <div className="flex flex-col gap-4 p-4">
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
                onDataChange={(data: unknown) => setDiseaseData(noteKey, data)}
              />
            );
          })}
        </div>
      )}
      <Button
        onClick={() => {
          console.log(submitPayload);
        }}
      >
        hi
      </Button>
    </CommonLayout>
  );
};
