const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const SEMITONES = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const KEY_DATA = {
  C:  { label: "C major",  accidental: {}, signature: "" },
  G:  { label: "G major",  accidental: { F: 1 }, signature: "♯" },
  D:  { label: "D major",  accidental: { F: 1, C: 1 }, signature: "♯♯" },
  A:  { label: "A major",  accidental: { F: 1, C: 1, G: 1 }, signature: "♯♯♯" },
  E:  { label: "E major",  accidental: { F: 1, C: 1, G: 1, D: 1 }, signature: "♯♯♯♯" },
  F:  { label: "F major",  accidental: { B: -1 }, signature: "♭" },
  Bb: { label: "B♭ major", accidental: { B: -1, E: -1 }, signature: "♭♭" },
  Eb: { label: "E♭ major", accidental: { B: -1, E: -1, A: -1 }, signature: "♭♭♭" },
  Ab: { label: "A♭ major", accidental: { B: -1, E: -1, A: -1, D: -1 }, signature: "♭♭♭♭" },
};
const INTERVALS = [
  ["Minor 2nd", 1], ["Major 2nd", 2], ["Minor 3rd", 3], ["Major 3rd", 4],
  ["Perfect 4th", 5], ["Tritone", 6], ["Perfect 5th", 7], ["Minor 6th", 8],
  ["Major 6th", 9], ["Minor 7th", 10], ["Major 7th", 11], ["Octave", 12],
];
const CHORDS = [
  ["Major", [0, 4, 7]], ["Minor", [0, 3, 7]], ["Diminished", [0, 3, 6]], ["Augmented", [0, 4, 8]],
];
const CADENCES = [
  ["Authentic (V–I)", [[2, 7, 11], [0, 4, 7]]],
  ["Plagal (IV–I)", [[-5, -1, 2], [0, 4, 7]]],
  ["Half (I–V)", [[0, 4, 7], [2, 7, 11]]],
  ["Deceptive (V–vi)", [[2, 7, 11], [9, 12, 16]]],
];
const SCALE_DEGREES = ["Tonic", "Supertonic", "Mediant", "Subdominant", "Dominant", "Submediant", "Leading tone"];
const RHYTHMS = [
  ["Whole note", "whole", 4], ["Half note", "half", 2], ["Quarter note", "quarter", 1], ["Eighth note", "eighth", .5],
];
const CLEFS = { treble: ["𝄞", "E4"], bass: ["𝄢", "G2"], alto: ["𝄡", "F3"], tenor: ["𝄡", "D3"] };
const ALL_KEYS = Object.keys(KEY_DATA);

