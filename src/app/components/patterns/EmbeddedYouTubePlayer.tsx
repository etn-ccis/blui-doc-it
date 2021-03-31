import React, { HTMLAttributes } from 'react';

type EmbeddedYouTubePlayerProps = HTMLAttributes<HTMLDivElement> & {
    videoID: string;
};

export const EmbeddedYouTubePlayer: React.FC<EmbeddedYouTubePlayerProps> = ({ videoID, style, ...otherProps }) => (
    <div style={{ paddingTop: '56.25%', position: 'relative', marginBottom: '2rem', ...style }} {...otherProps}>
        <iframe
            src={`https://www.youtube.com/embed/${videoID}`}
            title="YouTube video player"
            frameBorder="0"
            style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    </div>
);
