import React, { useEffect } from 'react';
import { triggerPastelConfetti, triggerHeartBurst } from '../../utils/confetti';
import { soundManager } from '../../utils/soundEffects';
import birthdayGirlPhoto from '../../assets/images/birthday-girl-photo.png';
import duduBubuHugGif from '../../assets/gifs/dudu-bubu-hug.gif';
import duduDancingGif from '../../assets/gifs/dudu-happy-dancing.gif';
import { Doodle } from '../Doodle/Doodle';
import './IntroLovePage.css';

/**
 * Page 1: Happy Birthday My Love
 * Exact aesthetic from reference Canva template:
 * - Arched doodle header: "HAPPY BIRTHDAY MY LOVE" in Fredoka/Chewy font
 * - Center circular couple portrait frame with pulsing heart glow
 * - Bottom bold doodle text: "I LOVE YOU"
 * - Bottom-left Happy Dancing Dudu GIF
 * - Bottom-right Bubu & Dudu Hugging GIF
 * - Interactive Next / Click Me button
 */
export const IntroLovePage = ({ onNext, onPrev }) => {
  useEffect(() => {
    // Initial celebratory pop & heart burst
    soundManager.playUnlockChime();
    triggerHeartBurst();
    triggerPastelConfetti();
  }, []);

  const handleNextClick = () => {
    soundManager.playPop();
    triggerHeartBurst();
    if (onNext) onNext();
  };

  return (
    <div className="intro-love-page">
      {/* Ambient background particles and big pink heart */}
      <div className="intro-ambient-bg" aria-hidden="true">
        {/* Big Pink Heart in Background (10% Opacity) */}
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
        {/* <div className="bg-sparkle sp-1">✨</div>
        <div className="bg-sparkle sp-2">💖</div>
        <div className="bg-sparkle sp-3">✨</div>
        <div className="bg-sparkle sp-4">💕</div> */}
      </div>

      {/* Floating Romantic Love Doodles Layer */}
      <div className="intro-love-doodles" aria-hidden="true">
        {/* Top-Left Cupid's Arrow */}
        <div className="intro-doodle id-top-left animate-float">
          <Doodle type="cupid-arrow" size={48} color="#ff477e" rotate={-15} />
        </div>

        {/* Top-Right Heart Sparkle */}
        <div className="intro-doodle id-top-right animate-sparkle">
          <Doodle type="heart-sparkle" size={42} color="#ff3366" />
        </div>

        {/* Top Sparkle Star */}
        <div className="intro-doodle id-top-sparkle animate-sparkle delay-200">
          <Doodle type="sparkle" size={32} color="#ffd166" />
        </div>

        {/* Mid-Left Double Heart */}
        <div className="intro-doodle id-mid-left animate-wiggle">
          <Doodle type="double-heart" size={42} color="#ff5d8f" rotate={12} />
        </div>

        {/* Mid-Right Heart Envelope */}
        <div className="intro-doodle id-mid-right animate-float-slow">
          <Doodle type="heart-envelope" size={42} color="#ff70a6" rotate={-10} />
        </div>

        {/* Near Photo Top-Right Flower Doodle */}
        <div className="intro-doodle id-photo-flower animate-wiggle">
          <Doodle type="flower" size={36} color="#ff85a2" />
        </div>

        {/* Near Photo Top-Left Bow Doodle */}
        <div className="intro-doodle id-photo-bow animate-wiggle delay-200">
          <Doodle type="bow" size={36} color="#ff477e" rotate={-12} />
        </div>

        {/* Bottom Sparkle Doodle */}
        <div className="intro-doodle id-bottom-sparkle animate-sparkle delay-400">
          <Doodle type="sparkle" size={30} color="#ffd166" />
        </div>
      </div>

      <div className="intro-love-content">

        {/* =========================================================
            TOP ARCHED HEADER: "HAPPY BIRTHDAY MY LOVE"
            ========================================================= */}
        <div className="intro-header-arch-wrapper">
          <svg
            viewBox="0 0 440 130"
            className="intro-arch-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path
                id="archPath"
                d="M 25,115 Q 220,15 415,115"
                fill="none"
              />
            </defs>
            <text className="intro-arch-text">
              <textPath
                href="#archPath"
                startOffset="50%"
                textAnchor="middle"
              >
                {"HAPPY BIRTHDAY MY LOVE".split("").map((char, i) => (
                  <tspan
                    key={i}
                    className="arch-letter-char"
                    style={{ animationDelay: `${i * 55}ms` }}
                  >
                    {char}
                  </tspan>
                ))}
              </textPath>
            </text>
          </svg>

          {/* Top Doodles & Sparkles matching reference */}
          <div className="arch-doodle-sparkle-left animate-sparkle">✨</div>
          <div className="arch-doodle-sparkle-center animate-pulse-heart">💕</div>
          <div className="arch-doodle-sparkle-right animate-sparkle">✨</div>
        </div>

        {/* =========================================================
            CENTER COUPLE PHOTO IN CIRCULAR FRAME
            ========================================================= */}
        <div className="intro-center-stage">
          {/* Glowing Birthday Girl Photo Circle */}
          <div className="intro-photo-circle-frame animate-float">
            <div className="intro-photo-glow-ring" />
            <div className="intro-photo-circle-inner">
              <img
                src={birthdayGirlPhoto}
                alt="Happy Birthday My Love"
                className="intro-photo-img"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
            {/* Cute mini heart badge */}
            <div className="photo-corner-heart animate-bounce-soft">💖</div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM HEADER: "I LOVE YOU"
            ========================================================= */}
        <div className="intro-bottom-text-wrapper">
          <h1 className="intro-i-love-you-text animate-pulse-heart">
            I LOVE YOU
          </h1>
        </div>

        {/* =========================================================
            BOTTOM-LEFT GIF: HAPPY DANCING DUDU
            ========================================================= */}
        <div className="intro-sticker-bottom-left animate-wiggle">
          <div className="sticker-heart-float animate-float">💕</div>
          <img
            src={duduDancingGif}
            alt="Happy Dancing Dudu"
            className="bubu-dudu-corner-sticker"
            onError={(e) => {
              e.target.src = 'https://media1.tenor.com/m/XOtYEOucXZgAAAAC/dudu-happy-dancing.gif';
            }}
          />
        </div>

        {/* =========================================================
            BOTTOM-RIGHT GIF: DUDU HUGGING BUBU
            ========================================================= */}
        <div className="intro-gif-bottom-right animate-bounce-soft">
          <div className="gif-hearts-trail">
            <span className="trail-heart th-1 animate-pulse-heart">💖</span>
            <span className="trail-heart th-2 animate-float">💕</span>
          </div>
          <img
            src={duduBubuHugGif}
            alt="Dudu Hugging Bubu"
            className="dudu-bubu-hug-img"
            onError={(e) => {
              e.target.src = 'https://media1.tenor.com/m/ivlixHuP8r0AAAAC/dudu-dudu-bubu.gif';
            }}
          />
        </div>

        {/* =========================================================
            INTERACTIVE "CLICK ME / NEXT" BUTTON (Right / Floating)
            ========================================================= */}
        <div className="intro-next-action-wrapper">
          <button
            type="button"
            className="intro-btn-next animate-pulse-heart"
            onClick={handleNextClick}
            aria-label="Go to next surprise page"
          >
            <span className="btn-next-hand">👉</span>
            <span className="btn-next-label">Next.. </span>
            <span className="btn-next-heart">💖</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default IntroLovePage;
