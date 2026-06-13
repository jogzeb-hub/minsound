// ── 상수 ──
const NOTE_PCS   = {C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const ACC_OFFSET = {b:-1,n:0,'#':1};
const QUALITY_INTERVALS = {
  maj:[0,4,7], m:[0,3,7], '5':[0,7],
  '7':[0,4,7,10], maj7:[0,4,7,11], m7:[0,3,7,10],
  m7b5:[0,3,6,10], dim7:[0,3,6,9], aug7:[0,4,8,10],
  '7sus4':[0,5,7,10], '7sus2':[0,2,7,10],
  '6':[0,4,7,9], m6:[0,3,7,9], '69':[0,4,7,9,14],
  '9':[0,4,7,10,14], maj9:[0,4,7,11,14], m9:[0,3,7,10,14],
  add9:[0,4,7,14], madd9:[0,3,7,14],
  '11':[0,4,7,10,14,17], maj11:[0,4,7,11,14,17], m11:[0,3,7,10,14,17],
  '13':[0,4,7,10,14,17,21], maj13:[0,4,7,11,14,17,21], m13:[0,3,7,10,14,17,21],
  sus2:[0,2,7], sus4:[0,5,7], dim:[0,3,6], aug:[0,4,8],
};
const QUALITY_COLORS = {
  maj:'#4a90d9', m:'#5a9e6f', '5':'#7a8898',
  '7':'#e8a44a', maj7:'#5a9e9e', m7:'#9e5aae',
  m7b5:'#c04040', dim7:'#b03030', aug7:'#d94a9e',
  '7sus4':'#3aabbb', '7sus2':'#5ab8cc',
  '6':'#c8a440', m6:'#7ab87a', '69':'#c89a30',
  '9':'#e07a20', maj9:'#4ab8b8', m9:'#8840b8',
  add9:'#60b050', madd9:'#50a060',
  '11':'#c86820', maj11:'#3898a8', m11:'#7030a8',
  '13':'#d4a020', maj13:'#30a878', m13:'#6028a0',
  sus2:'#4ab8d9', sus4:'#7ab85a', dim:'#e85a4a', aug:'#d94a9e',
};
const LABEL_MAP = { maj:'', '69':'6/9' };
const SAVES_KEY = 'minsound_saves';
const SAMPLE_PROJECT = (function() {
  const ch=[
    {root:'C',acc:'n',oct:3,quality:'maj7',inv:0,label:'Cmaj7',color:'#5a9e9e',lyrics:'처음 느낀 그대'},null,
    {root:'E',acc:'n',oct:3,quality:'m',inv:0,label:'Em',color:'#5a9e6f',lyrics:'눈빛은'},
    {root:'A',acc:'n',oct:3,quality:'m',inv:0,label:'Am',color:'#5a9e6f',lyrics:''},
    {root:'D',acc:'n',oct:3,quality:'m7',inv:0,label:'Dm7',color:'#9e5aae',lyrics:'혼자만의 오해'},null,
    {root:'G',acc:'n',oct:3,quality:'7',inv:0,label:'G7',color:'#e8a44a',lyrics:'였던가요'},null,
    {root:'C',acc:'n',oct:3,quality:'maj7',inv:0,label:'Cmaj7',color:'#5a9e9e',lyrics:'해맑은 미소로 나'},null,
    {root:'E',acc:'n',oct:3,quality:'m',inv:0,label:'Em',color:'#5a9e6f',lyrics:'를'},
    {root:'A',acc:'n',oct:3,quality:'m',inv:0,label:'Am',color:'#5a9e6f',lyrics:''},
    {root:'D',acc:'n',oct:3,quality:'m7',inv:0,label:'Dm7',color:'#9e5aae',lyrics:'바보로 '},
    {root:'G',acc:'n',oct:3,quality:'7',inv:0,label:'G7',color:'#e8a44a',lyrics:'만들었'},
    {root:'C',acc:'n',oct:3,quality:'maj7',inv:0,label:'Cmaj7',color:'#5a9e9e',lyrics:'소'},null,
    {root:'C',acc:'n',oct:3,quality:'maj7',inv:0,label:'Cmaj7',color:'#5a9e9e',lyrics:'내 곁을 떠나가던'},null,
    {root:'E',acc:'n',oct:3,quality:'m',inv:0,label:'Em',color:'#5a9e6f',lyrics:'날'},
    {root:'A',acc:'n',oct:3,quality:'m',inv:0,label:'Am',color:'#5a9e6f',lyrics:''},
    {root:'D',acc:'n',oct:3,quality:'m7',inv:0,label:'Dm7',color:'#9e5aae',lyrics:'가슴에 품었던'},null,
    {root:'G',acc:'n',oct:3,quality:'7',inv:0,label:'G7',color:'#e8a44a',lyrics:'분홍빛의'},null,
    {root:'C',acc:'n',oct:3,quality:'maj7',inv:0,label:'Cmaj7',color:'#5a9e9e',lyrics:'수많은 추억들'},null,
    {root:'E',acc:'n',oct:3,quality:'m',inv:0,label:'Em',color:'#5a9e6f',lyrics:'이'},
    {root:'A',acc:'n',oct:3,quality:'m',inv:0,label:'Am',color:'#5a9e6f',lyrics:''},
    {root:'D',acc:'n',oct:3,quality:'m7',inv:0,label:'Dm7',color:'#9e5aae',lyrics:'푸르게'},
    {root:'G',acc:'n',oct:3,quality:'7',inv:0,label:'G7',color:'#e8a44a',lyrics:'바래졌'},
    {root:'C',acc:'n',oct:3,quality:'maj7',inv:0,label:'Cmaj7',color:'#5a9e9e',lyrics:'소'},null,
    {root:'F',acc:'n',oct:3,quality:'maj',inv:0,label:'F',color:'#4a90d9',lyrics:'어제는 떠난'},null,
    {root:'E',acc:'n',oct:3,quality:'m',inv:0,label:'Em',color:'#5a9e6f',lyrics:'그대를'},null,
    {root:'D',acc:'n',oct:3,quality:'m7',inv:0,label:'Dm7',color:'#9e5aae',lyrics:'못하는 내가'},null,
    {root:'C',acc:'n',oct:3,quality:'maj7',inv:0,label:'Cmaj7',color:'#5a9e9e',lyrics:'미웠죠'},null,
    {root:'F',acc:'n',oct:3,quality:'maj',inv:0,label:'F',color:'#4a90d9',lyrics:'하지만 이젠'},null,
    {root:'E',acc:'n',oct:3,quality:'m',inv:0,label:'Em',color:'#5a9e6f',lyrics:'깨달아'},
    {root:'A',acc:'n',oct:3,quality:'m',inv:0,label:'Am',color:'#5a9e6f',lyrics:'요'},
    {root:'D',acc:'n',oct:3,quality:'m7',inv:0,label:'Dm7',color:'#9e5aae',lyrics:'그대만의 나였음'},null,
    {root:'G',acc:'n',oct:3,quality:'7',inv:0,label:'G7',color:'#e8a44a',lyrics:'을 다시'},null,
    {root:'E',acc:'n',oct:3,quality:'m',inv:0,label:'Em',color:'#5a9e6f',lyrics:'돌아온 그댈 위해'},null,
    {root:'A',acc:'n',oct:3,quality:'7',inv:0,label:'A7',color:'#e8a44a',lyrics:'내'},null,
    {root:'D',acc:'n',oct:3,quality:'m7',inv:0,label:'Dm7',color:'#9e5aae',lyrics:'모든 걸 드릴테요'},null,
    {root:'F',acc:'n',oct:3,quality:'m',inv:0,label:'Fm',color:'#5a9e6f',lyrics:''},
    {root:'G',acc:'n',oct:3,quality:'7',inv:0,label:'G7',color:'#e8a44a',lyrics:'우리'},
    {root:'E',acc:'n',oct:3,quality:'m',inv:0,label:'Em',color:'#5a9e6f',lyrics:'이대로 영원히'},null,
    {root:'A',acc:'n',oct:3,quality:'7',inv:0,label:'A7',color:'#e8a44a',lyrics:''},null,
    {root:'D',acc:'n',oct:3,quality:'m7',inv:0,label:'Dm7',color:'#9e5aae',lyrics:'헤어지지 않으'},null,
    {root:'F',acc:'n',oct:3,quality:'m',inv:0,label:'Fm',color:'#5a9e6f',lyrics:'리'},
    {root:'G',acc:'n',oct:2,quality:'7',inv:0,label:'G7',color:'#e8a44a',lyrics:''},
    {root:'C',acc:'n',oct:3,quality:'maj7',inv:0,label:'Cmaj7',color:'#5a9e9e',lyrics:'나 오직 그대만'},
    {root:'E',acc:'n',oct:3,quality:'m',inv:0,label:'Em',color:'#5a9e6f',lyrics:''},
    {root:'G',acc:'n',oct:3,quality:'m',inv:0,label:'Gm',color:'#5a9e6f',lyrics:'을'},
    {root:'A',acc:'n',oct:3,quality:'7',inv:0,label:'A7',color:'#e8a44a',lyrics:''},
    {root:'D',acc:'n',oct:3,quality:'m7',inv:0,label:'Dm7',color:'#9e5aae',lyrics:'사랑하기'},
    {root:'G',acc:'n',oct:3,quality:'7',inv:0,label:'G7',color:'#e8a44a',lyrics:'때문'},
    {root:'C',acc:'n',oct:3,quality:'maj7',inv:0,label:'Cmaj7',color:'#5a9e9e',lyrics:'에'},null,
  ];
  const opts={bpm:120,sound:'ep1',cpr:8,lyricsVisible:true,camLyricsOn:true};
  return {name:'사랑하기때문에 - 유재하',date:'샘플 (기본 제공)',chords:ch,...opts,options:opts};
})();
const PC_TO_SHARP = [
  ['C','n'], ['C','#'], ['D','n'], ['D','#'], ['E','n'], ['F','n'],
  ['F','#'], ['G','n'], ['G','#'], ['A','n'], ['A','#'], ['B','n']
];
const PC_TO_FLAT = [
  ['C','n'], ['D','b'], ['D','n'], ['E','b'], ['E','n'], ['F','n'],
  ['G','b'], ['G','n'], ['A','b'], ['A','n'], ['B','b'], ['B','n']
];
const TEXT_QUALITY_ALIASES = {
  '':'maj', maj:'maj', major:'maj', M:'maj', m:'m', min:'m', minor:'m', '-':'m',
  '5':'5', aug:'aug', '+':'aug', dim:'dim', o:'dim',
  '7':'7', M7:'maj7', maj7:'maj7', ma7:'maj7', m7:'m7', min7:'m7', '-7':'m7',
  m7b5:'m7b5', 'ø':'m7b5', dim7:'dim7', o7:'dim7', aug7:'aug7', '+7':'aug7',
  '7sus4':'7sus4', '7sus2':'7sus2',
  '6':'6', m6:'m6', min6:'m6', '69':'69', '6/9':'69',
  '9':'9', M9:'maj9', maj9:'maj9', m9:'m9', min9:'m9', add9:'add9', 'madd9':'madd9', 'm(add9)':'madd9',
  '11':'11', M11:'maj11', maj11:'maj11', m11:'m11', min11:'m11',
  '13':'13', M13:'maj13', maj13:'maj13', m13:'m13', min13:'m13',
  sus:'sus4', sus2:'sus2', sus4:'sus4',
};

// ── 빌더 상태 ──
let bRoot = 'C', bAcc = 'n', bQuality = 'maj', bOct = 3, bInv = 0;
let bIsRest = false;

// ── 목록 상태 ──
let chords = [];
let undoStack = [], redoStack = [];
const MAX_UNDO = 50;
let currentIdx = -1;
let isSpaceHeld = false;
let chordsPerRow = 4;
let selectedIdx = -1;
let selectionAnchor = -1;
let selectedRange = null;
let chordClipboard = null;
let dragWatch = null;
let dragState = null;
let dragJustFinished = false;

// ── 가사 ──
let lyricsVisible = false;
let camLyricsOn = false;

// ── 구간 반복 ──
let loopEnabled = false;

// ── 탭 템포 ──
let tapTimes = [];

// ── 카운트인 ──
let countInEnabled = false;
let countSynth = null;


// ── 사운드 / 자동재생 ──
let currentSound = 'basic';
let currentPlayStyle = 'none'; // 'none' | 'bossanova' | 'tango'
let autoBpm = 80;
const BPM_MIN = 40;
const BPM_MAX = 240;
const BPM_DEFAULT = 80;
let autoPlayActive = false;
let autoPlayTimer = null;
let autoPlayTimers = [];
let camTapReleaseTimer = null;
const CAM_TAP_PLAY_MS = 720;
let balladPoly = null;

function parseBpmValue(value) {
  if (value == null) return NaN;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return NaN;
    const numeric = Number(trimmed);
    if (Number.isFinite(numeric)) return numeric;
    const match = trimmed.match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : NaN;
  }
  return Number(value);
}

function normalizeBpm(value, fallback = BPM_DEFAULT) {
  let bpm = parseBpmValue(value);
  if (!Number.isFinite(bpm)) bpm = parseBpmValue(fallback);
  if (!Number.isFinite(bpm)) bpm = BPM_DEFAULT;
  return Math.max(BPM_MIN, Math.min(BPM_MAX, Math.round(bpm)));
}

function setAutoBpm(value, fallback = autoBpm) {
  autoBpm = normalizeBpm(value, fallback);
  const input = document.getElementById('bpmInput');
  if (input) input.value = autoBpm;
  return autoBpm;
}

function getAutoBpm() {
  return setAutoBpm(autoBpm, BPM_DEFAULT);
}

function queueAutoTimer(fn, delay) {
  const timerId = setTimeout(() => {
    autoPlayTimers = autoPlayTimers.filter(id => id !== timerId);
    if (autoPlayTimer === timerId) autoPlayTimer = null;
    fn();
  }, delay);
  autoPlayTimers.push(timerId);
  return timerId;
}

function clearAutoTimers() {
  autoPlayTimers.forEach(clearTimeout);
  autoPlayTimers = [];
  autoPlayTimer = null;
}

// ── 오디오 ──
let audioReady = false;
let chordGain, chordFilter;
const chordOscs = [];
const NUM_OSCS = 7;

async function ensureAudio() {
  if (audioReady) return;
  await Tone.start();
  const lim  = new Tone.Limiter(-2).toDestination();
  const comp = new Tone.Compressor({ threshold:-18, ratio:8, attack:0.003, release:0.12, knee:3 }).connect(lim);
  chordFilter = new Tone.Filter(2000, 'lowpass').connect(comp);
  chordGain = new Tone.Gain(0).connect(chordFilter);
  for (let i = 0; i < NUM_OSCS; i++) {
    const o = new Tone.Oscillator(220, 'triangle').connect(chordGain);
    o.start();
    chordOscs.push(o);
  }
  audioReady = true;
}

