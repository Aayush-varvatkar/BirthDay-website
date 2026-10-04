import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SPECIAL_MEMORIES_DATA } from '../../data/birthdayContent';
import { soundManager } from '../../utils/soundEffects';
import { triggerHeartBurst, triggerPastelConfetti } from '../../utils/confetti';
import memoryPhoto1 from '../../assets/images/memories/memory-1.png';
import memoryPhoto2 from '../../assets/images/memories/memory-2.png';
import memoryPhoto3 from '../../assets/images/memories/memory-3.jpg';
import memoryPhoto4 from '../../assets/images/memories/memory-4.png';
import memoryPhoto5 from '../../assets/images/memories/memory-5.png';
import { ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';
import './SpecialMemoriesPage.css';

const localMemories = [
  { id: 'mem-1', img: memoryPhoto1, caption: 'That radiant smile ✨' },
  { id: 'mem-2', img: memoryPhoto2, caption: 'Late-night video calls 🌙' },
  { id: 'mem-3', img: memoryPhoto3, caption: 'Coziest moments with you 💖' },
  { id: 'mem-4', img: memoryPhoto4, caption: 'Being our silly selves 🤪' },
  { id: 'mem-5', img: memoryPhoto5, caption: 'My favorite face forever 💕' },
];

/**
 * SpecialMemoriesPage
 * Romantic 3D Coverflow Carousel matching the reference design:
 * - Deep dark crimson / burgundy aesthetic
 * - Elegant serif header: "Special Memories" with "Swipe for more ✦"
 * - 3D Coverflow photo carousel with swipe, drag, side previews, and dot indicators
 * - Bottom glowing ruby glassmorphic Letter button ("✎ ... MESSAGE")
 */
export const SpecialMemoriesPage = ({ onOpenLetter, onNext, onPrev }) => {
  const photos = localMemories;
  const [currentIndex, setCurrentIndex] = useState(2); // Center on middle photo
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDeltaX, setDragDeltaX] = useState(0);

  const containerRef = useRef(null);

  // Navigate to slide
  const goToSlide = useCallback((index) => {
    soundManager.playPop();
    let target = index;
    if (target < 0) target = photos.length - 1;
    if (target >= photos.length) target = 0;
    setCurrentIndex(target);
  }, [photos.length]);

  const handleNextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const handlePrevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide]);

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragDeltaX(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDragDeltaX(currentX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDeltaX < -45) {
      handleNextSlide();
    } else if (dragDeltaX > 45) {
      handlePrevSlide();
    }
    setDragDeltaX(0);
  };

  // Mouse Drag Handlers for Desktop
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragDeltaX(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setDragDeltaX(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDeltaX < -45) {
      handleNextSlide();
    } else if (dragDeltaX > 45) {
      handlePrevSlide();
    }
    setDragDeltaX(0);
  };

  // State for the cinematic floating & expanding heart transition
  const [heartAnimStage, setHeartAnimStage] = useState(null); // 'rising' | 'expanding' | null

  // Handle Letter Button Click with rising & expanding heart animation
  const handleLetterClick = () => {
    if (heartAnimStage) return; // Prevent double trigger
    soundManager.playPop();
    setHeartAnimStage('rising');

    // Stage 2: Heart reaches center and expands to fill screen
    setTimeout(() => {
      setHeartAnimStage('expanding');
      soundManager.playUnlockChime();
      triggerHeartBurst();
      triggerPastelConfetti();
    }, 1200);

    // Stage 3: Full transition to Love Letter Page
    setTimeout(() => {
      if (onOpenLetter) {
        onOpenLetter();
      } else if (onNext) {
        onNext();
      }
    }, 2100);
  };

  return (
    <div className="special-memories-page">
      
      {/* Deep Burgundy & Velvet Aura Background */}
      <div className="memories-ambient-bg" aria-hidden="true">
        <div className="memories-crimson-aura" />
        <div className="memories-glow-orb-top" />
        <div className="memories-glow-orb-bottom" />
        {/* Subtle floating romantic sparkles */}
        <div className="memories-sparkle-dot s-1">✦</div>
        <div className="memories-sparkle-dot s-2">✧</div>
        <div className="memories-sparkle-dot s-3">✦</div>
        <div className="memories-sparkle-dot s-4">✧</div>
      </div>

      <div className="special-memories-content">
        
        {/* =========================================================
            HEADER: "Special Memories" & "Swipe for more ✦"
            ========================================================= */}
        <header className="memories-header-wrap animate-fade-in-up">
          <h1 className="memories-title">
            {SPECIAL_MEMORIES_DATA.title}
          </h1>
          
          <div className="memories-divider-line">
            <span className="line-arm" />
            <span className="divider-diamond">✦</span>
            <span className="line-arm" />
          </div>

          <p className="memories-subtitle">
            {SPECIAL_MEMORIES_DATA.subtitle}
          </p>
        </header>

        {/* =========================================================
            3D COVERFLOW PHOTO CAROUSEL
            ========================================================= */}
        <div
          className="memories-carousel-stage"
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Navigation Chevron Left */}
          <button
            type="button"
            className="carousel-nav-btn prev-btn"
            onClick={handlePrevSlide}
            aria-label="Previous Photo"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Cards Track */}
          <div className="carousel-cards-track">
            {photos.map((item, index) => {
              // Calculate relative offset from currentIndex (-1, 0, 1, etc.)
              let offset = index - currentIndex;
              
              // Normalize for circular navigation if desired
              const total = photos.length;
              if (offset < -Math.floor(total / 2)) offset += total;
              if (offset > Math.floor(total / 2)) offset -= total;

              const isCenter = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;
              const isVisible = Math.abs(offset) <= 1;

              // Compute inline styles for 3D depth effect
              let cardClass = 'carousel-card';
              if (isCenter) cardClass += ' card-center';
              else if (isPrev) cardClass += ' card-prev';
              else if (isNext) cardClass += ' card-next';
              else cardClass += ' card-hidden';

              return (
                <div
                  key={item.id || index}
                  className={cardClass}
                  onClick={() => {
                    if (!isCenter) goToSlide(index);
                  }}
                  style={{
                    zIndex: isCenter ? 10 : 5 - Math.abs(offset),
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Photo ${index + 1}`}
                >
                  <div className="card-photo-frame">
                    <img
                      src={item.img || item.url}
                      alt={item.caption || `Memory ${index + 1}`}
                      className="card-photo-img"
                      loading="eager"
                      onError={(e) => {
                        e.target.src = item.url || 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    
                    {/* Glowing crimson border reflection */}
                    <div className="card-photo-glow-border" />
                    
                    {/* Photo subtle bottom gradient vignette */}
                    <div className="card-vignette-bottom" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Chevron Right */}
          <button
            type="button"
            className="carousel-nav-btn next-btn"
            onClick={handleNextSlide}
            aria-label="Next Photo"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="carousel-dots-row">
          {photos.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
        </div>

        {/* =========================================================
            BOTTOM: GLOWING RUBY LETTER BUTTON ("✎ ... MESSAGE")
            ========================================================= */}
        <div className="memories-bottom-action">
          <button
            type="button"
            className="btn-letter-message animate-pulse-heart"
            onClick={handleLetterClick}
            disabled={!!heartAnimStage}
            aria-label="Open Love Letter Message"
          >
            <span className="btn-letter-icon">✎</span>
            <span className="btn-letter-dots">...</span>
            <span className="btn-letter-text">MESSAGE</span>
          </button>
        </div>

      </div>

      {/* =========================================================
          RISING & FULLSCREEN EXPANDING RED HEART TRANSITION
          ========================================================= */}
      {heartAnimStage && (
        <div className="heart-transition-overlay" aria-hidden="true">
          {/* Fullscreen veil that deepens as the heart expands */}
          <div className={`heart-transition-veil ${heartAnimStage === 'expanding' ? 'active' : ''}`} />

          {/* Floating rising & expanding red heart */}
          <div className={`floating-transition-heart ${heartAnimStage}`}>
            <svg
              viewBox="0 0 512 512"
              className="rising-heart-svg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                fill="#e03131"
              />
            </svg>
            <div className="heart-pulse-glow" />
          </div>

          {/* Little floating romantic sparkles accompanying the rising heart */}
          {heartAnimStage === 'rising' && (
            <>
              <div className="heart-trail-sparkle hts-1">✨</div>
              <div className="heart-trail-sparkle hts-2">💖</div>
              <div className="heart-trail-sparkle hts-3">✨</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SpecialMemoriesPage;
