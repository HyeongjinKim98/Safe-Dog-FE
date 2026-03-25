// Module-level store — persists within the server process (suitable for demo/mock)
type StoredTemplate = {
  petId: number;
  careType: string;
  title: string;
  content: string;
  careTypeDescription: string;
};

const storedTemplates: StoredTemplate[] = [];

export const careStore = {
  save: (templates: StoredTemplate[]) => {
    // Avoid duplicates: remove existing entries for same petId+careType before adding
    const incoming = new Set(templates.map((t) => `${t.petId}:${t.careType}`));
    const filtered = storedTemplates.filter(
      (t) => !incoming.has(`${t.petId}:${t.careType}`),
    );
    storedTemplates.length = 0;
    storedTemplates.push(...filtered, ...templates);
  },
  getForPet: (petId: number): StoredTemplate[] => {
    return storedTemplates.filter((t) => t.petId === petId);
  },
};
