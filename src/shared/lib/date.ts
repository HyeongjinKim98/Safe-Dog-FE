export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) {
    throw new Error(`올바르지 않은 날짜 형식 : ${dateString}`);
  }
  return { year, month, day };
};

export const formatDateToKR = (dateString: string) => {
  const { year, month, day } = formatDate(dateString);
  return `${year}년 ${month}월 ${day}일`;
};

export const getRelativTime = (dateString: string) => {
  const target = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - target.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHour = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMin < 1) return `방금 전`;
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 30) return `${diffDay}일 전`;

  return formatDateToKR(dateString);
};

export const calcAge = (birthDate: string): string => {
  const birth = new Date(birthDate);
  const now = new Date();
  const years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  return months < 0
    ? `${years - 1}년 ${months + 12}개월`
    : `${years}년 ${months}개월`;
};
