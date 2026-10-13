/* ==========================================================
   JEUX D'ARCADE (dessinés sur canvas, commandes tactiles + clavier)
   Snake, Blocs, Oiseau, Casse-briques, Pong, Défense spatiale,
   Cours & Saute, Tour, Taupe, Traverse, Météores, Fruits, Labyrinthe
   ========================================================== */
(function(){
'use strict';
const U = SCCG.util, R = SCCG.register, rnd = U.rnd, rndf = U.rndf, shuffle = U.shuffle, pick = U.pick, el = U.el;
const clamp = (v,a,b)=> Math.max(a, Math.min(b, v));
const rrect = (g,x,y,w,h,r)=>{ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); };
const emoji = (g,ch,x,y,size)=>{ g.font = size+'px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(ch,x,y); };
/* suit le doigt / la souris horizontalement et appelle set(x) en coordonnées du canvas */
function followX(api, c, set){
  const h = e=>{ set(c.pos(e).x); };
  api.on(api.root,'pointerdown',h); api.on(api.root,'pointermove',h);
}
const DPAD = (api, go)=> api.buttons([
  { t:'◀', label:'Gauche', down:()=>go('left') }, { t:'▲', label:'Haut', down:()=>go('up') },
  { t:'▼', label:'Bas', down:()=>go('down') }, { t:'▶', label:'Droite', down:()=>go('right') }
]);

/* ---------------------------------------------------------- SNAKE */
R({ id:'snake', name:'Snake', emoji:'🐍', cat:'Arcade', hue:140,
  desc:'Mange, grandis, ne te mords pas la queue.',
  how:"Glisse ton doigt (ou utilise les flèches / les boutons) pour guider le serpent vers les pommes 🍎. Chaque pomme = +10 points et le serpent accélère. Ne touche ni les murs ni ta queue !",
  create(api){
    const COLS = 20, ROWS = 22, S = 18, c = api.canvas(COLS*S, ROWS*S), g = c.g;
    let snake, dir, queue, food, acc = 0, step = .14, score = 0;
    const DIRS = { left:{x:-1,y:0}, right:{x:1,y:0}, up:{x:0,y:-1}, down:{x:0,y:1} };
    snake = [{x:10,y:11},{x:9,y:11},{x:8,y:11}]; dir = DIRS.right; queue = [];
    const place = ()=>{ for(;;){ const f = { x:rnd(COLS), y:rnd(ROWS) }; if(!snake.some(s=>s.x===f.x && s.y===f.y)){ food = f; return; } } };
    place();
    function turn(d){
      const m = DIRS[d]; if(!m) return; const last = queue.length ? queue[queue.length-1] : dir;
      if((m.x===-last.x && m.y===-last.y) || (m.x===last.x && m.y===last.y)) return;
      if(queue.length<2) queue.push(m);
    }
    function tick(){
      if(queue.length) dir = queue.shift();
      const h = { x:snake[0].x+dir.x, y:snake[0].y+dir.y };
      if(h.x<0 || h.x>=COLS || h.y<0 || h.y>=ROWS || snake.some((s,i)=> i<snake.length-1 && s.x===h.x && s.y===h.y)){ api.sfx('lose'); api.vibrate(150); api.end(score,{ title:'Aïe !', msg:'Longueur : '+snake.length }); return; }
      snake.unshift(h);
      if(h.x===food.x && h.y===food.y){ score += 10; api.setScore(score); api.sfx('good'); step = Math.max(.06, .14 - Math.floor(score/50)*.01); place(); }
      else snake.pop();
    }
    function draw(){
      for(let y=0;y<ROWS;y++) for(let x=0;x<COLS;x++){ g.fillStyle = (x+y)%2 ? '#1d3a22' : '#21432a'; g.fillRect(x*S,y*S,S,S); }
      g.fillStyle = '#f6efe4'; emoji(g,'🍎',food.x*S+S/2,food.y*S+S/2+1,S-2);
      snake.forEach((s,i)=>{ g.fillStyle = i===0 ? '#ffd166' : (i%2 ? '#4cc38a' : '#3aa876'); rrect(g,s.x*S+1,s.y*S+1,S-2,S-2,5); g.fill(); });
      const h = snake[0]; g.fillStyle = '#111'; g.fillRect(h.x*S+S*.28+dir.x*3, h.y*S+S*.3+dir.y*3, 3, 3); g.fillRect(h.x*S+S*.62+dir.x*3, h.y*S+S*.3+dir.y*3, 3, 3);
    }
    api.loop(dt=>{ acc += dt; while(acc>=step && !api.ended){ acc -= step; tick(); } draw(); });
    api.swipe(api.root, turn, { continuous:true, threshold:20 });
    api.onKey(k=>turn(k)); DPAD(api, turn);
  }
});

/* ---------------------------------------------------------- BLOCS (Tetris) */
R({ id:'blocs', name:'Blocs', emoji:'🧱', cat:'Arcade', hue:265,
  desc:'Empile les blocs, complète les lignes.',
  how:"Déplace et tourne les blocs qui tombent avec les boutons (◀ ▶ déplacer, ⟳ tourner, ▼ descendre, ⤓ chute directe) ou avec le clavier. Une ligne complète disparaît. Plus tu enchaînes de lignes d'un coup, plus tu gagnes !",
  create(api){
    const W = 10, H = 20, C = 24, c = api.canvas(14*C, H*C), g = c.g;
    const SH = { I:[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], O:[[1,1],[1,1]], T:[[0,1,0],[1,1,1],[0,0,0]], S:[[0,1,1],[1,1,0],[0,0,0]], Z:[[1,1,0],[0,1,1],[0,0,0]], J:[[1,0,0],[1,1,1],[0,0,0]], L:[[0,0,1],[1,1,1],[0,0,0]] };
    const COL = { I:'#22d3ee', O:'#facc15', T:'#a855f7', S:'#22c55e', Z:'#ef4444', J:'#3b82f6', L:'#f97316' };
    let board = Array.from({length:H},()=>Array(W).fill('')), cur, next = null, bag = [], score = 0, lines = 0, level = 1, drop = 0;
    const rot = m=> m[0].map((_,i)=> m.map(r=>r[i]).reverse());
    const hit = (m,x,y)=>{
      for(let r=0;r<m.length;r++) for(let q=0;q<m[r].length;q++) if(m[r][q]){
        const bx = x+q, by = y+r; if(bx<0 || bx>=W || by>=H) return true; if(by>=0 && board[by][bx]) return true;
      }
      return false;
    };
    const mkPiece = ()=>{ if(!bag.length) bag = shuffle(Object.keys(SH)); const k = bag.pop(); return { k, m:SH[k].map(r=>r.slice()), x:0, y:0 }; };
    function spawn(){
      cur = next || mkPiece(); next = mkPiece(); cur.x = Math.floor((W-cur.m[0].length)/2); cur.y = 0;
      if(hit(cur.m,cur.x,cur.y)){ api.sfx('lose'); api.end(score,{ title:'Colonne pleine !', msg:lines+' ligne'+(lines>1?'s':'')+' complétée'+(lines>1?'s':'') }); }
    }
    const info = ()=> api.setInfo('Niveau '+level+' • '+lines+' lignes');
    function lock(){
      cur.m.forEach((row,r)=> row.forEach((v,q)=>{ if(v){ const by = cur.y+r; if(by>=0) board[by][cur.x+q] = cur.k; } }));
      let n = 0;
      for(let r=H-1;r>=0;r--){ if(board[r].every(x=>x)){ board.splice(r,1); board.unshift(Array(W).fill('')); n++; r++; } }
      if(n){ lines += n; score += [0,100,300,500,800][n]*level; level = 1+Math.floor(lines/10); api.sfx('line'); api.vibrate(40); api.setScore(score); info(); } else api.sfx('tap');
      spawn();
    }
    const move = dx=>{ if(!api.ended && !hit(cur.m,cur.x+dx,cur.y)){ cur.x += dx; api.sfx('move'); } };
    function rotate(){
      if(api.ended) return; const nm = rot(cur.m);
      for(const k of [0,-1,1,-2,2]) if(!hit(nm,cur.x+k,cur.y)){ cur.m = nm; cur.x += k; api.sfx('move'); return; }
    }
    function soft(){ if(api.ended) return; if(!hit(cur.m,cur.x,cur.y+1)){ cur.y++; score += 1; api.setScore(score); } else lock(); }
    function hard(){ if(api.ended) return; let n = 0; while(!hit(cur.m,cur.x,cur.y+1)){ cur.y++; n++; } score += n*2; api.setScore(score); lock(); }
    const cell = (x,y,col,a)=>{ g.globalAlpha = a||1; g.fillStyle = col; rrect(g,x*C+1,y*C+1,C-2,C-2,4); g.fill(); g.globalAlpha = 1; };
    function draw(){
      g.fillStyle = '#14100a'; g.fillRect(0,0,14*C,H*C);
      g.fillStyle = '#1e1810'; g.fillRect(0,0,W*C,H*C);
      for(let r=0;r<H;r++) for(let q=0;q<W;q++) if(board[r][q]) cell(q,r,COL[board[r][q]]);
      let gy = cur.y; while(!hit(cur.m,cur.x,gy+1)) gy++;
      cur.m.forEach((row,r)=> row.forEach((v,q)=>{ if(v){ cell(cur.x+q,gy+r,COL[cur.k],.22); } }));
      cur.m.forEach((row,r)=> row.forEach((v,q)=>{ if(v && cur.y+r>=0) cell(cur.x+q,cur.y+r,COL[cur.k]); }));
      g.fillStyle = '#f6efe4'; g.font = '700 13px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
      g.fillText('SUIVANT', 12*C, 26);
      next.m.forEach((row,r)=> row.forEach((v,q)=>{ if(v){ g.fillStyle = COL[next.k]; rrect(g,10.4*C+q*(C-4)+C*.3,40+r*(C-4),C-6,C-6,3); g.fill(); } }));
      g.fillStyle = '#f6efe4'; g.fillText('NIVEAU', 12*C, 190); g.font = '800 28px sans-serif'; g.fillText(String(level), 12*C, 222);
    }
    let acc = 0;
    api.loop(dt=>{ acc += dt; const iv = Math.max(.07, .8-(level-1)*.07); if(acc>=iv){ acc = 0; if(!hit(cur.m,cur.x,cur.y+1)) cur.y++; else lock(); } draw(); });
    api.onKey(k=>{ if(k==='left') move(-1); else if(k==='right') move(1); else if(k==='up') rotate(); else if(k==='down') soft(); else if(k==='space') hard(); });
    api.buttons([
      { t:'◀', label:'Gauche', down:()=>move(-1), repeat:110 }, { t:'▶', label:'Droite', down:()=>move(1), repeat:110 },
      { t:'⟳', label:'Tourner', down:rotate }, { t:'▼', label:'Descendre', down:soft, repeat:60 }, { t:'⤓', label:'Chute', down:hard }
    ]);
    spawn(); info(); draw();
  }
});

/* ---------------------------------------------------------- OISEAU */
R({ id:'oiseau', name:'Oiseau', emoji:'🐦', cat:'Arcade', hue:195,
  desc:'Touche pour voler entre les tuyaux.',
  how:"Touche l'écran (ou la barre espace) pour faire battre des ailes à l'oiseau. Passe entre les tuyaux sans les toucher, ni le sol. Chaque passage = +1 point.",
  create(api){
    const W = 320, H = 480, GROUND = H-50, GAP = 140, c = api.canvas(W,H), g = c.g;
    let bird = { y:210, vy:0 }, pipes = [], started = false, score = 0, spawnT = 1.2, tm = 0;
    function flap(){ if(api.ended) return; started = true; bird.vy = -320; api.sfx('jump'); }
    function die(){ api.sfx('lose'); api.vibrate(150); api.end(score,{ title:'Aïe !' }); }
    function draw(){
      const sky = g.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#6ec6f2'); sky.addColorStop(1,'#cdeefd'); g.fillStyle = sky; g.fillRect(0,0,W,H);
      pipes.forEach(p=>{
        g.fillStyle = '#3aa65a'; g.fillRect(p.x,0,54,p.gy-GAP/2); g.fillRect(p.x,p.gy+GAP/2,54,GROUND-(p.gy+GAP/2));
        g.fillStyle = '#2d8a49'; g.fillRect(p.x-4,p.gy-GAP/2-18,62,18); g.fillRect(p.x-4,p.gy+GAP/2,62,18);
      });
      g.fillStyle = '#d9b36c'; g.fillRect(0,GROUND,W,50); g.fillStyle = '#7bc043'; g.fillRect(0,GROUND,W,8);
      g.save(); g.translate(80,bird.y); g.rotate(clamp(bird.vy/700,-.5,.9));
      g.fillStyle = '#ffd23f'; g.beginPath(); g.arc(0,0,13,0,7); g.fill();
      g.fillStyle = '#fff'; g.beginPath(); g.arc(5,-4,5,0,7); g.fill(); g.fillStyle = '#111'; g.beginPath(); g.arc(6.5,-4,2.3,0,7); g.fill();
      g.fillStyle = '#ff7a3d'; g.beginPath(); g.moveTo(10,2); g.lineTo(21,5); g.lineTo(10,9); g.fill(); g.restore();
      if(!started){ g.fillStyle = '#17304a'; g.font = '700 18px sans-serif'; g.textAlign = 'center'; g.fillText('Touche pour voler !', W/2, 120); }
    }
    api.loop(dt=>{
      tm += dt;
      if(!started){ bird.y = 210 + Math.sin(tm*5)*7; draw(); return; }
      bird.vy += 950*dt; bird.y += bird.vy*dt;
      spawnT -= dt; if(spawnT<=0){ pipes.push({ x:W+10, gy:rndf(100,GROUND-100), passed:false }); spawnT = 1.5; }
      pipes.forEach(p=>{ p.x -= 130*dt; if(!p.passed && p.x+54<80){ p.passed = true; score++; api.setScore(score); api.sfx('good'); } });
      pipes = pipes.filter(p=>p.x>-70);
      if(bird.y+13>GROUND || bird.y-13<0) return die();
      for(const p of pipes) if(80+13>p.x && 80-13<p.x+54 && (bird.y-11<p.gy-GAP/2 || bird.y+11>p.gy+GAP/2)) return die();
      draw();
    });
    api.on(api.root,'pointerdown',flap); api.onKey(k=>{ if(k==='space' || k==='up') flap(); });
    draw();
  }
});

/* ---------------------------------------------------------- CASSE-BRIQUES */
R({ id:'briques', name:'Casse-briques', emoji:'🧨', cat:'Arcade', hue:15,
  desc:'Fais rebondir la balle et casse tous les blocs.',
  how:"Fais glisser ton doigt (ou les flèches) pour déplacer la raquette. Touche l'écran pour lancer la balle. Casse toutes les briques sans laisser tomber la balle : tu as 3 vies.",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g;
    const paddle = { x:160, w:64, y:448, h:10 }; let ball, bricks = [], lives = 3, score = 0, level = 1;
    const COLS = 8, BW = 36, BH = 16, X0 = 16, Y0 = 64, PAL = ['#ef4444','#f97316','#facc15','#22c55e','#3b82f6','#a855f7'];
    function build(){
      bricks = []; const rows = Math.min(8, 3+level);
      for(let r=0;r<rows;r++) for(let q=0;q<COLS;q++) bricks.push({ x:X0+q*BW, y:Y0+r*(BH+2), c:PAL[r%PAL.length], hp:1 });
      resetBall();
    }
    const speed = ()=> 280 + level*28;
    function resetBall(){ ball = { x:paddle.x, y:paddle.y-8, vx:0, vy:0, r:6, stuck:true }; }
    function launch(){ if(ball.stuck && !api.ended){ ball.stuck = false; const a = rndf(-.4,.4); ball.vx = Math.sin(a)*speed(); ball.vy = -Math.cos(a)*speed(); api.sfx('tap'); } }
    const info = ()=> api.setInfo('Niveau '+level+' • '+'❤️'.repeat(lives));
    function update(dt){
      if(api.keys.left) paddle.x -= 340*dt; if(api.keys.right) paddle.x += 340*dt;
      paddle.x = clamp(paddle.x, paddle.w/2, W-paddle.w/2);
      if(ball.stuck){ ball.x = paddle.x; ball.y = paddle.y-8; return; }
      ball.x += ball.vx*dt; ball.y += ball.vy*dt;
      if(ball.x<ball.r){ ball.x = ball.r; ball.vx = Math.abs(ball.vx); } if(ball.x>W-ball.r){ ball.x = W-ball.r; ball.vx = -Math.abs(ball.vx); }
      if(ball.y<ball.r){ ball.y = ball.r; ball.vy = Math.abs(ball.vy); }
      if(ball.vy>0 && ball.y+ball.r>=paddle.y && ball.y+ball.r<=paddle.y+paddle.h+10 && Math.abs(ball.x-paddle.x)<=paddle.w/2+ball.r){
        const a = clamp((ball.x-paddle.x)/(paddle.w/2),-1,1)*1.0, sp = speed();
        ball.vx = Math.sin(a)*sp; ball.vy = -Math.cos(a)*sp; ball.y = paddle.y-ball.r; api.sfx('move');
      }
      for(let i=0;i<bricks.length;i++){
        const b = bricks[i], nx = clamp(ball.x,b.x,b.x+BW-2), ny = clamp(ball.y,b.y,b.y+BH), dx = ball.x-nx, dy = ball.y-ny;
        if(dx*dx+dy*dy < ball.r*ball.r){
          if(Math.abs(dx)>Math.abs(dy)) ball.vx = dx>0 ? Math.abs(ball.vx) : -Math.abs(ball.vx); else ball.vy = dy>0 ? Math.abs(ball.vy) : -Math.abs(ball.vy);
          bricks.splice(i,1); score += 10; api.setScore(score); api.sfx('pop'); break;
        }
      }
      if(!bricks.length){ level++; score += 100; api.setScore(score); api.sfx('win'); api.toast('Niveau '+level+' !'); lives = Math.min(5,lives+1); build(); info(); return; }
      if(ball.y>H+12){
        lives--; api.sfx('bad'); info();
        if(lives<=0){ api.end(score,{ title:'Partie terminée', msg:'Niveau atteint : '+level }); return; }
        resetBall();
      }
    }
    function draw(){
      g.fillStyle = '#12100c'; g.fillRect(0,0,W,H);
      bricks.forEach(b=>{ g.fillStyle = b.c; rrect(g,b.x,b.y,BW-2,BH,3); g.fill(); });
      g.fillStyle = '#f6efe4'; rrect(g,paddle.x-paddle.w/2,paddle.y,paddle.w,paddle.h,5); g.fill();
      g.beginPath(); g.arc(ball.x,ball.y,ball.r,0,7); g.fillStyle = '#ffd166'; g.fill();
      if(ball.stuck){ g.fillStyle = '#f6efe4'; g.font = '700 14px sans-serif'; g.textAlign = 'center'; g.fillText('Touche pour lancer', W/2, 340); }
    }
    followX(api, c, x=>{ paddle.x = clamp(x,paddle.w/2,W-paddle.w/2); });
    api.on(api.root,'pointerdown',launch); api.onKey(k=>{ if(k==='space' || k==='up') launch(); });
    api.loop(dt=>{ update(dt); draw(); });
    build(); info(); draw();
  }
});

/* ---------------------------------------------------------- PONG */
R({ id:'pong', name:'Pong', emoji:'🏓', cat:'Arcade', hue:225,
  desc:"Renvoie la balle, l'IA doit la rater.",
  how:"Déplace ta raquette (en bas) avec ton doigt ou les flèches. Si l'IA rate la balle, tu marques +1 point et la balle accélère. Si tu la rates, tu perds une vie ❤️ (3 vies).",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g, PW = 64;
    const me = { x:160 }, ai = { x:160 }; let ball, lives = 3, score = 0, wait = 0;
    const spd = ()=> Math.min(430, 230+score*12);
    function serve(dir){ ball = { x:W/2, y:H/2, vx:rndf(-110,110), vy:dir*spd() }; wait = .8; }
    const info = ()=> api.setInfo('❤️'.repeat(lives));
    function draw(){
      g.fillStyle = '#0f1d2b'; g.fillRect(0,0,W,H);
      g.strokeStyle = 'rgba(255,255,255,.2)'; g.setLineDash([8,8]); g.beginPath(); g.moveTo(0,H/2); g.lineTo(W,H/2); g.stroke(); g.setLineDash([]);
      g.fillStyle = '#ff9f6b'; rrect(g,ai.x-PW/2,26,PW,10,5); g.fill();
      g.fillStyle = '#f6efe4'; rrect(g,me.x-PW/2,H-36,PW,10,5); g.fill();
      g.fillStyle = '#ffd166'; g.beginPath(); g.arc(ball.x,ball.y,7,0,7); g.fill();
    }
    api.loop(dt=>{
      if(api.keys.left) me.x -= 360*dt; if(api.keys.right) me.x += 360*dt; me.x = clamp(me.x,PW/2,W-PW/2);
      const as = Math.min(250, 110+score*7); ai.x += clamp(ball.x-ai.x,-as*dt,as*dt); ai.x = clamp(ai.x,PW/2,W-PW/2);
      if(wait>0){ wait -= dt; draw(); return; }
      ball.x += ball.vx*dt; ball.y += ball.vy*dt;
      if(ball.x<7){ ball.x = 7; ball.vx = Math.abs(ball.vx); } if(ball.x>W-7){ ball.x = W-7; ball.vx = -Math.abs(ball.vx); }
      if(ball.vy>0 && ball.y+7>=H-36 && ball.y<=H-24 && Math.abs(ball.x-me.x)<=PW/2+7){ const a = clamp((ball.x-me.x)/(PW/2),-1,1); ball.vx = a*260; ball.vy = -spd(); ball.y = H-43; api.sfx('tap'); }
      if(ball.vy<0 && ball.y-7<=36 && ball.y>=24 && Math.abs(ball.x-ai.x)<=PW/2+7){ const a = clamp((ball.x-ai.x)/(PW/2),-1,1); ball.vx = a*240; ball.vy = spd(); ball.y = 43; api.sfx('move'); }
      if(ball.y>H+10){ lives--; api.sfx('bad'); info(); if(lives<=0){ api.end(score,{ title:'Partie terminée' }); return; } serve(-1); }
      if(ball.y<-10){ score++; api.setScore(score); api.sfx('good'); serve(1); }
      draw();
    });
    followX(api, c, x=>{ me.x = clamp(x,PW/2,W-PW/2); });
    serve(1); info(); draw();
  }
});

