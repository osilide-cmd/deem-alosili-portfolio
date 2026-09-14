'use client';

import { ArrowDownRight, ArrowUpRight, Check, Mail, Menu, MessageCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const newroomMetrics = [['1.1M', 'Top video views'], ['22.3K', 'Total likes'], ['19.7K', 'Views in 365 days'], ['96.9%', 'Search traffic']];
const arabicVidsMetrics = [['911.3K', 'Post views'], ['81.6K', 'Likes'], ['13.6K', 'Shares'], ['83.1%', 'For You traffic']];
const routeImages: Record<string, string> = {
  '01': '/case-studies/route-brainstorming.png',
  '02': '/case-studies/route-scripting.png',
  '03': '/case-studies/route-shooting.png',
  '04': '/case-studies/route-production.png',
  '05': '/case-studies/route-publishing.png',
  '06': '/case-studies/route-feedback.png',
};

export default function Home() {
  const [activeCase, setActiveCase] = useState<'newroom' | 'arabicVids' | null>(null);
  const [localizationLanguage, setLocalizationLanguage] = useState<'en' | 'ar'>('ar');
  useEffect(() => {
    const measurementId = 'G-5S5ZC9ENJV';
    const analyticsWindow = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    analyticsWindow.gtag = (...args) => analyticsWindow.dataLayer?.push(args);
    analyticsWindow.gtag('js', new Date());
    analyticsWindow.gtag('config', measurementId);
    if (!document.querySelector(`script[src*="${measurementId}"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    }
  }, []);
  const scrollToWork = () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  return <main dir={localizationLanguage === 'ar' ? 'rtl' : 'ltr'}>
    <nav className="site-nav"><div className="nav-links"><a href="#creation-title">{localizationLanguage === 'ar' ? 'الأعمال' : 'Work'}</a><a href="#contact">{localizationLanguage === 'ar' ? 'تواصل معي' : 'Contact me'}</a></div><button type="button" className="site-language-toggle" onClick={() => setLocalizationLanguage(localizationLanguage === 'ar' ? 'en' : 'ar')}>{localizationLanguage === 'ar' ? 'ENG' : 'AR'}</button><Button variant="ghost" size="icon" className="menu-button" aria-label="Open menu"><Menu /></Button></nav>
    <section id="top" className="hero-section"><div className="hero-headline"><p className="hero-name">Deem Alosili<span>.</span></p>{localizationLanguage === 'ar' ? <h2 className="hero-role hero-secondary-title">صانعة محتوى</h2> : <><h1>Stories that<br /><em>move people.</em></h1><p className="hero-role">Content Creator · Strategist</p></>}</div><div className="hero-bottom"><p>{localizationLanguage === 'ar' ? 'أحوّل اللحظات اليومية إلى محتوى يجذب ويؤثر ويحرّك.' : 'I turn everyday moments into content people stop, feel, and act on.'}</p><button className="round-action" onClick={scrollToWork} aria-label="View selected work"><ArrowDownRight /></button></div><div className="orb orb-one" /><div className="orb orb-two" /></section>
    <section className={'localization-section ' + (localizationLanguage === 'ar' ? 'is-ar' : 'is-en')} aria-labelledby="localization-title" dir={localizationLanguage === 'ar' ? 'rtl' : 'ltr'}>
      <div className="localization-copy">
        <div className="localization-topline">
          <p className="eyebrow">{localizationLanguage === 'ar' ? 'سعودة المنتج' : 'SAUDI LOCALIZATION'}</p>
        </div>
        <h2 id="localization-title"><span className="xb-shafigh">سعودة المنتج</span><span className="english-title">Localization</span></h2>
        <p className="localization-description">{localizationLanguage === 'ar' ? 'أكتب المحتوى من قصص وأفكار وسيناريوهات كتابة تخاطب السعودي' : 'I write stories, ideas, and scripts that speak to Saudi audiences.'}</p>
      </div>
      <div className="localization-demo" aria-label="Saudi localization writing demo">
        <p className="terminal-label">LOCALIZATION IN ACTION</p>
        <div className="localization-rotator" aria-live="polite">
          <p className="localization-pair pair-one"><span>Don’t Take it Seriously</span><b className="xb-shafigh" lang="ar">لا تشـــــــــــــدها</b></p>
          <p className="localization-pair pair-two"><span>However!</span><b className="xb-shafigh" lang="ar">بس!!</b></p>
          <p className="localization-pair pair-three"><span>Just Enjoy Doing it</span><b className="xb-shafigh" lang="ar">ياخي سويه وانبسط</b></p>
        </div>
      </div>
      <section className="saudi-post-showcase" aria-label="Saudi-styled social posts">
        <h3 className="xb-shafigh">حتى المنشورات بطابع سعودي</h3>
        <div className="saudi-post-stack">
          <img src="/localization-posts/saudi-1.png" alt="Saudi-styled social post one" />
          <img src="/localization-posts/saudi-2.png" alt="Saudi-styled social post two" />
          <img src="/localization-posts/saudi-3.png" alt="Saudi-styled social post three" />
        </div>
      </section>
    </section>
    <section className={'proofreading-section ' + (localizationLanguage === 'ar' ? 'is-ar' : 'is-en')} aria-labelledby="proofreading-title" dir={localizationLanguage === 'ar' ? 'rtl' : 'ltr'}>
      <div className="proofreading-visual" aria-label="Proofreading correction demo">
        <div className="proof-editor">
          <div className="editor-bar"><span className="editor-dots"><i /><i /><i /></span><span>TEXT REVIEW</span></div>
          <div className="editor-body" dir="rtl">
            <div className="proof-typewriter" aria-label="Animated proofreading corrections">
              <p className="proof-edit proof-edit-one"><span className="proof-edit-label">يُكتب</span><span className="proof-typed-wrong">نفذت الكمية</span><span className="proof-erased">نفذت الكمية</span><span className="proof-typed-correct">نفدت الكمية</span><i aria-hidden="true" /></p>
              <p className="proof-edit proof-edit-two"><span className="proof-edit-label">يُكتب</span><span className="proof-typed-wrong">تم الإرسال</span><span className="proof-erased">تم الإرسال</span><span className="proof-typed-correct">أرسلنا</span><i aria-hidden="true" /></p>
              <p className="proof-edit proof-edit-three"><span className="proof-edit-label">يُكتب</span><span className="proof-typed-wrong">أنا كصانع محتوى أقول لك...</span><span className="proof-erased proof-erased-partial" style={{ animation: 'none', opacity: 1 }}><span>أنا </span><span className="proof-struck">كصانع</span><span> محتوى أقول لك...</span></span><span className="proof-typed-correct">أنا صانع محتوى وأقول لك</span><i aria-hidden="true" /></p>
            </div>
          </div>
        </div>
        <p className="proof-caption">SCAN · REVIEW · REFINE</p>
      </div>
      <div className="proofreading-copy">
        <div className="proofreading-topline">
          <p className="eyebrow">{localizationLanguage === 'ar' ? 'التدقيق والتحرير' : 'PROOFREADING'}</p>
        </div>
        <h2 id="proofreading-title"><span className="xb-shafigh">التدقيق والتحرير</span><span className="english-title">Proofreading</span></h2>
        <p className="proofreading-description">{localizationLanguage === 'ar' ? 'أراجع النص حتى يسلم من الأخطاء' : 'I review every line until it is free from errors.'}</p>
      </div>
    </section>
    <section className="creation-journey" aria-labelledby="creation-title">
      <div className="creation-journey-copy">
        <h2 id="creation-title"><span className="xb-shafigh">صناعة المحتوى</span><span className="english-title">Content Creation</span></h2>
        <p className="creation-subtitle xb-shafigh" lang="ar" dir="rtl">من الفكرة إلى المنتج المرئي</p>
      </div>
      <div className="journey-map" aria-label="Creative journey from brainstorming to feedback">
        <svg viewBox="0 0 720 430" role="img" aria-labelledby="journey-map-title journey-map-desc">
          <title id="journey-map-title">Creative content journey</title><desc id="journey-map-desc">A winding map connecting brainstorming, scripting, shooting, production, publishing, and feedback.</desc>
          <path className="journey-path" d="M72 110 C155 40 234 182 314 102 S475 42 534 135 S658 218 580 282 S396 364 318 290 S170 365 92 304" />
          <path className="journey-landmark landmark-star" d="M214 52l8 18 19 2-14 13 4 19-17-10-17 10 4-19-14-13 19-2z" />
          <path className="journey-landmark landmark-flag" d="M588 70v44m0-44 29 10-29 10" />
          <path className="journey-landmark landmark-spark" d="M490 336v-28m-14 14h28" />
          {(localizationLanguage === 'ar' ? [[72,110,'01','نجيب أفكار'],[314,102,'02','نكتب'],[534,135,'03','نصور'],[580,282,'04','نمنتج'],[318,290,'05','ننشر'],[92,304,'06','نشوف التفاعل']] : [[72,110,'01','Brainstorming'],[314,102,'02','Scripting'],[534,135,'03','Shooting'],[580,282,'04','Production'],[318,290,'05','Publishing'],[92,304,'06','Feedback']]).map(([x,y,number,label]) => <g className="journey-stop" key={String(number)} transform={`translate(${x} ${y})`}><circle className="journey-path-break" r="35" /><image className="journey-icon" href={routeImages[number]} x="-29" y="-29" width="58" height="58" /><text y="-41" textAnchor="middle">{number}</text><text y="55" textAnchor="middle">{label}</text></g>)}
        </svg>
      </div>
    </section>
    <section id="work" className="work-section">
      <div className="work-intro"><p className="eyebrow">{localizationLanguage === 'ar' ? 'إدارة منصات التواصل' : 'MANAGING DIGITAL CONTENT'}</p><h2><span className="xb-shafigh">إدارة منصات التواصل</span><span className="english-title">Managing Digital Content</span></h2><p>{localizationLanguage === 'ar' ? 'من التخطيط إلى النشر، أقدّم محتوى يربط الفكرة بالجمهور.' : 'From planning to publishing, I connect the idea with its audience.'}</p></div>
      <div className="section-heading"><p className="eyebrow">{localizationLanguage === 'ar' ? 'أعمال مختارة / 02' : 'SELECTED WORK / 02'}</p></div>
      <div className="case-grid">
        <article className="case-card"><h2 className="case-title-above">Newroom<br /><em>Ideas</em></h2><div className="case-summary"><p className="eyebrow">{localizationLanguage === 'ar' ? 'استراتيجية محتوى · سرد قصصي' : 'CONTENT STRATEGY · STORYTELLING'}</p><p>I built a story-led content direction that turned bedroom challenges into helpful, searchable videos.</p><Button onClick={() => setActiveCase('newroom')} className="case-button">{localizationLanguage === 'ar' ? 'استكشف' : 'Explore case study'} <ArrowUpRight data-icon="inline-end" /></Button></div><div className="case-image-wrap"><img src="/case-studies/newroom-upload.png" alt="Newroom Ideas TikTok case study" className="case-image newroom-feature-image" /><div className="metric-bubble bubble-views"><strong>1.1M</strong><span>{localizationLanguage === 'ar' ? 'مشاهدة' : 'Views'}</span></div><div className="metric-bubble bubble-likes"><strong>22.3K</strong><span>{localizationLanguage === 'ar' ? 'إعجاب' : 'Likes'}</span></div><div className="metric-bubble bubble-shares"><strong>19.7K</strong><span>{localizationLanguage === 'ar' ? 'مشاركة' : 'Shares'}</span></div><span className="image-label">TIKTOK / 2025–26</span></div></article>
        <article className="case-card case-card-alt"><div className="case-image-wrap arabic-vids-visual"><img src="/case-studies/arabic-vids-latest.png" alt="Arabic Vids TikTok account" className="case-image arabic-vids-image" /><div className="metric-bubble bubble-views"><strong>911.3K</strong><span>{localizationLanguage === 'ar' ? 'مشاهدة' : 'Views'}</span></div><div className="metric-bubble bubble-likes"><strong>81.6K</strong><span>{localizationLanguage === 'ar' ? 'إعجاب' : 'Likes'}</span></div><div className="metric-bubble bubble-shares"><strong>13.6K</strong><span>{localizationLanguage === 'ar' ? 'مشاركة' : 'Shares'}</span></div><span className="image-label">TIKTOK / 2025–26</span></div><div className="case-summary"><p className="eyebrow">{localizationLanguage === 'ar' ? 'نمو عضوي · محتوى قصير' : 'ORGANIC GROWTH · SHORT-FORM CONTENT'}</p><h2>Arabic<br /><em>Vids</em></h2><p>An Arabic-led short-form TikTok account built around relatable clips designed to earn reach, interaction, and shares.</p><Button onClick={() => setActiveCase('arabicVids')} className="case-button">{localizationLanguage === 'ar' ? 'استكشف' : 'Explore case study'} <ArrowUpRight data-icon="inline-end" /></Button></div></article>
      </div>
    </section>
    <footer id="contact"><p>{localizationLanguage === 'ar' ? 'تواصل معي للتعاون والعمل' : 'Contact me for collaborations and work'}</p><div className="contact-links"><a href="https://iwtsp.com/966534197558" target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.8L.2 24l6.6-1.7a11.7 11.7 0 0 0 5.3 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.3Zm-8.4 18.1h-.1a9.7 9.7 0 0 1-4.9-1.3l-.4-.2-3.9 1 1-3.8-.3-.4a9.8 9.8 0 1 1 8.6 4.7Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.1-.3.2-.6.1c-1.8-.9-3-1.6-4.2-3.7-.3-.5.3-.5.9-1.7.1-.2.1-.4 0-.6l-1-2.3c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.5s-1.2 1.2-1.2 3 .1 2.9 1.3 4.7c1.2 1.8 2.7 3.2 4.7 4.1 2.4 1.1 3.3 1.2 4.5 1s1.8-.8 2-1.5.2-1.3.1-1.4-.3-.2-.6-.4Z" /></svg></a><a href="https://www.linkedin.com/in/deem-alosili-44826120b/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.2 3.3a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.3 9h3.8v11.7H3.3V9Zm6.2 0h3.6v1.6h.1c.5-.9 1.8-2 3.8-2 4 0 4.8 2.7 4.8 6.1v6.1H18v-5.4c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 2.9v5.5H9.5V9Z" /></svg></a><a href="mailto:deem.alosaili@gmail.com" aria-label="Email"><Mail /></a></div></footer>
    {activeCase === 'newroom' && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="case-title"><div className="case-modal"><Button variant="ghost" size="icon" className="close-button" onClick={() => setActiveCase(null)} aria-label="Close case study"><X /></Button><div className="modal-title"><p className="eyebrow">CASE STUDY / 01</p><h2 id="case-title">Newroom Ideas</h2><p>@newroom_ideas · Bedroom solutions &amp; ideas</p></div><div className="modal-grid"><section className="analysis-card" aria-label="TikTok performance analysis"><div className="analysis-topline"><span>PERFORMANCE SNAPSHOT</span><span>365 DAYS</span></div><div className="analysis-primary"><p>Post views</p><strong>19.7K</strong><span>Sep 8, 2025 — Sep 7, 2026</span></div><div className="analysis-divider" /><div className="analysis-discovery"><p>Search-led discovery</p><strong>96.9%</strong><span>of traffic came from TikTok Search</span><div className="search-bar" aria-label="96.9 percent of traffic from search"><i /></div></div><div className="analysis-breakdown"><div><strong>369</strong><span>Profile views</span></div><div><strong>152</strong><span>Likes</span></div><div><strong>29</strong><span>Shares</span></div></div><p className="analysis-source">Source: TikTok Analytics</p></section><div className="modal-copy"><div><p className="eyebrow">THE APPROACH</p><p>I translated storytelling into a marketing direction: every video began with a familiar room problem, then made the solution simple, useful, and easy to share.</p></div><div><p className="eyebrow">CONTENT FOCUS</p><p>Before &amp; after moments · décor ideas · product-led tips</p></div></div></div><div className="metrics-grid">{newroomMetrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span><Check /></div>)}</div><button className="modal-close-text" onClick={() => setActiveCase(null)}>Close case study</button></div></div>}
    {activeCase === 'arabicVids' && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="arabic-case-title"><div className="case-modal"><Button variant="ghost" size="icon" className="close-button" onClick={() => setActiveCase(null)} aria-label="Close case study"><X /></Button><div className="modal-title"><p className="eyebrow">CASE STUDY / 02</p><h2 id="arabic-case-title">Arabic Vids</h2><p>@arabic_vids1 · Arabic short-form content</p></div><div className="modal-grid"><section className="analysis-card arabic-analysis" aria-label="Arabic Vids TikTok performance analysis"><div className="analysis-topline"><span>PERFORMANCE SNAPSHOT</span><span>365 DAYS</span></div><div className="analysis-primary"><p>Post views</p><strong>911.3K</strong><span>Sep 8, 2025 — Sep 7, 2026</span></div><div className="analysis-divider" /><div className="analysis-discovery"><p>For You distribution</p><strong>83.1%</strong><span>of traffic came from the For You feed</span><div className="search-bar" aria-label="83.1 percent of traffic from the For You feed"><i /></div></div><div className="analysis-breakdown"><div><strong>6.7K</strong><span>Profile views</span></div><div><strong>792</strong><span>Comments</span></div><div><strong>13.6K</strong><span>Shares</span></div></div><p className="analysis-source">Source: TikTok Analytics</p></section><div className="modal-copy"><div><p className="eyebrow">THE RESULT</p><p>Content reached 911.3K views and generated 96K+ visible interactions across likes, comments, and shares.</p></div><div><p className="eyebrow">DISCOVERY MIX</p><p>For You 83.1% · Profile 11.1% · Search 5.7% · Following 0.1%</p></div></div></div><div className="metrics-grid">{arabicVidsMetrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span><Check /></div>)}</div><button className="modal-close-text" onClick={() => setActiveCase(null)}>Close case study</button></div></div>}
  </main>;
}
