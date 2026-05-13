let scores={},qstate={},visited=new Set();
function showTopic(btn){
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const t=btn.dataset.t;
  visited.add(t);
  updateProgress();
  document.getElementById('topbar-title').textContent=btn.textContent.trim();
  const sp=document.getElementById('scorePill');
  if(t.startsWith('q_')){
    if(!scores[t])scores[t]={c:0,tot:0};
    if(!qstate[t])qstate[t]={done:[],chosen:{}};
    sp.style.display='flex';
    renderQuiz(t);
  }else{
    sp.style.display='none';
    document.getElementById('content').innerHTML=LESSONS[t]||'<div class="welcome-screen"><p>Content coming soon</p></div>';
  }
  if(window.innerWidth<768)document.getElementById('sidebar').classList.remove('open');
}
function renderQuiz(t){
  const qs=QUIZZES[t],sc=scores[t];
  document.getElementById('scoreDisplay').textContent=sc.c+' / '+sc.tot;
  let h='<div class="quiz-container">';
  qs.forEach((q,i)=>{
    const done=qstate[t].done.includes(i);
    h+=`<div class="qbox"><div class="qnum">Question ${i+1} of ${qs.length}</div>
    <div class="qtxt">${esc(q.q)}</div>
    ${q.opts.map((o,j)=>`<button class="opt" id="o${t}${i}${j}" onclick="answer('${t}',${i},${j})" ${done?'disabled':''}><span class="opt-letter">${'ABCD'[j]}</span>${esc(o)}</button>`).join('')}
    <div class="explanation" id="e${t}${i}">${q.exp}</div></div>`;
  });
  h+=`<button class="reset-btn" onclick="resetQuiz('${t}')"><i class="ti ti-refresh"></i>Reset Quiz</button></div>`;
  document.getElementById('content').innerHTML=h;
  qstate[t].done.forEach(i=>restoreQ(t,i,qs[i]));
}
function restoreQ(t,i,q){
  const prev=qstate[t].chosen[i];
  if(prev===undefined)return;
  q.opts.forEach((_,j)=>{
    const b=document.getElementById('o'+t+i+j);
    if(!b)return;
    b.disabled=true;
    if(j===q.a)b.classList.add('correct');
    else if(j===prev&&j!==q.a)b.classList.add('wrong');
  });
  const e=document.getElementById('e'+t+i);
  if(e)e.classList.add('visible');
}
function answer(t,qi,ch){
  const q=QUIZZES[t][qi];
  if(qstate[t].done.includes(qi))return;
  qstate[t].done.push(qi);
  qstate[t].chosen[qi]=ch;
  if(ch===q.a)scores[t].c++;
  scores[t].tot++;
  document.getElementById('scoreDisplay').textContent=scores[t].c+' / '+scores[t].tot;
  q.opts.forEach((_,j)=>{
    const b=document.getElementById('o'+t+qi+j);
    b.disabled=true;
    if(j===q.a)b.classList.add('correct');
    else if(j===ch&&j!==q.a)b.classList.add('wrong');
  });
  const e=document.getElementById('e'+t+qi);
  if(e)e.classList.add('visible');
}
function resetQuiz(t){scores[t]={c:0,tot:0};qstate[t]={done:[],chosen:{}};renderQuiz(t);}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');}
function toggleTheme(){
  const d=document.documentElement;
  const t=d.getAttribute('data-theme')==='light'?'':'light';
  d.setAttribute('data-theme',t);
  document.getElementById('themeIcon').className='ti ti-'+(t==='light'?'moon':'sun');
}
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open');}
function filterTopics(v){
  const q=v.toLowerCase();
  document.querySelectorAll('.nav-btn').forEach(b=>{
    b.classList.toggle('hidden',q&&!b.textContent.toLowerCase().includes(q));
  });
}
function updateProgress(){
  const total=document.querySelectorAll('.nav-btn').length;
  const pct=Math.round((visited.size/total)*100);
  document.getElementById('progressPct').textContent=pct+'%';
  document.getElementById('progressFill').style.width=pct+'%';
}
