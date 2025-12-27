:root{
--bg0:#07081a;
--bg1:#0b0c22;
--card: rgba(255,255,255,.08);
--card2: rgba(255,255,255,.12);
--line: rgba(255,255,255,.14);
--text: rgba(255,255,255,.92);
--muted: rgba(255,255,255,.70);
--accent:#9b7bff;
--accent2:#52e5ff;
--hot:#ff5da2;
--warn:#ff5b5b;
--shadow: 0 20px 70px rgba(0,0,0,.45);
}

*{ box-sizing: border-box; }
html,body{ height:100%; }
body{
margin:0;
font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
color: var(--text);
background:
radial-gradient(1100px 600px at 10% 15%, rgba(155,123,255,.30), transparent 60%),
radial-gradient(1100px 600px at 85% 20%, rgba(82,229,255,.20), transparent 55%),
radial-gradient(900px 500px at 50% 85%, rgba(255,93,162,.12), transparent 60%),
linear-gradient(145deg, var(--bg0), var(--bg1));
}

.hidden{ display:none !important; }

.topbar{
position: sticky; top:0; z-index: 20;
display:flex; align-items:center; justify-content:space-between;
padding: 14px 16px;
background: rgba(5,6,18,.70);
border-bottom: 1px solid rgba(255,255,255,.10);
backdrop-filter: blur(12px);
}

.brand{ display:flex; gap:12px; align-items:center; }
.logo{
width:42px; height:42px;
display:grid; place-items:center;
border-radius: 14px;
background: linear-gradient(135deg, rgba(155,123,255,.35), rgba(82,229,255,.25));
border: 1px solid rgba(255,255,255,.14);
box-shadow: 0 18px 50px rgba(0,0,0,.35);
font-size: 22px;
}
.brand-title{ font-weight: 950; letter-spacing:.2px; }
.brand-sub{ font-size: 12px; color: var(--muted); margin-top:2px; }

