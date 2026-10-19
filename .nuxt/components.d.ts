
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


export const About: typeof import("../app/components/portfolio/About.vue")['default']
export const Contact: typeof import("../app/components/portfolio/Contact.vue")['default']
export const CopyEmailButton: typeof import("../app/components/portfolio/CopyEmailButton.vue")['default']
export const Counter: typeof import("../app/components/portfolio/Counter.vue")['default']
export const Experience: typeof import("../app/components/portfolio/Experience.vue")['default']
export const Faq: typeof import("../app/components/portfolio/Faq.vue")['default']
export const Hairline: typeof import("../app/components/portfolio/Hairline.vue")['default']
export const Hero: typeof import("../app/components/portfolio/Hero.vue")['default']
export const IntroLoader: typeof import("../app/components/portfolio/IntroLoader.vue")['default']
export const LocalTime: typeof import("../app/components/portfolio/LocalTime.vue")['default']
export const Marquee: typeof import("../app/components/portfolio/Marquee.vue")['default']
export const MarqueeDot: typeof import("../app/components/portfolio/MarqueeDot.vue")['default']
export const OwnProjects: typeof import("../app/components/portfolio/OwnProjects.vue")['default']
export const ParrotMascot: typeof import("../app/components/portfolio/ParrotMascot.vue")['default']
export const PriceCalculator: typeof import("../app/components/portfolio/PriceCalculator.vue")['default']
export const Prices: typeof import("../app/components/portfolio/Prices.vue")['default']
export const Process: typeof import("../app/components/portfolio/Process.vue")['default']
export const ResumeModal: typeof import("../app/components/portfolio/ResumeModal.vue")['default']
export const SectionHeading: typeof import("../app/components/portfolio/SectionHeading.vue")['default']
export const SectionKicker: typeof import("../app/components/portfolio/SectionKicker.vue")['default']
export const SiteFooter: typeof import("../app/components/portfolio/SiteFooter.vue")['default']
export const SiteHeader: typeof import("../app/components/portfolio/SiteHeader.vue")['default']
export const Skills: typeof import("../app/components/portfolio/Skills.vue")['default']
export const StickyCta: typeof import("../app/components/portfolio/StickyCta.vue")['default']
export const Tech: typeof import("../app/components/portfolio/Tech.vue")['default']
export const TechRow: typeof import("../app/components/portfolio/TechRow.vue")['default']
export const Data: typeof import("../app/components/portfolio/data")['default']
export const ToastHost: typeof import("../app/components/ui/ToastHost.vue")['default']
/**
 * Displays the welcome screen used by new Nuxt projects.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
 */
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
/**
 * Renders the selected layout around pages or error content.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
 */
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
/**
 * Catches client-side errors from its default slot and renders an error slot.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
 */
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
/**
 * Renders its default slot only on the client, with an optional server fallback.
 *
 * @see https://nuxt.com/docs/4.x/api/components/client-only
 */
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
/**
 * Renders its content only during development.
 *
 * @see https://nuxt.com/docs/4.x/api/components/dev-only
 */
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
/**
 * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
 */
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
/**
 * Displays a progress bar during page navigation.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
 */
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
/**
 * Formats dates and times consistently across server and client using the user's locale.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
 */
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
/**
 * Announces route changes to assistive technologies using the current page title.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
 */
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
/**
 * Announces dynamic content changes to assistive technologies.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
 */
