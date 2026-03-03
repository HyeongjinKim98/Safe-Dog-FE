"use client";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { termsSchema, TermsFormValues } from "@/schemas/termSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const items = [
  {
    id: "1",
    title: "만 14세 이상",
    content: "약관 내용",
    required: true,
  },
  {
    id: "2",
    title: "서비스 이용약관 동의",
    content: "약관 내용",
    required: true,
  },
  {
    id: "3",
    title: "개인정보보호를 위한 이용자 동의",
    content: "약관 내용",
    required: true,
  },
  {
    id: "4",
    title: "마케팅 수신정보 동의",
    content: "약관 내용",
    required: false,
  },
];
const Terms = () => {
  const { handleSubmit, setValue, watch } = useForm<TermsFormValues>({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      agreements: {},
    },
  });

  const values = watch();

  const allChecked =
    items.length > 0 && items.every((item) => values.agreements?.[item.id]);

  const requiredChecked = items
    .filter((item) => item.required)
    .every((item) => values.agreements?.[item.id]);

  const onSubmit = (data: TermsFormValues) => {
    const allRequiredChecked = items
      .filter((item) => item.required)
      .every((item) => data.agreements?.[item.id]);

    if (!allRequiredChecked) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    console.log("약관 동의 완료:", data);
  };

  const handleAllCheck = (checked: boolean) => {
    const newValues = Object.fromEntries(
      items.map((item) => [item.id, checked]),
    );

    setValue("agreements", newValues, { shouldValidate: true });
  };

  return (
    <>
      <div className="flex flex-col m-6 h-screen ">
        {/* 뒤로가기 버튼 자리 */}
        <div className="h-24"></div>
        <div className="text-xl mb-4 font-bold">약관 동의</div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={allChecked}
            onCheckedChange={(checked) => handleAllCheck(!!checked)}
          />
          <p className="text-lg">약관에 모두 동의할게요!</p>
        </div>
        <hr className="my-3" />
        <Accordion type="multiple" className="w-full">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-none"
            >
              <div className="flex items-center w-full gap-2">
                <Checkbox
                  checked={values.agreements[item.id] || false}
                  onCheckedChange={(checked) =>
                    setValue(`agreements.${item.id}`, !!checked, {
                      shouldValidate: true,
                    })
                  }
                />
                <div className="flex-1">
                  <AccordionTrigger className="w-full text-left">
                    [{item.required ? "필수" : "선택"}]{item.title}
                  </AccordionTrigger>
                </div>
              </div>

              <AccordionContent className="pl-6">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button
          type="submit"
          disabled={!requiredChecked}
          className="w-full h-12 mb-4 rounded-2xl text-lg mt-auto"
        >
          동의 완료
        </Button>
      </div>
    </>
  );
};
export default Terms;
