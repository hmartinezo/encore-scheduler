// =============================================
// SHARED DATA MODEL — Encore Schedule Builder
// =============================================
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_SHORT = ['Mon','Tue','Wed','Thu','Fri','Sat'];

const STYLES = {
  jazz:'Jazz', tap:'Tap', ballet:'Ballet', hiphop:'Hip Hop', contemp:'Contemporary',
  combo:'Combo', broadway:'Broadway', acting:'Acting', voice:'Voice',
  ballroom:'Ballroom', team:'Team Rehearsal', leaps:'Leaps & Turns'
};

const STYLE_KEYS = Object.keys(STYLES);

const TEACHERS = [
  { id:'raynor', name:'Raynor van der Merwe', short:'Raynor vdM', color:'#DC2626', styles:['jazz','leaps'] },
  { id:'courtney', name:'Courtney Rosendall', short:'Courtney R.', color:'#16A34A', styles:['tap','jazz','broadway'] },
  { id:'vadim', name:'Vadim Bogomolov', short:'Vadim B.', color:'#7C3AED', styles:['ballet'] },
  { id:'anastasiia', name:'Anastasiia Bengard', short:'Anastasiia B.', color:'#E11D48', styles:['ballroom'] },
  { id:'luke', name:'Luke Spring', short:'Luke S.', color:'#CA8A04', styles:['hiphop','tap'] },
  { id:'jessy', name:'Jessy Dawson', short:'Jessy D.', color:'#0D9488', styles:['hiphop'] },
  { id:'paige', name:'Paige Williams', short:'Paige W.', color:'#DB2777', styles:['jazz','tap','combo','ballet'] },
  { id:'ashleigh', name:'Ashleigh Wood', short:'Ashleigh W.', color:'#4F46E5', styles:['ballet','contemp','jazz'] },
  { id:'gaby', name:'Gaby Antunano Rodriguez', short:'Gaby A.R.', color:'#0891B2', styles:['ballet'] },
  { id:'liesl', name:'Liesl Balatsenko', short:'Liesl B.', color:'#57534E', styles:['ballet'] },
  { id:'cami', name:'Cami Stockman', short:'Cami S.', color:'#6D4C41', styles:['contemp','jazz','combo'] },
  { id:'lorraine', name:'Lorraine Magee', short:'Lorraine M.', color:'#546E7A', styles:['acting'] },
  { id:'voice', name:'Voice Teacher', short:'Voice T.', color:'#9E9E9E', styles:['voice'] },
];

function teacherById(id){ return TEACHERS.find(t=>t.id===id); }
function teacherShort(id){ const t=teacherById(id); return t?t.short:'?'; }
function teacherInitials(id){ const t=teacherById(id); if(!t) return '?'; return t.name.split(' ').map(w=>w[0]).join('').substring(0,2); }

function detectStyle(name){
  const n = name.toLowerCase();
  if(n.includes('team rehearsal')) return 'team';
  if(n.includes('leaps') || n.includes('turns')) return 'leaps';
  if(n.includes('acting')) return 'acting';
  if(n.includes('voice')) return 'voice';
  if(n.includes('broadway')) return 'broadway';
  if(n.includes('ballroom') || n.includes('latin jazz')) return 'ballroom';
  if(n.includes('combo')) return 'combo';
  if(n.includes('hip hop') || n.includes('hiphop')) return 'hiphop';
  if(n.includes('contemp')) return 'contemp';
  if(n.includes('ballet') && n.includes('jazz')) return 'jazz';
  if(n.includes('jazz') && n.includes('tap')) return 'jazz';
  if(n.includes('ballet') && n.includes('pointe')) return 'ballet';
  if(n.includes('ballet')) return 'ballet';
  if(n.includes('tap')) return 'tap';
  if(n.includes('jazz')) return 'jazz';
  return 'combo';
}

function detectDuration(name){
  if(name.includes('90 min')) return 90;
  const n = name.toLowerCase();
  if(n.includes('team rehearsal')) return 30;
  if(n.includes('munchkin') || (n.includes('mini') && (n.includes('combo') || n.includes('hip hop')))) return 45;
  if(n.includes('pointe after')) return 90;
  if((n.includes('etap') && (n.includes('jazz - 90') || n.includes('ballet - 90')))) return 90;
  if(n.includes('etap') && n.includes('ballet') && !n.includes('60')) return 90;
  if(n.includes('junior') && n.includes('jazz/tap')) return 90;
  return 60;
}

