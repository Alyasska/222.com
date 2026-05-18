import { useEffect, useRef } from "react";
import YouTube from "react-youtube";

export default function YouTubeHost({ youtubeId, playing }) {
  const playerRef = useRef(null);

  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    if (playing && youtubeId) {
      try {
        p.playVideo();
      } catch (error) {
        void error;
      }
    } else {
      try {
        p.pauseVideo();
      } catch (error) {
        void error;
      }
    }
  }, [playing, youtubeId]);

  if (!youtubeId) return null;

  return (
    <div className="yt-host">
      <YouTube
        key={youtubeId}
        videoId={youtubeId}
        opts={{
          height: "1",
          width: "1",
          playerVars: { autoplay: 1, controls: 0, modestbranding: 1, rel: 0, playsinline: 1 },
        }}
        onReady={(e) => {
          playerRef.current = e.target;
          if (playing) e.target.playVideo();
        }}
      />
    </div>
  );
}
