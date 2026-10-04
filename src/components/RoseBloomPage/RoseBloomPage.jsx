import React, { useState, useEffect } from 'react';
import { soundManager } from '../../utils/soundEffects';
import { triggerHeartBurst, triggerPastelConfetti } from '../../utils/confetti';
import { ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import './RoseBloomPage.css';

/**
 * RoseBloomPage
 * Botanical Pure-CSS Flower & Rose Blooming Animation
 * Reference: gmpsankalpa/Flower-animation
 * - Starry night sky with glowing fireflies
 * - Growing stems, botanical leaves, and sprouting foliage
 * - Blooming glowing petals with ambient lights
 * - Romantic header & compact corner navigation
 */
export const RoseBloomPage = ({ onNext, onPrev }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [bloomKey, setBloomKey] = useState(0);

  useEffect(() => {
    // Trigger animation start
    const timer = setTimeout(() => {
      setIsLoaded(true);
      soundManager.playUnlockChime();
    }, 150);

    // Celebratory sparkles when flowers finish blooming (~4s)
    const celebrationTimer = setTimeout(() => {
      triggerHeartBurst();
    }, 4200);

    return () => {
      clearTimeout(timer);
      clearTimeout(celebrationTimer);
    };
  }, [bloomKey]);

  // Replay bloom animation
  const handleReplay = () => {
    soundManager.playPop();
    setIsLoaded(false);
    setBloomKey((prev) => prev + 1);
  };

  const handleNextClick = () => {
    soundManager.playUnlockChime();
    triggerHeartBurst();
    triggerPastelConfetti();
    if (onNext) onNext();
  };

  return (
    <div key={bloomKey} className={`rose-bloom-page ${!isLoaded ? 'not-loaded' : ''}`}>
      
      {/* Night Sky Backdrop */}
      <div className="night" aria-hidden="true" />

      {/* Floating Romantic Header */}
      <div className="rose-header-wrapper animate-fade-in-up">
        <h1 className="rose-bloom-title">
          Just for You, My Love
        </h1>
        <p className="rose-bloom-subtitle">
          <Sparkles size={14} className="sparkle-inline" />
          <span>Like these flowers, my love for you blooms forever</span>
          <Sparkles size={14} className="sparkle-inline" />
        </p>
      </div>

      {/* =========================================================
          BOTANICAL FLOWER BLOOM STAGE
          ========================================================= */}
      <div className="flowers" aria-hidden="true">
        
        {/* Flower 1 (Center) */}
        <div className="flower flower--1">
          <div className="flower__leafs flower__leafs--1">
            <div className="flower__leaf flower__leaf--1" />
            <div className="flower__leaf flower__leaf--2" />
            <div className="flower__leaf flower__leaf--3" />
            <div className="flower__leaf flower__leaf--4" />
            <div className="flower__white-circle" />

            <div className="flower__light flower__light--1" />
            <div className="flower__light flower__light--2" />
            <div className="flower__light flower__light--3" />
            <div className="flower__light flower__light--4" />
            <div className="flower__light flower__light--5" />
            <div className="flower__light flower__light--6" />
            <div className="flower__light flower__light--7" />
            <div className="flower__light flower__light--8" />
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1" />
            <div className="flower__line__leaf flower__line__leaf--2" />
            <div className="flower__line__leaf flower__line__leaf--3" />
            <div className="flower__line__leaf flower__line__leaf--4" />
            <div className="flower__line__leaf flower__line__leaf--5" />
            <div className="flower__line__leaf flower__line__leaf--6" />
          </div>
        </div>

        {/* Flower 2 (Right) */}
        <div className="flower flower--2">
          <div className="flower__leafs flower__leafs--2">
            <div className="flower__leaf flower__leaf--1" />
            <div className="flower__leaf flower__leaf--2" />
            <div className="flower__leaf flower__leaf--3" />
            <div className="flower__leaf flower__leaf--4" />
            <div className="flower__white-circle" />

            <div className="flower__light flower__light--1" />
            <div className="flower__light flower__light--2" />
            <div className="flower__light flower__light--3" />
            <div className="flower__light flower__light--4" />
            <div className="flower__light flower__light--5" />
            <div className="flower__light flower__light--6" />
            <div className="flower__light flower__light--7" />
            <div className="flower__light flower__light--8" />
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1" />
            <div className="flower__line__leaf flower__line__leaf--2" />
            <div className="flower__line__leaf flower__line__leaf--3" />
            <div className="flower__line__leaf flower__line__leaf--4" />
          </div>
        </div>

        {/* Flower 3 (Left) */}
        <div className="flower flower--3">
          <div className="flower__leafs flower__leafs--3">
            <div className="flower__leaf flower__leaf--1" />
            <div className="flower__leaf flower__leaf--2" />
            <div className="flower__leaf flower__leaf--3" />
            <div className="flower__leaf flower__leaf--4" />
            <div className="flower__white-circle" />

            <div className="flower__light flower__light--1" />
            <div className="flower__light flower__light--2" />
            <div className="flower__light flower__light--3" />
            <div className="flower__light flower__light--4" />
            <div className="flower__light flower__light--5" />
            <div className="flower__light flower__light--6" />
            <div className="flower__light flower__light--7" />
            <div className="flower__light flower__light--8" />
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1" />
            <div className="flower__line__leaf flower__line__leaf--2" />
            <div className="flower__line__leaf flower__line__leaf--3" />
            <div className="flower__line__leaf flower__line__leaf--4" />
          </div>
        </div>

        {/* Botanical Stems & Foliage */}
        <div className="grow-ans" style={{ '--d': '1.2s' }}>
          <div className="flower__g-long">
            <div className="flower__g-long__top" />
            <div className="flower__g-long__bottom" />
          </div>
        </div>

        <div className="growing-grass">
          <div className="flower__grass flower__grass--1">
            <div className="flower__grass--top" />
            <div className="flower__grass--bottom" />
            <div className="flower__grass__leaf flower__grass__leaf--1" />
            <div className="flower__grass__leaf flower__grass__leaf--2" />
            <div className="flower__grass__leaf flower__grass__leaf--3" />
            <div className="flower__grass__leaf flower__grass__leaf--4" />
            <div className="flower__grass__leaf flower__grass__leaf--5" />
            <div className="flower__grass__leaf flower__grass__leaf--6" />
            <div className="flower__grass__leaf flower__grass__leaf--7" />
            <div className="flower__grass__leaf flower__grass__leaf--8" />
            <div className="flower__grass__overlay" />
          </div>
        </div>

        <div className="growing-grass">
          <div className="flower__grass flower__grass--2">
            <div className="flower__grass--top" />
            <div className="flower__grass--bottom" />
            <div className="flower__grass__leaf flower__grass__leaf--1" />
            <div className="flower__grass__leaf flower__grass__leaf--2" />
            <div className="flower__grass__leaf flower__grass__leaf--3" />
            <div className="flower__grass__leaf flower__grass__leaf--4" />
            <div className="flower__grass__leaf flower__grass__leaf--5" />
            <div className="flower__grass__leaf flower__grass__leaf--6" />
            <div className="flower__grass__leaf flower__grass__leaf--7" />
            <div className="flower__grass__leaf flower__grass__leaf--8" />
            <div className="flower__grass__overlay" />
          </div>
        </div>

        <div className="grow-ans" style={{ '--d': '2.4s' }}>
          <div className="flower__g-right flower__g-right--1">
            <div className="leaf" />
          </div>
        </div>

        <div className="grow-ans" style={{ '--d': '2.8s' }}>
          <div className="flower__g-right flower__g-right--2">
            <div className="leaf" />
          </div>
        </div>

        <div className="grow-ans" style={{ '--d': '2.8s' }}>
          <div className="flower__g-front">
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1">
              <div className="flower__g-front__leaf" />
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2">
              <div className="flower__g-front__leaf" />
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3">
              <div className="flower__g-front__leaf" />
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4">
              <div className="flower__g-front__leaf" />
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5">
              <div className="flower__g-front__leaf" />
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6">
              <div className="flower__g-front__leaf" />
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7">
              <div className="flower__g-front__leaf" />
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8">
              <div className="flower__g-front__leaf" />
            </div>
            <div className="flower__g-front__line" />
          </div>
        </div>

        <div className="grow-ans" style={{ '--d': '3.2s' }}>
          <div className="flower__g-fr">
            <div className="leaf" />
            <div className="flower__g-fr__leaf flower__g-fr__leaf--1" />
            <div className="flower__g-fr__leaf flower__g-fr__leaf--2" />
            <div className="flower__g-fr__leaf flower__g-fr__leaf--3" />
            <div className="flower__g-fr__leaf flower__g-fr__leaf--4" />
            <div className="flower__g-fr__leaf flower__g-fr__leaf--5" />
            <div className="flower__g-fr__leaf flower__g-fr__leaf--6" />
            <div className="flower__g-fr__leaf flower__g-fr__leaf--7" />
            <div className="flower__g-fr__leaf flower__g-fr__leaf--8" />
          </div>
        </div>

        {/* Tall Background Grass Sprigs */}
        <div className="long-g long-g--0">
          <div className="grow-ans" style={{ '--d': '3s' }}><div className="leaf leaf--0" /></div>
          <div className="grow-ans" style={{ '--d': '2.2s' }}><div className="leaf leaf--1" /></div>
          <div className="grow-ans" style={{ '--d': '3.4s' }}><div className="leaf leaf--2" /></div>
          <div className="grow-ans" style={{ '--d': '3.6s' }}><div className="leaf leaf--3" /></div>
        </div>

        <div className="long-g long-g--1">
          <div className="grow-ans" style={{ '--d': '3.6s' }}><div className="leaf leaf--0" /></div>
          <div className="grow-ans" style={{ '--d': '3.8s' }}><div className="leaf leaf--1" /></div>
          <div className="grow-ans" style={{ '--d': '4s' }}><div className="leaf leaf--2" /></div>
          <div className="grow-ans" style={{ '--d': '4.2s' }}><div className="leaf leaf--3" /></div>
        </div>

        <div className="long-g long-g--2">
          <div className="grow-ans" style={{ '--d': '4s' }}><div className="leaf leaf--0" /></div>
          <div className="grow-ans" style={{ '--d': '4.2s' }}><div className="leaf leaf--1" /></div>
          <div className="grow-ans" style={{ '--d': '4.4s' }}><div className="leaf leaf--2" /></div>
          <div className="grow-ans" style={{ '--d': '4.6s' }}><div className="leaf leaf--3" /></div>
        </div>

        <div className="long-g long-g--3">
          <div className="grow-ans" style={{ '--d': '4s' }}><div className="leaf leaf--0" /></div>
          <div className="grow-ans" style={{ '--d': '4.2s' }}><div className="leaf leaf--1" /></div>
          <div className="grow-ans" style={{ '--d': '3s' }}><div className="leaf leaf--2" /></div>
          <div className="grow-ans" style={{ '--d': '3.6s' }}><div className="leaf leaf--3" /></div>
        </div>

        <div className="long-g long-g--4">
          <div className="grow-ans" style={{ '--d': '4s' }}><div className="leaf leaf--0" /></div>
          <div className="grow-ans" style={{ '--d': '4.2s' }}><div className="leaf leaf--1" /></div>
          <div className="grow-ans" style={{ '--d': '3s' }}><div className="leaf leaf--2" /></div>
          <div className="grow-ans" style={{ '--d': '3.6s' }}><div className="leaf leaf--3" /></div>
        </div>

        <div className="long-g long-g--5">
          <div className="grow-ans" style={{ '--d': '4s' }}><div className="leaf leaf--0" /></div>
          <div className="grow-ans" style={{ '--d': '4.2s' }}><div className="leaf leaf--1" /></div>
          <div className="grow-ans" style={{ '--d': '3s' }}><div className="leaf leaf--2" /></div>
          <div className="grow-ans" style={{ '--d': '3.6s' }}><div className="leaf leaf--3" /></div>
        </div>

        <div className="long-g long-g--6">
          <div className="grow-ans" style={{ '--d': '4.2s' }}><div className="leaf leaf--0" /></div>
          <div className="grow-ans" style={{ '--d': '4.4s' }}><div className="leaf leaf--1" /></div>
          <div className="grow-ans" style={{ '--d': '4.6s' }}><div className="leaf leaf--2" /></div>
          <div className="grow-ans" style={{ '--d': '4.8s' }}><div className="leaf leaf--3" /></div>
        </div>

        <div className="long-g long-g--7">
          <div className="grow-ans" style={{ '--d': '3s' }}><div className="leaf leaf--0" /></div>
          <div className="grow-ans" style={{ '--d': '3.2s' }}><div className="leaf leaf--1" /></div>
          <div className="grow-ans" style={{ '--d': '3.5s' }}><div className="leaf leaf--2" /></div>
          <div className="grow-ans" style={{ '--d': '3.6s' }}><div className="leaf leaf--3" /></div>
        </div>

      </div>

      {/* =========================================================
          BOTTOM BAR: REPLAY (LEFT) & COMPACT NEXT (RIGHT)
          ========================================================= */}
      <div className="rose-bottom-controls">
        <button
          type="button"
          className="btn-rose-replay"
          onClick={handleReplay}
          title="Watch the flowers bloom again"
        >
          <RotateCcw size={13} />
          <span>Rebloom</span>
        </button>

        <button
          type="button"
          className="btn-rose-corner-next animate-pulse-heart"
          onClick={handleNextClick}
          aria-label="Go to next surprise"
        >
          <span className="btn-rose-next-text">Next Surprise</span>
          <ChevronRight size={15} className="btn-rose-next-icon" />
        </button>
      </div>

    </div>
  );
};

export default RoseBloomPage;