function detectTeachers(name){
  const n = name.toLowerCase();
  if(n.includes('etap') && n.includes('acting')) return ['lorraine'];
  if(n.includes('voice')) return ['voice'];
  if(n.includes('etap') && n.includes('ballroom')) return ['anastasiia'];
  if(n.includes('etap') && n.includes('leaps')) return ['raynor'];
  if(n.includes('etap a') && n.includes('jazz')) return ['raynor'];
  if(n.includes('etap b') && n.includes('jazz')) return ['raynor'];
  if(n.includes('etap d') && n.includes('jazz')) return ['raynor','courtney'];
  if(n.includes('etap') && n.includes('jazz')) return ['raynor'];
  if(n.includes('etap') && n.includes('tap')) return ['courtney','luke'];
  if(n.includes('etap') && n.includes('ballet')) return ['vadim'];
  if(n.includes('etap') && n.includes('hip hop')) return ['luke','jessy'];
  if(n.includes('etap') && n.includes('contemp')) return ['cami','ashleigh'];
  if(n.includes('itp e')) return ['raynor','courtney','paige'];
  if(n.includes('itp') && n.includes('jazz')) return ['raynor','courtney'];
  if(n.includes('itp') && n.includes('tap')) return ['courtney','paige','luke'];
  if(n.includes('itp') && n.includes('ballet')) return ['vadim','gaby','ashleigh'];
  if(n.includes('teen') && n.includes('ballet')) return ['gaby','ashleigh'];
  if(n.includes('teen') && n.includes('contemp')) return ['cami','ashleigh'];
  if(n.includes('teen') && n.includes('hip hop')) return ['jessy','luke'];
  if(n.includes('teen') && n.includes('jazz')) return ['paige','jessy','cami','ashleigh'];
  if(n.includes('teen') && n.includes('tap')) return ['paige','cami','courtney'];
  if(n.includes('teen') && n.includes('broadway')) return ['courtney'];
  if(n.includes('tween') && n.includes('ballet')) return ['liesl','ashleigh'];
  if(n.includes('tween') && n.includes('contemp')) return ['ashleigh','cami'];
  if(n.includes('tween') && n.includes('hip hop')) return ['jessy','luke'];
  if(n.includes('tween') && n.includes('jazz')) return ['ashleigh','paige'];
  if(n.includes('tween') && n.includes('tap')) return ['courtney','luke'];
  if(n.includes('tween') && n.includes('broadway')) return ['courtney'];
  if(n.includes('junior') && n.includes('broadway')) return ['courtney'];
  if(n.includes('junior') && n.includes('ballet')) return ['liesl','ashleigh'];
  if(n.includes('junior') && n.includes('contemp')) return ['cami','ashleigh'];
  if(n.includes('junior') && n.includes('hip hop')) return ['jessy','luke'];
  if(n.includes('junior') && n.includes('jazz')) return ['paige','courtney','cami'];
  if(n.includes('junior') && n.includes('tap')) return ['luke','courtney','paige'];
  if(n.includes('mini') && n.includes('ballet')) return ['paige'];
  if(n.includes('mini') && n.includes('hip hop')) return ['jessy','paige'];
  if(n.includes('mini') && n.includes('combo')) return ['cami','jessy','paige'];
  if(n.includes('mini') && n.includes('jazz')) return ['paige','cami'];
  if(n.includes('munchkin')) return ['paige','cami'];
  if(n.includes('team rehearsal')) {
    if(n.includes('hip hop')) return ['jessy'];
    if(n.includes('jazz')) return ['courtney','paige'];
    if(n.includes('tap')) return ['courtney'];
    if(n.includes('contemp')) return ['cami'];
    if(n.includes('mini')) return ['paige'];
    return ['courtney','paige','jessy','cami'];
  }
  return TEACHERS.map(t=>t.id);
}