/* ---------------------------------------------------------- DÉFENSE SPATIALE */
R({ id:'invaders', name:'Défense spatiale', emoji:'👾', cat:'Arcade', hue:150,
  desc:"Repousse l'invasion extraterrestre.",
  how:"Fais glisser ton doigt (ou les flèches) pour déplacer ton vaisseau : il tire tout seul. Détruis tous les envahisseurs avant qu'ils n'atteignent le sol. 3 vies, chaque vague est plus rapide.",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g;
    const ship = { x:160, y:H-44, inv:0 }; let bullets = [], eb = [], inv = [], ox = 20, oy = 70, dirX = 1, wave = 1, lives = 3, score = 0, fireT = 0, enT = 1, total = 0;
    function build(){
      inv = []; const rows = Math.min(6, 3+Math.floor(wave/2)); total = 8*rows;
      for(let r=0;r<rows;r++) for(let q=0;q<8;q++) inv.push({ c:q, r, alive:true });
      ox = 20; oy = 70; dirX = 1; bullets = []; eb = [];
    }
    const info = ()=> api.setInfo('Vague '+wave+' • '+'❤️'.repeat(lives));
    const pos = i=>({ x:ox+i.c*34, y:oy+i.r*28 });
    function update(dt){
      if(api.keys.left) ship.x -= 260*dt; if(api.keys.right) ship.x += 260*dt; ship.x = clamp(ship.x,16,W-16);
      if(ship.inv>0) ship.inv -= dt;
      fireT -= dt; if(fireT<=0){ bullets.push({ x:ship.x, y:ship.y-12 }); fireT = .38; api.sfx('shoot'); }
      bullets.forEach(b=>{ b.y -= 430*dt; }); bullets = bullets.filter(b=>b.y>-10);
      const alive = inv.filter(i=>i.alive); const sp = 26+wave*5+(total-alive.length)*3.2;
      ox += dirX*sp*dt;
      let minC = 99, maxC = -1; alive.forEach(i=>{ if(i.c<minC) minC = i.c; if(i.c>maxC) maxC = i.c; });
      if(alive.length){
        if(dirX>0 && ox+maxC*34+22>W-6){ dirX = -1; oy += 14; } else if(dirX<0 && ox+minC*34<6){ dirX = 1; oy += 14; }
      }
      enT -= dt; if(enT<=0 && alive.length){
        const cols = {}; alive.forEach(i=>{ if(!cols[i.c] || cols[i.c].r<i.r) cols[i.c] = i; }); const sh = pick(Object.keys(cols).map(k=>cols[k])), p = pos(sh);
        eb.push({ x:p.x+11, y:p.y+16 }); enT = Math.max(.35, 1.1-wave*.08);
      }
      eb.forEach(b=>{ b.y += (170+wave*12)*dt; }); eb = eb.filter(b=>b.y<H+10);
      bullets.forEach(b=>{
        for(const i of alive){ if(!i.alive) continue; const p = pos(i); if(b.x>p.x-3 && b.x<p.x+25 && b.y>p.y && b.y<p.y+20){ i.alive = false; b.y = -99; score += 10+(5-Math.min(5,i.r))*2; api.setScore(score); api.sfx('pop'); break; } }
      });
      if(ship.inv<=0) for(const b of eb){ if(b.x>ship.x-15 && b.x<ship.x+15 && b.y>ship.y-8 && b.y<ship.y+10){ b.y = 999; lives--; ship.inv = 1.3; api.sfx('boom'); api.vibrate(120); info(); if(lives<=0){ api.end(score,{ title:'Vaisseau détruit', msg:'Tu as tenu jusqu\'à la vague '+wave+'.' }); return; } } }
      if(!inv.some(i=>i.alive)){ wave++; score += 50; api.setScore(score); api.sfx('win'); api.toast('Vague '+wave+' !'); build(); info(); return; }
      if(inv.some(i=>i.alive && pos(i).y+20>ship.y-6)){ api.sfx('lose'); api.end(score,{ title:'Ils ont atteint la Terre !' }); }
    }
    function draw(){
      g.fillStyle = '#080a18'; g.fillRect(0,0,W,H);
      g.fillStyle = '#ffffff55'; for(let i=0;i<30;i++) g.fillRect((i*97)%W,(i*53)%H,1.5,1.5);
      g.fillStyle = '#fff'; inv.forEach(i=>{ if(i.alive){ const p = pos(i); emoji(g,'👾',p.x+11,p.y+10,20); } });
      if(ship.inv<=0 || Math.floor(ship.inv*10)%2){ g.fillStyle = '#7fe0b3'; g.beginPath(); g.moveTo(ship.x,ship.y-14); g.lineTo(ship.x+15,ship.y+10); g.lineTo(ship.x-15,ship.y+10); g.closePath(); g.fill(); }
      g.fillStyle = '#ffd166'; bullets.forEach(b=>g.fillRect(b.x-1.5,b.y-8,3,10));
      g.fillStyle = '#ff6b6b'; eb.forEach(b=>g.fillRect(b.x-1.5,b.y-6,3,10));
    }
    followX(api, c, x=>{ ship.x = clamp(x,16,W-16); });
    api.loop(dt=>{ update(dt); draw(); });
    build(); info(); draw();
  }
});

