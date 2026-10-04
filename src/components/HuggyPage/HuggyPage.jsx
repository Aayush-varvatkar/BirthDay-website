import React, { useEffect } from 'react';
import { triggerHeartBurst, triggerPastelConfetti } from '../../utils/confetti';
import { soundManager } from '../../utils/soundEffects';
import puuungKissGif from '../../assets/gifs/puuung-kiss.gif';
import { Doodle } from '../Doodle/Doodle';
import './HuggyPage.css';

/**
 * HuggyPage
 * Final Surprise Section:
 * - Minimalistic Heading: "Givee me Huggyy huggyyy.. 🫣🫣🫣🫣🫣🫣🫣🫣🫣 "
 * - Puuung kissing & hugging animation in the center
 * - Heartfelt messages:
 *   "I loveee youuuuuu babyyyy 🫣🫣🫣💋💋🫂🫂🫂🫂❤️❤️❤️❤️🧿🧿🧿🧿"
 *   "Once again Happyyyyy birthdayyy my loveee.. 🫣🫣🫣🫣🥳🥳🥳🥳🥳🥳🥳🥳❤️❤️❤️❤️🫶🫶🫶🫶🫂🫂🫂🫂🫂🫂🫂🫂🧿🧿🧿🧿🧿🧿🧿🧿🧿🧿🧿🧿"
 * - Bottom Center: "ALWAYS AND FOREVER.. 🥹🥹🥹🫂🫂❤️❤️🧿🧿🧿🧿🧿" (no box)
 * - Matching background (#ebdcc3)
 */
export const HuggyPage = () => {
  useEffect(() => {
    soundManager.playUnlockChime();
    triggerHeartBurst();
    triggerPastelConfetti();

    const timer = setTimeout(() => {
      triggerHeartBurst();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleScreenTap = () => {
    soundManager.playPop();
    triggerHeartBurst();
  };

  const puuungSrc = puuungKissGif || "https://i.makeagif.com/media/2-25-2017/re9Y7O.gif";

  return (
    <div className="huggy-page-container" onClick={handleScreenTap}>
      
      {/* Ambient Floating Love Doodles in Background */}
      <div className="huggy-ambient-doodles" aria-hidden="true">
        <div className="huggy-doodle hd-top-left animate-float">
          <Doodle type="cupid-arrow" size={36} color="#b85d6e" rotate={-15} />
        </div>
        <div className="huggy-doodle hd-top-right animate-sparkle">
          <Doodle type="heart-sparkle" size={34} color="#c24d62" />
        </div>
        <div className="huggy-doodle hd-mid-left animate-wiggle">
          <Doodle type="double-heart" size={32} color="#a64d5e" rotate={10} />
        </div>
        <div className="huggy-doodle hd-mid-right animate-float-slow">
          <Doodle type="heart-envelope" size={34} color="#944555" rotate={-8} />
        </div>
        <div className="huggy-doodle hd-bot-left animate-pulse-heart">
          <Doodle type="flower" size={28} color="#b86978" />
        </div>
        <div className="huggy-doodle hd-bot-right animate-sparkle delay-200">
          <Doodle type="sparkle" size={24} color="#c98a4b" />
        </div>
      </div>

      {/* Main Single-Viewport Content */}
      <main className="huggy-content-wrapper animate-fade-in-up">
        
        {/* =========================================================
            TOP HEADING: Simple & Minimalistic with 10% top margin
            ========================================================= */}
        <header className="huggy-header">
          <h1 className="huggy-heading-title">
            Givee me Huggyy huggyyy.. 🫣🫣🫣🫣🫣🫣🫣🫣🫣 
          </h1>
        </header>

        {/* =========================================================
            CENTER: PUUUNG KISSING & HUGGING GIF
            ========================================================= */}
        <section className="huggy-gif-stage">
          <div className="huggy-gif-card animate-float">
            <div className="huggy-gif-glow-ring" />
            <div className="huggy-gif-inner-frame">
              <img
                src={puuungSrc}
                alt="Puuung kissing and hugging animation"
                className="puuung-gif-img"
                onError={(e) => {
                  e.target.src = "https://i.makeagif.com/media/2-25-2017/re9Y7O.gif";
                }}
              />
            </div>
            {/* Floating heart badges */}
            <div className="huggy-badge-top-right animate-pulse-heart">💋</div>
            <div className="huggy-badge-bot-left animate-bounce-soft">🫂</div>
          </div>
        </section>

        {/* =========================================================
            TEXT SECTION: HEARTFELT MESSAGES
            ========================================================= */}
        <section className="huggy-message-section">
          <p className="huggy-love-text">
            I loveee youuuuuu babyyyy 🫣🫣🫣💋💋🫂🫂🫂🫂❤️❤️❤️❤️🧿🧿🧿🧿
          </p>

          <p className="huggy-bday-again-text">
            Once again Happyyyyy birthdayyy my loveee.. 🫣🫣🫣🫣🥳🥳🥳🥳🥳🥳🥳🥳❤️❤️❤️❤️🫶🫶🫶🫶🫂🫂🫂🫂🫂🫂🫂🫂🧿🧿🧿🧿🧿🧿🧿🧿🧿🧿🧿🧿
          </p>
        </section>

        {/* =========================================================
            BOTTOM CENTER: "ALWAYS AND FOREVER..." (Directly on bg, no box)
            ========================================================= */}
        <footer className="huggy-bottom-footer">
          <h2 className="huggy-forever-text">
            ALWAYS AND FOREVER.. 🥹🥹🥹🫂🫂❤️❤️🧿🧿🧿🧿🧿
          </h2>
        </footer>

      </main>
    </div>
  );
};

export default HuggyPage;

