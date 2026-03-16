// 확장자
const IMAGE_EXTENSTIONS = ["image/jpeg", "image/png", "image/webp"];

// 파일 용량 제한
const MAX_SIZE_MB = 10;

export const validateImageType = (file : File): boolean =>{
      return IMAGE_EXTENSTIONS.includes(file.type);
}

export const validateImageSize = (file:File) : boolean=>{
      return file.size <= MAX_SIZE_MB * 1024 * 1024;
}