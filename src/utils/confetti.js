import confetti from 'canvas-confetti';

/**
 * Romantic Pastel Confetti Cannon
 */
export const triggerPastelConfetti = () => {
  const count = 120;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#ff6b8b', '#ffa4b6', '#c499f3', '#ffb4a2', '#ffe066', '#a8e6cf', '#ffffff'],
    disableForReducedMotion: true,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

/**
 * Cute Heart Blast (Unlock celebration)
 */
export const triggerHeartBurst = () => {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#ff6b8b', '#ff8da1', '#f06292', '#ba68c8', '#ffd54f'];

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 25 * (timeLeft / duration);

    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors,
      scalar: 1.1,
    });
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors,
      scalar: 1.1,
    });
  }, 250);
};
