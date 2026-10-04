import React, { useEffect, useRef } from 'react';

/**
 * BackgroundMusic
 * Plays "I Think They Call This Love - Matthew Ifield" (YouTube: CnEqrgMlWLQ) continuously in the background.
 * - Completely invisible on frontend (0 visual footprint)
 * - Auto-plays on mount + unlocks on first user interaction (click / touch / keydown)
 * - Infinite loop (replays automatically when ended)
 */
export const BackgroundMusic = ({ videoId = "CnEqrgMlWLQ" }) => {
  const playerRef = useRef(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    // 1. Load YouTube IFrame API if not already present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // 2. Initialize player once API is ready
    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player('yt-bg-audio-element', {
          height: '1',
          width: '1',
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            playlist: videoId,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(85);
              event.target.playVideo();
            },
            onStateChange: (event) => {
              // Loop automatically if ended
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
              if (event.data === window.YT.PlayerState.PLAYING) {
                isPlayingRef.current = true;
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    // 3. User interaction listener to bypass browser autoplay restrictions
    const handleUserInteraction = () => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        try {
          playerRef.current.playVideo();
        } catch (err) {
          // Ignore error if player is still buffering
        }
      }
    };

    window.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: -9999,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <div id="yt-bg-audio-element" />
    </div>
  );
};

export default BackgroundMusic;
