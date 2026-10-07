<script setup lang="ts">
import { CheckCircle2, ChevronDown, Eraser, FileCheck2, Loader2, Send } from "lucide-vue-next";
import { socials } from "./data";

type TaskType = "landing" | "multipage" | "webapp" | "bot" | "other";

const taskTypes: { value: TaskType; label: string }[] = [
  { value: "landing", label: "Лендинг" },
  { value: "multipage", label: "Многостраничный сайт" },
  { value: "webapp", label: "Веб-сервис / SPA" },
  { value: "bot", label: "Бот или автоматизация" },
  { value: "other", label: "Другое" },
];

const fieldClass =
  "rounded-xl border-white/10 bg-white/[0.05] text-white placeholder:text-zinc-500 focus-visible:ring-fuchsia-500/40 focus-visible:border-fuchsia-500/40";

// ─── Черновик в localStorage ───
// было: erriour-form-draft → стало: portfolio-draft (PORTING.md)
const DRAFT_KEY = "portfolio-draft";

type Draft = {
  name?: string;
  contact?: string;
  taskType?: TaskType;
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

// ─── Базовые классы shadcn-примитивов (порт src/components/ui/*) — cn() смержит с кастомными ───
const inputBase =
  "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";
const textareaBase =
  "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm field-sizing-content";
const labelBase = "flex items-center gap-2 text-sm leading-none font-medium select-none";
const btnBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";
const btnVariantDefault = "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90";
const btnSizeDefault = "h-9 px-4 py-2";
const selectTriggerBase =
  "border-input data-[placeholder]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-9";

const submitBtnClass =
  "h-12 rounded-2xl bg-white px-8 text-base font-bold text-black shadow-lg transition-all hover:scale-[1.03] hover:bg-white active:scale-95 disabled:opacity-60";

const { toast } = useToast();

const name = ref("");
const contact = ref("");
const taskType = ref<TaskType>("landing");
const message = ref("");
const website = ref(""); // honeypot
const errors = ref<{ name?: string; contact?: string; message?: string }>({});
const isSubmitting = ref(false);
const sent = ref(false);
const draftRestored = ref(false);

const tg = socials.find((s) => s.name === "Telegram");

// Валидация — порт zod-схемы (сообщения под полями как в исходнике)
function validate(): boolean {
  const errs: typeof errors.value = {};
  const nameV = name.value.trim();
  if (nameV.length < 2) errs.name = "Как к вам обращаться?";
  else if (nameV.length > 60) errs.name = "Максимум 60 символов";
  const contactV = contact.value.trim();
  if (contactV.length < 3) errs.contact = "Telegram, Discord или e-mail";
  else if (contactV.length > 120) errs.contact = "Максимум 120 символов";
  const messageV = message.value.trim();
  if (messageV.length < 10) errs.message = "Опишите задачу подробнее";
  else if (messageV.length > 2000) errs.message = "Максимум 2000 символов";
  errors.value = errs;
  // honeypot должен остаться пустым (website: z.string().max(0))
  return Object.keys(errs).length === 0 && website.value.trim().length === 0;
}

// после первой неудачной отправки — ре-валидация на ввод (как reValidateMode: "onChange" в RHF)
watch([name, contact, message], () => {
  if (Object.keys(errors.value).length > 0) validate();
});

// Восстановление черновика — после гидрации (SSR-safe)
onMounted(() => {
  const stored = readDraft();
  if (stored) {
    if (stored.name) name.value = stored.name;
    if (stored.contact) contact.value = stored.contact;
    if (stored.message) message.value = stored.message;
    if (stored.taskType) taskType.value = stored.taskType;
    draftRestored.value = true;
  }
});

// Автосохранение черновика с дебаунсом 600мс (таймер чистится при смене значения/unmount)
watch([name, contact, message, taskType], (_v, _o, onCleanup) => {
  const t = setTimeout(() => {
    try {
      const draft: Draft = {
        name: name.value || undefined,
        contact: contact.value || undefined,
        taskType: taskType.value,
        message: message.value || undefined,
      };
      const has = draft.name || draft.contact || draft.message;
      if (has) localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* localStorage может быть недоступен */
    }
  }, 600);
  onCleanup(() => clearTimeout(t));
});

// Калькулятор проекта отправляет расчёт в форму через CustomEvent
// (имя erriour:prefill сохранено 1:1 с исходником + алиас portfolio:prefill)
function onPrefill(e: Event) {
  const detail = (e as CustomEvent<{ taskType?: TaskType; message?: string }>).detail;
  if (!detail) return;
  if (detail.taskType) taskType.value = detail.taskType;
  if (detail.message) message.value = detail.message;
  toast({
    title: "Расчёт перенесён в заявку",
    description: "Осталось указать имя и контакт",
  });
}

onMounted(() => {
  window.addEventListener("erriour:prefill", onPrefill);
  window.addEventListener("portfolio:prefill", onPrefill);
});
onBeforeUnmount(() => {
  window.removeEventListener("erriour:prefill", onPrefill);
  window.removeEventListener("portfolio:prefill", onPrefill);
});

function resetForm() {
  name.value = "";
  contact.value = "";
  taskType.value = "landing";
  message.value = "";
  website.value = "";
  errors.value = {};
}

async function onSubmit() {
  if (!validate()) return;
  isSubmitting.value = true;
  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: {
        name: name.value,
        contact: contact.value,
        taskType: taskType.value,
        message: message.value,
        website: website.value,
      },
    });
    toast({
      title: "Заявка отправлена!",
      description: "Отвечу в течение часа в рабочее время.",
    });
    clearDraft();
    resetForm();
    sent.value = true;
  } catch (e) {
    const msg =
      (e as any)?.data?.data?.error ??
      (e as any)?.data?.message ??
      "Попробуйте ещё раз или напишите в Telegram.";
    toast({
      title: "Не получилось",
      description: msg,
      variant: "destructive",
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <!-- Экран успеха -->
  <div
    v-if="sent"
    data-reveal
    class="relative mx-auto mt-12 w-full max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/30 via-purple-500/10 to-transparent p-px"
    role="status"
  >
    <div class="dot-grid rounded-[calc(1.5rem-1px)] bg-[#121214] px-6 py-14 text-center sm:px-9">
      <span
        class="mx-auto grid size-16 place-items-center rounded-full border border-emerald-400/30 bg-emerald-500/15"
      >
        <CheckCircle2 class="size-8 text-emerald-300" aria-hidden="true" />
      </span>
      <h3 class="mt-5 font-display text-2xl font-bold sm:text-3xl">Заявка отправлена!</h3>
      <p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
        Спасибо! Я уже увидел заявку и отвечу в течение часа в рабочее время (10:00–22:00 МСК).
        Срочное — быстрее в Telegram.
      </p>
      <div class="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:scale-[1.02] active:scale-95"
          @click="resetForm(); sent = false"
        >
          <FileCheck2 class="size-4" aria-hidden="true" />
          Отправить ещё одну
        </button>
        <a
          v-if="tg"
          :href="tg.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-zinc-200 transition-all hover:border-white/30 hover:text-white"
        >
          Написать в Telegram
        </a>
      </div>
    </div>
  </div>

  <!-- Форма -->
  <form
    v-else
    class="relative mx-auto mt-12 grid w-full max-w-4xl gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-9"
    novalidate
    @submit.prevent="onSubmit"
  >
    <div
      class="pointer-events-none absolute inset-x-0 -top-px mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-fuchsia-500/60 to-transparent"
    />

    <div>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h3 class="font-display text-2xl font-bold">Или оставьте заявку</h3>
        <button
          v-if="draftRestored"
          type="button"
          class="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-zinc-400 transition-all hover:border-white/25 hover:text-white"
          @click="clearDraft(); resetForm(); draftRestored = false; toast({ title: 'Черновик очищен' })"
        >
          <Eraser class="size-3.5" aria-hidden="true" />
          Черновик восстановлен — очистить
        </button>
      </div>
      <p class="mt-1 text-sm text-zinc-400">
        Расскажите о задаче — отвечу с оценкой сроков и стоимости. Черновик сохраняется
        автоматически.
      </p>
    </div>

    <!-- honeypot -->
    <input
      v-model="website"
      type="text"
      name="website"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
      class="hidden"
    />

    <div class="grid gap-5 sm:grid-cols-2">
      <div class="grid gap-2">
        <label for="cf-name" :class="cn(labelBase, 'text-zinc-300')">Ваше имя</label>
        <input
          id="cf-name"
          v-model="name"
          type="text"
          name="name"
          placeholder="Евгений"
          :class="cn(inputBase, fieldClass)"
          :aria-invalid="!!errors.name"
        />
        <p v-if="errors.name" class="text-xs text-red-400">{{ errors.name }}</p>
      </div>

      <div class="grid gap-2">
        <label for="cf-contact" :class="cn(labelBase, 'text-zinc-300')">Контакт для связи</label>
        <input
          id="cf-contact"
          v-model="contact"
          type="text"
          name="contact"
          placeholder="@keyboard_brothers или mail@example.com"
          :class="cn(inputBase, fieldClass)"
          :aria-invalid="!!errors.contact"
        />
        <p v-if="errors.contact" class="text-xs text-red-400">{{ errors.contact }}</p>
      </div>
    </div>

    <div class="grid gap-2">
      <label :class="cn(labelBase, 'text-zinc-300')">Тип задачи</label>
      <div class="relative w-full">
        <select
          v-model="taskType"
          name="taskType"
          :class="cn(selectTriggerBase, 'w-full appearance-none rounded-xl pr-9', fieldClass)"
          aria-label="Тип задачи"
        >
          <option
            v-for="t in taskTypes"
            :key="t.value"
            :value="t.value"
            class="rounded-lg bg-[#141416] text-white"
          >
            {{ t.label }}
          </option>
        </select>
        <ChevronDown
          class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </div>

    <div class="grid gap-2">
      <label for="cf-message" :class="cn(labelBase, 'text-zinc-300')">О задаче</label>
      <textarea
        id="cf-message"
        v-model="message"
        name="message"
        placeholder="Нужен сайт для студии дизайна: 5–6 страниц, портфолио, форма заявки…"
        :rows="5"
        :class="cn(textareaBase, fieldClass, 'resize-none')"
        :aria-invalid="!!errors.message"
      />
      <p v-if="errors.message" class="text-xs text-red-400">{{ errors.message }}</p>
    </div>

    <div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <p class="text-xs text-zinc-500">
        Нажимая «Отправить», вы соглашаетесь на обработку данных
      </p>
      <button
        type="submit"
        :disabled="isSubmitting"
        :class="cn(btnBase, btnVariantDefault, btnSizeDefault, submitBtnClass)"
      >
        <template v-if="isSubmitting">
          <Loader2 class="size-4 animate-spin" aria-hidden="true" />
          Отправляю…
        </template>
        <template v-else>
          <Send class="size-4" aria-hidden="true" />
          Отправить заявку
        </template>
      </button>
    </div>

    <p class="flex items-center gap-2 text-xs text-zinc-500">
      <CheckCircle2 class="size-3.5 text-emerald-400" aria-hidden="true" />
      Обычно отвечаю в течение часа — быстрее через Telegram
    </p>
  </form>
</template>
