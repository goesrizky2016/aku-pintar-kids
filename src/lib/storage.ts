export const STORAGE_KEYS = {
  profile: "aku_pintar_profile",
  progress: "aku_pintar_progress",
  stars: "aku_pintar_stars",
  muted: "aku_pintar_audio_muted",
};

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : (JSON.parse(value) as T);
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
