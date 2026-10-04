import React from 'react';
import './Doodle.css';

/**
 * Hand-drawn SVG Doodle Component
 * Available types: 
 * 'heart', 'heart-outline', 'double-heart', 'heart-sparkle', 'cupid-arrow', 'heart-envelope', 
 * 'sparkle', 'star', 'bow', 'flower', 'cloud', 'crown', 'swirl'
 */
export const Doodle = ({
  type = 'heart',
  color = 'currentColor',
  size = 24,
  className = '',
  rotate = 0,
  style = {},
  ...props
}) => {
  const doodleStyles = {
    width: size,
    height: size,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    ...style,
  };

  const renderPath = () => {
    switch (type) {
      case 'heart':
        return (
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={color}
          />
        );

      case 'heart-outline':
        return (
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="none"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );

      case 'double-heart':
        return (
          <g fill={color}>
            <path d="M9 17.5l-1.1-1C4.1 12.8 1.5 10.4 1.5 7.4 1.5 4.9 3.4 3 5.9 3c1.4 0 2.7.6 3.6 1.7.9-1.1 2.2-1.7 3.6-1.7 2.5 0 4.4 1.9 4.4 4.4 0 3-2.6 5.4-6.4 9.1L9 17.5z" opacity="0.9" />
            <path d="M15.5 21.5l-.9-.8C11.5 17.8 9.5 15.8 9.5 13.4c0-2 1.6-3.4 3.5-3.4 1.1 0 2.2.5 2.9 1.3.7-.8 1.8-1.3 2.9-1.3 2 0 3.5 1.5 3.5 3.4 0 2.4-2 4.4-5.1 7.3l-.9.8z" fill="#ff4d79" />
          </g>
        );

      case 'heart-sparkle':
        return (
          <g>
            <path
              d="M12 19.5l-1.2-1.1C6.5 14.6 3.5 12 3.5 8.7 3.5 6 5.6 3.9 8.3 3.9c1.5 0 3 .7 4 1.9 1-1.2 2.5-1.9 4-1.9 2.7 0 4.8 2.1 4.8 4.8 0 3.3-3 5.9-7.3 9.7L12 19.5z"
              fill={color}
            />
            {/* Sparkle rays */}
            <path d="M12 0.5v2" stroke="#ffd166" strokeWidth="2" strokeLinecap="round" />
            <path d="M21 4.5l-1.5 1.5" stroke="#ffd166" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 4.5l1.5 1.5" stroke="#ffd166" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'cupid-arrow':
        return (
          <g stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Arrow line */}
            <line x1="2" y1="22" x2="22" y2="2" />
            <polyline points="15 2 22 2 22 9" />
            <path d="M2 18l4 4" />
            {/* Pierced Heart */}
            <path
              d="M13 14c-1.5 1.5-4 1.5-5.5 0s-1.5-4 0-5.5c1.5-1.5 4-1.5 5.5 0"
              fill="#ff4d79"
              fillOpacity="0.8"
            />
          </g>
        );

      case 'heart-envelope':
        return (
          <g>
            <rect x="2" y="5" width="20" height="14" rx="2" fill="#fffdfa" stroke={color} strokeWidth="1.8" />
            <path d="M2 7l10 7 10-7" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 15l-1-.9c-2-1.8-3.3-3-3.3-4.4 0-1.2.9-2.1 2.1-2.1.7 0 1.4.3 1.8.8.4-.5 1.1-.8 1.8-.8 1.2 0 2.1.9 2.1 2.1 0 1.4-1.3 2.6-3.3 4.4l-1 .9z" fill="#ff4d79" />
          </g>
        );

      case 'sparkle':
        return (
          <path
            d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
            fill={color}
          />
        );

      case 'star':
        return (
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill={color}
          />
        );

      case 'bow':
        return (
          <g fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 12C9 6 3 8 4 12C5 16 10 14 12 12Z" fill={color} fillOpacity="0.4" />
            <path d="M12 12C15 6 21 8 20 12C19 16 14 14 12 12Z" fill={color} fillOpacity="0.4" />
            <circle cx="12" cy="12" r="2.5" fill={color} />
            <path d="M10.5 14L8 20" />
            <path d="M13.5 14L16 20" />
          </g>
        );

      case 'flower':
        return (
          <g fill={color}>
            <circle cx="12" cy="6" r="3.5" opacity="0.85" />
            <circle cx="18" cy="12" r="3.5" opacity="0.85" />
            <circle cx="12" cy="18" r="3.5" opacity="0.85" />
            <circle cx="6" cy="12" r="3.5" opacity="0.85" />
            <circle cx="12" cy="12" r="4" fill="#ffd166" />
          </g>
        );

      case 'crown':
        return (
          <path
            d="M3 18L5 8L9.5 13L12 6L14.5 13L19 8L21 18H3Z"
            fill={color}
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        );

      case 'swirl':
        return (
          <path
            d="M4 16c4-4 8-1 10-6s2-6 6-4"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );

      default:
        return (
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={color}
          />
        );
    }
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className={`doodle-icon ${className}`}
      style={doodleStyles}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {renderPath()}
    </svg>
  );
};

export default Doodle;
