export const HERO_CRITICAL_CSS = `
.hero{position:relative;overflow:visible;padding-block:128px 56px}
.hero-grid{display:grid;grid-template-columns:1fr;gap:30px;align-items:center}
.hero h1{font-family:var(--font-display),system-ui,sans-serif;font-size:clamp(30px,8.2vw,40px);font-weight:700;line-height:1.08;margin-top:16px;color:#121214}
.hero-copy p{color:#5b5c63;font-size:16px;line-height:1.55;margin-top:16px;max-width:460px}
@media (min-width:641px){
  .hero{padding-block:180px 100px}
  .hero h1{font-size:clamp(38px,5.4vw,62px);margin-top:22px}
  .hero-copy p{font-size:17px;margin-top:22px}
}
@media (min-width:981px){
  .hero-grid{grid-template-columns:1.05fr .95fr}
}
`.trim();

export function HeroCriticalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: HERO_CRITICAL_CSS }} />;
}
