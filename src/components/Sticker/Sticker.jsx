import React from 'react';
import './Sticker.css';

/**
 * Sticker Component - Scrapbook style sticker badge
 * @param {string} type - 'heart' | 'star' | 'cake' | 'bow' | 'sparkle' | 'gift' | 'custom'
 * @param {string} text - Optional text label inside sticker
 * @param {string} emoji - Optional emoji
 * @param {number} rotate - rotation degree
 * @param {string} variant - 'pill' | 'circle' | 'stamp' | 'tag'
 */
export const Sticker = ({
  type = 'heart',
  text = '',
  emoji = '',
  rotate = 0,
  variant = 'circle',
  size = 'md',
  color = 'pink',
  className = '',
  onClick,
  style = {},
  children,
}) => {
  const getIcon = () => {
    if (emoji) return <span className="sticker-emoji">{emoji}</span>;
    if (children) return children;

    switch (type) {
      case 'heart':
        return '💖';
      case 'star':
        return '⭐';
      case 'cake':
        return '🎂';
      case 'bow':
        return '🎀';
      case 'sparkle':
        return '✨';
      case 'gift':
        return '🎁';
      case 'love':
        return '💌';
      case 'flower':
        return '🌸';
      default:
        return '✨';
    }
  };

  return (
    <div
      className={`cute-sticker sticker-${variant} sticker-size-${size} sticker-color-${color} ${
        onClick ? 'clickable' : ''
      } ${className}`}
      style={{
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
      onClick={onClick}
    >
      <div className="sticker-content">
        <span className="sticker-icon">{getIcon()}</span>
        {text && <span className="sticker-text">{text}</span>}
      </div>
    </div>
  );
};

export default Sticker;
