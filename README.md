# bhguides.com

This repository holds the code behind [bhguides.com](https://bhguides.com). Feel free to open PRs or clone it and reuse it.

As mentioned on the website, the calculators are based on [a JSFiddle provided by the in-game user Archangel*](https://jsfiddle.net/dchzwg90/), so props to him, his code, and his design work.

## Running Locally

As a very standard [React](https://react.dev/) app, this requires node.js and npm to build and run. To get going, just pop open a shell and type:

```bash
npm start
```

To run the very few unit tests:

```bash
npm test
```

## Adding a Guide

To add a guide:

1. If there are files, scan them with an antivirus program and then add them to `public/guide-files`. Note the loose naming conventions and try to follow them.
2. Add an entry for the guide in `src/redux/guides.json`. It's easiest to copy another guide block. Some guides have extra metadata, like the build and familiars used, which is loaded at page load in the custom in-memory search index.
3. Add the author to the credits at the bottom of `src/components/Guides/index.jsx`.