function midiToFreq(m) { return 440 * Math.pow(2, (m - 69) / 12); }

function getChordFreqs(root, acc, oct, quality, inv) {
  const base = (oct + 1) * 12 + NOTE_PCS[root] + (ACC_OFFSET[acc] ?? 0);
  const intervals = QUALITY_INTERVALS[quality] || [0, 4, 7];
  let notes = intervals.map(i => base + i);
  const n = Math.min(inv || 0, notes.length - 1);
  for (let v = 0; v < n; v++) {
    const minN = Math.min(...notes);
    notes[notes.indexOf(minN)] += 12;
    notes.sort((a, b) => a - b);
  }
  return notes.map(midiToFreq);
}

function playSoundFrom(root, acc, oct, quality, inv, hits = 1) {
  if (!audioReady) return;
  if (currentSound === 'balladpiano') {
    playBalladPiano(root, acc, oct, quality, inv, hits);
    return;
  }
  if (currentSound === 'ep1' || currentSound === 'ep2') {
    playEP(currentSound, root, acc, oct, quality, inv, hits);
    return;
  }
  const freqs = getChordFreqs(root, acc, oct, quality, inv);
  chordOscs.forEach((o, i) => o.frequency.rampTo(freqs[i % freqs.length], 0.04));
  chordGain.gain.rampTo(0.5 / NUM_OSCS, 0.07);
}

function stopSound() {
  if (!audioReady) return;
  chordGain.gain.rampTo(0, 0.14);
}

// ── 피아노 발라드 악기 (Salamander Grand Piano) ──
const PIANO_URLS = {
  'A0':'A0.mp3','C1':'C1.mp3','D#1':'Ds1.mp3','F#1':'Fs1.mp3',
  'A1':'A1.mp3','C2':'C2.mp3','D#2':'Ds2.mp3','F#2':'Fs2.mp3',
  'A2':'A2.mp3','C3':'C3.mp3','D#3':'Ds3.mp3','F#3':'Fs3.mp3',
  'A3':'A3.mp3','C4':'C4.mp3','D#4':'Ds4.mp3','F#4':'Fs4.mp3',
  'A4':'A4.mp3','C5':'C5.mp3','D#5':'Ds5.mp3','F#5':'Fs5.mp3',
  'A5':'A5.mp3','C6':'C6.mp3','D#6':'Ds6.mp3','F#6':'Fs6.mp3',
  'A7':'A7.mp3','C8':'C8.mp3',
};
const PIANO_BASE = 'https://tonejs.github.io/audio/salamander/';
let balladSamplerLoaded = false;

// ── 일렉 피아노 (MIDI.js FluidR3 GM) ──
const EP_URLS = {
  'A1':'A1.mp3','C2':'C2.mp3','Eb2':'Eb2.mp3','Gb2':'Gb2.mp3',
  'A2':'A2.mp3','C3':'C3.mp3','Eb3':'Eb3.mp3','Gb3':'Gb3.mp3',
  'A3':'A3.mp3','C4':'C4.mp3','Eb4':'Eb4.mp3','Gb4':'Gb4.mp3',
  'A4':'A4.mp3','C5':'C5.mp3','Eb5':'Eb5.mp3','Gb5':'Gb5.mp3',
  'A5':'A5.mp3','C6':'C6.mp3',
};
const EP1_BASE = 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/electric_piano_1-mp3/';
const EP2_BASE = 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/electric_piano_2-mp3/';
let ep1Poly = null, ep2Poly = null;
let ep1Gain = null, ep2Gain = null, balladGain = null;
let lastEP1Notes = [], lastEP2Notes = [], lastBalladNotes = [];

function ensureEPSynth(which) {
  if (which === 'ep1' && ep1Poly) return;
  if (which === 'ep2' && ep2Poly) return;
  const rv = new Tone.Reverb({ decay: 1.4, wet: 0.14 });
  rv.connect(Tone.Destination);
  const lim = new Tone.Limiter(-2);
  lim.connect(rv);
  const g = new Tone.Gain(2.4);
  g.connect(lim);
  const sampler = new Tone.Sampler({
    urls: EP_URLS,
    baseUrl: which === 'ep1' ? EP1_BASE : EP2_BASE,
    release: 1.5,
  });
  sampler.connect(g);
  if (which === 'ep1') { ep1Poly = sampler; ep1Gain = g; }
  else { ep2Poly = sampler; ep2Gain = g; }
}

function playEP(which, root, acc, oct, quality, inv, hits = 1) {
  ensureEPSynth(which);
  const sampler = which === 'ep1' ? ep1Poly : ep2Poly;
  const gn = which === 'ep1' ? ep1Gain : ep2Gain;
  if (gn) { gn.gain.cancelScheduledValues(Tone.now()); gn.gain.setValueAtTime(2.4, Tone.now()); }
  sampler.releaseAll(Tone.now());
  if (which === 'ep1') lastEP1Notes = []; else lastEP2Notes = [];
  const midiNotes = getChordMidi(root, acc, oct, quality, inv);
  const noteNames = midiNotes.map(midiToNoteName);
  const bassName = noteNames[0].replace(/(\d+)$/, m => String(Math.max(1, parseInt(m) - 1)));
  const upper = noteNames.length > 1 ? noteNames.slice(1) : [noteNames[0]];
  const allNotes = [bassName, ...upper];
  if (which === 'ep1') lastEP1Notes = allNotes; else lastEP2Notes = allNotes;
  const barDur = (60 / getAutoBpm()) * 4;
  const half = barDur / 2;
  const noteDur = barDur * 0.88;
  const baseVel = 0.95;
  const SPREAD = 0.018;
  const now = Tone.now() + 0.05;
  for (let hit = 0; hit < hits; hit++) {
    const ht = now + hit * half;
    const vs = hit === 0 ? 1.0 : 0.82;
    sampler.triggerAttackRelease(bassName, noteDur, ht, baseVel * bassLoudComp(bassName) * vs);
    upper.forEach((n, j) => {
      sampler.triggerAttackRelease(n, noteDur * 0.96, ht + (j + 1) * SPREAD, baseVel * vs * 0.88);
    });
  }
}

function ensureBalladSynth() {
  if (balladPoly) return;
  const rv = new Tone.Reverb({ decay: 0.9, wet: 0.10 });
  rv.connect(Tone.Destination);
  const lim = new Tone.Limiter(-3);
  lim.connect(rv);
  const g = new Tone.Gain(0.72);
  g.connect(lim);
  balladPoly = new Tone.Sampler({
    urls: PIANO_URLS,
    baseUrl: PIANO_BASE,
    release: 5.0,
    onload: () => { balladSamplerLoaded = true; },
  });
  balladPoly.connect(g);
  balladGain = g;
}

function midiToNoteName(m) {
  const NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  return NAMES[((m % 12) + 12) % 12] + (Math.floor(m / 12) - 1);
}

function getChordMidi(root, acc, oct, quality, inv) {
  const base = (oct + 1) * 12 + NOTE_PCS[root] + (ACC_OFFSET[acc] ?? 0);
  const intervals = QUALITY_INTERVALS[quality] || [0, 4, 7];
  let notes = intervals.map(i => base + i);
  const n = Math.min(inv || 0, notes.length - 1);
  for (let v = 0; v < n; v++) {
    const minN = Math.min(...notes);
    notes[notes.indexOf(minN)] += 12;
    notes.sort((a, b) => a - b);
  }
  return notes;
}

// 저음역 볼륨 보상 (minchord bassLoudComp 동일)
function bassLoudComp(noteName) {
  const m = noteName?.match(/(\d+)$/);
  if (!m) return 1;
  const oct = parseInt(m[1]);
  if (oct <= 1) return 1.55;
  if (oct === 2) return 1.30;
  if (oct === 3) return 1.10;
  return 1.0;
}

function playBalladPiano(root, acc, oct, quality, inv, hits = 1) {
  ensureBalladSynth();
  if (balladGain) { balladGain.gain.cancelScheduledValues(Tone.now()); balladGain.gain.setValueAtTime(0.72, Tone.now()); }
  if (lastBalladNotes.length) balladPoly.triggerRelease(lastBalladNotes, Tone.now());
  const midiNotes = getChordMidi(root, acc, oct, quality, inv);
  const noteNames = midiNotes.map(midiToNoteName);
  const bassName = noteNames[0].replace(/(\d+)$/, m => String(Math.max(1, parseInt(m) - 1)));
  const upper = noteNames.length > 1 ? noteNames.slice(1) : [noteNames[0]];
  lastBalladNotes = [bassName, ...upper];
  const barDur = (60 / getAutoBpm()) * 4;
  const half = barDur / 2;
  const baseVel = 0.70;
  const SPREAD = 0.020;
  const now = Tone.now() + 0.01;
  for (let hit = 0; hit < hits; hit++) {
    const ht = now + hit * half;
    const vs = hit === 0 ? 1.0 : 0.84;
    const noteDur = barDur * 1.2;
    const bv = Math.min(1.1, baseVel * vs * bassLoudComp(bassName));
    balladPoly.triggerAttackRelease(bassName, noteDur, ht, bv);
    upper.forEach((note, ni) => {
      const cv = Math.min(1.0, baseVel * vs * (1 - ni * 0.05));
      balladPoly.triggerAttackRelease(note, noteDur * 0.96, ht + SPREAD * (ni + 1), cv);
    });
  }
}

// ── 주법 (보사노바 / 탱고) ──
function getChordParts(c) {
  const midi  = getChordMidi(c.root, c.acc, c.oct, c.quality, c.inv);
  const names = midi.map(midiToNoteName);
  const bass  = names[0].replace(/(\d+)$/, m => String(Math.max(1, parseInt(m) - 1)));
  const upper = names.length > 1 ? names.slice(1) : [names[0]];
  return { bass, upper, all: [bass, ...names.slice(1)] };
}

function schedHit(sampler, notes, t, dur, vel) {
  notes.forEach((n, i) => sampler.triggerAttackRelease(n, dur, t + i * 0.014, vel));
}

function playBossaNova(c) {
  if (!audioReady || !c) return;
  const b   = 60 / getAutoBpm();          // 1박 = 초
  const now = Tone.now() + 0.05;
  const { bass, upper } = getChordParts(c);
  // 패턴: 베이스@0, 코드@1박, 코드@1.5박(짧게), 베이스@2박, 코드@3박, 코드@3.5박(짧게)
  if (currentSound === 'ep1' || currentSound === 'ep2') {
    ensureEPSynth(currentSound);
    const sam = currentSound === 'ep1' ? ep1Poly : ep2Poly;
    const gn  = currentSound === 'ep1' ? ep1Gain  : ep2Gain;
    if (gn) { gn.gain.cancelScheduledValues(Tone.now()); gn.gain.setValueAtTime(2.4, Tone.now()); }
    sam.releaseAll(Tone.now());
    const bv = bassLoudComp(bass);
    sam.triggerAttackRelease(bass,  b * 1.1, now,             0.90 * bv);
    schedHit(sam, upper, now + b * 1.0, b * 0.85, 0.74);
    schedHit(sam, upper, now + b * 1.5, b * 0.35, 0.58);
    sam.triggerAttackRelease(bass,  b * 0.9, now + b * 2.0,  0.82 * bv);
    schedHit(sam, upper, now + b * 3.0, b * 0.85, 0.74);
    schedHit(sam, upper, now + b * 3.5, b * 0.35, 0.58);
  } else if (currentSound === 'balladpiano') {
    ensureBalladSynth();
    if (balladGain) { balladGain.gain.cancelScheduledValues(Tone.now()); balladGain.gain.setValueAtTime(0.72, Tone.now()); }
    if (lastBalladNotes.length) balladPoly.triggerRelease(lastBalladNotes, Tone.now());
    lastBalladNotes = [bass, ...upper];
    const bv = Math.min(1.0, 0.70 * bassLoudComp(bass));
    balladPoly.triggerAttackRelease(bass, b * 1.2, now,            bv);
    schedHit(balladPoly, upper, now + b * 1.0, b * 0.85, 0.60);
    schedHit(balladPoly, upper, now + b * 1.5, b * 0.35, 0.48);
    balladPoly.triggerAttackRelease(bass, b * 0.9, now + b * 2.0, bv * 0.82);
    schedHit(balladPoly, upper, now + b * 3.0, b * 0.85, 0.60);
    schedHit(balladPoly, upper, now + b * 3.5, b * 0.35, 0.48);
  } else {
    playSoundFrom(c.root, c.acc, c.oct, c.quality, c.inv);
  }
}

function playTango(c) {
  if (!audioReady || !c) return;
  const b   = 60 / getAutoBpm();
  const now = Tone.now() + 0.05;
  const { bass, upper, all } = getChordParts(c);
  // 패턴: 강@0, 스탭@0.5박, 힛@1박, 강@2박, 스탭@2.5박, 힛@3.5박
  if (currentSound === 'ep1' || currentSound === 'ep2') {
    ensureEPSynth(currentSound);
    const sam = currentSound === 'ep1' ? ep1Poly : ep2Poly;
    const gn  = currentSound === 'ep1' ? ep1Gain  : ep2Gain;
    if (gn) { gn.gain.cancelScheduledValues(Tone.now()); gn.gain.setValueAtTime(2.4, Tone.now()); }
    sam.releaseAll(Tone.now());
    schedHit(sam, all, now,            b * 0.42, 0.92);
    schedHit(sam, all, now + b * 0.5,  b * 0.20, 0.72);
    schedHit(sam, all, now + b * 1.0,  b * 0.42, 0.80);
    schedHit(sam, all, now + b * 2.0,  b * 0.42, 0.92);
    schedHit(sam, all, now + b * 2.5,  b * 0.20, 0.72);
    schedHit(sam, all, now + b * 3.5,  b * 0.42, 0.80);
  } else if (currentSound === 'balladpiano') {
    ensureBalladSynth();
    if (balladGain) { balladGain.gain.cancelScheduledValues(Tone.now()); balladGain.gain.setValueAtTime(0.72, Tone.now()); }
    if (lastBalladNotes.length) balladPoly.triggerRelease(lastBalladNotes, Tone.now());
    lastBalladNotes = all;
    schedHit(balladPoly, all, now,            b * 0.42, 0.85);
    schedHit(balladPoly, all, now + b * 0.5,  b * 0.20, 0.66);
    schedHit(balladPoly, all, now + b * 1.0,  b * 0.42, 0.74);
    schedHit(balladPoly, all, now + b * 2.0,  b * 0.42, 0.85);
    schedHit(balladPoly, all, now + b * 2.5,  b * 0.20, 0.66);
    schedHit(balladPoly, all, now + b * 3.5,  b * 0.42, 0.74);
  } else {
    playSoundFrom(c.root, c.acc, c.oct, c.quality, c.inv);
  }
}

