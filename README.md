# Clef

A mobile-first, zero-dependency music practice app with a curriculum split into two focused tracks: sight reading and ear training.

- Treble, bass, grand-staff, alto, and tenor clef reading
- Accidentals, intervals, chords, scales, key signatures, and enharmonics
- Rhythm values, bar counting, melodies, and cadences
- Pitch, interval, chord, melody, and rhythm ear training

Sight-reading clef lessons present randomized note phrases and move through them one note at a time, widening the available range as the learner progresses. Each lesson uses a
constrained question pool, introducing wider note ranges, additional rhythmic
values, key signatures, interval qualities, and chord qualities in stages.

Audio is synthesized in the browser with the Web Audio API, so no sound files or
external services are required.

## Run locally

Open `index.html` directly, or serve the directory with any static file server.

## Deploy

Connect this repository to Netlify. No build command is needed; the publish directory is `.`.
