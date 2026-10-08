"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contactEmail } from "./data";

/** Кнопка-пилюля «скопировать e-mail» в блоке контактов */
export default function CopyEmailButton() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard
      .writeText(contactEmail)
      .then(() => {
        setCopied(true);
        toast({ title: "E-mail скопирован", description: contactEmail });
        window.setTimeout(() => setCopied(false), 2400);
      })
      .catch(() =>
        toast({
          title: "Не удалось скопировать",
          description: `Напишите вручную: ${contactEmail}`,
          variant: "destructive",
        })
      );
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={`Скопировать ${contactEmail}`}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-white active:scale-95"
    >
      <Mail className="size-[15px] opacity-80" aria-hidden="true" />
      {contactEmail}
      {copied ? (
        <Check className="size-3.5 text-emerald-400" aria-hidden="true" />
      ) : (
        <Copy className="size-3.5 opacity-60" aria-hidden="true" />
      )}
      <span className="sr-only">Скопировать e-mail в буфер обмена</span>
    </button>
  );
}