const lesson = (stage, stageName, id, name, description, make) => ({ stage, stageName, id, name, description, make, category: `Unit ${stage} · ${stageName}` });
const DRILLS = [
  lesson(1, "Note foundations", "treble-five", "Treble: first five", "Begin with C–G around middle C.", () => noteQuestion("treble", "C", false, ["C4","D4","E4","F4","G4"])),
  lesson(1, "Note foundations", "treble-staff", "Treble: on the staff", "Add every line and space of the treble staff.", () => noteQuestion("treble", "C", false, ["E4","F4","G4","A4","B4","C5","D5","E5","F5"])),
  lesson(1, "Note foundations", "treble-full", "Treble: full range", "Extend into nearby ledger lines.", () => noteQuestion("treble", "C", false)),
  lesson(1, "Note foundations", "bass-five", "Bass: first five", "Learn C–G in the center of the bass staff.", () => noteQuestion("bass", "C", false, ["C3","D3","E3","F3","G3"])),
  lesson(1, "Note foundations", "bass-full", "Bass: full range", "Read the complete bass staff and ledger notes.", () => noteQuestion("bass", "C", false)),
  lesson(1, "Note foundations", "grand", "Grand staff", "Switch fluently between treble and bass registers.", grandQuestion),

  lesson(2, "Pulse & rhythm", "rhythm-basic", "Basic note values", "Learn quarter, half, and whole notes in 4/4.", () => rhythmQuestion(RHYTHMS.slice(0, 3))),
  lesson(2, "Pulse & rhythm", "rhythm-eighths", "Add eighth notes", "Add paired eighth notes to the basic values.", rhythmQuestion),
  lesson(2, "Pulse & rhythm", "count-basic", "Count simple bars", "Add quarter and half-note values.", () => countQuestion([1, 2])),
  lesson(2, "Pulse & rhythm", "count-mixed", "Count mixed bars", "Count measures that include eighth notes.", countQuestion),
  lesson(2, "Pulse & rhythm", "ear-rhythm", "Rhythm by ear", "Connect four-beat patterns to the notation you know.", earRhythmQuestion),

  lesson(3, "Keys & pitch", "sharp-flat", "Sharps & flats", "Introduce chromatic sharps and flats one note at a time.", () => accidentalQuestion(["♯", "♭"])),
  lesson(3, "Keys & pitch", "naturals", "Naturals in context", "Read sharps, flats, and cancellation by natural signs.", accidentalQuestion),
  lesson(3, "Keys & pitch", "signatures-one", "One-sign keys", "Learn G major and F major first.", () => keySignatureQuestion(["G", "F"])),
  lesson(3, "Keys & pitch", "signatures-common", "Common key signatures", "Expand through three sharps and three flats.", () => keySignatureQuestion(["C", "G", "D", "A", "F", "Bb", "Eb"])),
  lesson(3, "Keys & pitch", "degrees-primary", "Primary scale degrees", "Recognize tonic, subdominant, and dominant.", () => scaleDegreeQuestion([0, 3, 4])),
  lesson(3, "Keys & pitch", "degrees-all", "All scale degrees", "Add every diatonic role, including the leading tone.", scaleDegreeQuestion),
  lesson(3, "Keys & pitch", "enharmonic", "Enharmonic spellings", "Match differently spelled pitches that sound alike.", enharmonicQuestion),

  lesson(4, "Intervals & melody", "interval-basic", "Steps, thirds & fifths", "Start with major 2nds, major 3rds, and perfect 5ths.", () => writtenIntervalQuestion([2, 4, 7])),
  lesson(4, "Intervals & melody", "interval-perfect", "Perfect intervals", "Add perfect 4ths and octaves.", () => writtenIntervalQuestion([5, 7, 12])),
  lesson(4, "Intervals & melody", "interval-all", "Chromatic intervals", "Distinguish all major, minor, perfect, and tritone qualities.", writtenIntervalQuestion),
  lesson(4, "Intervals & melody", "melody", "Melodic contour", "Read steps, leaps, arches, and direction in short phrases.", melodyQuestion),
  lesson(4, "Intervals & melody", "clefs", "Alto & tenor clefs", "Extend staff reading to movable C clefs.", cClefQuestion),

  lesson(5, "Triads & harmony", "chords-major-minor", "Major & minor triads", "Hear and see the two foundational triad qualities.", () => writtenChordQuestion(["Major", "Minor"])),
  lesson(5, "Triads & harmony", "chords-all", "Four triad qualities", "Add diminished and augmented triads.", writtenChordQuestion),
  lesson(5, "Triads & harmony", "cadences", "Cadences", "Recognize authentic, plagal, half, and deceptive arrivals.", cadenceQuestion),

  lesson(6, "Ear training", "ear-pitch", "Pitch matching", "Match single piano notes to their letter names.", earPitchQuestion),
  lesson(6, "Ear training", "ear-interval-basic", "Basic intervals by ear", "Hear 2nds, 3rds, 4ths, 5ths, and octaves.", () => earIntervalQuestion([2, 4, 5, 7, 12])),
  lesson(6, "Ear training", "ear-interval-all", "All intervals by ear", "Add minor, major, and chromatic interval qualities.", earIntervalQuestion),
  lesson(6, "Ear training", "ear-chord-basic", "Major & minor by ear", "Distinguish the two core triad colors.", () => earChordQuestion(["Major", "Minor"])),
  lesson(6, "Ear training", "ear-chord-all", "All triads by ear", "Add diminished and augmented sonorities.", earChordQuestion),
  lesson(6, "Ear training", "ear-melody", "Melody by ear", "Follow the direction and shape of short melodies.", earMelodyQuestion),
];

