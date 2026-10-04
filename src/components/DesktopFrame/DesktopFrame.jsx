import React from 'react';
import { Doodle } from '../Doodle/Doodle';
import { Sticker } from '../Sticker/Sticker';
import { WashiTape } from '../WashiTape/WashiTape';
import { HandwrittenNote } from '../HandwrittenNote/HandwrittenNote';
import './DesktopFrame.css';

/**
 * DesktopFrame - Progressive Enhancement for Large Screens
 * Shows cute scrapbook stickers and notes on the side margins of desktop displays
 */
export const DesktopFrame = () => {
  return (
    <div className="desktop-frame-wrapper" aria-hidden="true">
      {/* Left Sidebar Scrapbook Accent */}
      <aside className="desktop-sidebar desktop-sidebar-left">
        <div className="desktop-side-card animate-float">
          <WashiTape color="pink" position="top-center" width={80} rotate={-3} />
          <p className="font-handwriting side-note-text">
            "You make the whole world feel softer & sweeter 💖"
          </p>
          <div className="side-note-doodles">
            <Doodle type="heart" size={18} color="#ff6b8b" />
            <Doodle type="sparkle" size={18} color="#ffd166" />
          </div>
        </div>

        <div className="desktop-side-sticker animate-wiggle delay-200">
          <Sticker variant="stamp" text="MADE WITH LOVE" emoji="💌" rotate={-8} />
        </div>

        <div className="desktop-floating-doodle animate-float-slow">
          <Doodle type="bow" size={32} color="#c499f3" />
        </div>
      </aside>

      {/* Right Sidebar Scrapbook Accent */}
      <aside className="desktop-sidebar desktop-sidebar-right">
        <div className="desktop-side-card animate-float-slow delay-100">
          <WashiTape color="yellow" position="top-center" width={80} rotate={2} />
          <p className="font-handwriting side-note-text">
            "Counting every memory, celebrating every smile ✨"
          </p>
          <div className="side-note-doodles">
            <Doodle type="flower" size={18} color="#ffb4a2" />
            <Doodle type="heart" size={18} color="#ff6b8b" />
          </div>
        </div>

        <div className="desktop-side-sticker animate-bounce-soft delay-300">
          <Sticker variant="circle" type="cake" size="lg" color="pink" rotate={6} />
        </div>

        <div className="desktop-floating-doodle animate-sparkle delay-400">
          <Doodle type="crown" size={32} color="#ffd166" />
        </div>
      </aside>
    </div>
  );
};

export default DesktopFrame;