/* ---------------------------------------------------------- COURS & SAUTE */
R({ id:'runner', name:'Cours & Saute', emoji:'🏃', cat:'Arcade', hue:35,
  desc:'Cours le plus loin possible en sautant les obstacles.',
  how:"Touche l'écran (ou la barre espace / flèche haut) pour sauter. Reste appuyé pour sauter plus haut. Évite les rochers et les cactus : la vitesse augmente !",
  create(api){
    const W = 360, H = 300, GY = 250, c = api.canvas(W,H), g = c.g;
    const p = { x:60, y:GY, vy:0, w:24, h:42 }; let obs = [], speed = 270, dist = 0, nextGap = 300, held = false, tm = 0, score = 0;
    function jump(){ if(api.ended) return; held = true; if(p.y>=GY-.5){ p.vy = -640; api.sfx('jump'); } }
    function spawn(){
      const t = pick(['rock','cactus','cactus','twin']);
      const o = t==='rock' ? { w:28, h:22 } : t==='cactus' ? { w:20, h:46 } : { w:46, h:38 };
      o.t = t; o.x = W+20; obs.push(o); nextGap = rndf(240,470)*(speed/300);
    }
    function draw(){
      const sky = g.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#f6c177'); sky.addColorStop(1,'#fbe7c1'); g.fillStyle = sky; g.fillRect(0,0,W,H);
      g.fillStyle = '#fff6'; for(let i=0;i<3;i++){ const x = ((i*170-dist*.15)%(W+120)+W+120)%(W+120)-60; g.beginPath(); g.ellipse(x,50+i*22,34,11,0,0,7); g.fill(); }
      g.fillStyle = '#c99a5b'; g.fillRect(0,GY,W,H-GY); g.fillStyle = '#a8793f'; g.fillRect(0,GY,W,4);
      for(let i=0;i<8;i++){ const x = ((i*60-dist)%W+W)%W; g.fillRect(x,GY+14+(i%3)*9,10,2); }
      obs.forEach(o=>{
        if(o.t==='rock'){ g.fillStyle = '#6f6a62'; g.beginPath(); g.ellipse(o.x+o.w/2,GY-o.h/2+2,o.w/2,o.h/2,0,0,7); g.fill(); }
        else { g.fillStyle = '#2f8f4e'; const n = o.t==='twin' ? 2 : 1; for(let k=0;k<n;k++){ const bx = o.x+k*26, bh = k ? o.h-8 : o.h; rrect(g,bx,GY-bh,18,bh,8); g.fill(); g.fillRect(bx-6,GY-bh*.6,8,5); g.fillRect(bx-6,GY-bh*.6-8,5,8); } }
      });
      const air = p.y<GY-1, leg = Math.sin(tm*16)*7;
      g.fillStyle = '#2b2118'; rrect(g,p.x,p.y-p.h+14,p.w,p.h-20,6); g.fill();
      g.fillStyle = '#e8b27c'; g.beginPath(); g.arc(p.x+p.w/2+2,p.y-p.h+8,9,0,7); g.fill();
      g.strokeStyle = '#2b2118'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath();
      g.moveTo(p.x+8,p.y-8); g.lineTo(p.x+8+(air?6:leg),p.y); g.moveTo(p.x+16,p.y-8); g.lineTo(p.x+16+(air?-6:-leg),p.y); g.stroke();
    }
    api.loop(dt=>{
      tm += dt; speed = Math.min(580, 270+dist*.03); dist += speed*dt;
      const sc = Math.floor(dist/10); if(sc!==score){ score = sc; api.setScore(score); }
      const g2 = (held && p.vy<0) ? 1150 : 2300; p.vy += g2*dt; p.y += p.vy*dt; if(p.y>GY){ p.y = GY; p.vy = 0; }
      obs.forEach(o=>{ o.x -= speed*dt; }); obs = obs.filter(o=>o.x>-60);
      nextGap -= speed*dt; if(nextGap<=0) spawn();
      for(const o of obs){ if(p.x+p.w-5>o.x+3 && p.x+5<o.x+o.w-3 && p.y-6>GY-o.h+2){ api.sfx('lose'); api.vibrate(150); draw(); api.end(score,{ title:'Boum !', msg:'Distance : '+score+' m' }); return; } }
      draw();
    });
    api.on(api.root,'pointerdown',jump); api.on(window,'pointerup',()=>{ held = false; });
    api.onKey(k=>{ if(k==='space' || k==='up') jump(); });
    draw();
  }
});