const CLASS_NAMES = [
  'Munchkin Age 3 & 4 Combo','Munchkin Age 3 & 4 Combo','Munchkin Age 3 & 4 Combo',
  'Mini Age 4 & 5 Combo Jazz/Tap','Mini Age 4 & 5 Combo Hip Hop/Jazz',
  'Mini Age 4-6 Hip Hop','Mini Age 4-6 Hip Hop','Mini Age 4-6 Hip Hop','Mini Age 4-6 Hip Hop',
  'Mini Age 5 & 6 Jazz/Tap','Mini Age 5 & 6 Jazz/Tap','Mini Age 5 & 6 Jazz/Tap',
  'Mini Age 5 & 6 Ballet','Mini Age 5 & 6 Ballet',
  'Junior Level 1 Ballet','Junior Level 1 Contemporary',
  'Junior Level 1 Hip Hop','Junior Level 1 Hip Hop','Junior Level 1 Hip Hop','Junior Level 1 Hip Hop',
  'Junior Level 1a Hip Hop',
  'Junior Level 1 Jazz/Tap','Junior Level 1 Jazz/Tap','Junior Level 1 Jazz/Tap',
  'Junior Level 2 Ballet','Junior Level 3 Ballet',
  'Junior Level 2 Jazz','Junior Level 3 Jazz',
  'Junior Level 2 Tap','Junior Level 3 Tap',
  'Junior Level 2 Contemporary',
  'Junior Level 2 Hip Hop','Junior Level 2 Hip Hop',
  'Junior Level 3 Contemporary','Junior Level 3 Hip Hop',
  'Junior Broadway Bound',
  'Tween Level 1 Ballet','Tween Level 1 Hip Hop','Tween Level 1 & 2 Hip Hop',
  'Tween Level 2 Hip Hop','Tween Level 2 Hip Hop',
  'Tween Level 1 Contemporary','Tween Level 2 Contemporary','Tween Level 3 Contemporary',
  'Tween Level 1 Tap','Tween Level 2 & 3 Tap',
  'Tween Level 1 Jazz','Tween Level 2 Jazz',
  'Tween/Teen Level 1 Jazz',
  'Teen Level 1 & 2 Ballet','Teen Level 2 & 3 Ballet',
  'Teen Level 1 & 2 Contemporary','Teen Level 1 & 2 Hip Hop','Teen Level 1 & 2 Hip Hop',
  'Teen Level 1 Jazz','Teen Level 1 Tap','Teen Level 2 & 3 Tap',
  'Teen Level 2 Contemporary','Teen Level 3 Contemporary',
  'Teen Level 2 & 3 Hip Hop','Teen Level 2 Jazz',
  'Teen Level 3 & 4 Hip Hop','Teen Level 3 Jazz',
  'Tween/Teen Broadway Bound',
  'ITP A Jazz','ITP A Jazz','ITP A Tap','ITP A Tap','ITP A Ballet','ITP A Ballet',
  'ITP B & C Jazz','ITP B & C Jazz','ITP B & C Tap','ITP B & C Tap','ITP B & C Ballet','ITP B & C Ballet',
  'ITP D Jazz','ITP D Jazz','ITP D Tap','ITP D Ballet',
  'ITP E Jazz/Tap - 90 min','ITP E Jazz/Ballet - 90 min',
  'ETAP A Jazz - 90 min','ETAP A Jazz - 60 min','ETAP A Tap','ETAP A Tap',
  'ETAP A Ballet - 90 min','ETAP A Ballet - 90 min','ETAP A Ballet - 90 min with pointe after',
  'ETAP A Hip Hop','ETAP A Contemporary','ETAP A Acting',
  'ETAP B&C Jazz - 90 min','ETAP B&C Jazz - 60 min','ETAP B&C Tap','ETAP B&C Tap',
  'ETAP B&C Ballet - 90 min','ETAP B&C Ballet - 90 min','ETAP B&C Ballet - 90 min with pointe after',
  'ETAP B&C Hip Hop','ETAP B&C Contemporary','ETAP B&C Acting',
  'ETAP D Jazz','ETAP D Jazz','ETAP D Tap','ETAP D Tap',
  'ETAP D Ballet','ETAP D Ballet','ETAP D Hip Hop','ETAP D Contemporary',
  'ETAP Company Leaps & Turns',
];

let nextClassId = 1;
const CLASSES = CLASS_NAMES.map(name => ({
  id: nextClassId++, name,
  style: detectStyle(name),
  duration: detectDuration(name),
  eligibleTeachers: detectTeachers(name),
}));

// =============================================
// STATE
// =============================================
let state = { schedule: [], availability: {} };

TEACHERS.forEach(t => {
  state.availability[t.id] = {};
  for(let d=0; d<5; d++) state.availability[t.id][d] = [{ start:960, end:1290 }];
  state.availability[t.id][5] = [{ start:540, end:840 }];
});

