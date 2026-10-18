import { z } from "zod";
export const inquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254).regex(/^[^\r\n]+$/),
  phone: z.string().trim().max(40),
  interest: z.enum(["quarter", "half", "whole", "hay", "other"]),
  method: z.enum(["email", "phone", "text"]),
  message: z.string().trim().min(1).max(5000),
  website: z.string().max(200).default(""),
  requestId: z.string().uuid(),
}).refine((v) => v.method === "email" || v.phone.replace(/\D/g, "").length >= 7, {
  path: ["phone"], message: "Enter a phone number for phone or text replies.",
});
export function contactReady() {
  return !!(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
}
