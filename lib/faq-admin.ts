import { createClient } from "@/lib/supabase/server";
import { defaultFaqs } from "@/components/sections/faq-section";

export interface FaqItemWithId {
  id: string | null;
  question: string;
  answer: string;
  sort_order: number;
}

export async function getFaqsWithIds(): Promise<FaqItemWithId[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faq_items")
    .select("id, question, answer, sort_order")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    return defaultFaqs.map((faq, index) => ({
      id: null,
      question: faq.question,
      answer: faq.answer,
      sort_order: index,
    }));
  }

  return data;
}