const TRACKS = {
  sight: { label: "Sight reading", title: "Read with <em>confidence.</em>", description: "Build fluency from a few familiar notes to full clefs, rhythm, keys, and harmony." },
  ear: { label: "Ear training", title: "Train your <em>ear.</em>", description: "Recognize rhythm, pitch, intervals, chords, cadences, and melodic shape by sound." },
};
const EAR_DRILLS = new Set(["ear-rhythm", "cadences", "ear-pitch", "ear-interval-basic", "ear-interval-all", "ear-chord-basic", "ear-chord-all", "ear-melody"]);
DRILLS.forEach(drill => { drill.track = EAR_DRILLS.has(drill.id) ? "ear" : "sight"; });
const SIGHT_POOLS = {
  "treble-five": { clef: "treble", notes: ["C4","D4","E4","F4","G4"] },
  "treble-staff": { clef: "treble", notes: ["E4","F4","G4","A4","B4","C5","D5","E5","F5"] },
  "treble-full": { clef: "treble", notes: ["C4","D4","E4","F4","G4","A4","B4","C5","D5","E5","F5","G5","A5"] },
  "bass-five": { clef: "bass", notes: ["C3","D3","E3","F3","G3"] },
  "bass-full": { clef: "bass", notes: ["E2","F2","G2","A2","B2","C3","D3","E3","F3","G3","A3","B3","C4"] },
};
Object.entries(SIGHT_POOLS).forEach(([id, config]) => { DRILLS.find(drill => drill.id === id).sightPhrase = config; });

const state = { track: "sight", drill: DRILLS[0], questions: [], index: 0, streak: 0, correct: 0, mistakes: 0, sound: true };
const $ = (selector) => document.querySelector(selector);
const choice = (items) => items[Math.floor(Math.random() * items.length)];
const sample = (items, count) => [...items].sort(() => Math.random() - .5).slice(0, count);
const pitchStep = (note) => Number(note.match(/\d/)[0]) * 7 + LETTERS.indexOf(note[0]);
const midi = (note) => (Number(note.match(/\d/)[0]) + 1) * 12 + SEMITONES[note[0]] + (note.includes("♯") ? 1 : note.includes("♭") ? -1 : 0);
const pitchFromMidi = (value) => `${["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"][value % 12]}${Math.floor(value / 12) - 1}`;
const shuffleAnswers = (correct, distractors) => [correct, ...sample([...new Set(distractors)].filter(x => x !== correct), 7)].sort(() => Math.random() - .5);
const q = (prompt, correct, answers, display = {}, audio = null) => ({ prompt, correct, answers: shuffleAnswers(correct, answers), display, audio });