export const NuxtAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
/**
 * Renders an optimized image through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
 */
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
/**
 * Renders responsive optimized images through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
 */
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
/**
 * Renders the current page from the `pages/` directory.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
 */
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
/**
 * Renders a non-interactive server component without shipping client-side JavaScript.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
 */
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyAbout: LazyComponent<typeof import("../app/components/portfolio/About.vue")['default']>
export const LazyContact: LazyComponent<typeof import("../app/components/portfolio/Contact.vue")['default']>
export const LazyCopyEmailButton: LazyComponent<typeof import("../app/components/portfolio/CopyEmailButton.vue")['default']>
export const LazyCounter: LazyComponent<typeof import("../app/components/portfolio/Counter.vue")['default']>
export const LazyExperience: LazyComponent<typeof import("../app/components/portfolio/Experience.vue")['default']>
export const LazyFaq: LazyComponent<typeof import("../app/components/portfolio/Faq.vue")['default']>
export const LazyHairline: LazyComponent<typeof import("../app/components/portfolio/Hairline.vue")['default']>
export const LazyHero: LazyComponent<typeof import("../app/components/portfolio/Hero.vue")['default']>
export const LazyIntroLoader: LazyComponent<typeof import("../app/components/portfolio/IntroLoader.vue")['default']>
export const LazyLocalTime: LazyComponent<typeof import("../app/components/portfolio/LocalTime.vue")['default']>
export const LazyMarquee: LazyComponent<typeof import("../app/components/portfolio/Marquee.vue")['default']>
export const LazyMarqueeDot: LazyComponent<typeof import("../app/components/portfolio/MarqueeDot.vue")['default']>
export const LazyOwnProjects: LazyComponent<typeof import("../app/components/portfolio/OwnProjects.vue")['default']>
export const LazyParrotMascot: LazyComponent<typeof import("../app/components/portfolio/ParrotMascot.vue")['default']>
export const LazyPriceCalculator: LazyComponent<typeof import("../app/components/portfolio/PriceCalculator.vue")['default']>
export const LazyPrices: LazyComponent<typeof import("../app/components/portfolio/Prices.vue")['default']>
export const LazyProcess: LazyComponent<typeof import("../app/components/portfolio/Process.vue")['default']>
export const LazyResumeModal: LazyComponent<typeof import("../app/components/portfolio/ResumeModal.vue")['default']>
export const LazySectionHeading: LazyComponent<typeof import("../app/components/portfolio/SectionHeading.vue")['default']>
export const LazySectionKicker: LazyComponent<typeof import("../app/components/portfolio/SectionKicker.vue")['default']>
export const LazySiteFooter: LazyComponent<typeof import("../app/components/portfolio/SiteFooter.vue")['default']>
export const LazySiteHeader: LazyComponent<typeof import("../app/components/portfolio/SiteHeader.vue")['default']>
export const LazySkills: LazyComponent<typeof import("../app/components/portfolio/Skills.vue")['default']>
export const LazyStickyCta: LazyComponent<typeof import("../app/components/portfolio/StickyCta.vue")['default']>
export const LazyTech: LazyComponent<typeof import("../app/components/portfolio/Tech.vue")['default']>
export const LazyTechRow: LazyComponent<typeof import("../app/components/portfolio/TechRow.vue")['default']>
export const LazyData: LazyComponent<typeof import("../app/components/portfolio/data")['default']>
export const LazyToastHost: LazyComponent<typeof import("../app/components/ui/ToastHost.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtWelcome>`.
 *
 * Displays the welcome screen used by new Nuxt projects.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
 */
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtLayout>`.
 *
 * Renders the selected layout around pages or error content.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
 */
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
/**
 * Lazy-loaded version of `<NuxtErrorBoundary>`.
 *
 * Catches client-side errors from its default slot and renders an error slot.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
 */
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
/**
 * Lazy-loaded version of `<ClientOnly>`.
 *
 * Renders its default slot only on the client, with an optional server fallback.
 *
 * @see https://nuxt.com/docs/4.x/api/components/client-only
 */
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
/**
 * Lazy-loaded version of `<DevOnly>`.
 *
 * Renders its content only during development.
 *
 * @see https://nuxt.com/docs/4.x/api/components/dev-only
 */
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
/**
 * Lazy-loaded version of `<NuxtLink>`.
 *
 * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
 */
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
/**
 * Lazy-loaded version of `<NuxtLoadingIndicator>`.
 *
 * Displays a progress bar during page navigation.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
 */
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
/**
 * Lazy-loaded version of `<NuxtTime>`.
 *
 * Formats dates and times consistently across server and client using the user's locale.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
 */
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtRouteAnnouncer>`.
 *
 * Announces route changes to assistive technologies using the current page title.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
 */
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
/**
 * Lazy-loaded version of `<NuxtAnnouncer>`.
 *
 * Announces dynamic content changes to assistive technologies.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
 */
export const LazyNuxtAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
/**
 * Lazy-loaded version of `<NuxtImg>`.
 *
 * Renders an optimized image through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
 */
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
/**
 * Lazy-loaded version of `<NuxtPicture>`.
 *
 * Renders responsive optimized images through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
 */
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
/**
 * Lazy-loaded version of `<NuxtPage>`.
 *
 * Renders the current page from the `pages/` directory.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
 */
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
/**
 * Lazy-loaded version of `<NuxtIsland>`.
 *
 * Renders a non-interactive server component without shipping client-side JavaScript.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
 */
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
