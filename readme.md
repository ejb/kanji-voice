# Kanji Voice Quiz

A more natural way to practice Japanese [Kanji](http://en.wikipedia.org/wiki/Kanji "Kanji - Wikipedia, the free encyclopedia") readings: simply speak the phoenetic translation of the character shown.

This is a work in progress that makes use of the experimental [Web Speech API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html), and so currently **only works on Chrome**. Make sure to allow access to the microphone; a headset is recommended.

## Build instructions

* CSS: `sass scss/style.scss:style.css --watch` (with [SASS](http://sass-lang.com) installed)
* JS: `node build.js` (with [buildify](https://github.com/powmedia/buildify) installed)

## Colophon

Includes:

* jQuery
* Handlebars

The SpeechRecognitionAPI code owes some inspiration to SupplyFrame's [voice command recognition demo](http://blog.supplyframe.com/2013/05/13/voice-command-recognition-levenshtein-web-speech-api/). The card flip animation is [David Walsh's](http://davidwalsh.name/css-flip).

