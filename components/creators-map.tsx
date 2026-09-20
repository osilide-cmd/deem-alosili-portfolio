'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

type Lang = 'en' | 'ar';
type Pt = readonly [number, number];
type LayoutKey = 'wide' | 'tall';
type IconName = 'spark' | 'book' | 'trend' | 'search' | 'script' | 'camera' | 'clapper' | 'send' | 'chart';

type Stage = {
  id: string;
  n: string;
  icon: IconName;
  route?: 'A' | 'B' | 'C';
  en: { label: string; text: string };
  ar: { label: string; text: string };
  wide: Pt;
  tall: Pt;
};

/* The path a piece of content travels: idea -> one of three angles -> script -> shoot -> edit -> publish -> feedback. */
const STAGES: Stage[] = [
  {
    id: 'idea', n: '01', icon: 'spark',
    en: { label: 'Idea', text: 'Every project starts with a spark: a small moment, a question, or a detail people notice but never name.' },
    ar: { label: 'الفكرة', text: 'كل شي يبدأ بشرارة: لحظة صغيرة أو سؤال أو تفصيلة يلاحظها الناس وما يسمّونها.' },
    wide: [120, 395], tall: [210, 95],
  },
  {
    id: 'story', n: '02', icon: 'book', route: 'A',
    en: { label: 'Story', text: 'I shape the idea into a story with a beginning, a turn, and a payoff, so viewers stay until the last second.' },
    ar: { label: 'القصة', text: 'أحوّل الفكرة لقصة لها بداية ومنعطف ونهاية، عشان المشاهد يكمل لين آخر ثانية.' },
    wide: [345, 160], tall: [88, 245],
  },
  {
    id: 'trend', n: '03', icon: 'trend', route: 'B',
    en: { label: 'Trend', text: 'I read what the platform is rewarding right now, then find the angle that still sounds like the brand.' },
    ar: { label: 'الترند', text: 'أتابع وش تكافئه المنصة الحين، وألقى الزاوية اللي تناسب صوت العلامة وما تفقد هويتها.' },
    wide: [350, 390], tall: [210, 290],
  },
  {
    id: 'problem', n: '04', icon: 'search', route: 'C',
    en: { label: 'Problem', text: 'I look for the real pain point behind the idea, so the content answers something people actually search for.' },
    ar: { label: 'المشكلة', text: 'أدوّر على المشكلة الحقيقية ورا الفكرة، عشان المحتوى يجاوب على شي الناس فعلاً يبحثون عنه.' },
    wide: [345, 625], tall: [332, 245],
  },
  {
    id: 'script', n: '05', icon: 'script',
    en: { label: 'Script', text: 'A hook, clear beats, and a call to action, written to be heard and not only read.' },
    ar: { label: 'السكربت', text: 'افتتاحية تشدّ، ولحظات مرتبة، ودعوة واضحة للتفاعل، مكتوبة للسماع مو للقراءة بس.' },
    wide: [745, 215], tall: [325, 525],
  },
  {
    id: 'shoot', n: '06', icon: 'camera',
    en: { label: 'Shoot', text: 'Framing, light, and rhythm are planned before the camera rolls, so every shot has a reason to exist.' },
    ar: { label: 'التصوير', text: 'الكادر والإضاءة والإيقاع يتخططون قبل ما تشتغل الكاميرا، فكل لقطة لها سبب.' },
    wide: [985, 255], tall: [95, 630],
  },
  {
    id: 'production', n: '07', icon: 'clapper',
    en: { label: 'Production', text: 'Cutting, captions, sound, and pacing, until the story moves at the speed of the feed.' },
    ar: { label: 'المونتاج', text: 'قص وترجمة وصوت وإيقاع، لين تمشي القصة بسرعة الفيد.' },
    wide: [890, 445], tall: [325, 742],
  },
  {
    id: 'publish', n: '08', icon: 'send',
    en: { label: 'Publish', text: 'The right platform, the right time, and a caption that helps the video get found.' },
    ar: { label: 'النشر', text: 'المنصة والوقت والوصف المناسبين، عشان الفيديو يوصل لناسه.' },
    wide: [1050, 585], tall: [95, 858],
  },
  {
    id: 'feedback', n: '09', icon: 'chart',
    en: { label: 'Feedback', text: 'Views, saves, and comments become the data that sharpens the next idea.' },
    ar: { label: 'التفاعل', text: 'المشاهدات والحفظ والتعليقات تتحول لبيانات تحدّ الفكرة الجاية.' },
    wide: [790, 650], tall: [285, 985],
  },
];

