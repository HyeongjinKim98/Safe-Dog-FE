import { calcAge } from "@/shared/lib/date";
import { Pet } from "@/entities/pet/api/pet";
import { Card, CardContent } from "@/shared/ui/card";
const GENDER_MAP = { MALE: "수컷", FEMALE: "암컷" };
const DISEASE_MAP = { DIABETES: "당뇨" };

export const PetProfileCard = ({
  pet,
  isSelected,
}: {
  pet: Pet;
  isSelected: boolean;
}) => {
  const infoItems = [
    { label: "이름", value: pet.name },
    { label: "품종", value: pet.breed },
    { label: "나이", value: calcAge(pet.birthDate) },
    { label: "성별", value: GENDER_MAP[pet.gender] },
    { label: "중성화", value: pet.neutered ? "완료" : "미완료" },
    { label: "종", value: pet.species },
  ];

  return (
    <Card
      className={`w-full rounded-2xl shadow-sm transition-all border-2 ${
        isSelected ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <CardContent className=" pt-4 pb-6 px-5 flex flex-col gap-4">
        <div className="flex justify-end">
          <button className="text-xs text-gray-400 border border-gray-300 rounded-full px-3 py-1">
            정보 수정
          </button>
        </div>

        <div className="flex justify-center">
          <img
            src={pet.profileImageUrl}
            alt={pet.name}
            className="w-24 h-24 rounded-full object-cover bg-gray-200"
          />
        </div>

        <ul className="flex flex-col gap-2">
          {infoItems.map(({ label, value }) => (
            <li key={label} className="flex gap-3 text-sm">
              <span className="text-gray-400 w-14 shrink-0">· {label}</span>
              <span className="text-gray-800">{value}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-1 pt-2 border-t border-gray-100 min-h-16">
          <span className="text-xs text-center text-gray-400">질병 현황</span>
          {pet.diseases.length > 0 ? (
            pet.diseases.map((d) => (
              <p key={d} className="text-sm text-center text-gray-700">
                {DISEASE_MAP[d]}
              </p>
            ))
          ) : (
            <p className="text-sm text-center text-gray-300">없음</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