/* ---------------------------------------------------------- TOUR (Stack) */
R({ id:'tour', name:'Tour', emoji:'🏗️', cat:'Arcade', hue:285,
  desc:'Empile les blocs le plus haut possible.',
  how:"Un bloc glisse de gauche à droite. Touche l'écran (ou la barre espace) pour le poser pile sur le bloc d'en dessous. Ce qui dépasse est coupé : la tour rétrécit ! Un placement parfait rapporte un bonus.",
  create(api){
    const W = 320, H = 480, BH = 24, c = api.canvas(W,H), g = c.g;
    let layers = [{ x:80, w:160 }], cur, cam = 0, score = 0, perfect = 0;
    function newBlock(){
      const last = layers[layers.length-1], fromL = layers.length%2===0;
      cur = { x:fromL ? -last.w : W, w:last.w, dir:fromL ? 1 : -1, sp:Math.min(330, 130+layers.length*5) };
    }
    function drop(){
      if(api.ended) return; const prev = layers[layers.length-1];
      const l = Math.max(cur.x,prev.x), r = Math.min(cur.x+cur.w,prev.x+prev.w), ov = r-l;
      if(ov<=0){ api.sfx('lose'); api.end(score,{ title:'Raté !', msg:layers.length+' étages construits.' }); return; }
      if(Math.abs(cur.x-prev.x)<5){ layers.push({ x:prev.x, w:prev.w }); perfect++; score += 2; api.toast('Parfait ! +2'); api.sfx('win'); }
      else { layers.push({ x:l, w:ov }); perfect = 0; api.sfx('tap'); }
      score += 1; api.setScore(score); api.setInfo('Étage '+layers.length); newBlock();
    }
    const yOf = i=> H-70-(i+1)*BH+cam;
    function draw(){
      const k = clamp(layers.length/60,0,1); g.fillStyle = `hsl(${220-k*120},45%,${18+k*8}%)`; g.fillRect(0,0,W,H);
      layers.forEach((b,i)=>{ g.fillStyle = `hsl(${(i*14)%360},70%,56%)`; g.fillRect(b.x,yOf(i),b.w,BH-1); });
      g.fillStyle = `hsl(${(layers.length*14)%360},70%,66%)`; g.fillRect(cur.x,yOf(layers.length),cur.w,BH-1);
    }
    api.loop(dt=>{
      cur.x += cur.dir*cur.sp*dt;
      if(cur.x+cur.w>W+60){ cur.dir = -1; } if(cur.x<-60){ cur.dir = 1; }
      const target = Math.max(0,(layers.length-9)*BH); cam += (target-cam)*Math.min(1,dt*5);
      draw();
    });
    api.on(api.root,'pointerdown',drop); api.onKey(k=>{ if(k==='space' || k==='up' || k==='enter') drop(); });
    api.setInfo('Étage 1'); newBlock(); draw();
  }
});

