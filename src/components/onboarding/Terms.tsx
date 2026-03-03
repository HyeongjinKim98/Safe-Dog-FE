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
    value: "1",
    trigger: "[필수] 만 14세 이상",
    content: `약관 내용`,
  },
  {
    value: "2",
    trigger: "[필수] 서비스 이용약관 동의",
    content: `약관 내용`,
  },
  {
    value: "3",
    trigger: "[필수] 개인정보보호를 위한 이용자 동의",
    content: `약관 내용`,
  },
  {
    value: "4",
    trigger: "[선택] 마케팅 수신정보 동의",
    content: `약관 내용`,
  },
];
const Terms = () => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<TermsFormValues>({
    resolver: zodResolver(termsSchema),
    mode: "onChange",
    defaultValues: {
      age: false,
      service: false,
      privacy: false,
      marketing: false,
    },
  });

  const values = watch();

  const allChecked =
    values.age && values.service && values.privacy && values.marketing;

  const onSubmit = (data: TermsFormValues) => {
    console.log("약관 동의 완료:", data);
  };

  return (
    <>
      <div className="flex flex-col m-6 h-screen ">
        {/* 뒤로가기 버튼 자리 */}
        <div className="h-24"></div>
        <div className="text-xl mb-4 font-bold">약관 동의</div>
        <div className="flex items-center gap-2">
          <Checkbox />
          <p className="text-lg">약관에 모두 동의할게요!</p>
        </div>
        <hr className="my-3" />
        <Accordion type="multiple" className="w-full">
          {items.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="border-none"
            >
              <div className="flex items-center w-full">
                <Checkbox className="mr-2" />
                <div className="flex-1">
                  <AccordionTrigger className="w-full text-left">
                    {item.trigger}
                  </AccordionTrigger>
                </div>
              </div>

              <AccordionContent className="pl-6">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button className="w-full h-12 mb-4 rounded-2xl text-lg mt-auto">
          동의 완료
        </Button>
      </div>
    </>
  );
};
export default Terms;