function playChordStyled(c, forcedStyle, hits = 2) {
  const style = forcedStyle || currentPlayStyle;
  if (style === 'bossanova') { playBossaNova(c); return; }
  if (style === 'tango')     { playTango(c);     return; }
  playSoundFrom(c.root, c.acc, c.oct, c.quality, c.inv, hits);
}

async function playCamStyled(style) {
  if (chords.length === 0) return;
  const idx = currentRealIdx();
  if (idx === -1) return;
  clearCamTapReleaseTimer();
  if (isSpaceHeld) onRelease();
  await ensureAudio();
  if (autoPlayActive) return;
  currentIdx = idx;
  const c = chords[currentIdx];
  isSpaceHeld = true;
  playChordStyled(c, style, 1);
  renderChordList(); updateCamDisplay(); scrollToActive();
  const spBtn = document.getElementById('spaceBtn');
  spBtn.classList.add('pressed'); spBtn.textContent = c.label;
  camTapReleaseTimer = setTimeout(() => {
    camTapReleaseTimer = null;
    if (!autoPlayActive) onRelease();
  }, (60000 / getAutoBpm()) * 4 + 300);
}

// ── 카메라 엔딩 롤 (베이스→코드→캡 빠른 롤 + 리타르단도) ──
function playCamEndingArpeggio() {
  if (!audioReady) return;
  const c = currentIdx >= 0 && currentIdx < chords.length ? chords[currentIdx] : null;
  if (!c) return;

  const midiNotes = getChordMidi(c.root, c.acc, c.oct, c.quality, c.inv);
  // 베이스(근음 옥타브 아래) → 코드음 → 캡(근음 한 옥타브 위) 로 근음 착지
  const rootMidi = (c.oct + 1) * 12 + NOTE_PCS[c.root] + (ACC_OFFSET[c.acc] ?? 0);
  const bassMidi = Math.max(12, rootMidi - 12);
  const capMidi  = rootMidi + 12;
  const allMidi  = [bassMidi, ...midiNotes, capMidi];
  const allNames = allMidi.map(midiToNoteName);
  const last = allNames.length - 1;

  // 누적 타이밍: 기본 0.06s, 마지막 두 음은 0.10s (리타르단도)
  const times = [];
  let t = 0;
  allNames.forEach((_, i) => {
    times.push(t);
    t += i >= last - 1 ? 0.14 : 0.10;
  });

  const now = Tone.now() + 0.04;
  const releaseAt = now + times[last] + 3.0; // 마지막 음 후 3초 유지 후 자연 페이드

  const getVel = (i, name) => {
    if (i === 0)    return Math.min(1,   0.85 * bassLoudComp(name));
    if (i === last) return 0.82;
    return 0.68;
  };

  const fadeOut = (gainNode, normalVal, fadeDur) => {
    const cutAt = Tone.now() + 0.03; // 30ms 무음 전환
    gainNode.gain.cancelScheduledValues(Tone.now());
    gainNode.gain.setValueAtTime(normalVal, Tone.now());
    gainNode.gain.linearRampToValueAtTime(0, cutAt);        // 이전 음 무음 컷
    gainNode.gain.setValueAtTime(normalVal, now);           // 아르페지오 시작 시 복원
    gainNode.gain.setValueAtTime(normalVal, releaseAt);     // 유지
    gainNode.gain.linearRampToValueAtTime(0.0001, releaseAt + fadeDur);
    setTimeout(() => {
      gainNode.gain.cancelScheduledValues(Tone.now());
      gainNode.gain.setValueAtTime(normalVal, Tone.now());
    }, (releaseAt - Tone.now() + fadeDur + 0.5) * 1000);
  };

  if (currentSound === 'ep1' || currentSound === 'ep2') {
    ensureEPSynth(currentSound);
    const sampler = currentSound === 'ep1' ? ep1Poly : ep2Poly;
    const gainNode = currentSound === 'ep1' ? ep1Gain : ep2Gain;
    if (gainNode) fadeOut(gainNode, 2.4, 6.0);
    sampler.releaseAll(Tone.now() + 0.03); // gain이 0 된 후 무음 종료
    allNames.forEach((n, i) => sampler.triggerAttack(n, now + times[i], getVel(i, n)));
  } else if (currentSound === 'balladpiano') {
    ensureBalladSynth();
    if (balladGain) fadeOut(balladGain, 0.72, 8.0);
    if (lastBalladNotes.length) balladPoly.triggerRelease(lastBalladNotes, Tone.now() + 0.03);
    lastBalladNotes = allNames;
    allNames.forEach((n, i) => balladPoly.triggerAttack(n, now + times[i], getVel(i, n)));
  } else {
    playSoundFrom(c.root, c.acc, c.oct, c.quality, c.inv);
  }
}

// ── 카운트인 신스 ──
function ensureCountSynth() {
  if (countSynth) return;
  countSynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.001, decay: 0.07, sustain: 0, release: 0.05 }
  });
  countSynth.volume.value = -8;
  countSynth.toDestination();
}

function playCountClick(accent) {
  ensureCountSynth();
  countSynth.triggerAttackRelease(accent ? 'C6' : 'G5', '32n', Tone.now());
}


// ── 라벨 ──
function buildLabel(root, acc, quality) {
  const a = acc === '#' ? '♯' : acc === 'b' ? '♭' : '';
  const q = Object.prototype.hasOwnProperty.call(LABEL_MAP, quality) ? LABEL_MAP[quality] : quality;
  return root + a + q;
}

function normalizeQualityText(raw) {
  let q = (raw || '').trim();
  q = q.replace(/[△Δ]/g, 'maj');
  q = q.replace(/♭/g, 'b').replace(/♯/g, '#');
  q = q.replace(/\s+/g, '');
  const lower = q.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(TEXT_QUALITY_ALIASES, q)) return TEXT_QUALITY_ALIASES[q];
  if (Object.prototype.hasOwnProperty.call(TEXT_QUALITY_ALIASES, lower)) return TEXT_QUALITY_ALIASES[lower];
  return null;
}

function normalizeQuotes(str) {
  // iOS/Mac 스마트 쿼트 → ASCII 쌍따옴표
  return str.replace(/[“”„«»]/g, '"');
}

function parseTextChordToken(token) {
  const raw = normalizeQuotes(token.trim());
  if (!raw) return null;
  if (raw === '-' || raw === '—' || raw.toLowerCase() === 'x' || raw.toLowerCase() === 'rest') return null;
  // 가사 추출: C"가사" 또는 Am^3"가사" 형식 (따옴표 안 공백 허용)
  let tokenBody = raw;
  let lyricsVal = '';
  const quoteMatch = raw.match(/^(.*?)"([^"]*)"(.*)$/);
  if (quoteMatch) {
    lyricsVal = quoteMatch[2];
    tokenBody = quoteMatch[1] + quoteMatch[3];
  }
  // 옥타브 접미사 추출: C^3, Am^2 등
  let forcedOct = null;
  const octMatch = tokenBody.match(/\^([1-6])$/);
  if (octMatch) {
    forcedOct = parseInt(octMatch[1]);
    tokenBody = tokenBody.slice(0, tokenBody.length - octMatch[0].length);
  }
  const head = tokenBody.split('/')[0].trim();
  const m = head.match(/^([A-Ga-g])([#b♯♭]?)(.*)$/);
  if (!m) return undefined;
  const root = m[1].toUpperCase();
  const acc = m[2] === '#' || m[2] === '♯' ? '#' : (m[2] === 'b' || m[2] === '♭' ? 'b' : 'n');
  const quality = normalizeQualityText(m[3]);
  if (!quality || !QUALITY_INTERVALS[quality]) return undefined;
  return {
    root, acc, oct: forcedOct !== null ? forcedOct : bOct, quality, inv: 0,
    label: buildLabel(root, acc, quality),
    color: QUALITY_COLORS[quality] || '#00a85a',
    lyrics: lyricsVal,
  };
}

function parseTextChords(text) {
  // 따옴표 안 공백 보존하면서 토큰 분리
  const tokens = (normalizeQuotes(text).match(/[^\s,"]*"[^"]*"|[^\s,]+/g) || []).filter(Boolean);
  const parsed = [];
  const invalid = [];
  tokens.forEach(token => {
    const chord = parseTextChordToken(token);
    if (chord === undefined) invalid.push(token);
    else parsed.push(chord);
  });
  return { parsed, invalid };
}

function addTextChords() {
  const input = document.getElementById('codeTextInput');
  const help = document.getElementById('codeTextHelp');
  const { parsed, invalid } = parseTextChords(input.value);
  if (!parsed.length && !invalid.length) return;
  if (invalid.length) {
    help.textContent = '인식 안 됨: ' + invalid.join(' ');
    help.classList.add('error');
    return;
  }
  saveHistory();
  const start = chords.length;
  chords.push(...parsed);
  input.value = '';
  help.textContent = `${parsed.length}개 추가됨`;
  help.classList.remove('error');
  setSelectionRange(start, start + parsed.length - 1);
  renderChordList();
  updateCamDisplay();
}

function transposeChordItem(c, semis) {
  if (!c) return;
  const pc = (NOTE_PCS[c.root] + (ACC_OFFSET[c.acc] ?? 0) + 12) % 12;
  const baseMidi = ((c.oct ?? 3) + 1) * 12 + pc;
  const nextMidi = Math.max(24, Math.min(95, baseMidi + semis));
  const nextPc = ((nextMidi % 12) + 12) % 12;
  const preferFlat = c.acc === 'b';
  const [root, acc] = (preferFlat ? PC_TO_FLAT : PC_TO_SHARP)[nextPc];
  c.root = root;
  c.acc = acc;
  c.oct = Math.max(1, Math.min(6, Math.floor(nextMidi / 12) - 1));
  c.label = buildLabel(c.root, c.acc, c.quality);
}

function transposeAllChords(semis) {
  if (!chords.length) return;
  saveHistory();
  chords.forEach(c => transposeChordItem(c, semis));
  if (isSpaceHeld && currentIdx >= 0 && chords[currentIdx]) {
    const c = chords[currentIdx];
    playSoundFrom(c.root, c.acc, c.oct, c.quality, c.inv);
  }
  renderChordList();
  updateCamDisplay();
}

// ── 빌더 UI ──
function updatePreview() {
  const el = document.getElementById('previewName');
  el.textContent = bIsRest ? '—' : buildLabel(bRoot, bAcc, bQuality);
  el.style.opacity = bIsRest ? '0.4' : '1';
  document.getElementById('emptyBtn').classList.toggle('sel', bIsRest);
}

function setupGroup(id, setter) {
  document.getElementById(id).querySelectorAll('.tog').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById(id).querySelectorAll('.tog').forEach(b => b.classList.remove('sel'));
      btn.classList.add('sel');
      setter(btn.dataset.val);
      updatePreview();
    });
  });
}

setupGroup('rootGrp', v => { bRoot = v; bIsRest = false; updatePreview(); });
setupGroup('accGrp',  v => { bAcc = v; bIsRest = false; updatePreview(); });
setupGroup('octGrp',  v => { bOct = parseInt(v); bIsRest = false; updatePreview(); });
setupGroup('invGrp',  v => { bInv = parseInt(v); bIsRest = false; updatePreview(); });

// ── 코드 카테고리 탭 ──
const QUAL_CATS = {
  '메이저':   ['maj', '5', 'aug', '6', '69', 'add9', 'maj7', 'maj9', 'maj11', 'maj13'],
  '마이너':   ['m', 'm6', 'madd9', 'm7', 'm7b5', 'm9', 'm11', 'm13'],
  '도미넌트': ['7', '9', '11', '13', 'aug7'],
  'sus':      ['sus2', 'sus4', '7sus2', '7sus4'],
  'dim':      ['dim', 'dim7'],
};
const QUAL_DISPLAY = { maj:'maj', m:'m', '5':'5', '7':'7', maj7:'maj7', m7:'m7',
  m7b5:'m7♭5', dim7:'dim7', aug7:'aug7', '7sus4':'7sus4', '7sus2':'7sus2',
  '6':'6', m6:'m6', '69':'6/9', '9':'9', maj9:'maj9', m9:'m9', add9:'add9', madd9:'madd9',
  '11':'11', maj11:'maj11', m11:'m11', '13':'13', maj13:'maj13', m13:'m13',
  sus2:'sus2', sus4:'sus4', dim:'dim', aug:'aug' };

let activeCat = '메이저';

function renderQualButtons() {
  const grp = document.getElementById('qualGrp');
  grp.innerHTML = '';
  (QUAL_CATS[activeCat] || []).forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'tog' + (bQuality === q ? ' sel' : '');
    btn.dataset.val = q;
    btn.textContent = QUAL_DISPLAY[q] || q;
    btn.addEventListener('click', () => {
      bQuality = q;
      bIsRest = false;
      grp.querySelectorAll('.tog').forEach(b => b.classList.remove('sel'));
      btn.classList.add('sel');
      updatePreview();
    });
    grp.appendChild(btn);
  });
}

document.getElementById('qualTabs').querySelectorAll('.qtab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.getElementById('qualTabs').querySelectorAll('.qtab').forEach(t => t.classList.remove('sel'));
    tab.classList.add('sel');
    activeCat = tab.dataset.cat;
    renderQualButtons();
  });
});

renderQualButtons();

document.getElementById('previewPlayBtn').addEventListener('click', async () => {
  await ensureAudio();
  playSoundFrom(bRoot, bAcc, bOct, bQuality, bInv);
  setTimeout(stopSound, 1300);
});

// ── 코드가 점유하는 박자 수 (뒤따르는 null 포함) ──
function chordBeatCount(idx) {
  let count = 1;
  let i = idx + 1;
  while (i < chords.length && chords[i] === null) { count++; i++; }
  return count;
}

// ── 다음 실제 코드 인덱스 (null 건너뜀) ──
function nextRealIdx(from) {
  if (chords.length === 0) return -1;
  let idx = (from + 1) % chords.length;
  for (let i = 0; i < chords.length; i++) {
    if (chords[idx] !== null) return idx;
    idx = (idx + 1) % chords.length;
  }
  return -1; // 전부 빈칸
}

function prevRealIdx(from) {
  if (chords.length === 0) return -1;
  let idx = from - 1;
  if (idx < 0) idx = chords.length - 1;
  for (let i = 0; i < chords.length; i++) {
    if (chords[idx] !== null) return idx;
    idx = (idx - 1 + chords.length) % chords.length;
  }
  return -1;
}

function currentRealIdx() {
  if (chords.length === 0) return -1;
  if (currentIdx >= 0 && currentIdx < chords.length && chords[currentIdx] !== null) return currentIdx;
  const from = currentIdx >= 0 && currentIdx < chords.length ? currentIdx - 1 : -1;
  return nextRealIdx(from);
}