/* ---------------------------------------------------------- TAPE-TAUPE */
R({ id:'taupe', name:'Tape-taupe', emoji:'🔨', cat:'Réflexes', hue:25,
  desc:'Assomme les taupes avant qu\'elles ne se cachent.',
  how:"Touche les taupes 🐹 dès qu'elles sortent : +1 point. Attention aux bombes 💣 : elles te font perdre 3 points ! Tu as 45 secondes, et ça va de plus en plus vite.",
  create(api){
    const board = el('div','g-board'); api.root.appendChild(board); api.fit(board,1);
    board.innerHTML = '<div class="g-grid" style="grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);gap:calc(var(--u,3px)*4);">'+'<button class="mole-hole"></button>'.repeat(9)+'</div>';
    const holes = [].slice.call(board.querySelectorAll('.mole-hole')), st = holes.map(()=>({ type:null, until:0 }));
    let now = 0, score = 0, spawnT = 400; const TOTAL = 45000;
    const draw = ()=> holes.forEach((h,i)=>{ h.textContent = st[i].type==='mole' ? '🐹' : st[i].type==='bomb' ? '💣' : ''; h.style.background = st[i].type ? '#7a5224' : ''; });
    api.every(100,()=>{
      now += 100; st.forEach(s=>{ if(s.type && now>s.until) s.type = null; });
      spawnT -= 100;
      if(spawnT<=0){
        const free = []; st.forEach((s,i)=>{ if(!s.type) free.push(i); });
        if(free.length){ const i = pick(free), el = now/1000; st[i].type = Math.random()<.18 ? 'bomb' : 'mole'; st[i].until = now+Math.max(520,1100-el*11); }
        spawnT = Math.max(300, 800-now/1000*9);
      }
      draw(); api.setInfo('⏱️ '+Math.max(0,Math.ceil((TOTAL-now)/1000))+' s');
      if(now>=TOTAL) api.end(score,{ title:'Temps écoulé !' });
    });
    holes.forEach((h,i)=> api.on(h,'pointerdown',e=>{
      e.preventDefault(); if(api.ended) return; const s = st[i];
      if(s.type==='mole'){ score++; api.sfx('pop'); api.vibrate(20); }
      else if(s.type==='bomb'){ score = Math.max(0,score-3); api.sfx('boom'); api.vibrate(120); }
      else return;
      s.type = null; api.setScore(score); draw();
    }));
    api.setInfo('⏱️ 45 s'); draw();
  }
});

