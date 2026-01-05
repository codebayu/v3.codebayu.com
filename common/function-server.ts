import crypto from "crypto";
import { IRequestHeader } from "@/types";

export const CODEBAYU_SERVICE = process.env.CODEBAYU_SERVICE;

export function getRequestHeader(): IRequestHeader {
  const apiKey = process.env.API_KEY || "";
  const apiSecret = process.env.API_SECRET || "";
  const unixTimestamp = Math.floor(new Date().getTime() / 1000);

  const signature = getSignature({ apiKey, apiSecret, unixTimestamp });
  const header = { ["x-datetime"]: unixTimestamp, ["x-signature"]: signature };
  return header;
}

export function getSignature({
  apiKey,
  apiSecret,
  unixTimestamp,
}: {
  apiKey: string;
  apiSecret: string;
  unixTimestamp: number;
}) {
  const hmac = crypto.createHmac("sha256", apiKey + unixTimestamp);
  hmac.update(apiSecret);
  const signature = hmac.digest("hex");
  return signature;
}