function activePlaybackRealIdx() {
  return currentRealIdx();
}

function showAutoChord(c) {
  isSpaceHeld = true;
  renderChordList();
  updateCamDisplay();
  scrollToActive();
  const spBtn = document.getElementById('spaceBtn');
  spBtn.classList.add('pressed');
  spBtn.textContent = c.label;
}

function cloneChord(c) {
  return c === null ? null : JSON.parse(JSON.stringify(c));
}

function fitCamLyrics() {
  const el = document.getElementById('camLyricsText');
  if (!el) return;
  el.style.fontSize = '';
  const maxW = (el.parentElement ? el.parentElement.clientWidth : window.innerWidth) * 0.46;
  let fs = parseFloat(window.getComputedStyle(el).fontSize) || 20;
  while (el.scrollWidth > maxW && fs > 9) {
    fs -= 1;
    el.style.fontSize = fs + 'px';
  }
}

let _lyricsAnimTimer = null;
function animateLyricsText(el, newText) {
  if (!el) return;
  if (el.textContent === newText) return;
  if (_lyricsAnimTimer) {
    clearTimeout(_lyricsAnimTimer);
    _lyricsAnimTimer = null;
    el.classList.remove('lyric-slide-in', 'lyric-slide-out');
    el.textContent = newText;
    void el.offsetWidth;
    el.classList.add('lyric-slide-in');
    fitCamLyrics();
    return;
  }
  el.classList.remove('lyric-slide-in');
  el.classList.add('lyric-slide-out');
  _lyricsAnimTimer = setTimeout(() => {
    _lyricsAnimTimer = null;
    el.textContent = newText;
    el.classList.remove('lyric-slide-out');
    void el.offsetWidth;
    el.classList.add('lyric-slide-in');
    fitCamLyrics();
  }, 140);
}

function normalizeRange(start, end) {
  if (start < 0 || end < 0 || start >= chords.length || end >= chords.length) return null;
  return { start: Math.min(start, end), end: Math.max(start, end) };
}

function getSelectionRange() {
  if (selectedRange) return normalizeRange(selectedRange.start, selectedRange.end);
  if (selectedIdx >= 0 && selectedIdx < chords.length) return { start: selectedIdx, end: selectedIdx };
  return null;
}

function isIdxSelected(idx) {
  const r = getSelectionRange();
  return !!r && idx >= r.start && idx <= r.end;
}

function setSelectionRange(start, end) {
  const r = normalizeRange(start, end);
  if (!r) {
    clearSelection();
    return;
  }
  selectedRange = r;
  selectedIdx = r.start;
  selectionAnchor = start;
}

function selectChordIdx(idx, extend = false) {
  if (idx < 0 || idx >= chords.length) {
    clearSelection();
    return;
  }
  if (extend && selectionAnchor >= 0 && selectionAnchor < chords.length) {
    selectedRange = normalizeRange(selectionAnchor, idx);
    selectedIdx = idx;
    return;
  }
  selectedIdx = idx;
  selectionAnchor = idx;
  selectedRange = { start: idx, end: idx };
}

function clearSelection() {
  selectedIdx = -1;
  selectionAnchor = -1;
  selectedRange = null;
}

function ensureDragGhost() {
  let ghost = document.getElementById('dragGhost');
  if (!ghost) {
    ghost = document.createElement('div');
    ghost.id = 'dragGhost';
    ghost.className = 'drag-ghost hidden';
    document.body.appendChild(ghost);
  }
  return ghost;
}

function remapIdxAfterMove(idx, from, to) {
  if (idx < 0) return idx;
  if (idx === from) return to;
  if (from < to && idx > from && idx <= to) return idx - 1;
  if (from > to && idx >= to && idx < from) return idx + 1;
  return idx;
}

function remapIdxAfterRangeMove(idx, start, end, to, insertAt) {
  if (idx < 0) return idx;
  const count = end - start + 1;
  if (idx >= start && idx <= end) return insertAt + (idx - start);
  if (to > end && idx > end && idx <= to) return idx - count;
  if (to < start && idx >= to && idx < start) return idx + count;
  return idx;
}

function moveChordRange(start, end, to) {
  const r = normalizeRange(start, end);
  if (!r || to < 0 || to >= chords.length || (to >= r.start && to <= r.end)) return false;
  saveHistory();
  const count = r.end - r.start + 1;
  const prevCurrent = currentIdx;
  const block = chords.splice(r.start, count);
  const insertAt = to > r.end ? to - count + 1 : to;
  chords.splice(insertAt, 0, ...block);
  currentIdx = remapIdxAfterRangeMove(prevCurrent, r.start, r.end, to, insertAt);
  setSelectionRange(insertAt, insertAt + count - 1);
  return true;
}

function removeChordBox(idx) {
  chords.splice(idx, 1);
  if (currentIdx > idx) currentIdx -= 1;
  else if (currentIdx >= chords.length) currentIdx = chords.length - 1;
  clearSelection();
}

function saveHistory() {
  undoStack.push(JSON.parse(JSON.stringify(chords)));
  if (undoStack.length > MAX_UNDO) undoStack.shift();
  redoStack = [];
}
function undo() {
  if (!undoStack.length) return;
  redoStack.push(JSON.parse(JSON.stringify(chords)));
  chords = undoStack.pop();
  currentIdx = -1; clearSelection();
  renderChordList(); updateCamDisplay();
}
function redo() {
  if (!redoStack.length) return;
  undoStack.push(JSON.parse(JSON.stringify(chords)));
  chords = redoStack.pop();
  currentIdx = -1; clearSelection();
  renderChordList(); updateCamDisplay();
}
function deleteOrClear(idx) {
  saveHistory();
  if (chords[idx] !== null) {
    chords[idx] = null;
  } else {
    chords.splice(idx, 1);
    if (currentIdx > idx) currentIdx -= 1;
    else if (currentIdx >= chords.length) currentIdx = chords.length - 1;
    clearSelection();
  }
}

function deleteSelected() {
  const r = getSelectionRange();
  if (!r) {
    if (currentIdx >= 0 && currentIdx < chords.length) {
      deleteOrClear(currentIdx);
      renderChordList(); updateCamDisplay();
    }
    return;
  }
  saveHistory();
  chords.splice(r.start, r.end - r.start + 1);
  currentIdx = chords.length > 0 ? Math.min(r.start, chords.length - 1) : -1;
  clearSelection();
  renderChordList(); updateCamDisplay();
}

function changeChordOct(idx, delta) {
  const c = chords[idx];
  if (!c) return;
  saveHistory();
  c.oct = Math.max(1, Math.min(6, (c.oct ?? 3) + delta));
  if (isSpaceHeld && idx === currentIdx) playSoundFrom(c.root, c.acc, c.oct, c.quality, c.inv);
  renderChordList();
  updateCamDisplay();
}

function changeChordInv(idx, delta) {
  const c = chords[idx];
  if (!c) return;
  saveHistory();
  const maxI = (QUALITY_INTERVALS[c.quality] || [0,4,7]).length - 1;
  c.inv = Math.max(0, Math.min(maxI, (c.inv ?? 0) + delta));
  if (isSpaceHeld && idx === currentIdx) playSoundFrom(c.root, c.acc, c.oct, c.quality, c.inv);
  renderChordList();
  updateCamDisplay();
}

function copySelectedChord() {
  const r = getSelectionRange();
  if (!r) return false;
  chordClipboard = chords.slice(r.start, r.end + 1).map(cloneChord);
  return true;
}

function pasteChordBox() {
  if (!Array.isArray(chordClipboard) || chordClipboard.length === 0) return false;
  saveHistory();
  const items = chordClipboard.map(cloneChord);
  const r = getSelectionRange();
  const insertAt = r ? r.end + 1 : chords.length;
  chords.splice(insertAt, 0, ...items);
  if (currentIdx >= insertAt) currentIdx += items.length;
  setSelectionRange(insertAt, insertAt + items.length - 1);
  renderChordList();
  updateCamDisplay();
  return true;
}

function toggleLineBreakAtSelection() {
  if (chordsPerRow !== 0) {
    chordsPerRow = 0;
    document.getElementById('cprSel').value = '0';
  }
  const r = getSelectionRange();
  if (!r || r.start <= 0) return false;
  const c = chords[r.start];
  if (!c) return false;
  c.lineBreakBefore = !c.lineBreakBefore;
  renderChordList();
  return true;
}

function startDragWatch(e, idx, card) {
  if (e.button !== 0) return;
  if (e.shiftKey) return;
  if (!document.getElementById('camOverlay').classList.contains('hidden')) return;
  if (e.target.closest('.del-btn') || e.target.closest('.card-oct-wrap') || e.target.closest('.card-inv-wrap')) return;
  if (!isIdxSelected(idx)) selectChordIdx(idx);
  const range = getSelectionRange() || { start: idx, end: idx };
  dragWatch = { idx, range, card, startX: e.clientX, startY: e.clientY, started: false };
}

// ── 코드 목록 렌더 ──
function renderChordList() {
  const container = document.getElementById('chordItems');
  document.getElementById('chordCount').textContent = chords.length + '개';
  document.querySelector('.chord-list-section').classList.toggle('lyrics-mode', lyricsVisible);

  if (chords.length === 0) {
    container.innerHTML = '<div class="empty-msg">코드를 추가하면 여기에 표시됩니다</div>';
    return;
  }

  const readyIdx = currentRealIdx();
  const activeIdx = activePlaybackRealIdx();
  container.innerHTML = '';

  const rows = [];
  if (chordsPerRow > 0) {
    for (let rowStart = 0; rowStart < chords.length; rowStart += chordsPerRow) {
      rows.push({ start: rowStart, end: Math.min(rowStart + chordsPerRow, chords.length) });
    }
  } else {
    let rowStart = 0;
    for (let i = 1; i < chords.length; i++) {
      if (chords[i] && chords[i].lineBreakBefore) {
        rows.push({ start: rowStart, end: i });
        rowStart = i;
      }
    }
    rows.push({ start: rowStart, end: chords.length });
  }

  rows.forEach(({ start: rowStart, end: rowEnd }) => {
    const rowEl = document.createElement('div');
    rowEl.className = 'chord-row';

    const numEl = document.createElement('span');
    numEl.className = 'row-num';
    numEl.textContent = rowStart + 1;
    rowEl.appendChild(numEl);

    const cardsEl = document.createElement('div');
    cardsEl.className = 'row-cards';

    for (let i = rowStart; i < rowEnd; i++) {
      const c = chords[i];
      const isActive = (i === currentIdx || i === activeIdx) && isSpaceHeld;
      const isNext   = i === readyIdx && !isSpaceHeld;
      const isSelected = isIdxSelected(i);
      const breakClass = chordsPerRow === 0 && i > 0 && c && c.lineBreakBefore ? ' line-break-before' : '';

      const card = document.createElement('div');
      card.dataset.idx = i;
      const barStartClass = (chordsPerRow > 0 && i === rowStart) ? ' bar-start' : '';

      if (c === null) {
        card.className = 'chord-card empty-card' + barStartClass + (isSelected ? ' selected' : '');
        card.innerHTML = `
          <span class="card-num">${i + 1}</span>
          <span class="card-name">—</span>
          <button class="del-btn" title="삭제">×</button>
        `;
      } else {
        card.className = 'chord-card' + barStartClass + breakClass + (isActive ? ' active' : '') + (isNext ? ' next-up' : '') + (isSelected ? ' selected' : '');
        if (isActive) {
          card.style.borderColor = c.color;
          card.style.backgroundColor = c.color + '20';
          card.style.boxShadow = `0 0 16px ${c.color}55`;
        }
        card.innerHTML = `
          <span class="card-num">${i + 1}</span>
          <span class="card-name" style="color:${isActive ? c.color : ''}">${c.label}</span>
          <button class="del-btn" title="삭제">×</button>
        `;
        const octWrap = document.createElement('div');
        octWrap.className = 'card-oct-wrap';
        const octUp = document.createElement('button');
        octUp.className = 'oct-btn';
        octUp.textContent = '▲';
        octUp.title = '옥타브 올리기';
        octUp.addEventListener('click', e => {
          e.stopPropagation();
          selectChordIdx(i);
          changeChordOct(i, 1);
        });
        const octLbl = document.createElement('span');
        octLbl.className = 'oct-label';
        octLbl.textContent = c.oct ?? 3;
        const octDn = document.createElement('button');
        octDn.className = 'oct-btn';
        octDn.textContent = '▼';
        octDn.title = '옥타브 내리기';
        octDn.addEventListener('click', e => {
          e.stopPropagation();
          selectChordIdx(i);
          changeChordOct(i, -1);
        });
        octWrap.append(octUp, octLbl, octDn);
        card.appendChild(octWrap);

        const invWrap = document.createElement('div');
        invWrap.className = 'card-inv-wrap';
        const invUp = document.createElement('button');
        invUp.className = 'oct-btn';
        invUp.textContent = '▲';
        invUp.title = '전위 올리기';
        invUp.addEventListener('click', e => { e.stopPropagation(); selectChordIdx(i); changeChordInv(i, 1); });
        const invLbl = document.createElement('span');
        invLbl.className = 'inv-label';
        invLbl.textContent = ['근','1전','2전','3전'][c.inv ?? 0] || '근';
        const invDn = document.createElement('button');
        invDn.className = 'oct-btn';
        invDn.textContent = '▼';
        invDn.title = '전위 내리기';
        invDn.addEventListener('click', e => { e.stopPropagation(); selectChordIdx(i); changeChordInv(i, -1); });
        invWrap.append(invUp, invLbl, invDn);
        card.appendChild(invWrap);

        if (lyricsVisible) {
          const lyricInput = document.createElement('input');
          lyricInput.className = 'lyric-input';
          lyricInput.type = 'text';
          lyricInput.placeholder = '가사';
          lyricInput.value = c.lyrics || '';
          lyricInput.addEventListener('input', e => { chords[i].lyrics = e.target.value; updateCamDisplay(); });
          lyricInput.addEventListener('click', e => e.stopPropagation());
          lyricInput.addEventListener('pointerdown', e => e.stopPropagation());
          card.appendChild(lyricInput);
        }
      }

      card.querySelector('.del-btn').addEventListener('click', e => {
        e.stopPropagation();
        deleteOrClear(i);
        renderChordList();
        updateCamDisplay();
      });
      card.addEventListener('pointerdown', e => startDragWatch(e, i, card));
      card.addEventListener('click', e => {
        if (e.target.closest('.del-btn') || e.target.closest('.card-oct-wrap') || e.target.closest('.card-inv-wrap') || e.target.closest('.lyric-input')) return;
        if (dragJustFinished) { dragJustFinished = false; return; }
        if (e.shiftKey) {
          selectChordIdx(i, true);
          renderChordList();
          return;
        }
        saveHistory();
        chords[i] = bIsRest ? null : {
          root: bRoot, acc: bAcc, oct: bOct, quality: bQuality, inv: bInv,
          label: buildLabel(bRoot, bAcc, bQuality),
          color: QUALITY_COLORS[bQuality] || '#00a85a',
          lyrics: (chords[i] ? chords[i].lyrics : '') || '',
        };
        selectChordIdx(i);
        renderChordList();
        updateCamDisplay();
      });
      cardsEl.appendChild(card);
    }

    rowEl.appendChild(cardsEl);
    container.appendChild(rowEl);
  });
}