/* ---------------------------------------------------------- TRAVERSE (Frogger) */
R({ id:'traverse', name:'Traverse', emoji:'🐸', cat:'Arcade', hue:110,
  desc:'Aide la grenouille à traverser les routes.',
  how:"Glisse ton doigt (ou utilise les flèches / boutons) pour faire sauter la grenouille d'une case. Traverse toutes les routes sans te faire écraser pour arriver tout en haut. 3 vies, les voitures accélèrent à chaque traversée.",
  create(api){
    const COLS = 9, ROWS = 11, S = 36, W = COLS*S, H = ROWS*S, c = api.canvas(W,H), g = c.g;
    const roadRows = [1,2,3,5,6,7,8,9], CARS = ['🚗','🚕','🚙','🚚','🚌'];
    let lanes = [], fx = 4, fy = 10, lives = 3, score = 0, level = 1, maxRow = 10;
    function build(){
      lanes = roadRows.map((row,idx)=>{
        const n = 2+rnd(2), L = W+4*S, wide = Math.random()<.35;
        return { row, dir:idx%2 ? 1 : -1, sp:(46+rnd(40))*(1+level*.08), n, L, spacing:L/n, w:wide ? S*1.8 : S, phase:rnd(L), e:wide ? pick(['🚚','🚌']) : pick(['🚗','🚕','🚙']) };
      });
    }
    const carX = (ln,i)=> ((ln.phase+i*ln.spacing)%ln.L+ln.L)%ln.L-2*S;
    const info = ()=> api.setInfo('Niveau '+level+' • '+'❤️'.repeat(lives));
    function reset(){ fx = 4; fy = 10; maxRow = 10; }
    function hurt(){
      lives--; api.sfx('boom'); api.vibrate(150); info();
      if(lives<=0){ api.end(score,{ title:'Écrasée !', msg:'Traversées réussies : '+(level-1) }); return; }
      reset();
    }
    function go(d){
      if(api.ended) return;
      if(d==='left') fx = Math.max(0,fx-1); else if(d==='right') fx = Math.min(COLS-1,fx+1);
      else if(d==='up') fy = Math.max(0,fy-1); else if(d==='down') fy = Math.min(ROWS-1,fy+1); else return;
      api.sfx('move');
      if(fy<maxRow){ maxRow = fy; score += 1; api.setScore(score); }
      if(fy===0){ score += 10; level++; api.setScore(score); api.sfx('win'); api.toast('Bravo ! Niveau '+level); build(); reset(); info(); }
    }
    function draw(){
      for(let r=0;r<ROWS;r++){
        g.fillStyle = r===0 ? '#3d8f4f' : r===10 || r===4 ? '#7bc043' : '#3a3a42'; g.fillRect(0,r*S,W,S);
        if(roadRows.indexOf(r)>=0){ g.fillStyle = '#ffffff22'; for(let x=0;x<W;x+=40) g.fillRect(x,r*S+S/2-1,20,2); }
      }
      g.fillStyle = '#fff'; emoji(g,'🏁',W/2,S/2,26);
      lanes.forEach(ln=>{
        for(let i=0;i<ln.n;i++){
          const x = carX(ln,i); g.save(); g.translate(x+ln.w/2,ln.row*S+S/2+1); if(ln.dir>0) g.scale(-1,1);
          g.fillStyle = '#fff'; emoji(g,ln.e,0,0,ln.w>S ? 34 : 28); g.restore();
        }
      });
      g.fillStyle = '#fff'; emoji(g,'🐸',fx*S+S/2,fy*S+S/2+1,28);
    }
    api.loop(dt=>{
      lanes.forEach(ln=>{ ln.phase += ln.dir*ln.sp*dt; });
      for(const ln of lanes){
        if(ln.row!==fy) continue;
        for(let i=0;i<ln.n;i++){ const x = carX(ln,i); if(fx*S+9<x+ln.w-4 && fx*S+S-9>x+4){ draw(); hurt(); return; } }
      }
      draw();
    });
    api.swipe(api.root, go); api.onKey(k=>go(k)); DPAD(api, go);
    build(); info(); draw();
  }
});

