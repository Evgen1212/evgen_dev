<script setup lang="ts">
import type { DesignVariant } from '~/composables/useDesignVariant';
import { ChevronDown } from 'lucide-vue-next';

export type DesignVariantAppearance = 'classic' | 'ios' | 'm3';

const props = withDefaults(
  defineProps<{
    layout?: 'desktop' | 'mobile';
    pillClass?: string;
    appearance?: DesignVariantAppearance;
  }>(),
  { layout: 'desktop', pillClass: '', appearance: 'classic' },
);

const { currentVariant, navigateToVariant, variants } = useDesignVariant();

const menuOpen = ref(false);
const rootRef = ref<HTMLElement | null>(null);

function onPick(id: DesignVariant) {
  menuOpen.value = false;
  navigateToVariant(id);
}

function onDocumentClick(e: MouseEvent) {
  if (!menuOpen.value || !rootRef.value) return;
  if (!rootRef.value.contains(e.target as Node)) menuOpen.value = false;
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick);
});

const currentLabel = computed(
  () => variants.find((v) => v.id === currentVariant.value)?.label ?? 'Версия',
);

const triggerClass = computed(() => {
  if (props.appearance === 'm3') {
    return cn(
      'm3-icon-btn m3-state-layer flex h-12 min-w-12 items-center gap-0.5 px-2 text-(--ink-soft) hover:text-(--ink)',
    );
  }
  if (props.appearance === 'ios') {
    return cn(
      'design-variant-trigger design-variant-trigger--ios icon-btn grid place-items-center p-0',
    );
  }
  return cn(
    props.pillClass,
    'flex h-14 min-w-14 items-center gap-1.5 pl-3 pr-2.5 text-(--ink) transition-transform hover:scale-[1.02]',
  );
});

const menuPanelClass = computed(() => {
  if (props.appearance === 'm3') {
    return cn(
      'absolute right-0 top-[calc(100%+0.35rem)] z-[60] min-w-[15.5rem] overflow-hidden rounded-2xl border border-(--outline-variant) bg-(--m3-surface-container-high) p-1 shadow-[var(--elevation-3)]',
    );
  }
  if (props.appearance === 'ios') {
    return cn('design-variant-menu design-variant-menu--ios');
  }
  return cn(
    props.pillClass,
    'absolute right-0 top-[calc(100%+0.5rem)] z-[60] min-w-[15.5rem] overflow-hidden p-1.5 shadow-xl',
  );
});

function optionClass(selected: boolean) {
  if (props.appearance === 'm3') {
    return cn(
      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors',
      selected
        ? 'bg-(--m3-primary-container) text-(--m3-on-primary-container)'
        : 'text-(--ink) hover:bg-(--surface-hover)',
    );
  }
  if (props.appearance === 'ios') {
    return cn(
      'design-variant-option design-variant-option--ios',
      selected && 'design-variant-option--ios-selected',
    );
  }
  return cn(
    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors',
    selected
      ? 'bg-gradient-to-r from-fuchsia-600/90 to-purple-600/90 text-white'
      : 'text-(--ink) hover:bg-(--surface-hover)',
  );
}

const mobileWrapClass = computed(() => {
  if (props.appearance === 'm3') {
    return 'border-t border-(--outline-variant) px-3 py-3';
  }
  if (props.appearance === 'ios') {
    return 'design-variant-mobile design-variant-mobile--ios';
  }
  return 'flex flex-col gap-2 border-t border-(--line-1) pt-3 lg:hidden';
});

function mobileBtnClass(selected: boolean) {
  if (props.appearance === 'm3') {
    return cn(
      'grid flex-1 place-items-center rounded-xl py-2.5 transition-all',
      selected
        ? 'bg-(--m3-primary-container) text-(--m3-on-primary-container) shadow-sm'
        : 'hover:bg-(--surface-hover)',
    );
  }
  if (props.appearance === 'ios') {
    return cn(
      'design-variant-mobile-btn design-variant-mobile-btn--ios',
      selected && 'design-variant-mobile-btn--ios-selected',
    );
  }
  return cn(
    'grid flex-1 place-items-center rounded-lg py-2.5 transition-all',
    selected
      ? 'bg-gradient-to-r from-fuchsia-600/90 to-purple-600/90 shadow-md shadow-fuchsia-900/30'
      : 'hover:bg-(--surface-hover)',
  );
}

const mobileLabelClass = computed(() => {
  if (props.appearance === 'm3') return 'm3-label px-1 pb-2';
  if (props.appearance === 'ios') return 'design-variant-mobile-label';
  return 'px-1 text-xs font-semibold uppercase tracking-wide text-(--ink-mute)';
});
</script>

<template>
  <!-- Desktop: trigger + popover -->
  <div
    v-if="layout === 'desktop'"
    ref="rootRef"
    class="relative hidden lg:block"
  >
    <button
      type="button"
      :class="triggerClass"
      :aria-expanded="menuOpen"
      aria-haspopup="listbox"
      aria-label="Выбор версии оформления сайта"
      @click.stop="menuOpen = !menuOpen"
    >
      <DesignVariantIcon :variant="currentVariant" :size="22" />
      <ChevronDown
        v-if="appearance === 'classic'"
        class="size-4 shrink-0 opacity-70 transition-transform duration-200 text-(--ink-soft)"
        :class="menuOpen && 'rotate-180'"
        aria-hidden="true"
      />
    </button>

    <div
      v-show="menuOpen"
      role="listbox"
      :aria-label="currentLabel"
      :class="menuPanelClass"
      @click.stop
    >
      <button
        v-for="v in variants"
        :key="v.id"
        type="button"
        role="option"
        :aria-selected="currentVariant === v.id"
        :class="optionClass(currentVariant === v.id)"
        @click="onPick(v.id)"
      >
        <DesignVariantIcon :variant="v.id" :size="24" />
        <span>{{ v.label }}</span>
      </button>
    </div>
  </div>

  <!-- Mobile: три иконки -->
  <div
    v-else
    :class="mobileWrapClass"
    role="group"
    aria-label="Версия оформления сайта"
  >
    <p :class="mobileLabelClass">
      {{ appearance === 'm3' ? 'Версия сайта' : 'Версия сайта' }}
    </p>
    <div
      :class="
        cn(
          'flex items-center justify-between gap-1',
          appearance === 'classic' && 'rounded-xl bg-(--surface-hover)/50 p-1',
          appearance === 'm3' && 'rounded-2xl bg-(--m3-surface-container) p-1',
          appearance === 'ios' && 'design-variant-mobile-row',
        )
      "
    >
      <button
        v-for="v in variants"
        :key="v.id"
        type="button"
        :title="v.label"
        :aria-label="v.label"
        :aria-current="currentVariant === v.id ? 'true' : undefined"
        :class="mobileBtnClass(currentVariant === v.id)"
        @click="onPick(v.id)"
      >
        <DesignVariantIcon :variant="v.id" :size="26" />
      </button>
    </div>
  </div>
</template>
