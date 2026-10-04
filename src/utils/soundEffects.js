/**
 * Sound effects utility
 * Disabled per user request (only background music plays).
 */

class SoundEffects {
  constructor() {
    this.enabled = false;
  }

  init() {}
  toggleSound() { return false; }
  playPop() {}
  playUnlockChime() {}
  playErrorBuzzer() {}
}

export const soundManager = new SoundEffects();
