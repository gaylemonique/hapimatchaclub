"use client";

import { useEffect } from "react";

/**
 * Components fade up once, at their own pace, as they come into view.
 *
 * Scroll-linked CSS (`animation-timeline: view()`) ties the fade to the scroll
 * wheel, so a fast scroll snaps it. Observing entry instead lets the fade play
 * at a fixed duration however the page is scrolled.
 *
 * The hidden state is applied by CSS under `html.js-reveal`, a class an inline
 * script in the layout sets before first paint — so nothing flashes in and out,
 * and if this component never mounts, that script's failsafe clears the class
 * and the page renders normally. Nothing is hidden without a way back.
 */

/** Kept in step with the matching selector list in globals.css. */
const TARGETS = [
  ".section-head",
  ".rail > *",
  ".tiles > *",
  ".band",
  ".menu-section-head",
  ".menu-list > *",
  ".wide-photo",
  ".note-card",
  ".hours-card",
  ".channel-card",
  ".contact-card",
  ".panel",
  ".site-footer",
].join(", ");

/** Children of these arrive in sequence rather than all together. */
const STAGGERED = ".rail, .tiles, .menu-list";
const STAGGER_MS = 90;
const STAGGER_CAP = 6;

export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;

    // Tell the failsafe the reveal is live, and honour a late reduced-motion switch.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      root.classList.remove("js-reveal");
      return;
    }
    window.__revealReady = true;
    root.classList.add("js-reveal");

    const seen = new WeakSet<Element>();

    // An observer only reports while the document is actually being rendered.
    // If nothing is reported at all, this page isn't painting (a screenshot
    // worker, an odd webview) — drop the hidden state rather than leave content
    // invisible. Any callback, intersecting or not, proves rendering happens.
    let sawCallback = false;
    const failsafe = window.setTimeout(() => {
      if (!sawCallback) root.classList.remove("js-reveal");
    }, 3000);

    const observer = new IntersectionObserver(
      (entries) => {
        sawCallback = true;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      // A little inset at the bottom so things reveal just after they appear.
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 },
    );

    const scan = () => {
      for (const el of document.querySelectorAll(TARGETS)) {
        if (seen.has(el)) continue;
        seen.add(el);

        const parent = el.parentElement;
        if (parent?.matches(STAGGERED)) {
          const index = Array.prototype.indexOf.call(parent.children, el);
          const step = Math.min(index, STAGGER_CAP) * STAGGER_MS;
          (el as HTMLElement).style.transitionDelay = `${step}ms`;
        }

        observer.observe(el);
      }
    };

    scan();

    // Catches everything a navigation or a menu filter adds to the page.
    const mutations = new MutationObserver(() => {
      window.clearTimeout(pending);
      pending = window.setTimeout(scan, 50);
    });
    let pending = 0;
    mutations.observe(document.body, { childList: true, subtree: true });

    const onReducedChange = () => {
      if (reduced.matches) root.classList.remove("js-reveal");
    };
    reduced.addEventListener("change", onReducedChange);

    return () => {
      window.clearTimeout(failsafe);
      window.clearTimeout(pending);
      mutations.disconnect();
      observer.disconnect();
      reduced.removeEventListener("change", onReducedChange);
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}