function diatonicPitch(clef, limitedPool) {
  const pools = { treble: ["C4","D4","E4","F4","G4","A4","B4","C5","D5","E5","F5","G5","A5"], bass: ["E2","F2","G2","A2","B2","C3","D3","E3","F3","G3","A3","B3","C4"], alto: ["C3","D3","E3","F3","G3","A3","B3","C4","D4","E4","F4"], tenor: ["A2","B2","C3","D3","E3","F3","G3","A3","B3","C4","D4"] };
  return choice(limitedPool || pools[clef]);
}
function noteQuestion(clef, key, chromatic, limitedPool, accidentalPool) {
  const pitch = diatonicPitch(clef, limitedPool);
  const accidental = chromatic ? choice(accidentalPool || ["♯", "♭", "♮", ""]) : "";
  const name = pitch[0] + accidental;
  return q("Which note is shown?", name, ["A","B","C","D","E","F","G"].flatMap(n => chromatic ? [n, n + "♯", n + "♭"] : [n]), { type: "staff", clef, key, notes: [{ pitch, accidental }] }, [midi(name + pitch.match(/\d/)[0])]);
}
function accidentalQuestion(accidentalPool) { return noteQuestion(choice(["treble", "bass"]), choice(["C", "G", "F"]), true, null, accidentalPool); }
function writtenIntervalQuestion(semitonePool) {
  const available = semitonePool ? INTERVALS.filter(item => semitonePool.includes(item[1])) : INTERVALS; const interval = choice(available); const spellings = { 1:["D4","♭"], 2:["D4",""], 3:["E4","♭"], 4:["E4",""], 5:["F4",""], 6:["F4","♯"], 7:["G4",""], 8:["A4","♭"], 9:["A4",""], 10:["B4","♭"], 11:["B4",""], 12:["C5",""] }; const top = spellings[interval[1]];
  return q("Name the written interval.", interval[0], available.map(x => x[0]), { type: "staff", clef: "treble", key: "C", notes: [{ pitch: "C4" }, { pitch: top[0], accidental: top[1] }] }, [60, 60 + interval[1]]);
}
function writtenChordQuestion(qualityPool) {
  const available = qualityPool ? CHORDS.filter(item => qualityPool.includes(item[0])) : CHORDS; const chord = choice(available); const spellings = { Major:[["C4",""],["E4",""],["G4",""]], Minor:[["C4",""],["E4","♭"],["G4",""]], Diminished:[["C4",""],["E4","♭"],["G4","♭"]], Augmented:[["C4",""],["E4",""],["G4","♯"]] };
  return q("What quality is this written triad?", chord[0], available.map(x => x[0]), { type: "staff", clef: "treble", key: "C", stack: true, notes: spellings[chord[0]].map(([pitch, accidental]) => ({ pitch, accidental })) }, chord[1].map(n => 60 + n));
}
function scaleDegreeQuestion(degreePool = [0,1,2,3,4,5,6]) {
  const key = choice(["C", "G", "D", "F", "Bb", "Eb"]); const degree = choice(degreePool); const tonic = key.replace("b", ""); const root = LETTERS.indexOf(tonic); const letter = LETTERS[(root + degree) % 7];
  return q(`In ${KEY_DATA[key].label}, what is ${letter}${KEY_DATA[key].accidental[letter] === 1 ? "♯" : KEY_DATA[key].accidental[letter] === -1 ? "♭" : ""}?`, SCALE_DEGREES[degree], SCALE_DEGREES, { type: "text", kicker: KEY_DATA[key].label, label: `Degree ${degree + 1}` });
}
function keySignatureQuestion(keyPool = ALL_KEYS) {
  const key = choice(keyPool); return q("Which major key has this signature?", KEY_DATA[key].label, keyPool.map(k => KEY_DATA[k].label), { type: "signature", key });
}
function rhythmQuestion(rhythmPool = RHYTHMS) {
  const rhythm = choice(rhythmPool); return q("How many beats does this symbol receive in 4/4?", `${rhythm[2]} ${rhythm[2] === 1 ? "beat" : "beats"}`, rhythmPool.map(x => `${x[2]} ${x[2] === 1 ? "beat" : "beats"}`), { type: "rhythm", values: [rhythm[2]], kicker: rhythm[0] });
}
function countQuestion(valuePool = [.5, 1, 2]) {
  const values = Array.from({ length: 3 }, () => choice(valuePool)); const total = values.reduce((a,b) => a+b, 0);
  return q("How many beats are in this bar?", `${total} beats`, ["2 beats","2.5 beats","3 beats","3.5 beats","4 beats","4.5 beats","5 beats"], { type: "rhythm", values, kicker: "4/4" });
}
function melodyQuestion() {
  const patterns = [["Steps up",[60,62,64,65]],["Steps down",[67,65,64,62]],["Leap then down",[60,67,65,64]],["Arch",[60,64,67,64]]]; const pattern = choice(patterns);
  return q("Which contour describes this phrase?", pattern[0], patterns.map(x => x[0]), { type: "melody", notes: pattern[1].map(pitchFromMidi) }, pattern[1]);
}
function grandQuestion() { const clef = choice(["treble", "bass"]); const question = noteQuestion(clef, "C", false); question.prompt = `Name the note on the ${clef} staff.`; question.display.grand = true; return question; }
function cClefQuestion() { return noteQuestion(choice(["alto", "tenor"]), "C", false); }
function enharmonicQuestion() {
  const pairs = [["C♯","D♭"],["D♯","E♭"],["F♯","G♭"],["G♯","A♭"],["A♯","B♭"],["B","C♭"],["E","F♭"]]; const pair = choice(pairs); const shown = choice(pair); const correct = pair.find(x => x !== shown);
  return q(`Which note sounds the same as ${shown}?`, correct, pairs.flat(), { type: "text", kicker: "Enharmonic spelling", label: shown });
}
function cadenceQuestion() { const cadence = choice(CADENCES); return q("Which cadence did you hear?", cadence[0], CADENCES.map(x => x[0]), { type: "listen", label: "Listen for the arrival" }, { chords: cadence[1].map(ch => ch.map(n => 60 + n)) }); }
function earPitchQuestion() { const value = choice([60,62,64,65,67,69,71]); const name = pitchFromMidi(value).replace(/\d/, ""); return q("After the reference C, which pitch did you hear?", name, LETTERS, { type: "listen", label: "Reference C, then target" }, [60, value]); }
function earIntervalQuestion(semitonePool) { const available = semitonePool ? INTERVALS.filter(item => semitonePool.includes(item[1])) : INTERVALS; const interval = choice(available); const root = choice([57,60,62]); return q("Which interval did you hear?", interval[0], available.map(x => x[0]), { type: "listen", label: "Two notes" }, [root, root + interval[1]]); }
function earChordQuestion(qualityPool) { const available = qualityPool ? CHORDS.filter(item => qualityPool.includes(item[0])) : CHORDS; const chord = choice(available); const root = choice([55,60,62]); return q("What chord quality did you hear?", chord[0], available.map(x => x[0]), { type: "listen", label: "One triad" }, { chords: [chord[1].map(n => root + n)] }); }
function earMelodyQuestion() { const patterns = [["Rising",[60,62,64]],["Falling",[67,65,64]],["Arch",[60,64,60]],["Valley",[64,60,64]]]; const p = choice(patterns); return q("What was the melodic contour?", p[0], patterns.map(x => x[0]), { type: "listen", label: "Three-note phrase" }, p[1]); }
function earRhythmQuestion() { const patterns = [["Four quarter notes",[1,1,1,1]],["Two eighths, then three quarters",[.5,.5,1,1,1]],["Half note, then two quarters",[2,1,1]],["Quarter, half, quarter",[1,2,1]]]; const p = choice(patterns); return q("Which rhythm did you hear?", p[0], patterns.map(x => x[0]), { type: "listen", label: "Four-beat rhythm" }, { rhythm: p[1] }); }

