export type TabStateType = "basic" | "disease" | "create";

export type BasicCareType =
  | "meal"
  | "snack"
  | "supplement"
  | "water"
  | "excretion"
  | "walk"
  | "weight"
  | "grooming"
  | "medicine"
  | "vaccination"
  | "etc";

export type DiseaseCareType =
  | "heart"
  | "kidney"
  | "cancer"
  | "eye"
  | "cushing"
  | "arthritis"
  | "other";

export interface NoteState {
  Tab: TabStateType;
  selectedBasicItems: BasicCareType[];
  selectedDiseaseItems: DiseaseCareType[];
}

export type TimeSlotType = "morning" | "lunch" | "dinner" | "custom";

export type FoodType = "dry" | "wet";

export type FoodUnitType = "g" | "cup" | "bowl" | "custom";

export type SupplementUnitType = "count" | "pack" | "custom";

export type WaterUnitType = "ml" | "cup" | "bowl" | "custom";

export type WalkUnitType = "minute" | "hour" | "custom";

export type MedicineUnitType = "tablet" | "pack" | "drop" | "bag" | "custom";

export type VaccinationUnitType = "tablet" | "spoton" | "injection" | "custom";

export type RepeatUnitType = "day" | "month" | "year";

export type GroomingItemType =
  | "grooming"
  | "nail"
  | "toothbrush"
  | "earCleaning"
  | "bath"
  | "analGland"
  | "custom";

export type VaccinationType =
  | "heartworm"
  | "externalParasite"
  | "deworming"
  | "rabies"
  | "custom";

export type EtcType =
  | "timeSlot"
  | "amount"
  | "image"
  | "memo"
  | "repeat"
  | "simpleChecklist";