document.getElementById('cprSel').addEventListener('change', e => {
  chordsPerRow = parseInt(e.target.value);
  updateCardSize();
  renderChordList();
});

document.getElementById('breakBtn').addEventListener('click', () => {
  toggleLineBreakAtSelection();
});
document.getElementById('transposeDownBtn').addEventListener('click', () => transposeAllChords(-1));
document.getElementById('transposeUpBtn').addEventListener('click', () => transposeAllChords(1));

function chordsToText() {
  return chords.map(c => {
    if (!c) return '-';
    const root = c.root + (c.acc === '#' ? '#' : c.acc === 'b' ? 'b' : '');
    const qual = c.quality === 'maj' ? '' : c.quality;
    let token = root + qual;
    if ((c.oct ?? 3) !== 3) token += '^' + c.oct;
    if (c.lyrics) token += '"' + c.lyrics + '"';
    return token;
  }).join(' ');
}

function mergeLyrics() {
  saveHistory();
  const input = document.getElementById('codeTextInput');
  const tokens = (normalizeQuotes(input.value).match(/[^\s,"]*"[^"]*"|[^\s,]+/g) || []).filter(Boolean);
  let changed = 0;
  for (let i = 0; i < tokens.length && i < chords.length; i++) {
    const token = tokens[i];
    if (token === '-' || !chords[i]) continue;
    const qm = token.match(/"([^"]*)"/);
    if (qm) {
      chords[i].lyrics = qm[1];
      changed++;
    }
  }
  if (!lyricsVisible) {
    setLyricsVisible(true, false);
  }
  renderChordList();
  updateCamDisplay();
  const help = document.getElementById('codeTextHelp');
  help.textContent = `가사 ${changed}개 병합됨`;
  help.classList.remove('error');
}

document.getElementById('codeTextMergeLyricsBtn').addEventListener('click', mergeLyrics);

document.getElementById('copyLyricsMergeBtn').addEventListener('click', () => {
  const chordText = chordsToText();
  if (!chordText) {
    alert('먼저 코드를 입력해주세요.');
    return;
  }
  const prompt = `악보 이미지와 아래 코드 목록을 보고, 각 코드에 해당 가사를 삽입해줘.

## 현재 코드 목록
${chordText}

## 가사 소속 규칙
- 어떤 코드에 가사가 속하는지는 **악보상 위치**로 결정한다
- 해당 코드가 시작되는 시점부터 **다음 코드가 나타나기 직전**까지의 모든 가사 음절이 그 코드의 가사다
- 한 코드에 여러 음절이 걸쳐 있으면 전부 이어붙여 하나의 따옴표 안에 담는다 (예: C"사랑해 그대를")

## 줄 바뀜 확인 (매 줄 첫 코드에서 반드시 점검)
- 악보에서 새로운 줄이 시작될 때마다, 그 줄의 **첫 번째 코드**와 **첫 번째 가사 음절**이 정확히 매칭되는지 확인한다
- 매칭이 맞지 않으면 앞 줄에서 가사를 모두 소진했는지 다시 검토하고 수정한다

## 전체 완주 확인
- 악보의 첫 가사부터 마지막 가사까지 하나도 빠짐없이 코드에 배분해야 한다
- 가사가 남거나, 가사 없는 코드가 지나치게 많으면 매핑 오류이므로 처음부터 재검토한다

## 출력 규칙
- 코드 목록의 순서와 개수를 **그대로** 유지 (추가·삭제 금지)
- 가사 없는 코드(인트로·간주·연주 구간)는 코드명만 출력
- -는 빈 슬롯이므로 그대로 - 출력
- 한 줄로 출력, 설명 없이

코드"가사" 텍스트만 출력.`;
  navigator.clipboard.writeText(prompt).then(() => {
    const btn = document.getElementById('copyLyricsMergeBtn');
    btn.innerHTML = '✅ 복사 완료!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = '📋 가사 병합<br><span class="copy-sub">(코드 포함)</span>';
      btn.classList.remove('copied');
    }, 2000);
  });
});

document.getElementById('codeTextExtractBtn').addEventListener('click', () => {
  const text = chordsToText();
  const input = document.getElementById('codeTextInput');
  input.value = text;
  input.focus();
  document.getElementById('codeTextHelp').textContent = '현재 코드 목록을 텍스트로 추출했습니다.';
  document.getElementById('codeTextHelp').classList.remove('error');
});

document.getElementById('codeTextAddBtn').addEventListener('click', () => {
  addTextChords();
  document.getElementById('textInputModal').classList.add('hidden');
});
document.getElementById('codeTextHoldBtn').addEventListener('click', () => {
  const input = document.getElementById('codeTextInput');
  const tokens = input.value.trim().split(/[\s,]+/);
  let prev = '';
  const expanded = tokens.map(t => {
    if (t === '-' || t === '—') return prev || t;
    if (t) prev = t;
    return t;
  });
  input.value = expanded.join(' ');
  addTextChords();
});
document.getElementById('codeTextInput').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    addTextChords();
    document.getElementById('textInputModal').classList.add('hidden');
  }
});

// ── 텍스트 입력 팝업 ──
document.getElementById('textInputOpenBtn').addEventListener('click', () => {
  document.getElementById('textInputModal').classList.remove('hidden');
  setTimeout(() => document.getElementById('codeTextInput').focus(), 50);
});
document.getElementById('textInputModalCloseBtn').addEventListener('click', () => {
  document.getElementById('textInputModal').classList.add('hidden');
});
document.getElementById('textInputModal').addEventListener('click', e => {
  if (e.target === document.getElementById('textInputModal'))
    document.getElementById('textInputModal').classList.add('hidden');
});

document.getElementById('emptyBtn').addEventListener('click', () => {
  bIsRest = true;
  updatePreview();
});

document.getElementById('addBtn').addEventListener('click', () => {
  saveHistory();
  if (bIsRest) {
    chords.push(null);
    selectChordIdx(chords.length - 1);
    renderChordList();
    updateCamDisplay();
    return;
  }
  chords.push({
    root: bRoot, acc: bAcc, oct: bOct, quality: bQuality, inv: bInv,
    label: buildLabel(bRoot, bAcc, bQuality),
    color: QUALITY_COLORS[bQuality] || '#00a85a',
  });
  selectChordIdx(chords.length - 1);
  renderChordList();
  updateCamDisplay();
});

document.getElementById('undoBtn').addEventListener('click', undo);
document.getElementById('redoBtn').addEventListener('click', redo);
document.getElementById('copyChordBtn').addEventListener('click', () => copySelectedChord());
document.getElementById('pasteChordBtn').addEventListener('click', () => { if (pasteChordBox()) renderChordList(); });

document.getElementById('clearAllBtn').addEventListener('click', () => {
  if (!chords.length) return;
  saveHistory();
  chords = []; currentIdx = -1; clearSelection(); isSpaceHeld = false;
  stopSound();
  renderChordList();
  updateCamDisplay();
  const btn = document.getElementById('spaceBtn');
  btn.classList.remove('pressed');
  btn.textContent = 'SPACE';
});

// ── 반응형 카드 크기 ──
function updateCardSize() {
  const section = document.querySelector('.chord-list-section');
  if (!section || chordsPerRow === 0) {
    document.documentElement.style.setProperty('--card-size', '68px');
    document.documentElement.style.setProperty('--card-name-fs', '1.05rem');
    return;
  }
  const availW = section.clientWidth - 32 - 26; // padding + row-num
  const gapTotal = (chordsPerRow - 1) * 5;
  const sz = Math.min(68, Math.max(34, Math.floor((availW - gapTotal) / chordsPerRow)));
  const nameFz = sz >= 60 ? '1.05rem' : sz >= 50 ? '0.90rem' : sz >= 42 ? '0.76rem' : '0.64rem';
  document.documentElement.style.setProperty('--card-size', sz + 'px');
  document.documentElement.style.setProperty('--card-name-fs', nameFz);
}

// ── 재생 중 활성 줄 맨 위로 스크롤 ──
function scrollToActive() {
  if (currentIdx < 0) return;
  requestAnimationFrame(() => {
    const section = document.querySelector('.chord-list-section');
    const card = document.querySelector(`#chordItems [data-idx="${currentIdx}"]`);
    const row = card?.closest('.chord-row');
    if (!row || !section) return;
    const target = section.scrollTop + row.getBoundingClientRect().top
                   - section.getBoundingClientRect().top - 12;
    section.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
  });
}

// ── 자동재생 ──
function autoPlayStep() {
  if (!autoPlayActive || chords.length === 0) return;

  // null 슬롯은 이전 코드 길이 연장으로 처리한다.
  const idx = currentRealIdx();
  if (idx === -1) { stopAutoPlay(); return; }
  currentIdx = idx;
  const c = chords[currentIdx];
  const slotCount = chordBeatCount(idx);
  const effectiveBeats = slotCount * 4;
  playChordStyled(c);
  showAutoChord(c);
  const beatMs = (60 / getAutoBpm()) * 1000;
  const totalMs = beatMs * effectiveBeats;
  autoPlayTimer = queueAutoTimer(() => {
    if (!autoPlayActive) return;
    if (currentSound === 'basic') stopSound();
    isSpaceHeld = false;
    let nextIdx = idx + slotCount;
    if (loopEnabled) {
      const range = getSelectionRange();
      if (range && nextIdx > range.end) nextIdx = range.start;
      else nextIdx = nextIdx % chords.length;
    } else {
      nextIdx = nextIdx % chords.length;
    }
    currentIdx = nextIdx;
    renderChordList(); updateCamDisplay();
    autoPlayTimer = queueAutoTimer(() => { if (autoPlayActive) autoPlayStep(); }, 80);
  }, Math.max(200, totalMs - 80));
}

function startAutoPlay() {
  if (autoPlayActive) { stopAutoPlay(); return; }
  if (!chords.length) return;
  clearCamTapReleaseTimer();
  if (isSpaceHeld) onRelease();
  clearAutoTimers();
  ensureAudio().then(() => {
    autoPlayActive = true;
    document.getElementById('autoPlayBtn').classList.add('active');
    document.getElementById('autoPlayBtn').textContent = '⏹ 자동재생 중';
    if (currentIdx < 0 || currentIdx >= chords.length) currentIdx = -1;
    if (countInEnabled) {
      const beats = chordsPerRow > 0 ? chordsPerRow : 4;
      const beatMs = (60 / getAutoBpm()) * 1000;
      for (let b = 0; b < beats; b++) {
        queueAutoTimer(() => { playCountClick(b === 0); }, b * beatMs);
      }
      queueAutoTimer(() => { if (autoPlayActive) autoPlayStep(); }, beats * beatMs);
    } else {
      autoPlayStep();
    }
  });
}

function stopAutoPlay() {
  autoPlayActive = false;
  clearCamTapReleaseTimer();
  clearAutoTimers();
  if (currentSound === 'basic') stopSound();
  isSpaceHeld = false;
  renderChordList();
  updateCamDisplay();
  const spBtn = document.getElementById('spaceBtn');
  spBtn.classList.remove('pressed');
  spBtn.textContent = 'SPACE';
  const apBtn = document.getElementById('autoPlayBtn');
  if (apBtn) { apBtn.classList.remove('active'); apBtn.textContent = '▶ 자동재생'; }
}

// ── 위치 이동 ──
function stopIfPlaying() {
  if (autoPlayActive) { stopAutoPlay(); return; }
  clearCamTapReleaseTimer();
  if (!isSpaceHeld) return;
  isSpaceHeld = false;
  stopSound();
  const btn = document.getElementById('spaceBtn');
  btn.classList.remove('pressed');
  btn.textContent = 'SPACE';
}

function goToStart() {
  stopIfPlaying();
  currentIdx = -1;
  renderChordList();
  updateCamDisplay();
}

function goBack() {
  stopIfPlaying();
  if (chords.length === 0) return;
  const cur = currentRealIdx();
  if (cur === -1) return;
  currentIdx = prevRealIdx(cur);
  renderChordList();
  updateCamDisplay();
}

function goForward() {
  stopIfPlaying();
  if (chords.length === 0) return;
  const cur = currentRealIdx();
  if (cur === -1) return;
  currentIdx = nextRealIdx(cur);
  renderChordList();
  updateCamDisplay();
}

function jumpTo(i) {
  stopIfPlaying();
  currentIdx = i;
  renderChordList();
  updateCamDisplay();
}

// ── 연주 ──
async function onPress() {
  if (autoPlayActive) { stopAutoPlay(); return; }
  if (isSpaceHeld || chords.length === 0) return;
  const idx = currentRealIdx();
  if (idx === -1) return; // 전부 빈칸
  await ensureAudio();
  isSpaceHeld = true;
  currentIdx = idx;
  const c = chords[currentIdx];
  playChordStyled(c, null, 1);
  if (_vaFlashOn && currentCamFilter === 'videoart') {
    _vaFlashActive = true;
    clearTimeout(_vaFlashTimer);
    _vaFlashTimer = setTimeout(() => { _vaFlashActive = false; }, 420);
  }
  renderChordList();
  updateCamDisplay();
  scrollToActive();
  const btn = document.getElementById('spaceBtn');
  btn.classList.add('pressed');
  btn.textContent = c.label;
}

function onRelease() {
  clearCamTapReleaseTimer();
  if (!isSpaceHeld) return;
  isSpaceHeld = false;
  stopSound();
  renderChordList();
  updateCamDisplay();
  const btn = document.getElementById('spaceBtn');
  btn.classList.remove('pressed');
  btn.textContent = 'SPACE';
}

function clearCamTapReleaseTimer() {
  if (!camTapReleaseTimer) return;
  clearTimeout(camTapReleaseTimer);
  camTapReleaseTimer = null;
}

function isCamInteractiveTarget(target) {
  return !!target?.closest?.('button, input, select, textarea, a');
}

