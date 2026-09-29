// =========================================================
// AI / TEXT TO SPEECH - BAHASA INDONESIA
// =========================================================

/**
 * Membatalkan suara AI yang sedang berjalan.
 */
export function stopIndonesianSpeech(): void {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window)
  ) {
    return;
  }

  window.speechSynthesis.cancel();
}

/**
 * Memutar suara AI dalam Bahasa Indonesia.
 *
 * muted = true  -> suara tidak dimainkan
 * muted = false -> suara dimainkan
 */
export function speakIndonesian(
  text: string,
  muted: boolean = false
): boolean {
  // -------------------------------------------------------
  // Validasi
  // -------------------------------------------------------

  if (!text || !text.trim()) {
    return false;
  }

  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window)
  ) {
    return false;
  }

  // -------------------------------------------------------
  // Jangan bicara jika voice sedang dimatikan.
  // -------------------------------------------------------

  if (muted) {
    return false;
  }

  const synth = window.speechSynthesis;

  // -------------------------------------------------------
  // Bersihkan suara sebelumnya.
  //
  // Ini hanya membatalkan TTS sebelumnya,
  // bukan background music.
  // -------------------------------------------------------

  synth.cancel();

  // -------------------------------------------------------
  // Buat utterance baru
  // -------------------------------------------------------

  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.lang = "id-ID";
  utterance.rate = 0.88;
  utterance.pitch = 1.08;
  utterance.volume = 1;

  // -------------------------------------------------------
  // Jika browser masih dalam kondisi speaking/pending,
  // beri sedikit waktu sebelum speak().
  // Ini membantu terutama setelah pindah halaman.
  // -------------------------------------------------------

  try {
    synth.speak(utterance);

    return true;
  } catch (error) {
    console.error(
      "Gagal menjalankan suara AI:",
      error
    );

    return false;
  }
}