/* ---------------------------------------------------------- MÉTÉORES */
R({ id:'meteores', name:'Météores', emoji:'☄️', cat:'Arcade', hue:15,
  desc:'Esquive la pluie de météores et ramasse les étoiles.',
  how:"Fais glisser ton doigt (ou les flèches) pour piloter ton vaisseau en bas de l'écran. Évite les météores : un seul choc et c'est fini ! Les étoiles ⭐ rapportent +10 points. Plus tu survis longtemps, plus tu marques.",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g, ship = { x:160, y:H-60 };
    let rocks = [], stars = [], t = 0, spawnT = .5, starT = 3, bonus = 0, score = 0;
    function draw(){
      g.fillStyle = '#070b1d'; g.fillRect(0,0,W,H);
      g.fillStyle = '#ffffff44'; for(let i=0;i<40;i++){ g.fillRect((i*83)%W,((i*61)+t*40*(1+i%3))%H,1.6,1.6); }
      rocks.forEach(r=>{ g.fillStyle = '#8a7968'; g.beginPath(); g.arc(r.x,r.y,r.r,0,7); g.fill(); g.fillStyle = '#6b5d4f'; g.beginPath(); g.arc(r.x-r.r*.3,r.y-r.r*.2,r.r*.3,0,7); g.fill(); g.beginPath(); g.arc(r.x+r.r*.35,r.y+r.r*.3,r.r*.2,0,7); g.fill(); });
      g.fillStyle = '#fff'; stars.forEach(s=>emoji(g,'⭐',s.x,s.y,22));
      g.fillStyle = '#7fe0b3'; g.beginPath(); g.moveTo(ship.x,ship.y-16); g.lineTo(ship.x+13,ship.y+12); g.lineTo(ship.x,ship.y+6); g.lineTo(ship.x-13,ship.y+12); g.closePath(); g.fill();
      g.fillStyle = '#ffb347'; g.beginPath(); g.moveTo(ship.x-5,ship.y+8); g.lineTo(ship.x,ship.y+18+Math.random()*6); g.lineTo(ship.x+5,ship.y+8); g.fill();
    }
    api.loop(dt=>{
      t += dt; if(api.keys.left) ship.x -= 300*dt; if(api.keys.right) ship.x += 300*dt; ship.x = clamp(ship.x,14,W-14);
      spawnT -= dt; if(spawnT<=0){ rocks.push({ x:rndf(14,W-14), y:-20, r:rndf(9,20), vy:Math.min(430,150+t*4)*rndf(.8,1.2) }); spawnT = Math.max(.16,.72-t*.009); }
      starT -= dt; if(starT<=0){ stars.push({ x:rndf(20,W-20), y:-16, vy:140 }); starT = rndf(2.5,4.5); }
      rocks.forEach(r=>{ r.y += r.vy*dt; }); stars.forEach(s=>{ s.y += s.vy*dt; });
      rocks = rocks.filter(r=>r.y<H+30); stars = stars.filter(s=>s.y<H+20);
      for(const r of rocks){ const dx = r.x-ship.x, dy = r.y-ship.y; if(dx*dx+dy*dy<(r.r+9)*(r.r+9)){ api.sfx('boom'); api.vibrate(150); draw(); api.end(score,{ title:'Collision !', msg:'Étoiles ramassées : '+bonus/10 }); return; } }
      stars = stars.filter(s=>{ const dx = s.x-ship.x, dy = s.y-ship.y; if(dx*dx+dy*dy<22*22){ bonus += 10; api.sfx('good'); return false; } return true; });
      const sc = Math.floor(t*5)+bonus; if(sc!==score){ score = sc; api.setScore(score); }
      draw();
    });
    followX(api, c, x=>{ ship.x = clamp(x,14,W-14); });
    draw();
  }
});

