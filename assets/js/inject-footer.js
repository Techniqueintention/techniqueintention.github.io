/* assets/js/inject-footer.js */

(async function(){
  const el = document.getElementById('site-footer');
  if (!el) return;
  const url = el.dataset.partial;
  try{
    const html = await (await fetch(url, {cache:'no-store'})).text();
    el.innerHTML = html;
  }catch(e){ el.textContent = ''; }
})();
