export interface Pet {
  label: string;
  value: string;
}

// mock data
export async function getPets(): Promise<Pet[]> {
  return [
    { label: "백구", value: "1" },
    { label: "황구", value: "2" },
    { label: "흑구", value: "3" },
  ];
}
