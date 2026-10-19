
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  About: typeof import("../../app/components/portfolio/About.vue")['default']
  AdminDialog: typeof import("../../app/components/portfolio/AdminDialog.vue")['default']
  Contact: typeof import("../../app/components/portfolio/Contact.vue")['default']
  CopyEmailButton: typeof import("../../app/components/portfolio/CopyEmailButton.vue")['default']
  Counter: typeof import("../../app/components/portfolio/Counter.vue")['default']
  DuckMascot: typeof import("../../app/components/portfolio/DuckMascot.vue")['default']
  Experience: typeof import("../../app/components/portfolio/Experience.vue")['default']
  Faq: typeof import("../../app/components/portfolio/Faq.vue")['default']
  Hairline: typeof import("../../app/components/portfolio/Hairline.vue")['default']
  Hero: typeof import("../../app/components/portfolio/Hero.vue")['default']
  IntroLoader: typeof import("../../app/components/portfolio/IntroLoader.vue")['default']
  LocalTime: typeof import("../../app/components/portfolio/LocalTime.vue")['default']
  Marquee: typeof import("../../app/components/portfolio/Marquee.vue")['default']
  MarqueeDot: typeof import("../../app/components/portfolio/MarqueeDot.vue")['default']
  OwnProjects: typeof import("../../app/components/portfolio/OwnProjects.vue")['default']
  PriceCalculator: typeof import("../../app/components/portfolio/PriceCalculator.vue")['default']
  Prices: typeof import("../../app/components/portfolio/Prices.vue")['default']
  Process: typeof import("../../app/components/portfolio/Process.vue")['default']
  ResumeModal: typeof import("../../app/components/portfolio/ResumeModal.vue")['default']
  SectionHeading: typeof import("../../app/components/portfolio/SectionHeading.vue")['default']
  SectionKicker: typeof import("../../app/components/portfolio/SectionKicker.vue")['default']
  SiteFooter: typeof import("../../app/components/portfolio/SiteFooter.vue")['default']
  SiteHeader: typeof import("../../app/components/portfolio/SiteHeader.vue")['default']
  StickyCta: typeof import("../../app/components/portfolio/StickyCta.vue")['default']
  Tech: typeof import("../../app/components/portfolio/Tech.vue")['default']
  TechRow: typeof import("../../app/components/portfolio/TechRow.vue")['default']
  Data: typeof import("../../app/components/portfolio/data")['default']
  ToastHost: typeof import("../../app/components/ui/ToastHost.vue")['default']
  /**
   * Displays the welcome screen used by new Nuxt projects.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
   */
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  /**
   * Renders the selected layout around pages or error content.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
   */
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  /**
   * Catches client-side errors from its default slot and renders an error slot.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
   */
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  /**
   * Renders its default slot only on the client, with an optional server fallback.
   *
   * @see https://nuxt.com/docs/4.x/api/components/client-only
   */
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  /**
   * Renders its content only during development.
   *
   * @see https://nuxt.com/docs/4.x/api/components/dev-only
   */
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  /**
   * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
   */
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  /**
   * Displays a progress bar during page navigation.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
   */
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  /**
   * Formats dates and times consistently across server and client using the user's locale.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
   */
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  /**
   * Announces route changes to assistive technologies using the current page title.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
   */
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  /**
   * Announces dynamic content changes to assistive technologies.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
   */
  NuxtAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
  /**
   * Renders an optimized image through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
   */
  NuxtImg: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  /**
   * Renders responsive optimized images through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
   */
  NuxtPicture: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  /**
   * Renders the current page from the `pages/` directory.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
   */
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  /**
   * Renders a non-interactive server component without shipping client-side JavaScript.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
   */
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyAbout: LazyComponent<typeof import("../../app/components/portfolio/About.vue")['default']>
  LazyAdminDialog: LazyComponent<typeof import("../../app/components/portfolio/AdminDialog.vue")['default']>
  LazyContact: LazyComponent<typeof import("../../app/components/portfolio/Contact.vue")['default']>
  LazyCopyEmailButton: LazyComponent<typeof import("../../app/components/portfolio/CopyEmailButton.vue")['default']>
  LazyCounter: LazyComponent<typeof import("../../app/components/portfolio/Counter.vue")['default']>
  LazyDuckMascot: LazyComponent<typeof import("../../app/components/portfolio/DuckMascot.vue")['default']>
  LazyExperience: LazyComponent<typeof import("../../app/components/portfolio/Experience.vue")['default']>
  LazyFaq: LazyComponent<typeof import("../../app/components/portfolio/Faq.vue")['default']>
  LazyHairline: LazyComponent<typeof import("../../app/components/portfolio/Hairline.vue")['default']>
  LazyHero: LazyComponent<typeof import("../../app/components/portfolio/Hero.vue")['default']>
  LazyIntroLoader: LazyComponent<typeof import("../../app/components/portfolio/IntroLoader.vue")['default']>
  LazyLocalTime: LazyComponent<typeof import("../../app/components/portfolio/LocalTime.vue")['default']>
  LazyMarquee: LazyComponent<typeof import("../../app/components/portfolio/Marquee.vue")['default']>
  LazyMarqueeDot: LazyComponent<typeof import("../../app/components/portfolio/MarqueeDot.vue")['default']>
  LazyOwnProjects: LazyComponent<typeof import("../../app/components/portfolio/OwnProjects.vue")['default']>
  LazyPriceCalculator: LazyComponent<typeof import("../../app/components/portfolio/PriceCalculator.vue")['default']>
  LazyPrices: LazyComponent<typeof import("../../app/components/portfolio/Prices.vue")['default']>
  LazyProcess: LazyComponent<typeof import("../../app/components/portfolio/Process.vue")['default']>
  LazyResumeModal: LazyComponent<typeof import("../../app/components/portfolio/ResumeModal.vue")['default']>
  LazySectionHeading: LazyComponent<typeof import("../../app/components/portfolio/SectionHeading.vue")['default']>
  LazySectionKicker: LazyComponent<typeof import("../../app/components/portfolio/SectionKicker.vue")['default']>
  LazySiteFooter: LazyComponent<typeof import("../../app/components/portfolio/SiteFooter.vue")['default']>
  LazySiteHeader: LazyComponent<typeof import("../../app/components/portfolio/SiteHeader.vue")['default']>
  LazyStickyCta: LazyComponent<typeof import("../../app/components/portfolio/StickyCta.vue")['default']>
  LazyTech: LazyComponent<typeof import("../../app/components/portfolio/Tech.vue")['default']>
  LazyTechRow: LazyComponent<typeof import("../../app/components/portfolio/TechRow.vue")['default']>
  LazyData: LazyComponent<typeof import("../../app/components/portfolio/data")['default']>
  LazyToastHost: LazyComponent<typeof import("../../app/components/ui/ToastHost.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtWelcome>`.
   *
   * Displays the welcome screen used by new Nuxt projects.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
   */
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtLayout>`.
   *
   * Renders the selected layout around pages or error content.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
   */
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  /**
   * Lazy-loaded version of `<NuxtErrorBoundary>`.
   *
   * Catches client-side errors from its default slot and renders an error slot.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
   */
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  /**
   * Lazy-loaded version of `<ClientOnly>`.
   *
   * Renders its default slot only on the client, with an optional server fallback.
   *
   * @see https://nuxt.com/docs/4.x/api/components/client-only
   */
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  /**
   * Lazy-loaded version of `<DevOnly>`.
   *
   * Renders its content only during development.
   *
   * @see https://nuxt.com/docs/4.x/api/components/dev-only
   */
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  /**
   * Lazy-loaded version of `<NuxtLink>`.
   *
   * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
   */
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  /**
   * Lazy-loaded version of `<NuxtLoadingIndicator>`.
   *
   * Displays a progress bar during page navigation.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
   */
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  /**
   * Lazy-loaded version of `<NuxtTime>`.
   *
   * Formats dates and times consistently across server and client using the user's locale.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
   */
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtRouteAnnouncer>`.
   *
   * Announces route changes to assistive technologies using the current page title.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
   */
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  /**
   * Lazy-loaded version of `<NuxtAnnouncer>`.
   *
   * Announces dynamic content changes to assistive technologies.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
   */
  LazyNuxtAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
  /**
   * Lazy-loaded version of `<NuxtImg>`.
   *
   * Renders an optimized image through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
   */
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  /**
   * Lazy-loaded version of `<NuxtPicture>`.
   *
   * Renders responsive optimized images through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
   */
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  /**
   * Lazy-loaded version of `<NuxtPage>`.
   *
   * Renders the current page from the `pages/` directory.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
   */
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  /**
   * Lazy-loaded version of `<NuxtIsland>`.
   *
   * Renders a non-interactive server component without shipping client-side JavaScript.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
   */
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
