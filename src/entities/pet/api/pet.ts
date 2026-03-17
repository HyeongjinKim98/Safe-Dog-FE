// mock data
export interface MockPet {
  label: string;
  value: string;
}

export async function getPets(): Promise<MockPet[]> {
  return [
    { label: "백구", value: "1" },
    { label: "황구", value: "2" },
    { label: "흑구", value: "3" },
  ];
}

export type Gender = "MALE" | "FEMALE";

export type Disease = "DIABETES";

export interface Pet {
  id: number;
  userId: number;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  gender: Gender;
  profileImageUrl: string;
  diseases: Disease[];
  neutered: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getPetList(): Promise<Pet[]> {
  return [
    {
      id: 1,
      userId: 101,
      name: "누렁이",
      species: "개",
      breed: "웰시코기",
      birthDate: "2023-05-12",
      gender: "MALE",
      profileImageUrl:
        "https://media.istockphoto.com/id/1445769923/ko/%EC%82%AC%EC%A7%84/%ED%96%89%EB%B3%B5%ED%95%9C-%EC%95%89%EC%95%84%EC%9E%88%EB%8A%94-%EA%B0%95%EC%95%84%EC%A7%80-%EC%9B%A8%EC%9D%BC%EC%8A%A4-%EC%96%B4-corgi-pembroke-14-%EC%A3%BC-%ED%9D%B0%EC%83%89%EC%9C%BC%EB%A1%9C-%EA%B3%A0%EB%A6%BD.jpg?s=612x612&w=0&k=20&c=Hd5iqya_niniKkabKom6YKIflr6c4QKmJDFdEcW4SnI=",
      diseases: [],
      neutered: true,
      createdAt: "2025-01-10T09:00:00.000Z",
      updatedAt: "2026-01-10T09:00:00.000Z",
    },
    {
      id: 2,
      userId: 101,
      name: "나비",
      species: "고양이",
      breed: "숏헤어",
      birthDate: "2021-11-03",
      gender: "FEMALE",
      profileImageUrl:
        "https://media.istockphoto.com/id/1443562748/ko/%EC%82%AC%EC%A7%84/%EA%B7%80%EC%97%AC%EC%9A%B4-%EC%83%9D%EA%B0%95-%EA%B3%A0%EC%96%91%EC%9D%B4.jpg?s=612x612&w=is&k=20&c=FUBu5_tWdys-knmbWcf-CWx-knovRemsVf4UrFq_imA=",
      diseases: ["DIABETES"],
      neutered: false,
      createdAt: "2025-03-22T14:30:00.000Z",
      updatedAt: "2026-06-01T10:00:00.000Z",
    },
  ];
}