/* ---------------------------------------------------------- FRUITS */
R({ id:'fruits', name:'Attrape-fruits', emoji:'🧺', cat:'Arcade', hue:95,
  desc:'Rattrape les fruits, évite les bombes.',
  how:"Déplace le panier avec ton doigt (ou les flèches) pour rattraper les fruits qui tombent : +10 points chacun. Attention : un fruit raté ou une bombe 💣 attrapée te fait perdre une vie ❤️ (3 vies).",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g, bk = { x:160, w:76, y:H-52 };
    let items = [], lives = 3, score = 0, t = 0, spawnT = .6;
    const FR = ['🍎','🍌','🍇','🍊','🍉','🍓','🥭'];
    const info = ()=> api.setInfo('❤️'.repeat(lives));
    function hurt(){ lives--; api.sfx('bad'); api.vibrate(100); info(); if(lives<=0) api.end(score,{ title:'Plus de vies !' }); }
    function draw(){
      const sky = g.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#8fd3f4'); sky.addColorStop(1,'#e8f7c8'); g.fillStyle = sky; g.fillRect(0,0,W,H);
      g.fillStyle = '#7bc043'; g.fillRect(0,H-20,W,20);
      items.forEach(i=>{ g.fillStyle = '#000'; emoji(g,i.e,i.x,i.y,i.bomb?28:30); });
      emoji(g,'🧺',bk.x,bk.y,56);
    }
    api.loop(dt=>{
      t += dt; if(api.keys.left) bk.x -= 330*dt; if(api.keys.right) bk.x += 330*dt; bk.x = clamp(bk.x,bk.w/2,W-bk.w/2);
      spawnT -= dt; if(spawnT<=0){ const bomb = Math.random()<Math.min(.28,.1+t*.003); items.push({ x:rndf(24,W-24), y:-20, vy:Math.min(380,130+t*3.2)*rndf(.9,1.15), bomb, e:bomb?'💣':pick(FR) }); spawnT = Math.max(.32,.95-t*.008); }
      for(let k=items.length-1;k>=0;k--){
        const i = items[k]; i.y += i.vy*dt;
        if(i.y>bk.y-14 && i.y<bk.y+18 && Math.abs(i.x-bk.x)<bk.w/2+6){
          items.splice(k,1);
          if(i.bomb){ api.sfx('boom'); hurt(); } else { score += 10; api.setScore(score); api.sfx('good'); }
          if(api.ended){ draw(); return; }
        } else if(i.y>H+10){ items.splice(k,1); if(!i.bomb){ hurt(); if(api.ended){ draw(); return; } } }
      }
      draw();
    });
    followX(api, c, x=>{ bk.x = clamp(x,bk.w/2,W-bk.w/2); });
    info(); draw();
  }
});

/* ---------------------------------------------------------- LABYRINTHE */
const MZ = (function(){
  const N = 1, E = 2, S = 4, Wd = 8;
  function gen(w,h){
    const cells = Array(w*h).fill(15), seen = Array(w*h).fill(false), st = [0]; seen[0] = true;
    while(st.length){
      const i = st[st.length-1], x = i%w, y = (i/w)|0, opts = [];
      if(y>0 && !seen[i-w]) opts.push([i-w,N,S]); if(x<w-1 && !seen[i+1]) opts.push([i+1,E,Wd]);
      if(y<h-1 && !seen[i+w]) opts.push([i+w,S,N]); if(x>0 && !seen[i-1]) opts.push([i-1,Wd,E]);
      if(!opts.length){ st.pop(); continue; }
      const o = pick(opts); cells[i] &= ~o[1]; cells[o[0]] &= ~o[2]; seen[o[0]] = true; st.push(o[0]);
    }
    return cells;
  }
  return { gen, N, E, S, W:Wd };
})();
SCCG.lab.maze = MZ;
R({ id:'labyrinthe', name:'Labyrinthe', emoji:'🧭', cat:'Réflexion', hue:55,
  desc:'Trouve la sortie avant la fin du temps.',
  how:"Guide le point jaune jusqu'au drapeau 🏁 en glissant ton doigt (ou avec les flèches / boutons). Chaque niveau est plus grand. Tu as un temps limité : le temps restant te donne des points bonus.",
  create(api){
    const CW = 320, CH = 420, c = api.canvas(CW,CH), g = c.g;
    let level = 1, w, h, cells, cs, ox, oy, px, py, timeLeft, score = 0, lastSec = -1;
    function build(){
      w = Math.min(13,5+level); h = Math.min(17,7+level); cells = MZ.gen(w,h);
      cs = Math.floor(Math.min((CW-12)/w,(CH-12)/h)); ox = Math.floor((CW-cs*w)/2); oy = Math.floor((CH-cs*h)/2);
      px = 0; py = 0; timeLeft = 15+w*h*.55; lastSec = -1;
    }
    function go(d){
      if(api.ended) return; const i = py*w+px; let nx = px, ny = py;
      if(d==='up' && !(cells[i]&MZ.N)) ny--; else if(d==='down' && !(cells[i]&MZ.S)) ny++;
      else if(d==='left' && !(cells[i]&MZ.W)) nx--; else if(d==='right' && !(cells[i]&MZ.E)) nx++; else return;
      px = nx; py = ny; api.sfx('move');
      if(px===w-1 && py===h-1){
        const bonus = 100+Math.round(timeLeft)*2; score += bonus; api.setScore(score); api.sfx('win'); api.toast('Niveau '+level+' réussi ! +'+bonus);
        level++; build();
      }
    }
    function draw(){
      g.fillStyle = '#17120c'; g.fillRect(0,0,CW,CH);
      g.strokeStyle = '#f2b84b'; g.lineWidth = 2; g.lineCap = 'round'; g.beginPath();
      for(let y=0;y<h;y++) for(let x=0;x<w;x++){
        const v = cells[y*w+x], X = ox+x*cs, Y = oy+y*cs;
        if(v&MZ.N){ g.moveTo(X,Y); g.lineTo(X+cs,Y); } if(v&MZ.W){ g.moveTo(X,Y); g.lineTo(X,Y+cs); }
        if(y===h-1 && (v&MZ.S)){ g.moveTo(X,Y+cs); g.lineTo(X+cs,Y+cs); } if(x===w-1 && (v&MZ.E)){ g.moveTo(X+cs,Y); g.lineTo(X+cs,Y+cs); }
      }
      g.stroke();
      g.fillStyle = '#fff'; emoji(g,'🏁',ox+(w-1)*cs+cs/2,oy+(h-1)*cs+cs/2+1,Math.max(12,cs*.7));
      g.fillStyle = '#ffd166'; g.beginPath(); g.arc(ox+px*cs+cs/2,oy+py*cs+cs/2,cs*.3,0,7); g.fill();
    }
    api.loop(dt=>{
      timeLeft -= dt; const s = Math.ceil(timeLeft);
      if(s!==lastSec){ lastSec = s; api.setInfo('Niveau '+level+' • ⏱️ '+Math.max(0,s)+' s'); }
      if(timeLeft<=0){ draw(); api.sfx('lose'); api.end(score,{ title:'Temps écoulé !', msg:'Niveau atteint : '+level }); return; }
      draw();
    });
    api.swipe(api.root, go, { continuous:true, threshold:18 }); api.onKey(k=>go(k));
    api.buttons([
      { t:'◀', label:'Gauche', down:()=>go('left'), repeat:120 }, { t:'▲', label:'Haut', down:()=>go('up'), repeat:120 },
      { t:'▼', label:'Bas', down:()=>go('down'), repeat:120 }, { t:'▶', label:'Droite', down:()=>go('right'), repeat:120 }
    ]);
    build(); draw();
  }
});
})();
