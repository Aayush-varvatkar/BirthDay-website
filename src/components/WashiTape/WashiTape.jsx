import React from 'react';
import './WashiTape.css';

/**
 * Washi Tape Decorative Element
 * @param {string} color - 'pink' | 'yellow' | 'lavender' | 'mint' | 'peach'
 * @param {string} pattern - 'solid' | 'stripes' | 'dots' | 'hearts'
 * @param {string} position - 'top-center' | 'top-left' | 'top-right' | 'custom'
 * @param {number} rotate - rotation in degrees
 */
export const WashiTape = ({
  color = 'pink',
  pattern = 'stripes',
  position = 'top-center',
  rotate = -2,
  width = 110,
  height = 24,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`washi-tape washi-${color} washi-pattern-${pattern} washi-pos-${position} ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
      aria-hidden="true"
    />
  );
};

export default WashiTape;
