import React, { useState } from 'react';
import { triggerPastelConfetti, triggerHeartBurst } from '../../utils/confetti';
import { soundManager } from '../../utils/soundEffects';
import { Doodle } from '../Doodle/Doodle';
import duduRoseGiftGif from '../../assets/gifs/dudu-rose-bubu-gift.gif';
import './SurpriseAskPage.css';

/**
 * Page: "I made something special for u / do u wanna see it?"
 * Exact aesthetic from Canva template reference:
 * - Headline: "I made something special for u / do u wanna see it?" in Fredoka/Chewy font
 * - Center: Bubu popping out of gift box with Dudu in party hat GIF
 * - Bottom: Big "YES" and "NO" pill buttons with playful interactive behavior
 */
export const SurpriseAskPage = ({ onYes, onNext, onPrev }) => {
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [playfulMessage, setPlayfulMessage] = useState('');

  const playfulMessages = [
    'Are you sure? 🥺',
    'Wrong button silly! 💕',
    'Think again! 🎁',
    'You know you wanna see it! 😜',
    'No is not an option! 💖',
    'Look at how big YES is now! 🥰',
  ];

  // Handle YES click
  const handleYesClick = () => {
    soundManager.playUnlockChime();
    triggerHeartBurst();
    triggerPastelConfetti();
    if (onYes) {
      onYes();
    } else if (onNext) {
      onNext();
    }
  };

  // Playful dodge when trying to click NO
  const handleNoInteraction = () => {
    soundManager.playPop();
    const nextCount = noCount + 1;
    setNoCount(nextCount);
    setPlayfulMessage(playfulMessages[(nextCount - 1) % playfulMessages.length]);

    // Random gentle dodge offset
    const randomX = (Math.random() - 0.5) * 120;
    const randomY = (Math.random() - 0.5) * 60;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  return (
    <div className="surprise-ask-page">
      {/* Ambient background particles & big pink heart */}
      <div className="surprise-ambient-bg" aria-hidden="true">
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
        <div className="bg-sparkle sp-1">✨</div>
        <div className="bg-sparkle sp-2">💖</div>
        <div className="bg-sparkle sp-3">✨</div>
        <div className="bg-sparkle sp-4">💕</div>
      </div>

      {/* Love Doodles Layer */}
      <div className="surprise-doodles-layer" aria-hidden="true">
        <div className="surprise-doodle sd-top-left animate-float">
          <Doodle type="cupid-arrow" size={44} color="#ff477e" rotate={-15} />
        </div>
        <div className="surprise-doodle sd-top-right animate-sparkle">
          <Doodle type="heart-sparkle" size={40} color="#ff3366" />
        </div>
        <div className="surprise-doodle sd-mid-left animate-wiggle">
          <Doodle type="double-heart" size={38} color="#ff5d8f" rotate={10} />
        </div>
        <div className="surprise-doodle sd-mid-right animate-float-slow">
          <Doodle type="heart-envelope" size={40} color="#ff70a6" rotate={-12} />
        </div>
        <div className="surprise-doodle sd-bottom-sparkle animate-sparkle delay-200">
          <Doodle type="sparkle" size={28} color="#ffd166" />
        </div>
      </div>

      <div className="surprise-ask-content">
        
        {/* =========================================================
            HEADER: "I made something special for u / do u wanna see it?"
            ========================================================= */}
        <div className="surprise-header-container animate-fade-in-up">
          <h1 className="surprise-title-main">
            I made something special for u
          </h1>
          <h2 className="surprise-title-sub">
            do u wanna see it?
          </h2>
        </div>

        {/* =========================================================
            CENTER: BUBU IN GIFT BOX & DUDU IN PARTY HAT GIF
            ========================================================= */}
        <div className="surprise-gif-stage animate-bounce-soft">
          <div className="gift-box-glow-backdrop" />
          <img
            src={duduRoseGiftGif}
            alt="Dudu giving rose and gift to Bubu with birthday crown"
            className="surprise-bubu-dudu-gif"
            onError={(e) => {
              e.target.src = 'https://media1.tenor.com/m/hqNhzsaWr5AAAAAC/dudu-rose-bubu-dudu-gift.gif';
            }}
          />
          {/* Cute floating hearts around gift box */}
          <div className="gift-heart-float-1 animate-pulse-heart">🎁</div>
          <div className="gift-heart-float-2 animate-float">💕</div>
        </div>

        {/* Playful alert message when user tries to tap NO */}
        {playfulMessage && (
          <div className="playful-bubble-tooltip animate-sticker-pop">
            <span>{playfulMessage}</span>
          </div>
        )}

        {/* =========================================================
            BOTTOM: BIG "YES" AND "NO" BUTTONS
            ========================================================= */}
        <div className="surprise-buttons-row">
          {/* Big Orange YES Button */}
          <button
            type="button"
            className="btn-surprise-yes animate-pulse-heart"
            style={{
              transform: `scale(${1 + Math.min(noCount * 0.12, 0.45)})`,
              zIndex: 20 + noCount,
            }}
            onClick={handleYesClick}
            aria-label="Yes, show me the surprise"
          >
            <span className="btn-surprise-text">YES</span>
          </button>

          {/* Big Coral-Red NO Button */}
          <button
            type="button"
            className="btn-surprise-no"
            style={{
              transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
              opacity: Math.max(0.35, 1 - noCount * 0.15),
            }}
            onClick={handleNoInteraction}
            onMouseEnter={handleNoInteraction}
            onTouchStart={handleNoInteraction}
            aria-label="No, do not show me"
          >
            <span className="btn-surprise-text">NO</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SurpriseAskPage;