async function playCurrentChordFromCameraTap() {
  if (autoPlayActive || chords.length === 0) return;
  const idx = currentRealIdx();
  if (idx === -1) return;
  clearCamTapReleaseTimer();
  if (isSpaceHeld) onRelease();
  await ensureAudio();
  if (autoPlayActive) return;
  currentIdx = idx;
  const c = chords[currentIdx];
  isSpaceHeld = true;
  playSoundFrom(c.root, c.acc, c.oct, c.quality, c.inv);
  if (_vaFlashOn && currentCamFilter === 'videoart') {
    _vaFlashActive = true;
    clearTimeout(_vaFlashTimer);
    _vaFlashTimer = setTimeout(() => { _vaFlashActive = false; }, 420);
  }
  renderChordList();
  updateCamDisplay();
  scrollToActive();
  const btn = document.getElementById('spaceBtn');
  btn.classList.add('pressed');
  btn.textContent = c.label;
  camTapReleaseTimer = setTimeout(() => {
    camTapReleaseTimer = null;
    if (!autoPlayActive) onRelease();
  }, CAM_TAP_PLAY_MS);
}

function updateChordDerived(idx) {
  const c = chords[idx];
  if (!c) return;
  c.label = buildLabel(c.root, c.acc, c.quality);
  c.color = QUALITY_COLORS[c.quality] || '#4a90d9';
}

window.addEventListener('keydown', e => {
  const key = e.key.toLowerCase();
  if (e.ctrlKey || e.metaKey) {
    if (key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); return; }
    if (key === 'y' || (key === 'z' && e.shiftKey)) { e.preventDefault(); redo(); return; }
    if (key === 'c') { if (copySelectedChord()) e.preventDefault(); return; }
    if (key === 'v') { if (pasteChordBox()) e.preventDefault(); return; }
  }
  if ((e.target.tagName === 'INPUT' && e.target.type !== 'range') || e.target.tagName === 'TEXTAREA') return;

  // Shift+A~G: 현재 코드 근음 변경
  const rootMap = { a:'A', b:'B', c:'C', d:'D', e:'E', f:'F', g:'G' };
  if (e.shiftKey && !e.ctrlKey && !e.metaKey && !e.repeat && rootMap[key] && currentIdx >= 0 && currentIdx < chords.length && chords[currentIdx]) {
    e.preventDefault();
    saveHistory();
    chords[currentIdx].root = rootMap[key];
    chords[currentIdx].acc = '';
    updateChordDerived(currentIdx);
    renderChordList();
    updateCamDisplay();
    return;
  }

  // m: maj↔m, maj7↔m7 토글
  if (key === 'm' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.repeat && currentIdx >= 0 && currentIdx < chords.length && chords[currentIdx]) {
    e.preventDefault();
    const c = chords[currentIdx];
    const toggleMap = { maj:'m', m:'maj', maj7:'m7', m7:'maj7' };
    if (toggleMap[c.quality]) {
      saveHistory();
      c.quality = toggleMap[c.quality];
      updateChordDerived(currentIdx);
      renderChordList();
      updateCamDisplay();
    }
    return;
  }

  // 7: 7th 토글
  if (key === '7' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.repeat && currentIdx >= 0 && currentIdx < chords.length && chords[currentIdx]) {
    e.preventDefault();
    const c = chords[currentIdx];
    const toggleMap7 = { maj:'maj7', m:'m7', maj7:'maj', m7:'m', '7':'maj' };
    saveHistory();
    c.quality = toggleMap7[c.quality] !== undefined ? toggleMap7[c.quality] : '7';
    updateChordDerived(currentIdx);
    renderChordList();
    updateCamDisplay();
    return;
  }

  // 카메라 모드 전용: b=보사노바, t=탱고
  const isCamOpen = !document.getElementById('camOverlay').classList.contains('hidden');
  if (isCamOpen && key === 'b' && !e.shiftKey && !e.ctrlKey && !e.repeat) { e.preventDefault(); playCamStyled('bossanova'); return; }
  if (isCamOpen && key === 't' && !e.shiftKey && !e.ctrlKey && !e.repeat) { e.preventDefault(); playCamStyled('tango'); return; }

  if (e.code === 'Space' || e.code === 'ArrowDown') {
    e.preventDefault(); if (!e.repeat) onPress();
  } else if ((e.code === 'End' || e.key === ']') && !e.repeat) {
    const isCamOpen = !document.getElementById('camOverlay').classList.contains('hidden');
    if (isCamOpen) { e.preventDefault(); ensureAudio().then(() => playCamEndingArpeggio()); }
  } else if (e.code === 'Delete') {
    e.preventDefault(); if (!e.repeat) deleteSelected();
  } else if (e.code === 'ArrowRight' || e.code === 'ArrowLeft' || e.code === 'Backspace') {
    e.preventDefault();
    if (!e.repeat) { e.code === 'ArrowRight' ? goForward() : goBack(); }
  } else if (key === 'f' && !e.shiftKey && !e.repeat) { e.preventDefault(); goForward(); }
  else if (key === 'd' && !e.shiftKey && !e.repeat) { e.preventDefault(); goBack(); }
});
window.addEventListener('keyup', e => {
  if (e.code === 'Space' || e.code === 'ArrowDown') { e.preventDefault(); onRelease(); }
});

window.addEventListener('pointermove', e => {
  if (!dragWatch) return;
  const dx = e.clientX - dragWatch.startX;
  const dy = e.clientY - dragWatch.startY;
  if (!dragWatch.started && Math.hypot(dx, dy) < 8) return;

  if (!dragWatch.started) {
    dragWatch.started = true;
    dragState = { start: dragWatch.range.start, end: dragWatch.range.end, insertAt: -1 };
    dragWatch.card.classList.add('dragging');
    const ghost = ensureDragGhost();
    const count = dragWatch.range.end - dragWatch.range.start + 1;
    ghost.textContent = count > 1 ? `${count}개 이동` : (chords[dragWatch.idx] ? chords[dragWatch.idx].label : '빈칸');
    ghost.classList.remove('hidden');
  }

  const ghost = ensureDragGhost();
  ghost.style.left = (e.clientX + 14) + 'px';
  ghost.style.top = (e.clientY - 10) + 'px';
  document.querySelectorAll('.chord-card.drop-insert,.chord-card.drop-insert-after').forEach(el => {
    el.classList.remove('drop-insert', 'drop-insert-after');
  });

  const el = document.elementFromPoint(e.clientX, e.clientY);
  const target = el?.closest('.chord-card');
  if (target && dragState) {
    const to = parseInt(target.dataset.idx, 10);
    const rect = target.getBoundingClientRect();
    const insertAt = e.clientX < rect.left + rect.width / 2 ? to : to + 1;
    dragState.insertAt = insertAt;
    const { start, end } = dragState;
    if (insertAt < start || insertAt > end + 1) {
      if (insertAt === to + 1) target.classList.add('drop-insert-after');
      else target.classList.add('drop-insert');
    }
  } else if (dragState) {
    dragState.insertAt = -1;
  }
});

window.addEventListener('pointerup', () => {
  if (!dragWatch) return;
  const didDrag = dragWatch.started;
  if (dragState && didDrag && dragState.insertAt >= 0) {
    const { start, end, insertAt } = dragState;
    const count = end - start + 1;
    if (insertAt < start || insertAt > end + 1) {
      saveHistory();
      const items = chords.splice(start, count);
      const adj = insertAt > end ? insertAt - count : insertAt;
      chords.splice(adj, 0, ...items);
      currentIdx = adj;
      setSelectionRange(adj, adj + count - 1);
      renderChordList();
      updateCamDisplay();
    }
  }
  ensureDragGhost().classList.add('hidden');
  document.querySelectorAll('.chord-card.dragging,.chord-card.drop-insert,.chord-card.drop-insert-after').forEach(el => {
    el.classList.remove('dragging', 'drop-insert', 'drop-insert-after');
  });
  dragWatch = null;
  dragState = null;
  if (didDrag) {
    dragJustFinished = true;
    setTimeout(() => { dragJustFinished = false; }, 0);
  }
});

const spaceBtn = document.getElementById('spaceBtn');
spaceBtn.addEventListener('pointerdown', e => { spaceBtn.setPointerCapture(e.pointerId); onPress(); });
spaceBtn.addEventListener('pointerup', () => onRelease());
spaceBtn.addEventListener('pointercancel', () => onRelease());

const CHROMATIC_SHARP = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
function transposeAllChords(semitones) {
  if (!chords.some(c => c)) return;
  saveHistory();
  chords.forEach((c, i) => {
    if (!c) return;
    const midi = (c.oct + 1) * 12 + NOTE_PCS[c.root] + (ACC_OFFSET[c.acc] ?? 0);
    const newMidi = midi + semitones;
    const newPc = ((newMidi % 12) + 12) % 12;
    const noteStr = CHROMATIC_SHARP[newPc];
    c.root = noteStr[0];
    c.acc  = noteStr.length > 1 ? noteStr[1] : '';
    c.oct  = Math.floor(newMidi / 12) - 1;
    updateChordDerived(i);
  });
  renderChordList();
  updateCamDisplay();
}
document.getElementById('transposeDownBtn').addEventListener('click', () => transposeAllChords(-1));
document.getElementById('transposeUpBtn').addEventListener('click', () => transposeAllChords(1));

document.getElementById('resetBtn').addEventListener('click', goToStart);
document.getElementById('camResetBtn').addEventListener('click', goToStart);
document.getElementById('backBtn').addEventListener('click', goBack);
document.getElementById('nextBtn').addEventListener('click', goForward);
document.getElementById('camPrevChord').addEventListener('click', e => { e.stopPropagation(); goBack(); });
document.getElementById('camNextChord').addEventListener('click', e => { e.stopPropagation(); goForward(); });

document.getElementById('camOverlay').addEventListener('pointerdown', e => {
  if (autoPlayActive || isCamInteractiveTarget(e.target)) return;
  e.preventDefault();
  playCurrentChordFromCameraTap();
});


// ── 저장 / 불러오기 ──
function getSaves() { try { return JSON.parse(localStorage.getItem(SAVES_KEY) || '[]'); } catch { return []; } }
function putSaves(arr) { localStorage.setItem(SAVES_KEY, JSON.stringify(arr)); }

function getProjectOptions() {
  return {
    bpm: getAutoBpm(),
    sound: currentSound,
    cpr: chordsPerRow,
    lyricsVisible,
    camLyricsOn,
  };
}

function getSavedProjectOption(entry, key, fallback) {
  if (entry?.options && Object.prototype.hasOwnProperty.call(entry.options, key)) {
    return entry.options[key];
  }
  if (entry && Object.prototype.hasOwnProperty.call(entry, key)) return entry[key];
  return fallback;
}

function setLyricsVisible(enabled, shouldRender = true) {
  lyricsVisible = !!enabled;
  const btn = document.getElementById('lyricsToggleBtn');
  if (btn) btn.classList.toggle('active', lyricsVisible);
  if (shouldRender) renderChordList();
}

function setCamLyricsOn(enabled) {
  camLyricsOn = !!enabled;
  const btn = document.getElementById('camLyricsToggle');
  const area = document.getElementById('camLyricsArea');
  if (btn) {
    btn.textContent = camLyricsOn ? '가사 ON' : '가사 OFF';
    btn.classList.toggle('active', camLyricsOn);
  }
  if (area) area.style.display = camLyricsOn ? '' : 'none';
  updateCamDisplay();
}

function saveToSlot(name) {
  const saves = getSaves();
  const idx = saves.findIndex(s => s.name === name);
  const options = getProjectOptions();
  const entry = { name, date: new Date().toLocaleString('ko-KR'), chords: JSON.parse(JSON.stringify(chords)), ...options, options };
  if (idx >= 0) saves[idx] = entry; else saves.push(entry);
  putSaves(saves);
}

function loadFromSlot(name) {
  const entry = getSaves().find(s => s.name === name);
  if (!entry) return;
  chords = JSON.parse(JSON.stringify(entry.chords));
  setAutoBpm(getSavedProjectOption(entry, 'bpm', autoBpm), autoBpm);
  const savedSound = getSavedProjectOption(entry, 'sound', currentSound);
  if (savedSound) { currentSound = savedSound; document.getElementById('soundSel').value = currentSound; }
  const savedCpr = getSavedProjectOption(entry, 'cpr', chordsPerRow);
  if (savedCpr != null) {
    const cpr = parseInt(savedCpr, 10);
    chordsPerRow = Number.isFinite(cpr) ? cpr : 4;
    document.getElementById('cprSel').value = chordsPerRow;
    updateCardSize();
  }
  setLyricsVisible(getSavedProjectOption(entry, 'lyricsVisible', lyricsVisible), false);
  setCamLyricsOn(getSavedProjectOption(entry, 'camLyricsOn', camLyricsOn));
  currentIdx = -1; clearSelection(); isSpaceHeld = false;
  undoStack = []; redoStack = [];
  stopSound();
  renderChordList();
  updateCamDisplay();
  document.getElementById('spaceBtn').classList.remove('pressed');
  document.getElementById('spaceBtn').textContent = 'SPACE';
  document.getElementById('projectModal').classList.add('hidden');
}

function deleteSlot(name) {
  putSaves(getSaves().filter(s => s.name !== name));
  renderSaveModal();
}

function renderSaveModal() {
  const list = document.getElementById('saveSlotList');
  const saves = getSaves();
  list.innerHTML = '';
  // 고정 샘플 항목 (항상 상단 표시, localStorage 무관)
  const sampleRow = document.createElement('div');
  sampleRow.className = 'modal-slot modal-slot-sample';
  sampleRow.innerHTML = `
    <div class="slot-info">
      <span class="slot-name">🎵 ${SAMPLE_PROJECT.name}</span>
      <span class="slot-date">샘플 · ${SAMPLE_PROJECT.options.bpm}BPM · ${SAMPLE_PROJECT.options.sound} · 줄당${SAMPLE_PROJECT.options.cpr}</span>
    </div>
    <button class="slot-load">열기</button>
  `;
  sampleRow.querySelector('.slot-load').addEventListener('click', () => {
    chords = JSON.parse(JSON.stringify(SAMPLE_PROJECT.chords));
    setAutoBpm(SAMPLE_PROJECT.options.bpm);
    currentSound = SAMPLE_PROJECT.options.sound;
    document.getElementById('soundSel').value = currentSound;
    chordsPerRow = SAMPLE_PROJECT.options.cpr;
    document.getElementById('cprSel').value = chordsPerRow;
    updateCardSize();
    setLyricsVisible(SAMPLE_PROJECT.options.lyricsVisible);
    setCamLyricsOn(SAMPLE_PROJECT.options.camLyricsOn);
    currentIdx = -1; clearSelection(); isSpaceHeld = false;
    undoStack = []; redoStack = [];
    stopSound();
    renderChordList(); updateCamDisplay();
    document.getElementById('projectModal').classList.add('hidden');
  });
  list.appendChild(sampleRow);
  if (!saves.length) return;
  saves.forEach(s => {
    const savedFlags = [
      getSavedProjectOption(s, 'lyricsVisible', false) ? '가사표시' : '',
      getSavedProjectOption(s, 'camLyricsOn', false) ? '카메라가사' : '',
    ].filter(Boolean).join(' · ');
    const flagText = savedFlags ? ` · ${savedFlags}` : '';
    const savedBpm = normalizeBpm(getSavedProjectOption(s, 'bpm', BPM_DEFAULT), BPM_DEFAULT);
    const savedSound = getSavedProjectOption(s, 'sound', 'basic');
    const savedCpr = getSavedProjectOption(s, 'cpr', 4);
    const row = document.createElement('div');
    row.className = 'modal-slot';
    row.innerHTML = `
      <div class="slot-info">
        <span class="slot-name">${s.name}</span>
        <span class="slot-date">${s.date} · ${s.chords.length}개 · ${savedBpm}BPM · ${savedSound || 'basic'} · 줄당${savedCpr ?? 4}${flagText}</span>
      </div>
      <button class="slot-overwrite" title="현재 상태로 덮어쓰기">💾</button>
      <button class="slot-load">열기</button>
      <button class="slot-del">✕</button>
    `;
    row.querySelector('.slot-overwrite').addEventListener('click', () => { saveToSlot(s.name); renderSaveModal(); });
    row.querySelector('.slot-load').addEventListener('click', () => loadFromSlot(s.name));
    row.querySelector('.slot-del').addEventListener('click', () => {
      if (confirm(`"${s.name}"을(를) 삭제할까요?`)) deleteSlot(s.name);
    });
    list.appendChild(row);
  });
}

