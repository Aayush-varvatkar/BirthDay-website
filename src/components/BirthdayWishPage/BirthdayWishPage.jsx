import React, { useState } from 'react';
import { triggerPastelConfetti, triggerHeartBurst } from '../../utils/confetti';
import { soundManager } from '../../utils/soundEffects';
import { Doodle } from '../Doodle/Doodle';
import duduBdayGif from '../../assets/gifs/dudu-bday.gif';
import bubuDuduHugGif from '../../assets/gifs/dudu-bubu-hug.gif';
import './BirthdayWishPage.css';

/**
 * Page 2: Birthday Wish Page
 * Interactive Cake & Candle blowout with Canva scrapbook aesthetic
 */
export const BirthdayWishPage = ({ onNext, onPrev }) => {
  const [candleLit, setCandleLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandle = () => {
    if (!candleLit) return;
    soundManager.playUnlockChime();
    setCandleLit(false);
    setWishMade(true);
    triggerHeartBurst();
    triggerPastelConfetti();
  };

  const handleRelight = (e) => {
    e.stopPropagation();
    soundManager.playPop();
    setCandleLit(true);
    setWishMade(false);
  };

  const handleNextClick = () => {
    soundManager.playPop();
    triggerHeartBurst();
    if (onNext) onNext();
  };

  return (
    <div className="birthday-wish-page">
      {/* Ambient background particles & big pink heart */}
      <div className="wish-ambient-bg" aria-hidden="true">
        <div className="bg-big-pink-heart animate-pulse-heart">
          <svg
            viewBox="0 0 512 512"
            className="big-pink-heart-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
              fill="#ff477e"
            />
          </svg>
        </div>
      </div>

      {/* Floating Love Doodles */}
      <div className="wish-doodles-layer" aria-hidden="true">
        <div className="wish-doodle wd-top-left animate-float">
          <Doodle type="cupid-arrow" size={44} color="#ff477e" rotate={-15} />
        </div>
        <div className="wish-doodle wd-top-right animate-sparkle">
          <Doodle type="heart-sparkle" size={40} color="#ff3366" />
        </div>
        <div className="wish-doodle wd-mid-left animate-wiggle">
          <Doodle type="double-heart" size={38} color="#ff5d8f" rotate={12} />
        </div>
        <div className="wish-doodle wd-mid-right animate-float-slow">
          <Doodle type="heart-envelope" size={40} color="#ff70a6" rotate={-10} />
        </div>
        <div className="wish-doodle wd-bottom-sparkle animate-sparkle delay-200">
          <Doodle type="sparkle" size={28} color="#ffd166" />
        </div>
      </div>

      <div className="wish-page-content">
        
        {/* =========================================================
            HEADER: "MAKE A WISH!"
            ========================================================= */}
        <div className="wish-header-container animate-fade-in-up">
          <h1 className="wish-title-main">
            MAKE A WISH! 🎂
          </h1>
          <p className="wish-subtitle">
            {candleLit ? "Close your eyes & tap the cake to blow the candle ✨" : "✨ Your wish is sent to the stars! ✨"}
          </p>
        </div>

        {/* =========================================================
            CENTER: INTERACTIVE BIRTHDAY CAKE & BUBU/DUDU
            ========================================================= */}
        <div className="wish-cake-stage">
          
          {/* Cake Glow Backdrop */}
          <div className={`cake-glow-backdrop ${candleLit ? 'glowing' : ''}`} />

          {/* Interactive Birthday Cake SVG */}
          <div
            className={`wish-cake-interactive ${candleLit ? 'animate-bounce-soft' : ''}`}
            onClick={handleBlowCandle}
            role="button"
            tabIndex={0}
            aria-label="Birthday cake - click to blow candle"
          >
            <svg viewBox="0 0 160 160" className="wish-cake-svg" width={160} height={160}>
              {/* Plate */}
              <ellipse cx="80" cy="144" rx="70" ry="11" fill="#f1f3f5" stroke="#4a3443" strokeWidth="3" />

              {/* Cake Bottom Layer */}
              <rect x="25" y="92" width="110" height="44" rx="6" fill="#ffb4a2" stroke="#4a3443" strokeWidth="3.5" />
              {/* Bottom Layer Drippings */}
              <path
                d="M25 92 Q35 106 45 92 Q55 106 65 92 Q75 106 85 92 Q95 106 105 92 Q115 106 125 92 Q130 106 135 92 L135 88 L25 88 Z"
                fill="#fff9fb"
              />
              {/* Bottom Layer Sprinkles */}
              <circle cx="45" cy="115" r="2.5" fill="#ff6b8b" />
              <circle cx="75" cy="120" r="2.5" fill="#ffd166" />
              <circle cx="105" cy="112" r="2.5" fill="#4dabf7" />
              <circle cx="120" cy="122" r="2.5" fill="#69db7c" />

              {/* Cake Top Layer */}
              <rect x="40" y="60" width="80" height="34" rx="5" fill="#ffd166" stroke="#4a3443" strokeWidth="3.5" />
              {/* Top Layer Drippings */}
              <path
                d="M40 60 Q50 72 60 60 Q70 72 80 60 Q90 72 100 60 Q110 72 120 60 L120 56 L40 56 Z"
                fill="#ffffff"
              />
              {/* Top Layer Sprinkles */}
              <circle cx="58" cy="78" r="2" fill="#ff6b8b" />
              <circle cx="80" cy="82" r="2" fill="#ff922b" />
              <circle cx="102" cy="76" r="2" fill="#74c0fc" />

              {/* Strawberry / Cherry on Top */}
              <circle cx="80" cy="52" r="7" fill="#ff4d79" stroke="#4a3443" strokeWidth="2.5" />
              <path d="M80 45 Q84 40 88 42" stroke="#40c057" strokeWidth="2" fill="none" strokeLinecap="round" />

              {/* Candle */}
              <rect x="76.5" y="24" width="7" height="26" rx="2" fill="#d0bfff" stroke="#4a3443" strokeWidth="2" />
              {/* Candle Stripes */}
              <line x1="77" y1="32" x2="83" y2="29" stroke="#9775db" strokeWidth="2" />
              <line x1="77" y1="42" x2="83" y2="39" stroke="#9775db" strokeWidth="2" />

              {/* Candle Wick */}
              <line x1="80" y1="24" x2="80" y2="18" stroke="#4a3443" strokeWidth="2" strokeLinecap="round" />

              {/* Candle Flame (Interactive) */}
              {candleLit ? (
                <g className="wish-flame-group animate-pulse-heart">
                  <path
                    d="M80 3 Q88 10 80 18 Q72 10 80 3 Z"
                    fill="#ff922b"
                    filter="drop-shadow(0 0 6px #ffd43b)"
                  />
                  <path
                    d="M80 7 Q84 12 80 16 Q76 12 80 7 Z"
                    fill="#ffe066"
                  />
                </g>
              ) : (
                /* Smoke curls when blown out */
                <g className="wish-smoke-group animate-fade-in-up">
                  <path
                    d="M80 16 Q85 11 80 7 Q75 3 81 0"
                    fill="none"
                    stroke="#adb5bd"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </g>
              )}
            </svg>
          </div>

          {/* Interactive Tap Hint / Wish Granted Banner */}
          {candleLit ? (
            <div className="wish-tap-hint animate-pulse-heart">
              <span>🎂 Tap cake to blow candle! 💨</span>
            </div>
          ) : (
            <div className="wish-granted-badge animate-sticker-pop">
              <span className="wish-granted-main">🎉 WISH GRANTED! 💖</span>
              <span className="wish-granted-sub">May all your sweetest dreams come true!</span>
              <button
                type="button"
                className="wish-relight-link"
                onClick={handleRelight}
              >
                🔄 Relight candle
              </button>
            </div>
          )}

          {/* Cute Corner Dudu GIF */}
          <div className="wish-mascot-corner animate-wiggle">
            <img
              src={wishMade ? bubuDuduHugGif : duduBdayGif}
              alt="Cute Mascot"
              className="wish-mascot-img"
              onError={(e) => {
                e.target.src = 'https://media.tenor.com/7zBd_7wwTJgAAAAi/dudu.gif';
              }}
            />
          </div>
        </div>

        {/* =========================================================
            BOTTOM: NEXT BUTTON
            ========================================================= */}
        <div className="wish-bottom-action-wrapper">
          <button
            type="button"
            className={`wish-btn-next ${!candleLit ? 'animate-pulse-heart active' : ''}`}
            onClick={handleNextClick}
            aria-label="Go to surprise page"
          >
            <span className="btn-next-hand">👉</span>
            <span className="btn-next-label">Next Surprise..</span>
            <span className="btn-next-heart">💖</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default BirthdayWishPage;