let undoStack = [], redoStack = [];
function pushUndo(){
  undoStack.push(JSON.parse(JSON.stringify(state.schedule)));
  redoStack = [];
  if(undoStack.length > 50) undoStack.shift();
}
function undo(){
  if(!undoStack.length) return;
  redoStack.push(JSON.parse(JSON.stringify(state.schedule)));
  state.schedule = undoStack.pop();
  saveState(); if(typeof renderAll === 'function') renderAll();
  toast('Undo');
}
function redo(){
  if(!redoStack.length) return;
  undoStack.push(JSON.parse(JSON.stringify(state.schedule)));
  state.schedule = redoStack.pop();
  saveState(); if(typeof renderAll === 'function') renderAll();
  toast('Redo');
}

function saveState(){
  try { localStorage.setItem('encore-schedule-v1', JSON.stringify(state)); } catch(e){}
}
function loadState(){
  try {
    const d = localStorage.getItem('encore-schedule-v1');
    if(d) { const p = JSON.parse(d); state.schedule = p.schedule || []; if(p.availability) state.availability = p.availability; }
  } catch(e){}
}

// =============================================
// UTILITIES
// =============================================
function minutesToTime(m){
  const h = Math.floor(m/60), mm = m%60;
  const ampm = h>=12?'PM':'AM';
  const hh = h>12?h-12:(h===0?12:h);
  return `${hh}:${String(mm).padStart(2,'0')} ${ampm}`;
}
function minutesToTimeShort(m){
  const h = Math.floor(m/60), mm = m%60;
  const ampm = h>=12?'p':'a';
  const hh = h>12?h-12:(h===0?12:h);
  return mm===0 ? `${hh}${ampm}` : `${hh}:${String(mm).padStart(2,'0')}${ampm}`;
}

function getUnassigned(){
  const ids = new Set(state.schedule.map(s=>s.classId));
  return CLASSES.filter(c=>!ids.has(c.id));
}

function getConflicts(){
  const conflicts = [];
  for(let i=0; i<state.schedule.length; i++){
    const a = state.schedule[i];
    const ac = CLASSES.find(c=>c.id===a.classId);
    if(!ac) continue;
    const aEnd = a.startTime + ac.duration;
    for(let j=i+1; j<state.schedule.length; j++){
      const b = state.schedule[j];
      const bc = CLASSES.find(c=>c.id===b.classId);
      if(!bc || a.day !== b.day) continue;
      const bEnd = b.startTime + bc.duration;
      if(a.startTime < bEnd && b.startTime < aEnd){
        if(a.teacherId === b.teacherId) conflicts.push({ type:'teacher', a:i, b:j, msg:`${teacherShort(a.teacherId)} double-booked` });
        if(a.room === b.room) conflicts.push({ type:'room', a:i, b:j, msg:`Room ${a.room} overlap` });
      }
    }
  }
  return conflicts;
}

function isConflict(idx){ return getConflicts().some(c=>c.a===idx||c.b===idx); }

function isAvailable(teacherId, day, time){
  const slots = state.availability[teacherId]?.[day];
  if(!slots) return false;
  return slots.some(s => time >= s.start && time < s.end);
}

const SLOT_MINUTES = 15;
const WEEKDAY_START = 960, WEEKDAY_END = 1290;
const SAT_START = 540, SAT_END = 840;
const SLOT_HEIGHT = 40;

function getTimeSlots(){
  const s = new Set();
  for(let t=SAT_START; t<SAT_END; t+=SLOT_MINUTES) s.add(t);
  for(let t=WEEKDAY_START; t<WEEKDAY_END; t+=SLOT_MINUTES) s.add(t);
  return [...s].sort((a,b)=>a-b);
}
const TIME_SLOTS = getTimeSlots();

function isTimeInDay(time, day){
  if(day === 5) return time >= SAT_START && time < SAT_END;
  return time >= WEEKDAY_START && time < WEEKDAY_END;
}

// Toast
function toast(msg){
  let t = document.getElementById('toast');
  if(!t){ t = document.createElement('div'); t.id='toast'; t.style.cssText='position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);background:#1E293B;color:#fff;padding:.5rem 1rem;border-radius:6px;font-size:.78rem;z-index:200;display:none;box-shadow:0 4px 12px rgba(0,0,0,.2);'; document.body.appendChild(t); }
  t.textContent = msg; t.style.display='block';
  clearTimeout(t._timer); t._timer = setTimeout(()=>t.style.display='none', 2000);
}

