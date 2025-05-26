import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const getAvatarFallBackName = (fullname)=>{

  if(fullname){
      const nameArr = fullname?.split(" ")
      const firstLatter = nameArr[0]?.trim().split("")[0]?.toUpperCase() || ''
      const lastLatter = nameArr[1]?.trim()?.split("")[0]?.toUpperCase() || ''
      return firstLatter.trim()+lastLatter.trim()
  }
}