.top-actions{ display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
.btn{
border: 1px solid rgba(255,255,255,.14);
background: rgba(255,255,255,.08);
color: var(--text);
padding: 10px 12px;
border-radius: 999px;
cursor:pointer;
font-weight: 850;
box-shadow: 0 14px 40px rgba(0,0,0,.22);
}
.btn:hover{ background: rgba(255,255,255,.11); }
.btn:active{ transform: translateY(1px); }
.btn.primary{
background: linear-gradient(135deg, rgba(155,123,255,.95), rgba(82,229,255,.75));
border-color: rgba(255,255,255,.22);
color: rgba(10,10,18,.92);
}
.btn.subtle{
background: rgba(255,255,255,.06);
}
.btn.danger{
background: rgba(255,91,91,.12);
border-color: rgba(255,91,91,.35);
}
.filelike{ position:relative; overflow:hidden; }
.filelike input{ position:absolute; inset:0; opacity:0; cursor:pointer; }

.tabs{
display:flex;
gap:8px;
padding: 10px 12px;
border-bottom: 1px solid rgba(255,255,255,.10);
background: rgba(5,6,18,.55);
backdrop-filter: blur(12px);
position: sticky; top: 70px; z-index: 19;
overflow-x:auto;
}
.tab{
border: 1px solid rgba(255,255,255,.14);
background: rgba(255,255,255,.06);
color: var(--text);
padding: 10px 14px;
border-radius: 999px;
font-weight: 900;
cursor:pointer;
white-space: nowrap;
}
.tab.active{
background: rgba(155,123,255,.22);
border-color: rgba(155,123,255,.42);
}

.wrap{
max-width: 1100px;
margin: 18px auto;
padding: 0 14px 40px;
}

.card{
background: var(--card);
border: 1px solid rgba(255,255,255,.12);
border-radius: 18px;
padding: 14px;
box-shadow: var(--shadow);
}
.card-title{ margin:0 0 10px; font-size: 16px; font-weight: 950; }
.muted{ color: var(--muted); }
.note{
margin-top: 10px;
padding: 12px;
border-radius: 14px;
border: 1px dashed rgba(255,255,255,.18);
background: rgba(255,255,255,.06);
}

.grid.two{
display:grid;
grid-template-columns: 1fr 1fr;
gap: 14px;
margin-top: 14px;
}
@media (max-width: 900px){
.grid.two{ grid-template-columns: 1fr; }
.topbar{ gap:12px; flex-wrap:wrap; }
.tabs{ top: 90px; }
}

.hero{
position: relative;
border-radius: 22px;
overflow:hidden;
border: 1px solid rgba(255,255,255,.12);
background:
radial-gradient(1000px 420px at 20% 20%, rgba(155,123,255,.35), transparent 55%),
radial-gradient(900px 420px at 80% 30%, rgba(82,229,255,.20), transparent 55%),
radial-gradient(900px 420px at 50% 110%, rgba(255,93,162,.12), transparent 55%),
rgba(255,255,255,.05);
box-shadow: var(--shadow);
}
.hero-glow{
position:absolute; inset:-20%;
background-image:
radial-gradient(circle, rgba(255,255,255,.90) 0 2px, transparent 3px),
radial-gradient(circle, rgba(255,255,255,.55) 0 1.5px, transparent 3px),
radial-gradient(circle, rgba(255,255,255,.35) 0 1px, transparent 3px);
background-size: 140px 140px, 220px 220px, 320px 320px;
opacity: .35;
animation: drift 26s linear infinite;
mix-blend-mode: screen;
}
@keyframes drift{
0%{ transform: translate3d(-2%, -2%,0) rotate(0deg); }
100%{ transform: translate3d(2%, 2%,0) rotate(8deg); }
}
.hero-content{ position:relative; padding: 18px; }
.hero-kicker{
font-size: 12px;
text-transform: uppercase;
letter-spacing: .9px;
color: rgba(255,255,255,.85);
font-weight: 900;
}
.hero-title{
margin: 8px 0 6px;
font-size: clamp(26px, 4vw, 38px);
line-height: 1.06;
}
.hero-text{ margin: 0 0 14px; color: var(--muted); max-width: 70ch; }

.hero-cards{
display:grid;
grid-template-columns: repeat(3, 1fr);
gap: 10px;
margin: 12px 0 14px;
}
@media (max-width: 700px){
.hero-cards{ grid-template-columns: 1fr; }
}
.stat{ padding: 12px; }
.stat-label{ color: var(--muted); font-size: 12px; font-weight: 900; }
.stat-value{ font-size: 24px; font-weight: 950; margin-top: 4px; }

.hero-actions{ display:flex; gap:10px; flex-wrap:wrap; }

.controls{
display:flex;
flex-wrap:wrap;
gap: 10px;
align-items:flex-end;
}
.control{ display:flex; flex-direction:column; gap:6px; min-width: 160px; }
.control.grow{ flex: 1; min-width: 220px; }
label{ font-size: 12px; font-weight: 900; color: rgba(255,255,255,.85); }
select, input{
border-radius: 14px;
border: 1px solid rgba(255,255,255,.16);
background: rgba(10,10,18,.35);
color: var(--text);
padding: 10px 12px;
outline:none;
}
input::placeholder{ color: rgba(255,255,255,.45); }

.subhead{
display:flex;
justify-content:space-between;
align-items:center;
margin: 14px 0;
}
.subhead-title{ font-weight: 950; font-size: 18px; }
.subhead-sub{ font-size: 12px; }

.chips{ display:flex; flex-wrap:wrap; gap:8px; }
.chip{
border: 1px solid rgba(255,255,255,.14);
background: rgba(255,255,255,.06);
color: var(--text);
padding: 8px 12px;
border-radius: 999px;
font-weight: 900;
cursor:pointer;
white-space: nowrap;
}
.chip.active{
background: rgba(255,93,162,.18);
border-color: rgba(255,93,162,.35);
}

.drink-grid{
display:grid;
grid-template-columns: repeat(3, 1fr);
gap: 12px;
}
@media (max-width: 1000px){
.drink-grid{ grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 650px){
.drink-grid{ grid-template-columns: 1fr; }
}

.drink{
padding: 0;
overflow:hidden;
}
.thumb{
height: 150px;
background: rgba(255,255,255,.06);
border-bottom: 1px solid rgba(255,255,255,.10);
position:relative;
}
.thumb img{
width:100%;
height:100%;
object-fit: cover;
display:block;
}
.thumb .thumb-tag{
position:absolute;
left: 10px; bottom: 10px;
font-size: 12px;
font-weight: 950;
padding: 6px 10px;
border-radius: 999px;
background: rgba(0,0,0,.35);
border: 1px solid rgba(255,255,255,.18);
backdrop-filter: blur(8px);
}

.drink-body{ padding: 12px; }
.drink-title{ font-weight: 950; margin: 0 0 6px; }
.drink-meta{ font-size: 12px; color: var(--muted); margin-bottom: 10px; }
.tags{ display:flex; flex-wrap:wrap; gap:6px; margin-bottom: 10px; }
.tag{
font-size: 11px;
padding: 5px 8px;
border-radius: 999px;
border: 1px solid rgba(255,255,255,.12);
background: rgba(255,255,255,.06);
color: rgba(255,255,255,.85);
font-weight: 900;
}

.row{ display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; }

.actions{
display:flex;
gap: 8px;
flex-wrap:wrap;
align-items:center;
}
.iconbtn{
border: 1px solid rgba(255,255,255,.14);
background: rgba(255,255,255,.06);
color: var(--text);
padding: 8px 10px;
border-radius: 999px;
font-weight: 950;
cursor:pointer;
}
.iconbtn.on{
background: rgba(82,229,255,.16);
border-color: rgba(82,229,255,.35);
}
.iconbtn.heart.on{
background: rgba(255,93,162,.16);
border-color: rgba(255,93,162,.35);
}

.stars{
display:flex;
gap:4px;
}
.star{
cursor:pointer;
font-size: 18px;
opacity: .75;
user-select:none;
}
.star.on{ opacity: 1; }

textarea{
width:100%;
min-height: 64px;
resize: vertical;
border-radius: 14px;
border: 1px solid rgba(255,255,255,.16);
background: rgba(10,10,18,.35);
color: var(--text);
padding: 10px 12px;
outline:none;
}
