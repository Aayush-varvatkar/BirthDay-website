import React from 'react';
import { WashiTape } from '../WashiTape/WashiTape';
import './HandwrittenNote.css';

/**
 * Handwritten Note Component - Scrapbook sticky note or paper snippet
 * @param {string} text - The note text
 * @param {string} bg - 'yellow' | 'pink' | 'lavender' | 'mint' | 'white'
 * @param {number} rotate - rotation degrees
 * @param {boolean} tape - whether to show washi tape at top
 * @param {string} font - 'cursive' (Caveat) | 'hand' (Patrick Hand)
 */
export const HandwrittenNote = ({
  children,
  text,
  bg = 'yellow',
  rotate = -1.5,
  tape = true,
  tapeColor = 'pink',
  font = 'cursive',
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`handwritten-note note-bg-${bg} note-font-${font} ${className}`}
      style={{
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    >
      {tape && <WashiTape color={tapeColor} position="top-center" width={80} height={20} rotate={1} />}
      <div className="note-content">
        {text || children}
      </div>
    </div>
  );
};

export default HandwrittenNote;
