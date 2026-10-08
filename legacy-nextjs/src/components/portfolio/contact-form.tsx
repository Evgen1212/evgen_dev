"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eraser, Loader2, Send, CheckCircle2, FileCheck2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { socials } from "./data";

const formSchema = z.object({
  name: z.string().trim().min(2, "Как к вам обращаться?").max(60),
  contact: z.string().trim().min(3, "Telegram, Discord или e-mail").max(120),
  taskType: z.enum(["landing", "multipage", "webapp", "bot", "other"]),
  message: z.string().trim().min(10, "Опишите задачу подробнее").max(2000),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const taskTypes: { value: FormValues["taskType"]; label: string }[] = [
  { value: "landing", label: "Лендинг" },
  { value: "multipage", label: "Многостраничный сайт" },
  { value: "webapp", label: "Веб-сервис / SPA" },
  { value: "bot", label: "Бот или автоматизация" },
  { value: "other", label: "Другое" },
];

const fieldClass =
  "rounded-xl border-white/10 bg-white/[0.05] text-white placeholder:text-zinc-500 focus-visible:ring-fuchsia-500/40 focus-visible:border-fuchsia-500/40";

const DRAFT_KEY = "erriour-form-draft";

type Draft = {
  name?: string;
  contact?: string;
  taskType?: FormValues["taskType"];
  message?: string;
};

function readDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as Draft;
    const hasContent = [d.name, d.contact, d.message].some(
      (v) => typeof v === "string" && v.trim().length > 0
    );
    return hasContent ? d : null;
  } catch {
    return null;
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

export default function ContactForm() {
  const { toast } = useToast();
  const [taskType, setTaskType] = useState<FormValues["taskType"]>("landing");
  const [sent, setSent] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", contact: "", taskType: "landing", message: "", website: "" },
  });
  const watched = useWatch({ control });

  // Восстановление черновика — внутри rAF (react-hooks/set-state-in-effect)
  useEffect(() => {
    const stored = readDraft();
    const raf = requestAnimationFrame(() => {
      if (stored) {
        if (stored.name) setValue("name", stored.name);
        if (stored.contact) setValue("contact", stored.contact);
        if (stored.message) setValue("message", stored.message);
        if (stored.taskType) {
          setTaskType(stored.taskType);
          setValue("taskType", stored.taskType);
        }
        setDraftRestored(true);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [setValue]);

  // Автосохранение черновика с дебаунсом 600мс
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const draft: Draft = {
          name: watched.name || undefined,
          contact: watched.contact || undefined,
          taskType: watched.taskType,
          message: watched.message || undefined,
        };
        const has = draft.name || draft.contact || draft.message;
        if (has) localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      } catch {
        /* localStorage может быть недоступен */
      }
    }, 600);
    return () => clearTimeout(t);
  }, [watched.name, watched.contact, watched.message, watched.taskType]);

  // Калькулятор проекта отправляет расчёт в форму через CustomEvent
  useEffect(() => {
    function onPrefill(e: Event) {
      const detail = (
        e as CustomEvent<{ taskType?: FormValues["taskType"]; message?: string }>
      ).detail;
      if (!detail) return;
      if (detail.taskType) {
        setTaskType(detail.taskType);
        setValue("taskType", detail.taskType);
      }
      if (detail.message) setValue("message", detail.message);
      toast({
        title: "Расчёт перенесён в заявку",
        description: "Осталось указать имя и контакт",
      });
    }
    window.addEventListener("erriour:prefill", onPrefill);
    return () => window.removeEventListener("erriour:prefill", onPrefill);
  }, [setValue, toast]);

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string }
        | null;

      if (res.ok && data?.ok) {
        toast({
          title: "Заявка отправлена!",
          description: "Отвечу в течение часа в рабочее время.",
        });
        clearDraft();
        setSent(true);
      } else {
        toast({
          title: "Не получилось",
          description: data?.error ?? "Попробуйте ещё раз или напишите в Telegram.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Ошибка сети",
        description: "Проверьте соединение или напишите в Telegram.",
        variant: "destructive",
      });
    }
  }

  if (sent) {
    const tg = socials.find((s) => s.name === "Telegram");
    return (
      <div
        data-reveal
        className="relative mx-auto mt-12 w-full max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/30 via-purple-500/10 to-transparent p-px"
        role="status"
      >
        <div className="dot-grid rounded-[calc(1.5rem-1px)] bg-[#121214] px-6 py-14 text-center sm:px-9">
          <span className="mx-auto grid size-16 place-items-center rounded-full border border-emerald-400/30 bg-emerald-500/15">
            <CheckCircle2 className="size-8 text-emerald-300" aria-hidden="true" />
          </span>
          <h3 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
            Заявка отправлена!
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
            Спасибо! Я уже увидел заявку и отвечу в течение часа в рабочее
            время (10:00–22:00 МСК). Срочное — быстрее в Telegram.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                reset();
                setTaskType("landing");
                setSent(false);
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:scale-[1.02] active:scale-95"
            >
              <FileCheck2 className="size-4" aria-hidden="true" />
              Отправить ещё одну
            </button>
            {tg && (
              <a
                href={tg.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-zinc-200 transition-all hover:border-white/30 hover:text-white"
              >
                Написать в Telegram
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mx-auto mt-12 grid w-full max-w-4xl gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-9"
      noValidate
    >
      <div className="pointer-events-none absolute inset-x-0 -top-px mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-fuchsia-500/60 to-transparent" />

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-2xl font-bold">Или оставьте заявку</h3>
          {draftRestored && (
            <button
              type="button"
              onClick={() => {
                clearDraft();
                reset();
                setTaskType("landing");
                setDraftRestored(false);
                toast({ title: "Черновик очищен" });
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-zinc-400 transition-all hover:border-white/25 hover:text-white"
            >
              <Eraser className="size-3.5" aria-hidden="true" />
              Черновик восстановлен — очистить
            </button>
          )}
        </div>
        <p className="mt-1 text-sm text-zinc-400">
          Расскажите о задаче — отвечу с оценкой сроков и стоимости. Черновик
          сохраняется автоматически.
        </p>
      </div>

      {/* honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("website")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="cf-name" className="text-zinc-300">
            Ваше имя
          </Label>
          <Input
            id="cf-name"
            placeholder="Владимир"
            className={fieldClass}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cf-contact" className="text-zinc-300">
            Контакт для связи
          </Label>
          <Input
            id="cf-contact"
            placeholder="@erriour или mail@example.com"
            className={fieldClass}
            aria-invalid={!!errors.contact}
            {...register("contact")}
          />
          {errors.contact && (
            <p className="text-xs text-red-400">{errors.contact.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label className="text-zinc-300">Тип задачи</Label>
        <Select
          value={taskType}
          onValueChange={(v) => {
            setTaskType(v as FormValues["taskType"]);
            setValue("taskType", v as FormValues["taskType"]);
          }}
        >
          <SelectTrigger className={cn("w-full rounded-xl", fieldClass)}>
            <SelectValue placeholder="Выберите тип задачи" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-white/10 bg-[#141416] text-white">
            {taskTypes.map((t) => (
              <SelectItem key={t.value} value={t.value} className="rounded-lg focus:bg-white/10">
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="cf-message" className="text-zinc-300">
          О задаче
        </Label>
        <Textarea
          id="cf-message"
          placeholder="Нужен сайт для студии дизайна: 5–6 страниц, портфолио, форма заявки…"
          rows={5}
          className={cn(fieldClass, "resize-none")}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-zinc-500">
          Нажимая «Отправить», вы соглашаетесь на обработку данных
        </p>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 rounded-2xl bg-white px-8 text-base font-bold text-black shadow-lg transition-all hover:scale-[1.03] hover:bg-white active:scale-95 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Отправляю…
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              Отправить заявку
            </>
          )}
        </Button>
      </div>

      <p className="flex items-center gap-2 text-xs text-zinc-500">
        <CheckCircle2 className="size-3.5 text-emerald-400" aria-hidden="true" />
        Обычно отвечаю в течение часа — быстрее через Telegram
      </p>
    </form>
  );
}
