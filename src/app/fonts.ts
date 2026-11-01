/**
 * CSS variable classes for locally supplied fonts.
 * The font binaries are owned by the site owner, under src/app/fonts/.
 * scripts/sync-fonts.mjs copies available fonts into public/fonts/ before dev/build.
 * Unlike next/font/local, a clean source checkout without these private assets
 * still builds successfully using the CSS fallback stack.
 */
export const dirooz = { variable: 'aval-dirooz-font' } as const;
export const miremad = { variable: 'aval-miremad-font' } as const;
