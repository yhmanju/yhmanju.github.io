(()=>{const q=s=>document.querySelector(s);const qa=s=>Array.from(document.querySelectorAll(s));const FALLBACK='/images/cover-fallback.jpg';
function fit(){let scale=innerWidth<=680?1:innerWidth/1920;document.documentElement.style.setProperty('--global-scale',scale);let f=q('.global-scale-frame'),s=q('.global-scale-shell');if(f&&s)s.style.height=(f.offsetHeight*scale)+'px';}
addEventListener('resize',fit);addEventListener('load',fit);const frame=q('.global-scale-frame');if(frame&&window.ResizeObserver)new ResizeObserver(fit).observe(frame);fit();
document.addEventListener('error',ev=>{const t=ev.target;if(t&&t.tagName==='IMG'&&!t.dataset.fallbackUsed){t.dataset.fallbackUsed='1';t.src=FALLBACK;}},true);
function fillInput(form,value){const inp=form&&form.querySelector('input[name=q],input[type=search]');if(inp)inp.value=value||'';}
const params=new URLSearchParams(location.search);const q0=params.get('q')||'';
qa('form[action*="search"],form.static-search,form.SearchScreen_searchBar__t_NiC,form.SiteHeader_search__stxA6').forEach(form=>fillInput(form,q0));
const catalogForm=q('.static-search');
if(catalogForm){const inp=catalogForm.querySelector('input');function search(){let term=(inp.value||'').trim().toLowerCase(),count=0;qa('.static-grid>[data-drama-title]').forEach(c=>{c.hidden=!((c.dataset.dramaTitle+' '+(c.dataset.tags||'')).toLowerCase().includes(term));if(!c.hidden)count++;});let empty=q('.empty-result');if(empty)empty.style.display=count?'none':'block';fit();}
catalogForm.addEventListener('submit',ev=>{ev.preventDefault();history.replaceState(null,'','?q='+encodeURIComponent(inp.value));search();});inp.addEventListener('input',search);search();}
const searchPage=q('.SearchScreen_page__EuL_t');
if(searchPage){
  let box=q('#search-results');
  if(!box){box=document.createElement('div');box.id='search-results';box.className='search-results-grid';searchPage.appendChild(box);}
  const empty=q('.empty-result')||(()=>{const p=document.createElement('p');p.className='empty-result';p.textContent='未找到匹配剧目，请尝试其他关键词。';searchPage.appendChild(p);return p;})();
  const panel=q('.SearchScreen_panel__8arRx');
  function render(list){box.innerHTML=list.map(d=>'<a class="CategoryCardGrid_cardLandscape__SY_jR" href="/shows/'+d.id+'/index.html" data-drama-title="'+esc(d.title)+'" aria-label="'+esc(d.title)+'"><img class="CategoryCardGrid_cover__dmE4I" src="'+(d.cover||FALLBACK)+'" alt="'+esc(d.title)+'" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=\''+FALLBACK+'\'"><span class="CategoryCardGrid_badges__N05_r"><span class="CategoryCardGrid_badgeDone__pz2N6">'+esc(d.episode_label||d.status||'')+'</span></span><span class="CategoryCardGrid_shade__94EWI"><span class="CategoryCardGrid_title__CB6Sh">'+esc(d.title)+'</span><span class="CategoryCardGrid_stats__ccVLj">▷ '+(d.views??'—')+'　♡ '+(d.likes??'—')+'</span></span></a>').join('');empty.style.display=list.length?'none':'block';if(panel)panel.style.display=q0||list.length? 'none':'';fit();}
  function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  fetch('/data/dramas.json').then(r=>r.json()).then(all=>{
    window.__DRAMAS=all;
    const form=q('.SearchScreen_searchBar__t_NiC')||q('form[action*="search"]');
    function run(term){term=(term||'').trim().toLowerCase();const list=term?all.filter(d=>((d.title||'')+' '+(d.description||'')+' '+(d.tags||[]).join(' ')).toLowerCase().includes(term)):all.slice(0,24);if(!term){render([]);if(panel)panel.style.display='';empty.style.display='none';box.innerHTML='';fit();return;}render(list);}
    if(form){form.addEventListener('submit',ev=>{ev.preventDefault();const inp=form.querySelector('input[name=q],input[type=search]');const term=inp?inp.value:'';history.replaceState(null,'','?q='+encodeURIComponent(term));run(term);});}
    qa('.SearchScreen_chips___ZXpe a, .SearchScreen_hotChips__DaOEk a, [data-search-chip]').forEach(a=>{a.addEventListener('click',ev=>{ev.preventDefault();const term=a.dataset.searchChip||a.textContent.trim();qa('input[name=q],input[type=search]').forEach(i=>i.value=term);history.replaceState(null,'','?q='+encodeURIComponent(term));run(term);});});
    run(q0);
  }).catch(()=>{empty.style.display='block';empty.textContent='搜索数据暂时无法载入，请前往全部漫剧页浏览。';});
}
})();