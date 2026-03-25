"use client";
import { useState } from "react";
import { CommonLayout } from "@/widgets/CommonLayout";
import { Header } from "@/widgets/Header";
import { BottomNavigation } from "@/widgets/BottomNavigation";
import { ChevronDown, ChevronUp } from "lucide-react";

type Article = {
  id: number;
  category: string;
  title: string;
  summary: string;
  content: string;
  emoji: string;
  tag: string;
};

const ARTICLES: Article[] = [
  {
    id: 1,
    category: "영양 관리",
    title: "시니어 반려견을 위한 영양소 가이드",
    summary: "7살 이상 시니어 반려견에게 필요한 영양소와 식이 조절 방법",
    emoji: "🥩",
    tag: "필수",
    content: `시니어 반려견(7세 이상)은 신진대사가 느려지고 근육량이 줄어들기 때문에 영양 관리가 중요합니다.

**단백질**: 근육 유지를 위해 고품질 단백질이 충분해야 합니다. 체중 1kg당 2~2.5g의 단백질 섭취를 권장합니다.

**칼로리**: 활동량 감소로 인해 성견보다 20~30% 줄여야 비만을 예방할 수 있습니다.

**오메가-3**: 관절 염증을 줄이고 인지 기능을 유지하는 데 도움이 됩니다. 연어, 정어리 등 생선 기반 오일을 추가해보세요.

**수분**: 신장 기능 저하가 올 수 있으므로 충분한 수분 섭취를 유도하는 것이 중요합니다.`,
  },
  {
    id: 2,
    category: "운동 & 관절",
    title: "관절염 있는 시니어 반려견 산책법",
    summary: "관절에 무리 없이 근력을 유지하는 올바른 산책 방법",
    emoji: "🦴",
    tag: "관절",
    content: `관절염이 있는 시니어 반려견에게 무리한 운동은 금물이지만, 완전히 멈추는 것도 좋지 않습니다.

**짧고 자주**: 한 번에 긴 산책보다 하루 2~3회, 10~15분씩 짧게 나누는 것이 효과적입니다.

**평지 선호**: 언덕이나 계단은 관절에 부담을 주므로 평지 위주로 산책하세요.

**수영**: 물 속 운동은 관절 부담 없이 근력을 키울 수 있는 최고의 운동입니다.

**통증 신호 관찰**: 산책 중 절뚝거리거나 멈추려 한다면 즉시 쉬어주세요.

**관절 보조제**: 글루코사민, 콘드로이틴 성분의 보조제가 도움이 될 수 있습니다 (수의사 상담 필수).`,
  },
  {
    id: 3,
    category: "심장 건강",
    title: "반려견 심장병 초기 증상 체크리스트",
    summary: "조기 발견이 중요한 심장병, 이 증상들을 주의깊게 살펴보세요",
    emoji: "❤️",
    tag: "심장",
    content: `심장병은 시니어 소형견에게 매우 흔한 질환입니다. 조기 발견이 치료 효과를 크게 높입니다.

**주요 증상**:
• 기침 (특히 밤이나 운동 후)
• 쉽게 피로해함
• 호흡이 빨라지거나 힘들어함
• 식욕 감소
• 배가 부풀어 오름
• 잇몸이 창백하거나 파래짐

**정기 검진**: 7세 이상은 6개월마다 심장 청진 검진을 권장합니다.

**투약 관리**: 처방된 심장약은 정해진 시간에 빠짐없이 복용시켜야 합니다. 케어리포트 앱으로 투약 일정을 관리해보세요!`,
  },
  {
    id: 4,
    category: "인지 건강",
    title: "반려견 치매(인지기능장애) 알아보기",
    summary: "나이든 반려견의 행동 변화, 치매일 수 있어요",
    emoji: "🧠",
    tag: "인지",
    content: `반려견도 나이가 들면 인지기능장애증후군(CDS)이 올 수 있습니다. 인간의 알츠하이머와 유사한 질환입니다.

**행동 변화 신호**:
• 익숙한 장소에서 길을 잃음
• 가족을 못 알아보는 듯한 행동
• 수면 패턴 변화 (밤에 배회, 낮에 많이 잠)
• 대소변 실수 증가
• 사회적 상호작용 감소

**대처법**:
• 규칙적인 생활 패턴 유지
• 퍼즐 장난감으로 뇌 자극
• 항산화 성분이 풍부한 식이요법
• 수의사 처방 약물 치료

**중요**: 이런 증상이 보이면 수의사 방문을 통해 다른 질환 여부를 먼저 확인하세요.`,
  },
  {
    id: 5,
    category: "정기 검진",
    title: "시니어 반려견 정기검진 가이드",
    summary: "나이별 필수 검진 항목과 검진 주기",
    emoji: "🏥",
    tag: "검진",
    content: `나이가 들수록 건강 문제가 빨리 진행될 수 있어 정기 검진이 매우 중요합니다.

**7~10세 (초기 시니어)**:
• 연 2회 기본 혈액검사, 소변검사
• 연 1회 흉부 X-ray, 복부 초음파
• 6개월마다 치과 검진

**10세 이상 (후기 시니어)**:
• 3~6개월마다 혈액검사
• 6개월마다 심장 초음파
• 3개월마다 혈압 측정

**집에서 할 수 있는 검진**:
• 주 1회 전신 만지기 (혹, 부종 확인)
• 매일 식욕, 음수량, 대소변 상태 체크
• 체중 월 1회 측정

케어리포트에 기록을 남겨 변화를 추적해보세요!`,
  },
];

const ArticleCard = ({ article }: { article: Article }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mx-5 border border-[#E0E0E0] rounded-[12px] overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <span className="text-3xl flex-shrink-0">{article.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-medium text-[#9F7248] bg-[#FDF7F2] px-2 py-0.5 rounded-full">
              {article.category}
            </span>
          </div>
          <p className="text-[15px] font-bold text-[#1F1F1F] leading-snug">
            {article.title}
          </p>
          {!expanded && (
            <p className="text-[13px] text-[#9E9E9E] mt-1 line-clamp-2">
              {article.summary}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 mt-1">
          {expanded ? (
            <ChevronUp size={18} className="text-[#9E9E9E]" />
          ) : (
            <ChevronDown size={18} className="text-[#9E9E9E]" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-[#F7F7F7]">
          <div className="pt-3 text-[14px] text-[#3D3D3D] leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </div>
      )}
    </div>
  );
};

const CATEGORIES = ["전체", "영양 관리", "운동 & 관절", "심장 건강", "인지 건강", "정기 검진"];

export const SeniorPage = () => {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filtered =
    activeCategory === "전체"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <CommonLayout backgroundColor="bg-white">
      <Header title="시니어 상식" />

      <div className="flex flex-col flex-1 overflow-y-auto pb-6">
        {/* Hero */}
        <div className="mx-5 mt-4 bg-[#FDF7F2] rounded-[12px] p-5 flex items-center gap-4">
          <span className="text-5xl">🐾</span>
          <div>
            <p className="text-[16px] font-bold text-[#1F1F1F]">
              시니어 반려동물 케어 가이드
            </p>
            <p className="text-[13px] text-[#9E9E9E] mt-1">
              7세 이상 반려동물을 위한 건강 정보
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 px-5 mt-5 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 h-9 px-4 rounded-full text-[13px] font-medium border transition-colors ${
                activeCategory === cat
                  ? "bg-[#9F7248] text-white border-[#9F7248]"
                  : "bg-white text-[#6B6B6B] border-[#E0E0E0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className="flex flex-col gap-3 mt-4">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      <BottomNavigation />
    </CommonLayout>
  );
};
