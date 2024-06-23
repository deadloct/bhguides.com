# bhguides.com

This repository holds the code behind [bhguides.com](https://bhguides.com). Feel free to open PRs or clone it and reuse it.

As mentioned on the website, the calculators are based on [a JSFiddle provided by the in-game user Archangel*](https://jsfiddle.net/dchzwg90/), so props to him, his code, and his design work.

## Running Locally

As a very standard [create-react-app](https://create-react-app.dev/) app, this requires node.js and npm to build and run. To get going, just pop open a shell and type:

```bash
npm start
```

To run the very few unit tests:

```bash
npm test
```

## Adding a Guide

To add a guide:

1. If there are files, add them to `public/guide-files`. Note the (mediocre) naming conventions and try to follow them.
2. Add an entry for the guide in `src/redux/guides.json`. Usually best to just copy another guide. Note that some guides have extra metadata, like the build and familiars used.

## Videos

> **NOTE THAT THESE ARE NOT CURRENTLY LIVE ON THE WEBSITE**
> 
> I had a section of the site dedicated to some old videos of mine (BillyIdol on BH), but the site is now a community resource rather than a personal blog. I plan to bring the video functionality back as part of the guides page; leaving the instructions here for future reference.

While the screenshots on the site are saved in the repository for convenience, the videos on the site are not stored here to save space. The source videos should be placed in public/video and then HLS streams for them can be generated using [this script](https://gist.github.com/maitrungduc1410/9c640c61a7871390843af00ae1d8758e), which I found randomly on Google and love.  I'm fairly certain that I've only changed the renditions block at the top to:

```bash
renditions=(
# resolution  bitrate  audio-rate
  "320x240    400k     128k"
  "640x480    800k     128k"
)
```

After that, move the HLS stream next to the source video like this:

```txt
public/video
├── 2020-06-10-speed-run-reward-unboxing
│   ├── 240p.m3u8
│   ├── 240p_000.ts
│   ├── 240p_001.ts
│   ├── 480p.m3u8
│   ├── 480p_000.ts
│   ├── 480p_001.ts
│   └── playlist.m3u8
├── 2020-06-10-speed-run-reward-unboxing.mp4
└── ...
```

This allows for faster, progressive downloading of the video in two different qualities depending on the user's bandwidth.