function phraseQuestions(count = 8) {
  const { clef, notes: pool } = state.drill.sightPhrase;
  let previous;
  const notes = Array.from({ length: count }, () => {
    let pitch = choice(pool);
    if (pitch === previous && pool.length > 1) pitch = choice(pool.filter(note => note !== pitch));
    previous = pitch;
    return { pitch };
  });
  return notes.map((note, targetIndex) => q("Name each note as you move across the staff.", note.pitch[0], LETTERS, { type: "staff", clef, key: "C", notes, targetIndex }, [midi(note.pitch)]));
}
function createQuestions(count = 10) {
  if (state.drill.sightPhrase) {
    const questions = [];
    while (questions.length < count) questions.push(...phraseQuestions(Math.min(8, count - questions.length)));
    return questions;
  }
  return Array.from({ length: count }, () => state.drill.make());
}

function renderPicker() {
  const desktopScroll = $("#drillPicker").scrollTop; const mobileScroll = $("#mobileDrillPicker").scrollTop;
  const curriculum = (mobile = false) => {
    let currentStage = 0; let unitNumber = 0; let lessonNumber = 0;
    return DRILLS.filter(drill => drill.track === state.track).map(drill => {
      const heading = drill.stage !== currentStage ? (currentStage = drill.stage, unitNumber++, lessonNumber = 0, `<div class="unit-heading"><span>Unit ${unitNumber}</span><strong>${drill.stageName}</strong></div>`) : "";
      lessonNumber++;
      return `${heading}<button class="${mobile ? "" : "level"}${drill === state.drill ? " active" : ""}" data-drill="${drill.id}" type="button"><span>${unitNumber}.${lessonNumber}</span>${drill.name}</button>`;
    }).join("");
  };
  const tracks = (mobile = false) => Object.entries(TRACKS).map(([id, track]) => `<button class="${id === state.track ? "active" : ""}" type="button" role="tab" aria-selected="${id === state.track}" data-track="${id}">${track.label}</button>`).join("");
  $("#trackPicker").innerHTML = tracks();
  $("#mobileTrackPicker").innerHTML = tracks(true);
  $("#drillPicker").innerHTML = curriculum();
  $("#mobileDrillPicker").innerHTML = curriculum(true);
  $("#drillPicker").scrollTop = desktopScroll; $("#mobileDrillPicker").scrollTop = mobileScroll;
  document.querySelectorAll("[data-drill]").forEach(el => el.addEventListener("click", () => { start(el.dataset.drill); setSheet(false); }));
  document.querySelectorAll("[data-track]").forEach(el => el.addEventListener("click", () => switchTrack(el.dataset.track)));
}
function switchTrack(track) {
  if (!TRACKS[track] || track === state.track) return;
  state.track = track;
  start(DRILLS.find(drill => drill.track === track).id);
}
function notePosition(pitch, clef) { return 64 - (pitchStep(pitch) - pitchStep(CLEFS[clef][1])) * 8; }
function rhythmMarkup(values) { return `<span class="rhythm-notation">${values.map(value => `<i class="drawn-note value-${String(value).replace(".", "-")}"></i>`).join("")}</span>`; }
function renderDisplay(question) {
  const display = question.display; const staff = $(".staff"); const theory = $("#theoryDisplay"); const replay = $("#replayButton");
  staff.hidden = !["staff","signature","melody"].includes(display.type); theory.hidden = !staff.hidden; replay.hidden = !question.audio || !["listen"].includes(display.type);
  $(".target-line").hidden = true; $("#notesTrack").innerHTML = ""; $("#keySignature").textContent = "";
  if (!staff.hidden) {
    const clef = display.clef || "treble"; $("#clefSymbol").textContent = CLEFS[clef][0]; $("#clefSymbol").className = `clef ${clef}`;
    $("#keySignature").textContent = display.type === "signature" ? KEY_DATA[display.key].signature : KEY_DATA[display.key || "C"].signature;
    const notes = display.type === "melody" ? display.notes.map(pitch => ({ pitch: pitch.replace(/[♯♭]/, ""), accidental: pitch.match(/[♯♭]/)?.[0] || "" })) : (display.notes || []);
    notes.forEach((item, index) => {
      const targetIndex = display.targetIndex ?? index;
      const position = notePosition(item.pitch, clef);
      const note = document.createElement("span"); note.className = `note ${index === targetIndex ? "current" : index < targetIndex ? "past" : "upcoming"}${position < 0 || position > 64 ? " ledger" : ""}`; note.style.left = `${display.type === "melody" ? 30 + index * 13 : display.stack ? 46 : notes.length > 3 ? 22 + index * 9 : 42 + index * 8}%`; note.style.top = `${position}px`; note.innerHTML = item.accidental ? `<b>${item.accidental}</b>` : ""; $("#notesTrack").append(note);
    });
    if (display.targetIndex != null) { $(".target-line").hidden = false; $(".target-line").style.left = `${22 + display.targetIndex * 9}%`; }
  } else {
    theory.className = `theory-display ${display.type}`;
    const content = display.type === "rhythm" && display.values ? rhythmMarkup(display.values) : (display.label || "♪");
    theory.innerHTML = `<span>${display.kicker || (display.type === "listen" ? "Ear training" : "Theory")}</span><strong>${content}</strong>`;
  }
  $("#contextBadge").textContent = display.type === "listen" ? "Audio · Replay anytime" : TRACKS[state.track].label;
}
function renderAnswers(question) {
  const letterAnswers = question.answers.every(answer => LETTERS.includes(answer));
  const answers = letterAnswers ? LETTERS.filter(letter => question.answers.includes(letter)) : question.answers;
  $("#noteKeys").classList.toggle("letter-wheel", letterAnswers);
  $("#noteKeys").innerHTML = answers.map((answer, index) => `<button class="note-key" type="button" data-answer="${answer}" data-key="${letterAnswers ? answer : index + 1}">${answer}</button>`).join("");
  document.querySelectorAll("[data-answer]").forEach(el => el.addEventListener("click", () => answer(el.dataset.answer)));
  $("#keyboardHint").textContent = letterAnswers ? "Tap an answer, or type A–G" : "Tap an answer, or use the number keys";
}
function render() {
  const question = state.questions[state.index] || state.questions.at(-1); if (!question) return;
  $("#prompt").textContent = question.prompt; renderDisplay(question); renderAnswers(question); updateStats();
  if (question.audio && ["listen"].includes(question.display.type)) setTimeout(playCurrent, 180);
}
function updateStats() {
  const answered = state.correct + state.mistakes;
  $("#streak").textContent = state.streak;
  $("#correctCount").textContent = state.correct;
  $("#answeredCount").textContent = `/${answered}`;
  $("#accuracy").textContent = answered ? `${Math.round(state.correct / answered * 100)}%` : "—";
}
function showFeedback(text, wrong = false) { const el = $("#feedback"); el.textContent = text; el.className = `feedback show${wrong ? " wrong" : ""}`; clearTimeout(showFeedback.timer); showFeedback.timer = setTimeout(() => el.className = "feedback", 900); }

