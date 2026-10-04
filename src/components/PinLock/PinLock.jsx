import React, { useState, useEffect, useMemo } from 'react';
import { BIRTHDAY_CONFIG, LOCK_SCREEN_DATA } from '../../data/birthdayContent';
import { triggerPastelConfetti, triggerHeartBurst } from '../../utils/confetti';
import { soundManager } from '../../utils/soundEffects';
import { Doodle } from '../Doodle/Doodle';
import coupleDefaultImg from '../../assets/images/couple-photo.jpg';
import duduLocalGif from '../../assets/gifs/dudu-bday.gif';
import duduAngryGif from '../../assets/gifs/dudu-angry.gif';
import bubuDuduTopGif from '../../assets/gifs/bubu-dudu-top.gif';
import './PinLock.css';

/**
 * Scalloped Flower / Petal Circle Frame SVG
 */
const ScallopedCircleFrame = ({ color = "#9775db", innerImg, alt = "Our Couple Photo" }) => {
  const petals = 18;
  const cx = 130;
  const cy = 130;
  const baseR = 100;
  const petalR = 17;

  const petalElements = [];
  for (let i = 0; i < petals; i++) {
    const angle = (2 * Math.PI * i) / petals;
    const px = cx + baseR * Math.cos(angle);
    const py = cy + baseR * Math.sin(angle);
    petalElements.push(
      <circle key={i} cx={px} cy={py} r={petalR} fill={color} />
    );
  }

  return (
    <div className="scallop-frame-container">
      <svg viewBox="0 0 260 260" className="scallop-svg" xmlns="http://www.w3.org/2000/svg">
        <g className="scallop-petals-group">
          {petalElements}
          <circle cx={cx} cy={cy} r={baseR} fill={color} />
        </g>
        <circle cx={cx} cy={cy} r={88} fill="#ffffff" />
      </svg>
      
      <div className="scallop-photo-crop">
        <img
          src={innerImg || coupleDefaultImg}
          alt={alt}
          className="scallop-inner-img"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80';
          }}
        />
      </div>
    </div>
  );
};

/**
 * Wavy Scalloped Card Border SVG Background
 */
