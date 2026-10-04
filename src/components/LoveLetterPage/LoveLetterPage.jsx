import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LOVE_LETTER_SECTION_DATA } from '../../data/birthdayContent';
import { soundManager } from '../../utils/soundEffects';
import { triggerHeartBurst, triggerPastelConfetti } from '../../utils/confetti';
import { Doodle } from '../Doodle/Doodle';
import bubuDuduHugGif from '../../assets/gifs/dudu-bubu-hug.gif';
import { FastForward, RotateCcw, ChevronRight } from 'lucide-react';
import './LoveLetterPage.css';

/**
 * LoveLetterPage
 * Minimalistic full-screen Letter-by-Letter reveal:
 * - Removed top header tag for pure focus on the letter
 * - Whitest-pink minimalistic typography directly on the deep burgundy background
 * - Full-screen layout with spacious reading room
 * - Compact bottom-right next button & controls
 */
export const LoveLetterPage = ({ onNext, onPrev }) => {
  const { letterHeader, letterBody, letterSignOff, signatureName } = LOVE_LETTER_SECTION_DATA;

  // Flatten the entire letter text into a single string with linebreaks for seamless letter-by-letter indexing
  const fullText = useMemo(() => {
    const parts = [letterHeader];
    if (letterBody && letterBody.length > 0) {
      parts.push(letterBody.join('\n\n'));
    }
    if (letterSignOff) {
      parts.push(letterSignOff);
    }
    if (signatureName) {
      parts.push(signatureName);
    }
    return parts.filter(Boolean).join('\n\n');
  }, [letterHeader, letterBody, letterSignOff, signatureName]);

  const [charIndex, setCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const textEndRef = useRef(null);

  // Typewriter effect timer
  useEffect(() => {
    if (charIndex < fullText.length) {
      const char = fullText[charIndex];
      // Vary typing speed slightly for natural rhythm (pauses on punctuation and newlines)
      let delay = 22;
      if (char === '.' || char === '!' || char === '?') delay = 180;
      else if (char === ',') delay = 90;
      else if (char === '\n') delay = 120;

      const timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      if (!isTypingComplete) {
        setIsTypingComplete(true);
        triggerHeartBurst();
        triggerPastelConfetti();
      }
    }
  }, [charIndex, fullText, isTypingComplete]);

  // Skip animation / Reveal All
  const handleSkipAnimation = () => {
    soundManager.playPop();
    setCharIndex(fullText.length);
    setIsTypingComplete(true);
    triggerPastelConfetti();
  };

  // Replay animation
  const handleReplay = () => {
    soundManager.playPop();
    setCharIndex(0);
    setIsTypingComplete(false);
  };

  const handleNextClick = () => {
    soundManager.playUnlockChime();
    triggerHeartBurst();
    triggerPastelConfetti();
    if (onNext) onNext();
  };

  // Displayed text slice
  const currentText = fullText.slice(0, charIndex);

  return (
    <div className="love-letter-page">
      
      {/* Ambient Romantic Backdrop */}
      <div className="letter-ambient-bg" aria-hidden="true">
        <div className="letter-crimson-orb-top" />
        <div className="letter-crimson-orb-center" />
        <div className="letter-crimson-orb-bottom" />
        <div className="floating-petal p-1">🌸</div>
        <div className="floating-petal p-2">💖</div>
        <div className="floating-petal p-3">✨</div>
        <div className="floating-petal p-4">🌸</div>
        <div className="floating-petal p-5">💕</div>
      </div>

      <div className="love-letter-viewport">
        
        {/* =========================================================
            FULL-SCREEN LETTER AREA (MINIMALISTIC TYPOGRAPHY)
            ========================================================= */}
        <div className="direct-letter-container animate-fade-in-up">
          
          {/* Subtle Corner Doodles */}
          <div className="letter-floating-doodle d-top-left animate-float">
            <Doodle type="sparkle" size={22} color="#ffd166" />
          </div>
          <div className="letter-floating-doodle d-bottom-left animate-wiggle">
            <Doodle type="double-heart" size={24} color="#ff477e" rotate={12} />
          </div>

          {/* Top-Right Mascot Sticker */}
          <div className="letter-mascot-corner animate-bounce-soft">
            <img
              src={bubuDuduHugGif}
              alt="Cute Mascot"
              className="letter-mascot-img"
              onError={(e) => {
                e.target.src = 'https://media1.tenor.com/m/ivlixHuP8r0AAAAC/dudu-dudu-bubu.gif';
              }}
            />
          </div>

          {/* Letter Body Scrollable Content */}
          <div className="direct-letter-scroll">
            <div className="letter-whitest-pink-text">
              {currentText}
              {!isTypingComplete && (
                <span className="typewriter-blinking-cursor">💖</span>
              )}
            </div>
            <div ref={textEndRef} />
          </div>

        </div>

        {/* =========================================================
            BOTTOM CONTROLS BAR: SKIP/REPLAY (LEFT) & COMPACT NEXT (RIGHT)
            ========================================================= */}
        <div className="letter-bottom-bar">
          {/* Left Action: Quick Read / Replay */}
          {/* <div className="letter-aux-controls">
            {!isTypingComplete ? (
              <button
                type="button"
                className="btn-letter-control"
                onClick={handleSkipAnimation}
                title="Read whole letter instantly"
              >
              
                <FastForward size={12} /> Read All
              </button>
            ) : (
              <button
                type="button"
                className="btn-letter-control"
                onClick={handleReplay}
                title="Replay typing animation"
              >
                <RotateCcw size={12} /> Replay
              </button>
            )}
          </div> */}

          {/* Small Bottom-Right Corner Next Button */}
          <button
            type="button"
            className="btn-corner-next animate-pulse-heart"
            onClick={handleNextClick}
            aria-label="Next Surprise Section"
          >
            <span className="corner-next-text">Next</span>
            <ChevronRight size={15} className="corner-next-icon" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default LoveLetterPage;