// Export functions
function exportCSV(){
  let csv = 'Class,Style,Duration,Teacher,Day,Start Time,End Time,Room\n';
  state.schedule.forEach(s => {
    const c = CLASSES.find(cc=>cc.id===s.classId);
    const t = teacherById(s.teacherId);
    if(!c) return;
    csv += `"${c.name}","${STYLES[c.style]||c.style}",${c.duration},"${t?t.name:''}","${DAYS[s.day]}","${minutesToTime(s.startTime)}","${minutesToTime(s.startTime+c.duration)}",${s.room}\n`;
  });
  downloadFile('encore-schedule.csv', csv, 'text/csv');
  toast('CSV exported');
}
function exportJSON(){
  downloadFile('encore-schedule.json', JSON.stringify(state, null, 2), 'application/json');
  toast('JSON exported');
}
function downloadFile(name, content, type){
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}
function resetSchedule(){
  if(!confirm('Clear ALL class assignments? This cannot be undone.')) return;
  pushUndo(); state.schedule = [];
  saveState(); if(typeof renderAll === 'function') renderAll();
  toast('Schedule cleared');
}

// =============================================
// SEED FROM TAB 3
// =============================================
function seedFromTab3(){
  if(state.schedule.length > 0) return;
  const tab3 = [
    { name:'ETAP A Acting', teacher:'lorraine', day:0, time:990, room:1 },
    { name:'ETAP B&C Acting', teacher:'lorraine', day:0, time:1050, room:1 },
    { name:'ETAP A Jazz - 60 min', teacher:'raynor', day:0, time:1110, room:1 },
    { name:'ETAP B&C Jazz - 60 min', teacher:'raynor', day:0, time:1170, room:1 },
    { name:'ETAP A Ballet - 90 min with pointe after', teacher:'vadim', day:0, time:1170, room:2 },
    { name:'ETAP B&C Tap', teacher:'courtney', day:0, time:1230, room:1 },
    { name:'ETAP B&C Contemporary', teacher:'cami', day:1, time:1050, room:1 },
    { name:'ETAP A Tap', teacher:'luke', day:1, time:1050, room:2 },
    { name:'ETAP A Contemporary', teacher:'cami', day:1, time:1170, room:1 },
    { name:'ETAP B&C Hip Hop', teacher:'luke', day:1, time:1170, room:2 },
    { name:'ETAP A Hip Hop', teacher:'luke', day:1, time:1230, room:1 },
    { name:'ETAP A Tap', teacher:'courtney', day:5, time:720, room:1 },
    { name:'ETAP A Ballet - 90 min', teacher:'vadim', day:5, time:600, room:1 },
    { name:'ETAP A Ballet - 90 min', teacher:'vadim', day:3, time:1200, room:1 },
    { name:'ETAP A Jazz - 90 min', teacher:'raynor', day:3, time:1110, room:2 },
    { name:'ETAP B&C Jazz - 90 min', teacher:'raynor', day:3, time:1020, room:2 },
    { name:'ETAP B&C Ballet - 90 min', teacher:'vadim', day:3, time:1110, room:1 },
    { name:'ETAP B&C Ballet - 90 min', teacher:'vadim', day:5, time:690, room:1 },
    { name:'ETAP B&C Tap', teacher:'luke', day:1, time:1110, room:2 },
    { name:'ETAP D Jazz', teacher:'courtney', day:1, time:990, room:1 },
    { name:'ETAP D Jazz', teacher:'courtney', day:4, time:1050, room:2 },
    { name:'ETAP D Tap', teacher:'courtney', day:1, time:1050, room:3 },
    { name:'ETAP D Ballet', teacher:'gaby', day:3, time:1050, room:2 },
    { name:'ETAP D Ballet', teacher:'gaby', day:4, time:990, room:2 },
    { name:'ETAP Company Leaps & Turns', teacher:'raynor', day:5, time:780, room:1 },
    { name:'ETAP A Hip Hop', teacher:'luke', day:1, time:1230, room:2 },
    { name:'ITP A Jazz', teacher:'raynor', day:2, time:1110, room:1 },
    { name:'ITP A Tap', teacher:'courtney', day:2, time:1170, room:1 },
    { name:'ITP A Ballet', teacher:'gaby', day:3, time:1050, room:3 },
    { name:'ITP B & C Jazz', teacher:'courtney', day:1, time:1170, room:3 },
    { name:'ITP B & C Tap', teacher:'courtney', day:1, time:1110, room:3 },
    { name:'ITP B & C Ballet', teacher:'ashleigh', day:1, time:1050, room:4 },
    { name:'ITP D Jazz', teacher:'courtney', day:1, time:990, room:2 },
    { name:'ITP D Tap', teacher:'courtney', day:1, time:1050, room:5 },
    { name:'ITP D Ballet', teacher:'gaby', day:4, time:990, room:3 },
    { name:'ITP A Jazz', teacher:'raynor', day:2, time:1110, room:2 },
    { name:'ITP A Tap', teacher:'courtney', day:2, time:1170, room:2 },
    { name:'ITP A Ballet', teacher:'gaby', day:3, time:1110, room:3 },
    { name:'ITP B & C Jazz', teacher:'courtney', day:4, time:1110, room:1 },
    { name:'ITP B & C Tap', teacher:'paige', day:4, time:1110, room:2 },
    { name:'ITP B & C Ballet', teacher:'ashleigh', day:4, time:1050, room:4 },
    { name:'Junior Level 1 Hip Hop', teacher:'jessy', day:0, time:990, room:2 },
    { name:'Junior Level 1 Hip Hop', teacher:'luke', day:2, time:990, room:2 },
    { name:'Junior Level 1 Hip Hop', teacher:'jessy', day:3, time:1050, room:3 },
    { name:'Junior Level 1 Hip Hop', teacher:'jessy', day:4, time:1050, room:3 },
    { name:'Junior Level 1a Hip Hop', teacher:'jessy', day:1, time:1110, room:4 },
    { name:'Junior Level 1 Ballet', teacher:'liesl', day:0, time:1050, room:3 },
    { name:'Junior Level 1 Contemporary', teacher:'cami', day:2, time:1050, room:3 },
    { name:'Junior Level 1 Jazz/Tap', teacher:'paige', day:0, time:1050, room:4 },
    { name:'Junior Level 1 Jazz/Tap', teacher:'paige', day:5, time:600, room:2 },
    { name:'Junior Level 1 Jazz/Tap', teacher:'paige', day:4, time:1005, room:4 },
    { name:'Junior Level 2 Ballet', teacher:'liesl', day:0, time:1110, room:3 },
    { name:'Junior Level 3 Ballet', teacher:'liesl', day:0, time:1110, room:4 },
    { name:'Junior Level 2 Jazz', teacher:'courtney', day:3, time:990, room:3 },
    { name:'Junior Level 3 Jazz', teacher:'courtney', day:3, time:990, room:4 },
    { name:'Junior Level 2 Tap', teacher:'luke', day:3, time:1050, room:4 },
    { name:'Junior Level 3 Tap', teacher:'luke', day:3, time:1050, room:5 },
    { name:'Junior Level 2 Contemporary', teacher:'cami', day:0, time:1050, room:5 },
    { name:'Junior Level 2 Hip Hop', teacher:'luke', day:1, time:990, room:3 },
    { name:'Junior Level 2 Hip Hop', teacher:'jessy', day:5, time:690, room:2 },
    { name:'Junior Level 3 Contemporary', teacher:'cami', day:2, time:990, room:3 },
    { name:'Junior Level 3 Hip Hop', teacher:'luke', day:2, time:1050, room:4 },
    { name:'Junior Broadway Bound', teacher:'courtney', day:2, time:990, room:4 },
    { name:'Mini Age 4 & 5 Combo Jazz/Tap', teacher:'cami', day:0, time:1005, room:5 },
    { name:'Mini Age 4 & 5 Combo Hip Hop/Jazz', teacher:'jessy', day:1, time:1050, room:5 },
    { name:'Mini Age 4-6 Hip Hop', teacher:'jessy', day:4, time:1005, room:5 },
    { name:'Mini Age 4-6 Hip Hop', teacher:'jessy', day:5, time:615, room:3 },
    { name:'Mini Age 4-6 Hip Hop', teacher:'jessy', day:1, time:1005, room:5 },
    { name:'Mini Age 4-6 Hip Hop', teacher:'paige', day:2, time:1050, room:5 },
    { name:'Mini Age 5 & 6 Ballet', teacher:'paige', day:3, time:990, room:5 },
    { name:'Mini Age 5 & 6 Ballet', teacher:'paige', day:1, time:1050, room:6 },
    { name:'Mini Age 5 & 6 Jazz/Tap', teacher:'cami', day:5, time:660, room:3 },
    { name:'Mini Age 5 & 6 Jazz/Tap', teacher:'paige', day:2, time:990, room:5 },
    { name:'Mini Age 5 & 6 Jazz/Tap', teacher:'paige', day:3, time:1050, room:6 },
    { name:'Munchkin Age 3 & 4 Combo', teacher:'cami', day:5, time:600, room:3 },
    { name:'Munchkin Age 3 & 4 Combo', teacher:'paige', day:0, time:1005, room:6 },
    { name:'Munchkin Age 3 & 4 Combo', teacher:'paige', day:1, time:1005, room:6 },
    { name:'Tween Level 1 Hip Hop', teacher:'jessy', day:0, time:1050, room:2 },
    { name:'Tween Level 1 Jazz', teacher:'ashleigh', day:2, time:990, room:6 },
    { name:'Tween Level 1 Contemporary', teacher:'ashleigh', day:1, time:1110, room:4 },
    { name:'Tween Level 1 Tap', teacher:'courtney', day:2, time:1050, room:6 },
    { name:'Tween Level 1 Ballet', teacher:'ashleigh', day:1, time:1170, room:4 },
    { name:'Tween Level 1 & 2 Hip Hop', teacher:'luke', day:3, time:1110, room:3 },
    { name:'Tween Level 2 Hip Hop', teacher:'jessy', day:0, time:1110, room:2 },
    { name:'Tween Level 2 Hip Hop', teacher:'luke', day:2, time:1170, room:3 },
    { name:'Tween Level 2 Jazz', teacher:'ashleigh', day:2, time:1050, room:1 },
    { name:'Tween Level 2 & 3 Tap', teacher:'luke', day:2, time:1110, room:3 },
    { name:'Tween Level 2 Contemporary', teacher:'ashleigh', day:1, time:1110, room:5 },
    { name:'Tween Level 3 Contemporary', teacher:'cami', day:3, time:1050, room:5 },
    { name:'Tween/Teen Level 1 Jazz', teacher:'paige', day:0, time:1170, room:3 },
    { name:'Teen Level 1 & 2 Ballet', teacher:'gaby', day:3, time:1110, room:4 },
    { name:'Teen Level 2 & 3 Ballet', teacher:'gaby', day:3, time:1170, room:4 },
    { name:'Teen Level 1 & 2 Contemporary', teacher:'cami', day:1, time:1110, room:1 },
    { name:'Teen Level 1 & 2 Hip Hop', teacher:'jessy', day:1, time:1170, room:1 },
    { name:'Teen Level 1 & 2 Hip Hop', teacher:'jessy', day:3, time:990, room:4 },
    { name:'Teen Level 1 Jazz', teacher:'paige', day:2, time:1170, room:4 },
    { name:'Teen Level 1 Tap', teacher:'paige', day:2, time:1110, room:4 },
    { name:'Teen Level 2 & 3 Tap', teacher:'cami', day:0, time:1110, room:5 },
    { name:'Teen Level 2 Contemporary', teacher:'cami', day:3, time:1110, room:5 },
    { name:'Teen Level 3 Contemporary', teacher:'ashleigh', day:3, time:1170, room:5 },
    { name:'Teen Level 2 & 3 Hip Hop', teacher:'jessy', day:3, time:990, room:5 },
    { name:'Teen Level 2 Jazz', teacher:'jessy', day:0, time:1170, room:4 },
    { name:'Teen Level 3 & 4 Hip Hop', teacher:'luke', day:3, time:1170, room:3 },
    { name:'Teen Level 3 Jazz', teacher:'cami', day:0, time:1170, room:5 },
    { name:'Tween/Teen Broadway Bound', teacher:'courtney', day:2, time:1110, room:5 },
    { name:'ETAP B&C Ballet - 90 min with pointe after', teacher:'vadim', day:3, time:1110, room:6 },
    { name:'Munchkin Age 3 & 4 Combo', teacher:'paige', day:1, time:1005, room:6 },
  ];
  const used = new Set();
  tab3.forEach(e => {
    const cls = CLASSES.find(c => c.name === e.name && !used.has(c.id));
    if(!cls) return;
    used.add(cls.id);
    state.schedule.push({ classId:cls.id, teacherId:e.teacher, day:e.day, startTime:e.time, room:e.room });
  });
  saveState();
}