document.getElementById('projectBtn').addEventListener('click', () => {
  renderSaveModal();
  document.getElementById('projectModal').classList.remove('hidden');
});
document.getElementById('modalCloseBtn').addEventListener('click', () => {
  document.getElementById('projectModal').classList.add('hidden');
});
document.getElementById('projectModal').addEventListener('click', e => {
  if (e.target === document.getElementById('projectModal'))
    document.getElementById('projectModal').classList.add('hidden');
});
document.getElementById('saveNewBtn').addEventListener('click', () => {
  const name = document.getElementById('saveNameInput').value.trim()
    || `프로젝트 ${getSaves().length + 1}`;
  saveToSlot(name);
  document.getElementById('saveNameInput').value = '';
  renderSaveModal();
});
document.getElementById('saveNameInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('saveNewBtn').click();
});

// ── 카메라 ──
let _camStream = null, _wakeLock = null;

function updateCamDisplay() {
  const nameEl = document.getElementById('camChordName');
  const numEl  = document.getElementById('camChordNum');
  const prevEl = document.getElementById('camPrevChord');
  const nextEl = document.getElementById('camNextChord');
  if (!nameEl) return;

  const cur = (isSpaceHeld || autoPlayActive) ? activePlaybackRealIdx() : currentRealIdx();

  // 이전 / 다음 코드 표시
  if (prevEl) {
    const pi = cur >= 0 ? prevRealIdx(cur) : -1;
    const prevLabel = (pi >= 0 && pi !== cur && chords[pi]) ? chords[pi].label : '';
    prevEl.textContent = prevLabel ? '< ' + prevLabel : '<';
    prevEl.classList.toggle('empty', !prevLabel);
    prevEl.setAttribute('aria-label', prevLabel ? `Previous chord: ${prevLabel}` : 'Previous chord');
  }
  if (nextEl) {
    const ni = cur >= 0 ? nextRealIdx(cur) : -1;
    const nextLabel = (ni >= 0 && ni !== cur && chords[ni]) ? chords[ni].label : '';
    nextEl.textContent = nextLabel ? nextLabel + ' >' : '>';
    nextEl.classList.toggle('empty', !nextLabel);
    nextEl.setAttribute('aria-label', nextLabel ? `Next chord: ${nextLabel}` : 'Next chord');
  }

  // 카메라 가사 (이전·현재·다음)
  const lyricsTextEl  = document.getElementById('camLyricsText');
  const lyricsPrevEl  = document.getElementById('camLyricsPrev');
  const lyricsNextEl  = document.getElementById('camLyricsNext');
  const pi2 = cur >= 0 ? prevRealIdx(cur) : -1;
  const ni2 = cur >= 0 ? nextRealIdx(cur) : -1;
  if (lyricsPrevEl) lyricsPrevEl.textContent = (pi2 >= 0 && pi2 !== cur && chords[pi2]) ? (chords[pi2].lyrics || '') : '';
  animateLyricsText(lyricsTextEl, (cur >= 0 && chords[cur]) ? (chords[cur].lyrics || '') : '');
  fitCamLyrics();
  if (lyricsNextEl) lyricsNextEl.textContent  = (ni2 >= 0 && ni2 !== cur && chords[ni2]) ? (chords[ni2].lyrics || '') : '';

  if ((isSpaceHeld || autoPlayActive) && cur !== -1) {
    const c = chords[cur];
    nameEl.textContent = c.label;
    nameEl.style.color = c.color;
    nameEl.classList.add('playing');
    if (numEl) numEl.textContent = `${cur + 1} / ${chords.length}`;
  } else if (chords.length > 0) {
    const label = cur !== -1 ? chords[cur].label : '—';
    nameEl.textContent = label;
    nameEl.style.color = 'rgba(255,255,255,0.28)';
    nameEl.classList.remove('playing');
    if (numEl) numEl.textContent = cur !== -1 ? `현재 → ${cur + 1}번` : '';
  } else {
    nameEl.textContent = '—';
    nameEl.style.color = 'rgba(255,255,255,0.28)';
    nameEl.classList.remove('playing');
    if (numEl) numEl.textContent = '';
  }
}

document.getElementById('camBtn').addEventListener('click', async () => {
  try {
    _camStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 99999 }, height: { ideal: 99999 } },
      audio: false
    });
    document.getElementById('camVideo').srcObject = _camStream;
    document.getElementById('camOverlay').classList.remove('hidden');
    if ('wakeLock' in navigator) {
      try { _wakeLock = await navigator.wakeLock.request('screen'); } catch(e) {}
    }
    updateCamDisplay();
  } catch(e) {
    alert('카메라 권한이 필요해요.\n' + e.message);
  }
});

document.getElementById('camExitBtn').addEventListener('click', () => {
  if (_camStream) { _camStream.getTracks().forEach(t => t.stop()); _camStream = null; }
  if (_wakeLock)  { try { _wakeLock.release(); } catch(e) {} _wakeLock = null; }
  stopRecDateUpdate();
  stopLowres();
  document.getElementById('camScanlines').classList.add('hidden');
  document.getElementById('camRecBar').classList.add('hidden');
  document.getElementById('camVideo').srcObject = null;
  document.getElementById('camOverlay').classList.add('hidden');
});

// ── 자동재생 / 사운드 컨트롤 ──
document.getElementById('soundSel').addEventListener('change', e => {
  currentSound = e.target.value;
});
document.getElementById('styleSel').addEventListener('change', e => {
  currentPlayStyle = e.target.value;
});
document.getElementById('bpmDown').addEventListener('click', () => {
  setAutoBpm(autoBpm - 5);
});
document.getElementById('bpmUp').addEventListener('click', () => {
  setAutoBpm(autoBpm + 5);
});
document.getElementById('bpmInput').addEventListener('change', e => {
  setAutoBpm(e.target.value, BPM_DEFAULT);
});
document.getElementById('bpmInput').addEventListener('input', e => {
  const v = parseBpmValue(e.target.value);
  if (Number.isFinite(v)) autoBpm = normalizeBpm(v, autoBpm);
});
document.getElementById('autoPlayBtn').addEventListener('click', startAutoPlay);

// ── 가사 토글 ──
document.getElementById('lyricsToggleBtn').addEventListener('click', () => {
  setLyricsVisible(!lyricsVisible);
});
document.getElementById('camLyricsToggle').addEventListener('click', () => {
  setCamLyricsOn(!camLyricsOn);
});

// ── 사용법 모달 ──
document.getElementById('helpBtn').addEventListener('click', () => {
  document.getElementById('helpModal').classList.remove('hidden');
});
document.getElementById('helpCloseBtn').addEventListener('click', () => {
  document.getElementById('helpModal').classList.add('hidden');
});
document.getElementById('helpModal').addEventListener('click', e => {
  if (e.target === document.getElementById('helpModal'))
    document.getElementById('helpModal').classList.add('hidden');
});

// ── AI 프롬프트 모달 ──
document.getElementById('aiPromptBtn').addEventListener('click', () => {
  document.getElementById('aiPromptModal').classList.remove('hidden');
});
document.getElementById('aiPromptCloseBtn').addEventListener('click', () => {
  document.getElementById('aiPromptModal').classList.add('hidden');
});
document.getElementById('aiPromptModal').addEventListener('click', e => {
  if (e.target === document.getElementById('aiPromptModal'))
    document.getElementById('aiPromptModal').classList.add('hidden');
});
function copyPrompt(btnId, srcId, label) {
  const text = document.getElementById(srcId).textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById(btnId);
    btn.innerHTML = '✅ 복사 완료!';
    btn.classList.add('copied');
    setTimeout(() => { btn.innerHTML = label; btn.classList.remove('copied'); }, 2000);
  });
}
document.getElementById('copySimpleBtn').addEventListener('click', () =>
  copyPrompt('copySimpleBtn', 'aiPromptSimple', '📋 Simple<br><span class="copy-sub">(코드순)</span>'));
document.getElementById('copyHoldBtn').addEventListener('click', () =>
  copyPrompt('copyHoldBtn', 'aiPromptHold', '📋 Hold<br><span class="copy-sub">(- 방식)</span>'));
document.getElementById('copySustainBtn').addEventListener('click', () =>
  copyPrompt('copySustainBtn', 'aiPromptSustain', '📋 Sustain<br><span class="copy-sub">(반복)</span>'));
document.getElementById('copyLyricsBtn').addEventListener('click', () =>
  copyPrompt('copyLyricsBtn', 'aiPromptLyrics', '📋 가사+코드<br><span class="copy-sub">(코드"가사")</span>'));

// ── 구간 반복 ──
document.getElementById('loopBtn').addEventListener('click', () => {
  loopEnabled = !loopEnabled;
  document.getElementById('loopBtn').classList.toggle('active', loopEnabled);
});

// ── 탭 템포 ──
function tapTempo() {
  const now = Date.now();
  if (tapTimes.length > 0 && now - tapTimes[tapTimes.length - 1] > 2000) {
    tapTimes = [];
  }
  tapTimes.push(now);
  if (tapTimes.length > 8) tapTimes = tapTimes.slice(-8);
  if (tapTimes.length >= 2) {
    const intervals = [];
    for (let i = 1; i < tapTimes.length; i++) {
      intervals.push(tapTimes[i] - tapTimes[i - 1]);
    }
    const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const bpm = Math.round(60000 / avg);
    setAutoBpm(bpm);
  }
}
document.getElementById('tapBtn').addEventListener('click', () => {
  ensureAudio().then(tapTempo);
});

// ── 카운트인 ──
document.getElementById('countInBtn').addEventListener('click', () => {
  countInEnabled = !countInEnabled;
  document.getElementById('countInBtn').classList.toggle('active', countInEnabled);
});


// ── 카메라 필터 ──
const CAM_FILTER_DEFS = {
  none:      { cls: '',                  grain: 0,    vig: 0 },
  film90:    { cls: 'cam-flt-film90',    grain: 0.13, vig: 0 },
  bw:        { cls: 'cam-flt-bw',        grain: 0.11, vig: 0 },
  camcorder: { cls: 'cam-flt-camcorder', grain: 0.22, vig: 0 },
  videoart:  { cls: '',                  grain: 0,    vig: 0 },
};
let currentCamFilter = 'none';
let grainFrame = null, grainSeed = 0;
let _recDateTimer = null;
let _lowresCtx = null, _lowresFrame = null;
const LOWRES_H = 360;

function initLowresCanvas() {
  const video = document.getElementById('camVideo');
  const canvas = document.getElementById('camLowresCanvas');
  const aspect = (video.videoWidth && video.videoHeight)
    ? video.videoWidth / video.videoHeight : 16 / 9;
  canvas.height = LOWRES_H;
  canvas.width  = Math.round(LOWRES_H * aspect);
  _lowresCtx = canvas.getContext('2d');
}

function renderLowresFrame() {
  const video = document.getElementById('camVideo');
  if (_lowresCtx && video.readyState >= 2) {
    const W = _lowresCtx.canvas.width, H = _lowresCtx.canvas.height;
    _lowresCtx.save();
    _lowresCtx.translate(W, 0); _lowresCtx.scale(-1, 1);
    _lowresCtx.drawImage(video, 0, 0, W, H);
    _lowresCtx.restore();
  }
  _lowresFrame = requestAnimationFrame(renderLowresFrame);
}

function startLowres() {
  if (_lowresFrame !== null) return;
  const video = document.getElementById('camVideo');
  const canvas = document.getElementById('camLowresCanvas');
  const run = () => {
    initLowresCanvas();
    // CSS 필터를 canvas에 적용, video는 숨김
    canvas.style.filter = 'saturate(0.62) contrast(0.90) brightness(1.07)';
    canvas.classList.remove('hidden');
    video.style.opacity = '0';
    renderLowresFrame();
  };
  if (video.readyState >= 2) run();
  else video.addEventListener('playing', run, { once: true });
}

function stopLowres() {
  if (_lowresFrame) { cancelAnimationFrame(_lowresFrame); _lowresFrame = null; }
  _lowresCtx = null;
  const canvas = document.getElementById('camLowresCanvas');
  canvas.classList.add('hidden');
  canvas.style.filter = '';
  if (currentCamFilter !== 'videoart') {
    document.getElementById('camVideo').style.opacity = '';
  }
}

function updateRecDate() {
  const el = document.getElementById('camRecDate');
  if (!el) return;
  const now = new Date();
  const p = n => String(n).padStart(2, '0');
  el.textContent = `${now.getFullYear()}. ${p(now.getMonth()+1)}. ${p(now.getDate())}.  ${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())}`;
}
function startRecDateUpdate() {
  updateRecDate();
  if (_recDateTimer) return;
  _recDateTimer = setInterval(updateRecDate, 1000);
}
function stopRecDateUpdate() {
  if (_recDateTimer) { clearInterval(_recDateTimer); _recDateTimer = null; }
}
let videoArtFrame = null;
let videoArtColor = 'rainbow'; // 'white' | 'r' | 'g' | 'b' | 'rainbow'
let _rainbowIdx = 0, _rainbowFrameCount = 0;
let _vaFlashOn = false, _vaFlashActive = false, _vaFlashTimer = null;
let videoArtTrailMode = 'normal'; // 'normal' | 'bloom' | 'gravity' | 'vortex'
let videoArtDecay = 0.014;  // 잔상 감쇠 (낮을수록 오래 유지, 슬라이더 기본값 1 대응)
let videoArtAmpPasses = 1;  // screen 증폭 횟수
let _vidCtx = null, _trailCtx = null;
let _tmpCanvas = null, _prevCanvas = null, _diffCanvas = null, _trailCanvas = null, _colorTmpCanvas = null;
let _colorTmpCtx = null;
let _tmpCtx = null, _prevCtx = null, _diffCtx = null;