type Road = { d: string; kind: 'main' | 'branch' };
type Layout = { w: number; h: number; roads: Road[]; loop: string; junction: Pt; flag: Pt };

const LAYOUTS: Record<LayoutKey, Layout> = {
  wide: {
    w: 1200, h: 800,
    roads: [
      { kind: 'branch', d: 'M120 395 C170 300 200 175 345 160' },
      { kind: 'branch', d: 'M120 395 C200 430 270 350 350 390' },
      { kind: 'branch', d: 'M120 395 C170 490 200 640 345 625' },
      { kind: 'branch', d: 'M345 160 C470 150 520 300 575 392' },
      { kind: 'branch', d: 'M350 390 C430 420 500 360 575 392' },
      { kind: 'branch', d: 'M345 625 C470 640 520 500 575 392' },
      { kind: 'main', d: 'M575 392 C620 320 650 220 745 215' },
      { kind: 'main', d: 'M745 215 C830 205 900 320 985 255' },
      { kind: 'main', d: 'M985 255 C1090 300 1010 430 890 445' },
      { kind: 'main', d: 'M890 445 C960 470 1130 490 1050 585' },
      { kind: 'main', d: 'M1050 585 C980 660 900 610 790 650' },
    ],
    loop: 'M790 722 C786 762 730 758 670 758 L150 758 C90 758 58 728 58 668 L58 480 C58 452 62 440 74 434',
    junction: [575, 392],
    flag: [790, 650],
  },
  tall: {
    w: 420, h: 1130,
    roads: [
      { kind: 'branch', d: 'M210 95 C140 105 88 150 88 245' },
      { kind: 'branch', d: 'M210 95 C232 170 190 220 210 290' },
      { kind: 'branch', d: 'M210 95 C280 105 332 150 332 245' },
      { kind: 'branch', d: 'M88 245 C88 340 150 400 210 415' },
      { kind: 'branch', d: 'M210 290 C228 340 192 372 210 415' },
      { kind: 'branch', d: 'M332 245 C332 340 270 400 210 415' },
      { kind: 'main', d: 'M210 415 C270 425 330 450 325 525' },
      { kind: 'main', d: 'M325 525 C325 590 95 560 95 630' },
      { kind: 'main', d: 'M95 630 C95 700 325 670 325 742' },
      { kind: 'main', d: 'M325 742 C325 810 95 790 95 858' },
      { kind: 'main', d: 'M95 858 C95 925 285 910 285 985' },
    ],
    loop: 'M285 1040 C282 1088 200 1090 120 1088 L74 1088 C52 1088 42 1072 42 1046 L42 160 C42 116 84 98 150 94',
    junction: [210, 415],
    flag: [285, 985],
  },
};

const TILT = [-1.6, 1.3, -0.9, 1.8, -1.3, 1.0, -1.9, 1.2, -0.8];

const COPY = {
  en: {
    kicker: 'CONTENT CREATION',
    title: 'The Creator’s Map',
    sub: 'From an idea to a visual story',
    hint: 'Hover or tap a checkpoint to read the story behind it.',
    step: 'Checkpoint',
    route: 'Route',
    start: 'START',
    merge: 'the three routes meet',
    loop: 'Feedback shapes the next idea',
    label: 'The Creator’s Map: the journey from idea to feedback',
  },
  ar: {
    kicker: 'صناعة المحتوى',
    title: 'خريطة الصانعة',
    sub: 'من الفكرة إلى المنتج المرئي',
    hint: 'مرّ على أي محطة أو اضغط عليها وشوف القصة وراها.',
    step: 'المحطة',
    route: 'المسار',
    start: 'البداية',
    merge: 'المسارات الثلاثة تلتقي',
    loop: 'التفاعل يصنع الفكرة الجاية',
    label: 'خريطة الصانعة: رحلة المحتوى من الفكرة إلى التفاعل',
  },
} as const;

