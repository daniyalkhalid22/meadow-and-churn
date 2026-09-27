/**
 * Localization scaffold for Meadow & Churn.
 *
 * This module is intentionally not wired into the app during Task 1.
 * Locale loading and translation lookup can be added in a later task without
 * changing the entry point.
 */
export const supportedLocales = ['en', 'ur'] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = 'en';