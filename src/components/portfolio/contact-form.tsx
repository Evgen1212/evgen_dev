"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
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

export default function ContactForm() {
  const { toast } = useToast();
  const [taskType, setTaskType] = useState<FormValues["taskType"]>("landing");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", contact: "", taskType: "landing", message: "", website: "" },
  });

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
        reset();
        setTaskType("landing");
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mx-auto mt-12 grid w-full max-w-4xl gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-9"
      noValidate
    >
      <div className="pointer-events-none absolute inset-x-0 -top-px mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-fuchsia-500/60 to-transparent" />

      <div>
        <h3 className="font-display text-2xl font-bold">Или оставьте заявку</h3>
        <p className="mt-1 text-sm text-zinc-400">
          Расскажите о задаче — отвечу с оценкой сроков и стоимости
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