/* Hand-inked wobble: samples a path and nudges it sideways with smooth noise, so lines look drawn by hand instead of plotted. */
function wobble(d: string, { amp = 1.6, seed = 1, shift = 0, step = 6 }: { amp?: number; seed?: number; shift?: number; step?: number } = {}) {
  const pts: [number, number][] = [];
  let cx = 0;
  let cy = 0;
  for (const m of d.matchAll(/([MLC])([^MLC]*)/g)) {
    const n = m[2].trim().split(/[\s,]+/).map(Number);
    if (m[1] === 'M') {
      cx = n[0]; cy = n[1];
      pts.push([cx, cy]);
    } else if (m[1] === 'L') {
      const k = Math.max(1, Math.ceil(Math.hypot(n[0] - cx, n[1] - cy) / step));
      for (let i = 1; i <= k; i++) pts.push([cx + ((n[0] - cx) * i) / k, cy + ((n[1] - cy) * i) / k]);
      cx = n[0]; cy = n[1];
    } else {
      const [x1, y1, x2, y2, x, y] = n;
      const k = Math.max(4, Math.ceil((Math.hypot(x1 - cx, y1 - cy) + Math.hypot(x2 - x1, y2 - y1) + Math.hypot(x - x2, y - y2)) / step));
      for (let i = 1; i <= k; i++) {
        const t = i / k;
        const u = 1 - t;
        pts.push([u * u * u * cx + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x, u * u * u * cy + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y]);
      }
      cx = x; cy = y;
    }
  }
  const run: number[] = [0];
  for (let i = 1; i < pts.length; i++) run.push(run[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = run[run.length - 1] || 1;
  const out = pts.map(([x, y], i) => {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const l = Math.hypot(dx, dy) || 1;
    const s = run[i];
    const taper = Math.min(1, s / 24, (total - s) / 24);
    const off = shift + taper * amp * (Math.sin(s * 0.043 + seed * 1.7) + 0.55 * Math.sin(s * 0.117 + seed * 3.1) + 0.25 * Math.sin(s * 0.29 + seed * 5.3));
    return `${(x - (dy / l) * off).toFixed(1)} ${(y + (dx / l) * off).toFixed(1)}`;
  });
  return `M${out.join('L')}`;
}

type Ink = { kind: 'main' | 'branch'; wash: string; a: string; b: string; route: string };
const INK: Record<LayoutKey, { roads: Ink[]; loop: string; frame: string[] }> = {
  wide: buildInk('wide'),
  tall: buildInk('tall'),
};

function buildInk(key: LayoutKey) {
  const L = LAYOUTS[key];
  const rect = (inset: number, seed: number) => wobble(`M${inset} ${inset}L${L.w - inset} ${inset}L${L.w - inset} ${L.h - inset}L${inset} ${L.h - inset}L${inset} ${inset}`, { amp: 0.9, seed, step: 9 });
  return {
    roads: L.roads.map((r, i): Ink => {
      const half = r.kind === 'main' ? 6.8 : 4.6;
      return {
        kind: r.kind,
        wash: wobble(r.d, { amp: 1.2, seed: i + 1 }),
        a: wobble(r.d, { amp: 1.1, seed: i + 11, shift: half }),
        b: wobble(r.d, { amp: 1.1, seed: i + 21, shift: -half }),
        route: wobble(r.d, { amp: 0.9, seed: i + 31 }),
      };
    }),
    loop: wobble(L.loop, { amp: 1.3, seed: 41 }),
    frame: [rect(16, 3), rect(24, 5), rect(32, 7)],
  };
}

/* Icons are drawn as plain ink line-work on a 48 x 48 grid, then placed inside each medallion. */
function IconPaths({ name }: { name: IconName }) {
  switch (name) {
    case 'spark':
      return <><path className="cm-accent cm-fill" d="M24 5c1.6 10.5 5 15 17 19-12 4-15.4 8.5-17 19-1.6-10.5-5-15-17-19 12-4 15.4-8.5 17-19Z" /><path d="M39 6v6M36 9h6M9 35v5M6.5 37.5h5" /></>;
    case 'book':
      return <><path d="M24 13c-5-4-12-4-17-2v27c5-2 12-2 17 2 5-4 12-4 17-2V11c-5-2-12-2-17 2ZM24 13v27" /><path className="cm-accent" d="M12 19c3-.8 6-.6 8 .6M12 25c3-.8 6-.6 8 .6" /></>;
    case 'trend':
      return <><path d="M5 41h38" /><path className="cm-accent" d="M7 33l10-11 8 6 15-16M31 12h9v9" /></>;
    case 'search':
      return <><circle cx="21" cy="21" r="12" /><path d="M30 30l11 11" strokeWidth="3.6" /><path className="cm-accent" d="M17 18c0-4.5 8-4.5 8 .5 0 3-4 3.4-4 7M21 29.5h.02" /></>;
    case 'script':
      return <><path d="M11 5h16l8 8v29H11ZM27 5v8h8M17 22h12M17 28h8" /><path className="cm-accent cm-paper" d="M30 40l10-10 4 4-10 10-5 1Z" /></>;
    case 'camera':
      return <><rect x="5" y="15" width="30" height="23" rx="4" /><path d="M11 15l3-5h11l3 5M35 23l8-5v20l-8-5" /><circle cx="20" cy="26.5" r="6" /><circle className="cm-accent cm-fill" cx="20" cy="26.5" r="2.2" /></>;
    case 'clapper':
      return <><rect x="6" y="21" width="36" height="20" rx="2.5" /><path d="M6 21l-1.6-9 36.6-6 1.6 9-2 6" /><path className="cm-accent" d="M14 19.5l3-11.5M23 17.5l3-11.5M32 16l3-11" /><path className="cm-accent cm-fill" d="M21 26.5v10l9-5Z" /></>;
    case 'send':
      return <><path d="M5 22L43 6l-9 36-12-10Z" /><path className="cm-accent" d="M43 6L22 32v10l6-7" /></>;
    case 'chart':
      return <><path d="M4 42h40" /><rect x="8" y="27" width="6" height="15" rx="1.5" /><rect x="18" y="19" width="6" height="23" rx="1.5" /><rect x="28" y="24" width="6" height="18" rx="1.5" /><rect className="cm-accent cm-fill" x="38" y="9" width="6" height="33" rx="1.5" /></>;
  }
}

/* A watch-wheel outline: toothed rim, then a flat arc back to the next tooth. */
function gearPath(teeth: number, outer: number, root: number) {
  const step = (Math.PI * 2) / teeth;
  const at = (r: number, a: number) => `${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a = i * step - Math.PI / 2;
    d += `${i === 0 ? 'M' : 'L'}${at(root, a - step * 0.3)}L${at(outer, a - step * 0.19)}L${at(outer, a + step * 0.19)}L${at(root, a + step * 0.3)}A${root} ${root} 0 0 1 ${at(root, a + step - step * 0.3)}`;
  }
  return `${d}Z`;
}
const GEAR = gearPath(16, 48.5, 42.5);
const TICKS = Array.from({ length: 24 }, (_, i) => i).filter((i) => i % 6 !== 0).map((i) => {
  const a = (i * Math.PI) / 12;
  return `M${(Math.cos(a) * 32.5).toFixed(2)} ${(Math.sin(a) * 32.5).toFixed(2)}L${(Math.cos(a) * 36.5).toFixed(2)} ${(Math.sin(a) * 36.5).toFixed(2)}`;
}).join('');
const TICKS_Q = [0, 6, 12, 18].map((i) => {
  const a = (i * Math.PI) / 12;
  return `M${(Math.cos(a) * 30).toFixed(2)} ${(Math.sin(a) * 30).toFixed(2)}L${(Math.cos(a) * 36.5).toFixed(2)} ${(Math.sin(a) * 36.5).toFixed(2)}`;
}).join('');

/* A brass watch wheel with a dial: toothed rim, hour ticks, the icon in the middle, and a wax seal for the number. */
function Medallion({ stage }: { stage: Stage }) {
  return (
    <svg className="cm-medal" viewBox="-50 -50 100 100" aria-hidden="true" focusable="false">
      <g filter="url(#cm-rough-sm)">
        <path className="cm-gear" d={GEAR} />
        <circle className="cm-face" r="39.6" />
        <path className="cm-tick" d={TICKS} />
        <path className="cm-tick cm-tick-q" d={TICKS_Q} />
        <g className="cm-icon" transform="translate(-22 -22) scale(.92)"><IconPaths name={stage.icon} /></g>
      </g>
      <g transform="translate(33 -32)">
        <path className="cm-seal" filter="url(#cm-rough-sm)" d="M0-13.5C7-14.5 13-8.5 13.6-1 14.4 6.6 8.6 13 1 13.6-6.6 14.4-13.2 8.4-13.6.8-14.2-6.8-7.6-12.6 0-13.5Z" />
        <text className="cm-seal-n" textAnchor="middle" y="4.3">{stage.n}</text>
      </g>
    </svg>
  );
}

/* Shared drawing symbols, filters and paper, defined once and referenced by both map layouts. */
function Defs() {
  return (
    <svg className="cm-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <g id="cm-tree" className="cm-tree"><path d="M-9 0L0-13 9 0M-7-9L0-21 7-9M-5-18L0-28 5-18M0 0v6" /></g>
        <g id="cm-hill" className="cm-hill"><path d="M-15 0Q0-22 15 0M-7-4l-2 5M0-8v8M7-4l2 5" /></g>
        <g id="cm-stip" className="cm-stip"><circle cx="0" cy="0" r="1.1" /><circle cx="6" cy="3" r=".9" /><circle cx="-5" cy="5" r="1" /><circle cx="10" cy="-3" r=".8" /><circle cx="2" cy="-7" r="1" /><circle cx="-9" cy="-1" r=".9" /><circle cx="13" cy="6" r="1" /><circle cx="-2" cy="10" r=".8" /></g>
        <path id="cm-x" className="cm-x" d="M-6-6L6 6M6-6L-6 6" />
        <g id="cm-sign" className="cm-sign">
          <path d="M0 4V-50" />
          <path className="cm-board" d="M0-48h30l8 6-8 6H0ZM0-31h-26l-8 6 8 6H0Z" />
          <circle className="cm-board-dot" cx="0" cy="-49" r="2.6" />
        </g>
        <marker id="cm-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1.5L8.5 5 1 8.5Z" fill="#B23B5A" /></marker>
        <radialGradient id="cm-paper-grad" cx="50%" cy="42%" r="78%"><stop offset="0" stopColor="#FFF6DC" /><stop offset=".6" stopColor="#FFF2D6" /><stop offset="1" stopColor="#EED9A4" /></radialGradient>
        <filter id="cm-rough" x="-3%" y="-3%" width="106%" height="106%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="2" seed="3" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" /></filter>
        <filter id="cm-rough-sm" x="-8%" y="-8%" width="116%" height="116%"><feTurbulence type="fractalNoise" baseFrequency=".07" numOctaves="2" seed="6" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" /></filter>
        <filter id="cm-paper" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency=".011" numOctaves="2" seed="5" result="warpA" />
          <feDisplacementMap in="SourceGraphic" in2="warpA" scale="16" xChannelSelector="R" yChannelSelector="G" result="rag1" />
          <feTurbulence type="fractalNoise" baseFrequency=".08" numOctaves="2" seed="8" result="warpB" />
          <feDisplacementMap in="rag1" in2="warpB" scale="5" xChannelSelector="G" yChannelSelector="B" result="ragged" />
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="2" result="fine" />
          <feColorMatrix in="fine" type="matrix" values="0 0 0 0 .38  0 0 0 0 .26  0 0 0 0 .1  0 0 0 .5 -.08" result="grainRaw" />
          <feComposite in="grainRaw" in2="ragged" operator="in" result="grain" />
          <feTurbulence type="fractalNoise" baseFrequency=".007 .01" numOctaves="4" seed="12" result="blot" />
          <feColorMatrix in="blot" type="matrix" values="0 0 0 0 .62  0 0 0 0 .42  0 0 0 0 .16  0 0 0 1.25 -.55" result="stainRaw" />
          <feComposite in="stainRaw" in2="ragged" operator="in" result="stain" />
          <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="1" seed="21" result="spots" />
          <feColorMatrix in="spots" type="matrix" values="0 0 0 0 .42  0 0 0 0 .24  0 0 0 0 .08  0 0 0 10 -7.9" result="fox" />
          <feComposite in="fox" in2="ragged" operator="in" result="foxing" />
          <feMorphology in="ragged" operator="erode" radius="14" result="core" />
          <feGaussianBlur in="core" stdDeviation="18" result="coreSoft" />
          <feFlood floodColor="#6F4313" floodOpacity=".5" result="burnColor" />
          <feComposite in="burnColor" in2="coreSoft" operator="out" result="burnRaw" />
          <feComposite in="burnRaw" in2="ragged" operator="in" result="burn" />
          <feMerge><feMergeNode in="ragged" /><feMergeNode in="stain" /><feMergeNode in="foxing" /><feMergeNode in="burn" /><feMergeNode in="grain" /></feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function Contour({ x, y, s = 1, r = 0 }: { x: number; y: number; s?: number; r?: number }) {
  const d = 'M0-60C40-70 78-40 80-2 82 40 40 66-6 62-50 58-84 30-80-8-76-44-38-52 0-60Z';
  return (
    <g className="cm-contour" transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[1, 0.74, 0.5, 0.27].map((k) => <path key={k} d={d} transform={`scale(${k})`} />)}
    </g>
  );
}

const put = (id: string, x: number, y: number, s = 1) => <use key={`${id}${x}${y}`} href={`#${id}`} transform={`translate(${x} ${y}) scale(${s})`} />;

/* Decorations that are symmetric or text-free live in the group that mirrors for RTL. */
function WideArt() {
  return (
    <>
      <Contour x={190} y={118} s={1.05} r={-8} />
      <Contour x={1090} y={410} s={0.8} r={20} />
      <Contour x={640} y={700} s={0.85} r={-24} />
      {[[70, 250], [96, 262], [60, 285], [468, 90], [498, 104], [452, 116], [1140, 560], [1116, 578], [220, 690], [246, 704], [206, 715], [640, 88], [664, 78]].map(([x, y], i) => put('cm-tree', x, y, 0.9 + (i % 3) * 0.12))}
      {[[560, 560], [590, 574], [536, 574], [860, 705], [890, 717], [1120, 222], [1146, 232], [980, 60], [1005, 70]].map(([x, y]) => put('cm-hill', x, y, 1.15))}
      {[[470, 250], [905, 150], [660, 560], [1000, 690], [240, 330], [1150, 330], [500, 700], [800, 330]].map(([x, y]) => put('cm-stip', x, y, 1.2))}
      {put('cm-x', 1128, 470, 1.1)}
      {put('cm-x', 262, 545, 0.9)}
      {put('cm-sign', 655, 505, 1)}
      <path className="cm-trail" d="M890 445 C850 520 800 540 760 585" />
      <path className="cm-trail" d="M985 255 C1060 190 1100 200 1150 240" />
      <path className="cm-trail" d="M345 160 C300 110 260 70 200 60" />
      <g className="cm-scale"><path d="M1032 738h96" /><path d="M1032 732v12M1056 735v6M1080 732v12M1104 735v6M1128 732v12" /></g>
    </>
  );
}

function TallArt() {
  return (
    <>
      <Contour x={330} y={80} s={0.55} r={-10} />
      <Contour x={70} y={470} s={0.5} r={15} />
      <Contour x={352} y={900} s={0.5} r={-20} />
      {[[62, 356], [84, 368], [58, 388], [362, 352], [378, 364], [66, 756], [82, 768], [372, 620], [356, 634], [190, 1062], [212, 1074]].map(([x, y], i) => put('cm-tree', x, y, 0.85 + (i % 3) * 0.1))}
      {[[160, 570], [182, 582], [250, 830], [274, 842], [372, 470], [140, 470]].map(([x, y]) => put('cm-hill', x, y, 1))}
      {[[130, 320], [300, 350], [210, 620], [220, 900], [372, 800], [56, 560]].map(([x, y]) => put('cm-stip', x, y, 1.1))}
      {put('cm-x', 210, 700, 1)}
      {put('cm-sign', 84, 452, 0.9)}
      <path className="cm-trail" d="M325 525 C370 500 385 470 388 440" />
      <path className="cm-trail" d="M95 858 C64 900 56 930 66 960" />
    </>
  );
}

function Compass({ x, y, r = 1 }: { x: number; y: number; r?: number }) {
  return (
    <g className="cm-compass" transform={`translate(${x} ${y}) scale(${r})`}>
      <g filter="url(#cm-rough-sm)">
        <circle r="46" className="cm-ring-c" />
        <circle r="38" className="cm-ring-c cm-ring-dash" />
        {[45, 135, 225, 315].map((a) => <path key={a} className="cm-pt-sm" d="M0-31L4.5-4.5 0 0-4.5-4.5Z" transform={`rotate(${a})`} />)}
        {[90, 180, 270].map((a) => <path key={a} className="cm-pt" d="M0-46L7-7 0 0-7-7Z" transform={`rotate(${a})`} />)}
        <path className="cm-pt cm-pt-n" d="M0-46L7-7 0 0-7-7Z" />
        <circle r="3" className="cm-hub" />
      </g>
      <text y="-54" textAnchor="middle">N</text>
    </g>
  );
}

function MapSvg({ layoutKey, lang }: { layoutKey: LayoutKey; lang: Lang }) {
  const L = LAYOUTS[layoutKey];
  const ink = INK[layoutKey];
  const ar = lang === 'ar';
  const mx = (x: number) => (ar ? L.w - x : x);
  const flip = ar ? `translate(${L.w} 0) scale(-1 1)` : undefined;
  const [jx, jy] = L.junction;
  const [fx, fy] = L.flag;
  const compass: Pt = layoutKey === 'wide' ? [1105, 112] : [340, 84];
  const clipId = `cm-clip-${layoutKey}`;
  return (
    <svg className="cm-svg" viewBox={`0 0 ${L.w} ${L.h}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <g filter="url(#cm-paper)"><rect x="10" y="10" width={L.w - 20} height={L.h - 20} fill="url(#cm-paper-grad)" /></g>
      <path className="cm-fold" d={`M${L.w / 3} 30V${L.h - 30}M${(L.w * 2) / 3} 30V${L.h - 30}M30 ${L.h / 2}H${L.w - 30}`} />
      <clipPath id={clipId}><rect x="34" y="34" width={L.w - 68} height={L.h - 68} /></clipPath>
      <g clipPath={`url(#${clipId})`}>
        <g className="cm-rhumb" transform={`translate(${mx(compass[0])} ${compass[1]})`}>
          {Array.from({ length: 16 }, (_, i) => <path key={i} d="M0 0H1700" transform={`rotate(${i * 22.5})`} />)}
        </g>
      </g>
      <g transform={flip}>
        <g filter="url(#cm-rough-sm)" className="cm-art">{layoutKey === 'wide' ? <WideArt /> : <TallArt />}</g>
        {ink.roads.map((r, i) => (
          <g key={i} className={`cm-road cm-road-${r.kind}`} style={{ '--d': (i * 0.14).toFixed(2) } as CSSProperties}>
            <path className="cm-road-wash" d={r.wash} pathLength={1} />
            <path className="cm-road-edge" d={r.a} pathLength={1} />
            <path className="cm-road-edge" d={r.b} pathLength={1} />
            <path className="cm-road-route" d={r.route} />
          </g>
        ))}
        <path className="cm-loop" d={ink.loop} markerEnd="url(#cm-arrow)" />
      </g>
      <g className="cm-junction" transform={`translate(${mx(jx)} ${jy})`}>
        <g filter="url(#cm-rough-sm)"><circle r="17" className="cm-jn-ring" /><circle r="12" className="cm-jn-ring cm-jn-thin" /></g>
        <circle r="5.5" className="cm-jn-dot" />
      </g>
      <g className="cm-flag" transform={`translate(${mx(fx) + (ar ? -24 : 24)} ${fy - 34}) scale(${ar ? -1 : 1} 1)`} filter="url(#cm-rough-sm)">
        <path d="M0 0V-42" />
        <path className="cm-flag-cloth" d="M0-42C9-46 17-38 28-42L23-33 28-24C17-28 9-20 0-24Z" />
      </g>
      <Compass x={mx(compass[0])} y={compass[1]} r={layoutKey === 'wide' ? 1 : 0.62} />
      <path className="cm-frame cm-frame-outer" d={ink.frame[0]} />
      <path className="cm-frame cm-frame-band-base" d={ink.frame[1]} />
      <path className="cm-frame cm-frame-band" d={ink.frame[1]} />
      <path className="cm-frame cm-frame-inner" d={ink.frame[2]} />
      {[[32, 32], [L.w - 32, 32], [32, L.h - 32], [L.w - 32, L.h - 32]].map(([x, y]) => <circle key={`${x}${y}`} className="cm-corner" cx={x} cy={y} r="4.2" />)}
    </svg>
  );
}

export function CreatorsMapSection({ lang }: { lang: Lang }) {
  const ar = lang === 'ar';
  const t = COPY[lang];
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const activeId = hovered ?? focused ?? pinned;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.18 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target as Element | null)?.closest?.('.cm-node')) setPinned(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setPinned(null); setHovered(null); }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const renderNodes = (layoutKey: LayoutKey) => {
    const L = LAYOUTS[layoutKey];
    const edge = layoutKey === 'wide' ? 0.2 : 0.3;
    return STAGES.map((stage, index) => {
      const [x, y] = stage[layoutKey];
      const px = ar ? L.w - x : x;
      const side = px / L.w < edge ? 'start' : px / L.w > 1 - edge ? 'end' : 'mid';
      const vertical = y / L.h < 0.5 ? 'below' : 'above';
      const copy = stage[lang];
      const isActive = activeId === stage.id;
      const cardId = `cm-card-${layoutKey}-${stage.id}`;
      const style = { left: `${(px / L.w) * 100}%`, top: `${(y / L.h) * 100}%`, '--i': index, '--rot': TILT[index % TILT.length] } as CSSProperties;
      return (
        <div key={stage.id} className={`cm-node${isActive ? ' is-active' : ''}${stage.id === 'idea' ? ' is-start' : ''}`} style={style}>
          {stage.id === 'idea' && <span className="cm-start" aria-hidden="true">{t.start}</span>}
          <button
            type="button"
            className="cm-pin"
            aria-expanded={isActive}
            aria-controls={isActive ? cardId : undefined}
            onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHovered(stage.id); }}
            onPointerLeave={(event) => { if (event.pointerType === 'mouse') setHovered((current) => (current === stage.id ? null : current)); }}
            onFocus={(event) => { if (event.currentTarget.matches(':focus-visible')) setFocused(stage.id); }}
            onBlur={() => setFocused((current) => (current === stage.id ? null : current))}
            onClick={() => setPinned((current) => (current === stage.id ? null : stage.id))}
          >
            <Medallion stage={stage} />
            <span className="cm-tagwrap"><span className="cm-tag">{copy.label}</span></span>
          </button>
          {isActive && (
            <div id={cardId} className={`cm-card cm-card-${side} cm-card-${vertical}`} role="status">
              <div className="cm-paper">
                <span className="cm-card-seal" aria-hidden="true">{stage.n}</span>
                <span className="cm-card-kicker">{t.step} {stage.n} / 09{stage.route ? ` · ${t.route}\u00a0${stage.route}` : ''}</span>
                <strong className="cm-card-title">{copy.label}</strong>
                <span className="cm-card-text">{copy.text}</span>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  const renderLayout = (layoutKey: LayoutKey) => {
    const L = LAYOUTS[layoutKey];
    const [jx, jy] = L.junction;
    const jpx = ar ? L.w - jx : jx;
    return (
      <div className={`cm-stage cm-${layoutKey}`} style={{ aspectRatio: `${L.w} / ${L.h}` }}>
        <MapSvg layoutKey={layoutKey} lang={lang} />
        {layoutKey === 'wide' && <span className="cm-merge" style={{ left: `${((jpx + (ar ? -28 : 28)) / L.w) * 100}%`, top: `${((jy + 34) / L.h) * 100}%`, transform: ar ? 'translateX(-100%)' : undefined }}>{t.merge}</span>}
        <span className="cm-loop-note" style={layoutKey === 'wide' ? { left: `${((ar ? L.w - 400 : 400) / L.w) * 100}%`, top: `${(758 / L.h) * 100}%` } : { left: '50%', top: `${(1088 / L.h) * 100}%` }}>↺ {t.loop}</span>
        {renderNodes(layoutKey)}
      </div>
    );
  };

  return (
    <section ref={sectionRef} className={`creators-map${inView ? ' is-in' : ''}`} aria-labelledby="creation-title">
      <Defs />
      <header className="cm-head">
        <p className="cm-kicker">{t.kicker}</p>
        <h2 id="creation-title">{ar ? <span className="xb-shafigh">{t.title}</span> : <span className="english-title">{t.title}</span>}</h2>
        <p className="cm-sub" lang={lang}>{t.sub}</p>
        <span className="cm-rule" aria-hidden="true" />
      </header>
      <div className="cm-sheet" role="group" aria-label={t.label}>
        {renderLayout('wide')}
        {renderLayout('tall')}
      </div>
      <p className="cm-hint">{t.hint}</p>
      <ol className="cm-sr">
        {STAGES.map((stage) => <li key={stage.id}><strong>{stage[lang].label}</strong>: {stage[lang].text}</li>)}
      </ol>
    </section>
  );
}