function animateGrain() {
  grainSeed = (grainSeed + 1) % 100;
  const t = document.getElementById('grainTurbulence');
  if (t) {
    t.setAttribute('seed', grainSeed);
    if (currentCamFilter === 'camcorder') {
      // 수평 아날로그 테이프 노이즈
      t.setAttribute('baseFrequency', '0.80 0.14');
      t.setAttribute('numOctaves', '2');
    } else {
      t.setAttribute('baseFrequency', '0.72');
      t.setAttribute('numOctaves', '4');
    }
  }
  grainFrame = requestAnimationFrame(animateGrain);
}
function stopGrain() {
  if (grainFrame) { cancelAnimationFrame(grainFrame); grainFrame = null; }
}

const _isMobile = navigator.maxTouchPoints > 1;
let _lastVAFrameTs = 0;

function initVideoArtCanvases() {
  const video = document.getElementById('camVideo');
  const maxW = _isMobile ? 240 : 480;
  const W = Math.min(video.videoWidth || 640, maxW);
  const H = video.videoHeight && video.videoWidth
    ? Math.round(W * video.videoHeight / video.videoWidth) : 270;

  const vidCanvas = document.getElementById('camVideoCanvas');
  vidCanvas.width = W; vidCanvas.height = H;
  _vidCtx = vidCanvas.getContext('2d');

  const mk = () => Object.assign(document.createElement('canvas'), {width:W, height:H});
  _tmpCanvas = mk(); _prevCanvas = mk(); _diffCanvas = mk();
  _trailCanvas = mk(); _colorTmpCanvas = mk();
  _tmpCtx  = _tmpCanvas.getContext('2d');
  _prevCtx = _prevCanvas.getContext('2d');
  _diffCtx = _diffCanvas.getContext('2d');
  _trailCtx = _trailCanvas.getContext('2d');
  _colorTmpCtx = _colorTmpCanvas.getContext('2d');

  document.getElementById('camRgbWrap').classList.remove('hidden');
}

function renderVideoArtFrame(ts) {
  if (_isMobile && ts - _lastVAFrameTs < 42) {
    videoArtFrame = requestAnimationFrame(renderVideoArtFrame); return;
  }
  _lastVAFrameTs = ts;
  const video = document.getElementById('camVideo');
  if (!_vidCtx || !_tmpCtx || video.readyState < 2) {
    videoArtFrame = requestAnimationFrame(renderVideoArtFrame); return;
  }
  const W = _tmpCanvas.width, H = _tmpCanvas.height;
  const shift = Math.max(3, Math.round(W * 0.013));

  // 1. 현재 프레임 (미러, 선택시 모자이크) → tmpCanvas
  _tmpCtx.clearRect(0, 0, W, H);
  _tmpCtx.save();
  _tmpCtx.translate(W, 0); _tmpCtx.scale(-1, 1);
  _tmpCtx.drawImage(video, 0, 0, W, H);
  _tmpCtx.restore();
  if (pixelBlock > 1) {
    const pw = Math.max(1, Math.round(W / pixelBlock));
    const ph = Math.max(1, Math.round(H / pixelBlock));
    _tmpCtx.imageSmoothingEnabled = true;
    _tmpCtx.drawImage(_tmpCanvas, 0, 0, pw, ph);
    _tmpCtx.imageSmoothingEnabled = false;
    _tmpCtx.drawImage(_tmpCanvas, 0, 0, pw, ph, 0, 0, W, H);
  }

  // 2. 차분(diff) 계산: current XOR previous
  _diffCtx.clearRect(0, 0, W, H);
  _diffCtx.drawImage(_prevCanvas, 0, 0);
  _diffCtx.globalCompositeOperation = 'difference';
  _diffCtx.drawImage(_tmpCanvas, 0, 0);
  _diffCtx.globalCompositeOperation = 'source-over';

  // 3. 차분 증폭 (screen 2회 → 쨍한 색)
  _diffCtx.globalCompositeOperation = 'screen';
  const _passes = _vaFlashActive ? (_isMobile ? 1 : 3) : (_isMobile ? Math.min(videoArtAmpPasses, 1) : videoArtAmpPasses);
  for (let _p = 0; _p < _passes; _p++) _diffCtx.drawImage(_diffCanvas, 0, 0);
  _diffCtx.globalCompositeOperation = 'source-over';

  // 4. prev 갱신
  _prevCtx.clearRect(0, 0, W, H);
  _prevCtx.drawImage(_tmpCanvas, 0, 0);

  // 5. 잔상 감쇠 (모드별 transform 적용)
  const _keepAlpha = Math.max(0, 1 - videoArtDecay);
  _trailCtx.save();
  _trailCtx.globalCompositeOperation = 'copy';
  _trailCtx.globalAlpha = _keepAlpha;
  if (videoArtTrailMode === 'bloom') {
    const _s = 1.008;
    _trailCtx.translate(W / 2, H / 2);
    _trailCtx.scale(_s, _s);
    _trailCtx.drawImage(_trailCanvas, -W / 2, -H / 2);
  } else if (videoArtTrailMode === 'gravity') {
    _trailCtx.drawImage(_trailCanvas, 0, 2);
  } else if (videoArtTrailMode === 'vortex') {
    _trailCtx.translate(W / 2, H / 2);
    _trailCtx.rotate(0.6 * Math.PI / 180);
    _trailCtx.drawImage(_trailCanvas, -W / 2, -H / 2);
  } else {
    _trailCtx.drawImage(_trailCanvas, 0, 0);
  }
  _trailCtx.restore();
  _trailCtx.globalAlpha = 1;
  _trailCtx.globalCompositeOperation = 'source-over';

  // 6. diff 색상화 후 잔상에 screen 합성 (SVG 필터 대신 multiply 블렌드)
  const COLOR_MAP = { r:['#ff0000',shift], g:['#00ff00',0], b:['#0000ff',-shift] };
  const addColoredDiff = (fillColor, dx) => {
    _colorTmpCtx.clearRect(0, 0, W, H);
    _colorTmpCtx.drawImage(_diffCanvas, 0, 0);
    _colorTmpCtx.globalCompositeOperation = 'multiply';
    _colorTmpCtx.fillStyle = fillColor;
    _colorTmpCtx.fillRect(0, 0, W, H);
    _colorTmpCtx.globalCompositeOperation = 'source-over';
    _trailCtx.globalCompositeOperation = 'screen';
    _trailCtx.drawImage(_colorTmpCanvas, dx, 0);
    _trailCtx.globalCompositeOperation = 'source-over';
  };

  if (videoArtColor === 'white') {
    // 흰색: R/G/B 각 채널 shift 적용해 합성
    Object.values(COLOR_MAP).forEach(([c, dx]) => addColoredDiff(c, dx));
  } else if (videoArtColor === 'rainbow') {
    _rainbowFrameCount++;
    if (_rainbowFrameCount >= 30) { _rainbowFrameCount = 0; _rainbowIdx = (_rainbowIdx + 1) % 3; }
    const [c, dx] = [COLOR_MAP.r, COLOR_MAP.g, COLOR_MAP.b][_rainbowIdx];
    addColoredDiff(c, dx);
  } else {
    const [c, dx] = COLOR_MAP[videoArtColor] || ['#ffffff', 0];
    addColoredDiff(c, dx);
  }

  // 7. 현재 프레임 + 잔상 → 출력 캔버스
  _vidCtx.clearRect(0, 0, W, H);
  _vidCtx.drawImage(_tmpCanvas, 0, 0);
  _vidCtx.globalCompositeOperation = 'screen';
  _vidCtx.drawImage(_trailCanvas, 0, 0);
  _vidCtx.globalCompositeOperation = 'source-over';

  videoArtFrame = requestAnimationFrame(renderVideoArtFrame);
}

function stopVideoArt() {
  if (videoArtFrame) { cancelAnimationFrame(videoArtFrame); videoArtFrame = null; }
  _vaFlashActive = false; clearTimeout(_vaFlashTimer);
  document.getElementById('camRgbWrap').classList.add('hidden');
  [_vidCtx, _trailCtx].forEach(ctx => {
    if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  });
  _vidCtx = _trailCtx = _colorTmpCtx = null;
  _tmpCtx = _prevCtx = _diffCtx = null;
  _trailCanvas = _colorTmpCanvas = null;
  _tmpCanvas = _prevCanvas = _diffCanvas = null;
}

let pixelBlock = 1;

function applyCamFilter(name) {
  currentCamFilter = name;
  const cfg = CAM_FILTER_DEFS[name] || CAM_FILTER_DEFS.none;
  const video = document.getElementById('camVideo');
  const overlay = document.getElementById('camFilterOverlay');
  const vignette = document.getElementById('camVignette');

  // 기존 효과 정리
  if (name !== 'videoart') stopVideoArt();
  if (name !== 'camcorder') stopLowres();

  // 캠코더 블루 틴트
  document.getElementById('camFilterOverlay').classList.toggle('camcorder-tint', name === 'camcorder');

  // 캠코더 스캔라인 / REC 바
  const scanlines = document.getElementById('camScanlines');
  const recBar = document.getElementById('camRecBar');
  if (name === 'camcorder') {
    if (scanlines) scanlines.classList.remove('hidden');
    if (recBar) recBar.classList.remove('hidden');
    startRecDateUpdate();
    startLowres();
  } else {
    if (scanlines) scanlines.classList.add('hidden');
    if (recBar) recBar.classList.add('hidden');
    stopRecDateUpdate();
  }

  // CSS 필터 클래스 교체
  Object.values(CAM_FILTER_DEFS).forEach(f => { if (f.cls) video.classList.remove(f.cls); });
  if (cfg.cls) video.classList.add(cfg.cls);

  // canvas 효과: video 숨기고 canvas로 대체
  video.style.opacity = name === 'videoart' ? '0' : '';

  // Grain
  overlay.style.opacity = cfg.grain || 0;
  if (cfg.grain > 0 && !grainFrame) animateGrain();
  else if (!cfg.grain) stopGrain();

  // Vignette
  vignette.style.opacity = cfg.vig || 0;

  // 비디오아트 시작
  if (name === 'videoart') {
    pixelBlock = 1;
    videoArtDecay = 0.014;
    videoArtAmpPasses = 1;
    document.getElementById('camVaPixelSlider').value = 1;
    document.getElementById('camVaDecaySlider').value = 1;
    document.getElementById('camVaIntensitySlider').value = 1;
    if (video.readyState >= 2) { initVideoArtCanvases(); renderVideoArtFrame(); }
    else video.addEventListener('playing', () => { initVideoArtCanvases(); renderVideoArtFrame(); }, { once: true });
  }

  // 버튼 상태
  document.querySelectorAll('.cam-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === name);
  });

  // 비디오아트 패널 show/hide
  document.getElementById('camVaPanel').classList.toggle('hidden', name !== 'videoart');
}

document.getElementById('camFilterRow').addEventListener('click', e => {
  const btn = e.target.closest('.cam-filter-btn');
  if (btn) applyCamFilter(btn.dataset.filter);
});

document.getElementById('camVaPixelSlider').addEventListener('input', e => {
  pixelBlock = parseInt(e.target.value);
});

document.getElementById('camVaDecaySlider').addEventListener('input', e => {
  // slider 1(빠름)~10(느림) → decay 0.014~0.0014 (최대 약 50초)
  videoArtDecay = (11 - parseInt(e.target.value)) * 0.0014;
});

document.getElementById('camVaIntensitySlider').addEventListener('input', e => {
  videoArtAmpPasses = parseInt(e.target.value);
});

// 슬라이더 포커스 중 키입력이 슬라이더를 움직이지 않도록
document.querySelectorAll('input[type="range"]').forEach(slider => {
  slider.addEventListener('keydown', e => { e.preventDefault(); });
});

document.getElementById('camVideoArtColorRow').addEventListener('click', e => {
  const btn = e.target.closest('.cam-vacolor-btn');
  if (!btn || !btn.dataset.color) return;
  videoArtColor = btn.dataset.color;
  _rainbowIdx = 0; _rainbowFrameCount = 0;
  document.querySelectorAll('.cam-vacolor-btn[data-color]').forEach(b => {
    b.classList.toggle('active', b.dataset.color === videoArtColor);
  });
});

document.getElementById('camVaFlashBtn').addEventListener('click', () => {
  _vaFlashOn = !_vaFlashOn;
  document.getElementById('camVaFlashBtn').classList.toggle('active', _vaFlashOn);
});

document.getElementById('camVideoArtTrailRow').addEventListener('click', e => {
  const btn = e.target.closest('.cam-vatrail-btn');
  if (!btn) return;
  videoArtTrailMode = btn.dataset.trail;
  document.querySelectorAll('.cam-vatrail-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.trail === videoArtTrailMode);
  });
});

// ── JSON 내보내기 ──
document.getElementById('exportJsonBtn').addEventListener('click', () => {
  const data = getSaves();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'minsound_projects.json';
  a.click();
  URL.revokeObjectURL(url);
});

// ── JSON 불러오기 ──
document.getElementById('importJsonFile').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (!Array.isArray(data)) { alert('올바른 minsound JSON 파일이 아닙니다.'); return; }
      if (!confirm(`${data.length}개 프로젝트를 불러옵니다. 기존 데이터에 추가됩니다.`)) return;
      const existing = getSaves();
      data.forEach(item => {
        const idx = existing.findIndex(s => s.name === item.name);
        if (idx >= 0) existing[idx] = item;
        else existing.push(item);
      });
      putSaves(existing);
      renderSaveModal();
    } catch {
      alert('JSON 파일을 읽는 중 오류가 발생했습니다.');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
});

// ── 초기화 ──
// 저장된 프로젝트가 없을 때만 샘플 코드를 뷰에 표시 (localStorage 비변경)
if (!getSaves().length) {
  chords = JSON.parse(JSON.stringify(SAMPLE_PROJECT.chords));
  setAutoBpm(SAMPLE_PROJECT.options.bpm);
  currentSound = SAMPLE_PROJECT.options.sound;
  document.getElementById('soundSel').value = currentSound;
  const cpr = SAMPLE_PROJECT.options.cpr;
  chordsPerRow = cpr;
  document.getElementById('cprSel').value = cpr;
  lyricsVisible = SAMPLE_PROJECT.options.lyricsVisible;
  camLyricsOn = SAMPLE_PROJECT.options.camLyricsOn;
}
setLyricsVisible(lyricsVisible, false);
setCamLyricsOn(camLyricsOn);
updatePreview();
updateCardSize();
renderChordList();
window.addEventListener('resize', () => { updateCardSize(); renderChordList(); });
