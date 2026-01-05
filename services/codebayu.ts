"use server";

import { CODEBAYU_SERVICE, getRequestHeader } from "@/common/function-server";
import { ICareer } from "@/types/codebayu";

export async function getCareers(): Promise<ICareer[]> {
  const headers = getRequestHeader();
  const response = await fetch(`${CODEBAYU_SERVICE}/career`, {
    headers: headers as HeadersInit,
  });
  const data = await response.json();
  return data?.data || [];
}
