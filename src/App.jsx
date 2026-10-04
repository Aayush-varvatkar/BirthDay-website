import React, { useState } from 'react';
import { PinLock } from './components/PinLock/PinLock';
import { IntroLovePage } from './components/IntroLovePage/IntroLovePage';
import { BirthdayWishPage } from './components/BirthdayWishPage/BirthdayWishPage';
import { SurpriseAskPage } from './components/SurpriseAskPage/SurpriseAskPage';
import { SpecialMemoriesPage } from './components/SpecialMemoriesPage/SpecialMemoriesPage';
import { LoveLetterPage } from './components/LoveLetterPage/LoveLetterPage';
import { RoseBloomPage } from './components/RoseBloomPage/RoseBloomPage';
import { HuggyPage } from './components/HuggyPage/HuggyPage';
import { FloatingBackground } from './components/FloatingBackground/FloatingBackground';
import { DesktopFrame } from './components/DesktopFrame/DesktopFrame';
import { BackgroundMusic } from './components/BackgroundMusic/BackgroundMusic';

import './styles/global.css';

export function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle successful unlock from PinLock
  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(7, prev + 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleRestart = () => {
    setCurrentPage(1);
  };

  return (
    <div className="app-container">
      {/* Background YouTube Audio Stream (Matthew Ifield - I Think They Call This Love) */}
      <BackgroundMusic videoId="CnEqrgMlWLQ" />

      {/* Ambient background particles */}
      <FloatingBackground />

      {/* Progressive desktop scrapbook sidebars */}
      <DesktopFrame />

      {/* Interactive Single-Page Screen Router */}
      {!isUnlocked ? (
        <PinLock onUnlock={handleUnlockSuccess} />
      ) : (
        <main className="single-page-viewport animate-fade-in-up">
          {/* Page 1: Happy Birthday My Love Intro */}
          {currentPage === 1 && (
            <IntroLovePage onNext={handleNextPage} onPrev={handlePrevPage} />
          )}

          {/* Page 2: Make A Wish / Blow Candle Page */}
          {currentPage === 2 && (
            <BirthdayWishPage onNext={handleNextPage} onPrev={handlePrevPage} />
          )}

          {/* Page 3: "I made something special for u" - Big YES & NO Buttons */}
          {currentPage === 3 && (
            <SurpriseAskPage
              onYes={handleNextPage}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
            />
          )}

          {/* Page 4: "Special Memories" - 3D Coverflow Photo Carousel & Letter Button */}
          {currentPage === 4 && (
            <SpecialMemoriesPage
              onOpenLetter={handleNextPage}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
            />
          )}

          {/* Page 5: Love Letter with Letter-by-Letter Typing Animation */}
          {currentPage === 5 && (
            <LoveLetterPage
              onNext={handleNextPage}
              onPrev={handlePrevPage}
            />
          )}

          {/* Page 6: Pure CSS Botanical Rose & Flower Bloom Animation */}
          {currentPage === 6 && (
            <RoseBloomPage
              onNext={handleNextPage}
              onPrev={handlePrevPage}
            />
          )}

          {/* Page 7: Final "givee me huggyy huggyy" Section with Puuung Kissing Animation */}
          {currentPage >= 7 && (
            <HuggyPage
              onPrev={handlePrevPage}
              onRestart={handleRestart}
            />
          )}
        </main>
      )}
    </div>
  );
}

export default App;