const WavyCardBackground = () => {
  const wavyPath = useMemo(() => {
    const w = 320;
    const h = 420;
    const countX = 13;
    const countY = 17;
    const amp = 5;

    let path = "M 10 10 ";
    const stepX = (w - 20) / countX;
    const stepY = (h - 20) / countY;

    // Top edge
    for (let i = 0; i < countX; i++) {
      const x0 = 10 + i * stepX;
      const x1 = 10 + (i + 1) * stepX;
      const xm = (x0 + x1) / 2;
      path += `Q ${xm} ${10 - amp}, ${x1} 10 `;
    }

    // Right edge
    for (let i = 0; i < countY; i++) {
      const y0 = 10 + i * stepY;
      const y1 = 10 + (i + 1) * stepY;
      const ym = (y0 + y1) / 2;
      path += `Q ${w - 10 + amp} ${ym}, ${w - 10} ${y1} `;
    }

    // Bottom edge
    for (let i = 0; i < countX; i++) {
      const x0 = w - 10 - i * stepX;
      const x1 = w - 10 - (i + 1) * stepX;
      const xm = (x0 + x1) / 2;
      path += `Q ${xm} ${h - 10 + amp}, ${x1} ${h - 10} `;
    }

    // Left edge
    for (let i = 0; i < countY; i++) {
      const y0 = h - 10 - i * stepY;
      const y1 = h - 10 - (i + 1) * stepY;
      const ym = (y0 + y1) / 2;
      path += `Q ${10 - amp} ${ym}, 10 ${y1} `;
    }

    path += "Z";
    return path;
  }, []);

  return (
    <svg
      viewBox="0 0 320 420"
      preserveAspectRatio="none"
      className="wavy-card-bg-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={wavyPath}
        fill="#fff8d6"
        stroke="#8e68cf"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

/**
 * Curved Doodle Header with Letter-by-Letter Pop (Single color, no shadow)
 */
const SvgCurvedHeader = ({ text = "WRONG PASSCODE!" }) => {
  const letters = useMemo(() => text.split(""), [text]);
  const total = letters.length;

  return (
    <svg viewBox="0 0 420 130" className="curved-title-svg" xmlns="http://www.w3.org/2000/svg">
      {letters.map((char, i) => {
        // Increased angle span by ~10% (from 102 deg to 112.5 deg) for 10% wider letter spacing
        const angleDeg = -56.25 + (i * 112.5) / (total - 1);
        const angleRad = (angleDeg * Math.PI) / 180;
        const cx = 210;
        const cy = 200;
        const r = 152;
        const x = cx + r * Math.sin(angleRad);
        const y = cy - r * Math.cos(angleRad);

        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            transform={`rotate(${angleDeg}, ${x}, ${y})`}
            className="curved-doodle-letter"
            style={{ animationDelay: `${i * 55}ms` }}
          >
            {char}
          </text>
        );
      })}
    </svg>
  );
};

export const PinLock = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showWrongPasscodeScreen, setShowWrongPasscodeScreen] = useState(false);

  const maxDigits = 4;
  const keypadLayout = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '#', '0', '*'];

  // Handle digit press
  const handleDigitPress = (digit) => {
    soundManager.playPop();

    if (digit === '#') {
      setPin('');
      return;
    }

    if (digit === '*') {
      setPin((prev) => prev.slice(0, -1));
      return;
    }

    if (pin.length < maxDigits) {
      const nextPin = pin + digit;
      setPin(nextPin);

      // Auto validate on 4 digits
      if (nextPin.length === maxDigits) {
        validatePin(nextPin);
      }
    }
  };

  // Validate entered passcode
  const validatePin = (inputPin) => {
    if (inputPin === BIRTHDAY_CONFIG.PIN) {
      setIsUnlocked(true);
      soundManager.playUnlockChime();
      triggerHeartBurst();
      triggerPastelConfetti();

      setTimeout(() => {
        if (onUnlock) onUnlock();
      }, 1100);
    } else {
      // Trigger Wrong Passcode Screen
      soundManager.playErrorBuzzer();
      setShowWrongPasscodeScreen(true);
    }
  };

  // Handle Try Again from Wrong Passcode Screen
  const handleTryAgain = () => {
    soundManager.playPop();
    setPin('');
    setShowWrongPasscodeScreen(false);
  };

  // Physical keyboard support
  useEffect(() => {
    if (showWrongPasscodeScreen) {
      const handleWrongKey = (e) => {
        if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
          handleTryAgain();
        }
      };
      window.addEventListener('keydown', handleWrongKey);
      return () => window.removeEventListener('keydown', handleWrongKey);
    }

    const handleKeyDown = (e) => {
      if (isUnlocked) return;
      if (e.key >= '0' && e.key <= '9') {
        handleDigitPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDigitPress('*');
      } else if (e.key === 'Escape') {
        handleDigitPress('#');
      } else if (e.key === 'Enter') {
        if (pin.length === maxDigits) {
          validatePin(pin);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isUnlocked, showWrongPasscodeScreen]);

  const duduGifSrc = duduLocalGif || LOCK_SCREEN_DATA.duduGif;
  const duduAngrySrc = duduAngryGif || "https://media.tenor.com/D6q1qVIBMVUAAAAC/dudu-heating-bubu-angry-dudu.gif";
  const bubuDuduTopSrc = bubuDuduTopGif || "https://i.pinimg.com/originals/2b/7f/6a/2b7f6a696b49b9152f6d99c2016fd803.gif";
  const coupleImgSrc = LOCK_SCREEN_DATA.couplePhoto || coupleDefaultImg;

  return (
    <div
      className={`lock-canvas ${isUnlocked ? 'lock-screen-unlocked' : ''} ${
        showWrongPasscodeScreen ? 'plain-pink-bg' : ''
      }`}
    >
      
      {/* =========================================================
          SEPARATE WRONG PASSCODE ERROR SCREEN (Plain Pink Backdrop)
          ========================================================= */}
      {showWrongPasscodeScreen ? (
        <div className="wrong-passcode-view animate-fade-in-up">
          <div className="wrong-passcode-card">
            {/* Curved Simple Doodle Text (Single Color, No Shadow, Animating 1 by 1) */}
            <div className="wrong-header-wrapper">
              <SvgCurvedHeader text="WRONG PASSCODE!" />
            </div>

            {/* Angry Fighting Dudu GIF */}
            <div className="wrong-gif-wrapper animate-bounce-soft">
              <img
                src={duduAngrySrc}
                alt="Angry Dudu Bubu Fighting"
                className="wrong-dudu-gif"
                onError={(e) => {
                  e.target.src = "https://media.tenor.com/D6q1qVIBMVUAAAAC/dudu-heating-bubu-angry-dudu.gif";
                }}
              />
              {/* Floating Hearts near GIF matching reference */}
              <div className="wrong-gif-heart-1 animate-pulse-heart">💕</div>
              <div className="wrong-gif-heart-2 animate-float">💖</div>
            </div>

            {/* TRY AGAIN Action Button */}
            <div className="wrong-action-footer">
              <button
                type="button"
                className="btn-try-again animate-pulse-heart"
                onClick={handleTryAgain}
              >
                <span className="btn-try-again-text">TRY AGAIN</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================
           MAIN PASSCODE LOCK SCREEN
           ========================================================= */
        <>
          {/* Ambient Floating Love Doodles in Background */}
          <div className="lock-floating-doodles" aria-hidden="true">
            <div className="ambient-doodle doodle-top-left animate-float">
              <Doodle type="cupid-arrow" size={30} color="#ff5d8f" rotate={-15} />
            </div>
            <div className="ambient-doodle doodle-top-right animate-sparkle">
              <Doodle type="heart-sparkle" size={28} color="#ff477e" />
            </div>
            <div className="ambient-doodle doodle-mid-left animate-wiggle">
              <Doodle type="double-heart" size={26} color="#ff70a6" />
            </div>
            <div className="ambient-doodle doodle-mid-right animate-float-slow">
              <Doodle type="heart-envelope" size={28} color="#9775db" rotate={12} />
            </div>
            <div className="ambient-doodle doodle-bottom-right animate-pulse-heart">
              <Doodle type="heart" size={24} color="#ff5d8f" />
            </div>
            <div className="ambient-doodle doodle-sparkle-1 animate-sparkle delay-200">
              <Doodle type="sparkle" size={18} color="#ffd166" />
            </div>
            <div className="ambient-doodle doodle-sparkle-2 animate-sparkle delay-400">
              <Doodle type="sparkle" size={20} color="#ffd166" />
            </div>
          </div>

          <div className="lock-layout-wrapper">
            
            {/* Top/Left Section: Large Photo Circle + Re-positioned Headline + Love Doodles */}
            <div className="lock-left-section">
              
              <div className="lock-top-composition">
                {/* Scalloped Circle placed at top-left (~30-33% viewport height) */}
                <div className="lock-circle-anchor animate-float">
                  <ScallopedCircleFrame
                    color="#9775db"
                    innerImg={coupleImgSrc}
                    alt="Our Couple Photo"
                  />
                  <div className="circle-doodle-sparkle animate-sparkle">
                    <Doodle type="heart-sparkle" size={24} color="#ff3366" />
                  </div>
                </div>

                {/* Headline: 'unlock' on the bottom right edge of circle, rest below in big */}
                <div className="lock-headline-container">
                  <div className="headline-text-wrapper">
                    <h1 className="lock-text-unlock">{LOCK_SCREEN_DATA.titleTop}</h1>
                    <div className="headline-doodle-kiss animate-pulse-heart">
                      <Doodle type="heart" size={20} color="#ff3366" />
                    </div>
                  </div>
                  <span className="lock-text-surprise">{LOCK_SCREEN_DATA.titleBottom}</span>
                </div>
              </div>

            </div>

            {/* Bottom/Right Section: Scalloped Wavy Yellow Keypad Card with typed number display */}
            <div className="lock-right-section">
              <div className="scalloped-keypad-card">
                {/* Wavy Scalloped SVG Border & Background */}
                <WavyCardBackground />

                {/* Bubu & Dudu GIF sticker on top-left (half on box, half outside) */}
                <div className="bubu-dudu-top-sticker animate-float">
                  <img
                    src={bubuDuduTopSrc}
                    alt="Bubu and Dudu Cute Sticker"
                    className="bubu-dudu-top-img"
                    onError={(e) => {
                      e.target.src = 'https://i.pinimg.com/originals/2b/7f/6a/2b7f6a696b49b9152f6d99c2016fd803.gif';
                    }}
                  />
                </div>

                {/* Dudu GIF sticker on bottom-left (half on box, half outside) */}
                <div className="dudu-keypad-sticker animate-wiggle">
                  <div className="dudu-party-hat" />
                  <img
                    src={duduGifSrc}
                    alt="Cute Dudu Bear"
                    className="dudu-gif-img"
                    onError={(e) => {
                      e.target.src = 'https://media.tenor.com/7zBd_7wwTJgAAAAi/dudu.gif';
                    }}
                  />
                </div>

                {/* Card Corner Love Doodle */}
                <div className="keypad-card-doodle-top animate-wiggle">
                  <Doodle type="bow" size={22} color="#ff5d8f" rotate={12} />
                </div>

                {/* Content inside wavy card */}
                <div className="wavy-card-inner-content">
                  {/* Enter Passcode Header */}
                  <h2 className="passcode-header-title">{LOCK_SCREEN_DATA.passcodePrompt}</h2>

                  {/* 4 Passcode Boxes showing typed numbers */}
                  <div className="passcode-boxes-row">
                    {Array.from({ length: maxDigits }).map((_, idx) => {
                      const isFilled = idx < pin.length;
                      const digitChar = isFilled ? pin[idx] : '';
                      return (
                        <div
                          key={idx}
                          className={`passcode-box ${isFilled ? 'filled' : ''} ${
                            isUnlocked ? 'unlocked' : ''
                          }`}
                        >
                          {isFilled && (
                            <span className="passcode-typed-num">{digitChar}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Numeric Keypad Grid */}
                  <div className="passcode-keypad-grid">
                    {keypadLayout.map((keyVal, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`passcode-key-btn ${
                          keyVal === '#' || keyVal === '*' ? 'special-key' : ''
                        }`}
                        onClick={() => handleDigitPress(keyVal)}
                        aria-label={`Key ${keyVal}`}
                      >
                        <span className="key-char">{keyVal}</span>
                      </button>
                    ))}
                  </div>

                  {/* Oval Enter Button */}
                  <div className="passcode-enter-action">
                    <button
                      type="button"
                      className={`passcode-enter-pill ${
                        pin.length === maxDigits ? 'ready' : ''
                      }`}
                      onClick={() => validatePin(pin)}
                      disabled={isUnlocked}
                    >
                      {LOCK_SCREEN_DATA.buttonText}
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default PinLock;
