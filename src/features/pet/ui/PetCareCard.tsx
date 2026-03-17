"use client";
import { useState } from "react";
import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

const tabs = ["기본 케어", "질병 케어"];

export default function PetCareCard() {
  const [activeTab, setActiveTab] = useState("기본 케어");

  return (
    <div className="w-full p-8 h-screen bg-white rounded-t-3xl">
      <div className="mb-4 text-xl font-bold">오늘의 체크리스트</div>
      <div className="flex h-14">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                    flex-1 py-3 text-lg font-bold rounded-t-2xl text-white
                    ${isActive ? "bg-[#959596] z-10" : "bg-[#D9D9D9]"}
                `}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <Card className="flex flex-col h-80 rounded-t-none rounded-b-2xl bg-[#959596] border-none shadow-none">
        <CardContent className="h-full flex flex-col pt-6 pb-6 px-5">
          <p className="text-xl text-white whitespace-break-spaces">
            체크리스트를 추가하여{"\n"}
            <span className="font-bold">반려견을 케어해보세요!</span>
          </p>

          <Button
            variant="outline"
            className="mt-auto w-full h-16 rounded-full bg-[#D9D9D9] border-none text-lg font-semibold"
          >
            체크리스트 추가하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
