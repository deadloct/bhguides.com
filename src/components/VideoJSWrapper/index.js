import React from "react";
import { useVideoJS } from "react-hook-videojs";
import "video.js/dist/video-js.css";

export default function VideoJSWrapper(props) {
    const { video } = props;

    const { Video: VideoComponent } = useVideoJS({
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: `${process.env.PUBLIC_URL}/video/${video.hls}`,
            type: "application/x-mpegURL"
        }]
    });

    return <VideoComponent playsInline />;
};
