# bhguides.com

This repository holds the code behind [bhguides.com](https://bhguides.com). Feel free to open PRs against it.

Despite having a CLAUDE.md file, AI-slop will not be accepted. Please check any code before submitting and keep PRs small. Thanks!

## Running Locally

This app requires node.js and npm to build and run. To get going, just pop open a shell and type:

```bash
npm run dev 
```

To run the very few unit tests:

```bash
npm run test
```

## Adding a Guide

To add a guide:

1. If there are files, scan them with an antivirus program and then add them to `public/guide-files`. Note the loose naming conventions and try to follow them.
2. Add an entry for the guide in `src/redux/guides.json`. Some guides have extra metadata, like the build and familiars used, which is loaded at page load in the custom in-memory search index.
3. Add the author to the credits section of the About page if needed.

## Credits

The guide authors have been credited on the about page. For the other pages:

* The item find and capture rate calculators are stolen from [a JSFiddle provided by the in-game user Archangel*](https://jsfiddle.net/dchzwg90/), so props to them, their code, and their design work.
* The familiar TS-scaling calculator was Gylgymesh's idea, thanks!
* The text on the turn rate calculator is from both the Wiki authors and Choco/whatever they call themselves this week. :) Thanks to you all.
* A number of people have helped identify bugs. I can't remember everybody but thank you very much for your reports.