let audioContext;
function tone(value, at, duration = .55, volume = .13) {
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  const frequency = 440 * 2 ** ((value - 69) / 12);
  const release = duration < .2 ? .3 : 1.8;
  const output = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  output.gain.value = volume / .13;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(5200, at);
  filter.frequency.exponentialRampToValueAtTime(1700, at + release);
  filter.Q.value = .7;
  output.connect(filter).connect(audioContext.destination);

  // Paired, lightly detuned strings and fast-fading upper partials give the
  // note the warmth and imperfect shimmer of a struck piano string.
  [
    { multiple: 1, level: .13, decay: 2.4, detune: -1.5 },
    { multiple: 1, level: .10, decay: 2.1, detune: 1.5 },
    { multiple: 2, level: .045, decay: 1.25, detune: 3 },
    { multiple: 3, level: .022, decay: .8, detune: -4 },
    { multiple: 4, level: .012, decay: .48, detune: 5 },
  ].forEach(({ multiple, level, decay, detune }) => {
    const string = audioContext.createOscillator();
    const envelope = audioContext.createGain();
    const tail = duration < .2 ? Math.max(.12, decay * .18) : decay;
    string.type = multiple === 1 ? "triangle" : "sine";
    string.frequency.value = frequency * multiple;
    string.detune.value = detune;
    envelope.gain.setValueAtTime(.0001, at);
    envelope.gain.exponentialRampToValueAtTime(level, at + .006);
    envelope.gain.exponentialRampToValueAtTime(.0001, at + tail);
    string.connect(envelope).connect(output);
    string.start(at);
    string.stop(at + tail + .03);
  });

  // A tiny filtered noise burst supplies the felt-hammer attack.
  const strikeLength = Math.floor(audioContext.sampleRate * .035);
  const buffer = audioContext.createBuffer(1, strikeLength, audioContext.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let i = 0; i < strikeLength; i++) samples[i] = (Math.random() * 2 - 1) * (1 - i / strikeLength);
  const hammer = audioContext.createBufferSource();
  const hammerFilter = audioContext.createBiquadFilter();
  const hammerGain = audioContext.createGain();
  hammer.buffer = buffer;
  hammerFilter.type = "bandpass";
  hammerFilter.frequency.value = Math.min(3500, frequency * 6);
  hammerFilter.Q.value = 1.1;
  hammerGain.gain.setValueAtTime(.035, at);
  hammerGain.gain.exponentialRampToValueAtTime(.0001, at + .035);
  hammer.connect(hammerFilter).connect(hammerGain).connect(output);
  hammer.start(at);
}
function playAudio(audio) {
  if (!state.sound || !audio) return; audioContext ||= new (window.AudioContext || window.webkitAudioContext)(); audioContext.resume?.(); const now = audioContext.currentTime + .04;
  if (Array.isArray(audio)) audio.forEach((value,index) => tone(value, now + index * .62));
  else if (audio.chords) audio.chords.forEach((chord,index) => chord.forEach(value => tone(value, now + index * .9, .78, .075)));
  else if (audio.rhythm) { let beat = 0; audio.rhythm.forEach(value => { tone(76, now + beat * .42, .09, .15); beat += value; }); }
}
function playCurrent() { playAudio(state.questions[state.index]?.audio); }
function answer(value) {
  const current = state.questions[state.index]; if (!current) return; const correct = value === current.correct;
  if (correct) { state.correct++; state.streak++; showFeedback("That’s it"); if (current.audio && current.display.type !== "listen") playAudio(current.audio); }
  else { state.mistakes++; state.streak = 0; showFeedback(`${value} → ${current.correct}`, true); }
  state.index++;
  if (state.questions.length - state.index < 5) state.questions.push(...createQuestions(10));
  render();
}
function start(id = state.drill.id) {
  state.drill = DRILLS.find(d => d.id === id) || DRILLS[0]; state.questions = createQuestions(); state.index = state.streak = state.correct = state.mistakes = 0;
  state.track = state.drill.track; $("#drillName").textContent = state.drill.name; $("#drillCategory").textContent = TRACKS[state.track].label; $("#drillDescription").textContent = state.drill.description; $("#trackTitle").innerHTML = TRACKS[state.track].title;
  renderPicker(); render();
}
function setSheet(open) { $("#mobileSheet").hidden = !open; $("#mobileMenuButton").setAttribute("aria-expanded", String(open)); }

