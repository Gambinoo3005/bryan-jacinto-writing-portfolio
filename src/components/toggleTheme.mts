import { setTheme } from "./Header.astro.0.mts";

export function toggleTheme() {
const d = document.documentElement;
setTheme(!d.classList.contains("dark"));
}
