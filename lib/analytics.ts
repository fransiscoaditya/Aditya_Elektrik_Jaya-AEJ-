/**
 * AEJ Conversion Analytics
 *
 * Lightweight event tracker. Fires to:
 *   1. console (always — for debugging)
 *   2. window.dataLayer (if GA4 / GTM is loaded)
 *
 * To connect Google Analytics 4:
 *   - Add gtag script to app/layout.tsx
 *   - All events will auto-flow into GA4 via dataLayer
 *
 * Events:
 *   whatsapp_click  — source: hero | header | product | location | faq | final_cta
 *   product_view    — when mobile accordion opens
 *   search_product  — when user types in search bar
 *   filter_category — when category filter changes
 *   maps_click      — when user clicks Google Maps
 *   category_click  — when category tile is clicked
 *   faq_open        — when FAQ item is expanded
 */

type TrackEventName =
  | "whatsapp_click"
  | "product_view"
  | "search_product"
  | "filter_category"
  | "maps_click"
  | "category_click"
  | "faq_open"
  | "page_view";

type TrackEventParams = Record<string, string | number | boolean | undefined>;

export function track(event: TrackEventName, params?: TrackEventParams): void {
  // Always log in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[AEJ:track] ${event}`, params ?? {});
  }

  // Push to dataLayer for GA4 / GTM integration
  if (typeof window !== "undefined") {
    const w = window as Window & { dataLayer?: object[]; gtag?: (...args: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event,
      ...params,
      timestamp: new Date().toISOString(),
    });

    // If gtag is loaded directly (without GTM)
    if (typeof w.gtag === "function") {
      w.gtag("event", event, params ?? {});
    }
  }
}

// ─── Typed helpers for common events ────────────────────────────

/** Track a WhatsApp CTA click with its source location */
export function trackWhatsApp(
  source:
    | "hero"
    | "header"
    | "header_mobile"
    | "product"
    | "location"
    | "faq"
    | "final_cta"
    | "drawer",
  productName?: string
) {
  track("whatsapp_click", { source, product_name: productName });
}

/** Track when a product detail is opened (mobile accordion) */
export function trackProductView(productId: string, productName: string, category: string) {
  track("product_view", { product_id: productId, product_name: productName, category });
}

/** Track a search query (debounced at call site) */
export function trackSearch(query: string, resultCount: number) {
  track("search_product", { query, result_count: resultCount });
}

/** Track category filter selection */
export function trackFilterCategory(category: string) {
  track("filter_category", { category });
}

/** Track Google Maps click */
export function trackMapsClick(source: "store_section" | "final_cta" | "header") {
  track("maps_click", { source });
}

/** Track category tile click */
export function trackCategoryClick(category: string) {
  track("category_click", { category });
}

/** Track FAQ item open */
export function trackFaqOpen(questionId: string) {
  track("faq_open", { question_id: questionId });
}