$("#resetButton").addEventListener("click", () => start()); $("#replayButton").addEventListener("click", playCurrent);
$("#mobileMenuButton").addEventListener("click", () => setSheet(true)); $(".sheet-backdrop").addEventListener("click", () => setSheet(false)); $(".sheet-close").addEventListener("click", () => setSheet(false));
function toggleSound() { state.sound = !state.sound; $("#soundToggle").setAttribute("aria-pressed", state.sound); $("#soundToggle").setAttribute("aria-label", `Turn sound ${state.sound ? "off" : "on"}`); $("#soundToggle .sound-label").textContent = `Sound ${state.sound ? "on" : "off"}`; $("#soundToggle .sound-icon").textContent = state.sound ? "◖))" : "◖×"; $("#mobileSound").setAttribute("aria-pressed", state.sound); $("#mobileSound span").textContent = state.sound ? "On" : "Off"; }
$("#soundToggle").addEventListener("click", toggleSound); $("#mobileSound").addEventListener("click", toggleSound);
document.addEventListener("keydown", event => {
  if (event.repeat) return;
  const letter = event.key.toUpperCase();
  const letterTarget = LETTERS.includes(letter) ? document.querySelector(`[data-answer="${letter}"]`) : null;
  const numberTarget = /^[1-9]$/.test(event.key) ? document.querySelectorAll("[data-answer]")[Number(event.key) - 1] : null;
  if (letterTarget) answer(letterTarget.dataset.answer);
  else if (numberTarget) answer(numberTarget.dataset.answer);
  else if (event.key === " " && !$("#replayButton").hidden) { event.preventDefault(); playCurrent(); }
  else if (event.key === "Escape") setSheet(false);
});
start();
