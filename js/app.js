(function(){
 const $=s=>document.querySelector(s);
 const bnNum=n=>new Intl.NumberFormat(DinboxLanguage.current()==="bn"?"bn-BD":"en-US",{maximumFractionDigits:2}).format(Number(n)||0);
 const pageNames=DinboxRouter.titles;
 const modulePages=["planner","student","business","finance","bazar","bills","documents","career","family"];
 const pageContainer=$("#pageContainer");
 window.Dinbox={
  money(n){return "৳"+bnNum(n);},
  escape(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));},
  toast(msg,type=""){const el=document.createElement("div");el.className="toast "+type;el.textContent=msg;$("#toastRegion").append(el);setTimeout(()=>el.remove(),2800);},
  render(){const page=DinboxRouter.current();$("#currentPageTitle").textContent=pageNames[page]||"হোম";document.querySelectorAll(".nav-link").forEach(a=>a.classList.toggle("active",a.dataset.page===page));
    if(page==="home")pageContainer.innerHTML=DinboxDashboard.render();
    else if(page==="calculator")pageContainer.innerHTML=DinboxCalculator.render();
    else if(page==="settings")pageContainer.innerHTML=DinboxBackup.render();
    else if(modulePages.includes(page))pageContainer.innerHTML=DinboxModules.render(page);
    else pageContainer.innerHTML=DinboxDashboard.render();
    this.bindPage();DinboxLanguage.apply();DinboxTheme.apply();pageContainer.focus({preventScroll:true});
  },
  bindPage(){
    pageContainer.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>DinboxRouter.go(b.dataset.page)));
    pageContainer.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>this.openAdd(b.dataset.add)));
    pageContainer.querySelectorAll("[data-delete]").forEach(b=>b.addEventListener("click",()=>{const [key,id]=b.dataset.delete.split(":");if(confirm("এই রেকর্ডটি মুছে ফেলবেন?")){DinboxStore.remove(key,id);this.toast("রেকর্ড মুছে ফেলা হয়েছে");this.render();}}));
    pageContainer.querySelectorAll("[data-toggle-task]").forEach(b=>b.addEventListener("click",()=>{const id=b.dataset.toggleTask,x=DinboxStore.get("tasks").find(x=>x.id===id);if(x){DinboxStore.update("tasks",id,{done:!x.done});this.render();}}));
    pageContainer.querySelectorAll("[data-calc]").forEach(b=>b.addEventListener("click",()=>this.calculate(b.dataset.calc)));
    this.bindSettings();
  },
  openAdd(key){
    const cfg=Object.values(DinboxModules.configs).find(c=>c.key===key);
    const fields=cfg?cfg.fields:(key==="expenses"?DinboxModules.configs.finance.fields:key==="sales"?DinboxModules.configs.business.fields:key==="shopping"?DinboxModules.configs.bazar.fields:null);
    if(!fields)return;
    const dialog=$("#recordDialog"),box=$("#formFields");$("#formTitle").textContent=cfg?.add||({expenses:"খরচ যোগ করুন",sales:"বিক্রি যোগ করুন",shopping:"বাজারের পণ্য যোগ"}[key]||"তথ্য যোগ করুন");
    box.innerHTML=fields.filter(f=>f[0]!=="done").map(f=>{const [name,label,type,required,options]=f;let input="";
      if(type==="textarea")input=`<textarea name="${name}" placeholder="${label}"></textarea>`;
      else if(type==="select")input=`<select name="${name}">${(options||[]).map(o=>`<option>${this.escape(o)}</option>`).join("")}</select>`;
      else input=`<input name="${name}" type="${type}" ${required?"required":""} ${type==="number"?'min="0" step="0.01"':""} ${type==="date"?`value="${new Date().toISOString().slice(0,10)}"`:""} placeholder="${label}">`;
      return `<div class="field"><label>${label}${required?" *":""}</label>${input}</div>`;
    }).join("");
    dialog.dataset.key=key;dialog.showModal();
  },
  calculate(type){const val=id=>Math.max(0,Number($("#"+id)?.value)||0);let out="";
    if(type==="discount"){const p=val("calcPrice"),r=Math.min(100,val("calcPercent"));out=`ছাড়ের পর মূল্য: ${this.money(p*(1-r/100))} (ছাড় ${this.money(p*r/100)})`;$("#discountResult").textContent=out;}
    if(type==="profit"){const b=val("buyPrice"),s=val("sellPrice"),d=s-b;out=`${d>=0?"লাভ":"ক্ষতি"}: ${this.money(Math.abs(d))} (${b?bnNum(Math.abs(d)/b*100)+"%":"—"})`;$("#profitResult").textContent=out;}
    if(type==="vat"){const b=val("vatBase"),r=val("vatRate");$("#vatResult").textContent=`ভ্যাটসহ মোট: ${this.money(b*(1+r/100))} (ভ্যাট ${this.money(b*r/100)})`;}
    if(type==="saving"){const g=val("goalAmount"),m=Math.max(1,val("goalMonths"));$("#savingResult").textContent=`মাসে জমাতে হবে: ${this.money(g/m)}`;}
  },
  download(content,name,type){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);this.toast("ফাইল ডাউনলোড শুরু হয়েছে");},
  search(query){const q=query.trim().toLocaleLowerCase();if(!q)return[];const pages=Object.entries(DinboxRouter.titles).filter(([k,v])=>(k+" "+v).toLocaleLowerCase().includes(q)).map(([k,v])=>({page:k,title:v,sub:"বিভাগ খুলুন"}));const d=DinboxStore.all(),records=[];Object.keys(d).filter(k=>Array.isArray(d[k])).forEach(k=>d[k].forEach(x=>{const title=x.title||x.name||x.item||"রেকর্ড",hay=[title,x.note,x.category,x.date].join(" ").toLocaleLowerCase();if(hay.includes(q))records.push({page:k==="tasks"?"planner":k==="expenses"?"finance":k==="sales"?"business":k==="shopping"?"bazar":k==="study"?"student":k,title,sub:[x.date,x.category,x.amount?Dinbox.money(x.amount):""].filter(Boolean).join(" · ")} );}));return [...pages,...records].slice(0,12);},
  showSearch(){const input=$("#globalSearch"),box=$("#searchResults"),items=this.search(input.value);if(!input.value.trim()){box.hidden=true;return;}box.innerHTML=items.length?items.map(x=>`<button class="search-result" role="option" data-search-page="${x.page}"><strong>${this.escape(x.title)}</strong><small>${this.escape(x.sub)}</small></button>`).join(""):`<div class="search-empty">কোনো ফলাফল পাওয়া যায়নি</div>`;box.hidden=false;box.querySelectorAll("[data-search-page]").forEach(b=>b.addEventListener("click",()=>{location.hash=b.dataset.searchPage;input.value="";box.hidden=true;}));}
  ,bindSettings(){
    $("#settingsLanguage")?.addEventListener("click",()=>DinboxLanguage.toggle());
    $("#themeMode")?.addEventListener("change",e=>{DinboxTheme.setMode(e.target.value);this.render();});
    $("#themePalette")?.addEventListener("change",e=>{DinboxTheme.setPalette(e.target.value);this.render();});
    $("#saveProfile")?.addEventListener("click",()=>{DinboxStore.setting("profileName",$("#profileInput").value.trim()||"আমার DINBOX");DinboxStore.setting("favorites",Array.from(document.querySelectorAll('input[name="favoritePage"]:checked')).map(x=>x.value));$("#profileName").textContent=DinboxStore.all().settings.profileName;this.toast("পছন্দ সংরক্ষিত");this.render();});
    $("#exportData")?.addEventListener("click",()=>this.download(DinboxStore.export(),"dinbox-backup-"+new Date().toISOString().slice(0,10)+".json","application/json"));
    $("#exportCsv")?.addEventListener("click",()=>{const d=DinboxStore.all(),rows=[["Module","Title","Date","Category","Amount","Note"]];Object.keys(d).filter(k=>Array.isArray(d[k])).forEach(k=>d[k].forEach(x=>rows.push([k,x.title||x.name||x.item||"",x.date||"",x.category||"",x.amount??"",x.note||""])));const csv="\uFEFF"+rows.map(r=>r.map(v=>'"'+String(v??"").replace(/"/g,'""')+'"').join(",")).join("\r\n");this.download(csv,"dinbox-records-"+new Date().toISOString().slice(0,10)+".csv","text/csv;charset=utf-8");});
    $("#importFile")?.addEventListener("change",async e=>{const file=e.target.files[0];if(!file)return;try{const backup=JSON.parse(await file.text());if(!backup||backup.app!=="DINBOX"||!backup.data||typeof backup.data!=="object"||Array.isArray(backup.data))throw new Error("ব্যাকআপ ফাইলের গঠন সঠিক নয়");if(!confirm("Backup Restore করলে বর্তমান DINBOX ডেটা প্রতিস্থাপিত হবে। চালিয়ে যাবেন?"))return;DinboxStore.import(backup);this.toast("ব্যাকআপ ইমপোর্ট হয়েছে");this.render();}catch(err){this.toast(err.message||"ফাইল পড়া যায়নি","error");}e.target.value="";});
    $("#clearData")?.addEventListener("click",()=>{if(confirm("সতর্কতা: সব স্থানীয় DINBOX তথ্য স্থায়ীভাবে মুছে যাবে। আগে ব্যাকআপ নিয়েছেন?")&&confirm("নিশ্চিতভাবে সব তথ্য মুছবেন?")){DinboxStore.clear();this.toast("স্থানীয় তথ্য মুছে ফেলা হয়েছে");this.render();}});
  }
 };
 $("#recordForm").addEventListener("submit",e=>{e.preventDefault();const form=e.currentTarget,key=$("#recordDialog").dataset.key,fd=new FormData(form),item={};for(const [k,v] of fd.entries())item[k]=v;if(!item.date)item.date=new Date().toISOString().slice(0,10);if(item.amount!==undefined)item.amount=Number(item.amount)||0;DinboxStore.add(key,item);$("#recordDialog").close();form.reset();Dinbox.toast("তথ্য সফলভাবে সংরক্ষিত হয়েছে");Dinbox.render();});
 $("#menuButton").addEventListener("click",()=>{$("#sidebar").classList.add("open");$("#sidebarOverlay").classList.add("show");});
 function closeMenu(){$("#sidebar").classList.remove("open");$("#sidebarOverlay").classList.remove("show");}
 $("#closeSidebar").addEventListener("click",closeMenu);$("#sidebarOverlay").addEventListener("click",closeMenu);
 document.querySelectorAll(".sidebar [data-page]").forEach(a=>a.addEventListener("click",closeMenu));
 $("#themeButton").addEventListener("click",()=>{DinboxTheme.toggle();});
 $("#languageButton").addEventListener("click",()=>DinboxLanguage.toggle());
 const searchInput=$("#globalSearch"),searchBox=$("#searchResults");searchInput.addEventListener("input",()=>Dinbox.showSearch());searchInput.addEventListener("keydown",e=>{if(e.key==="Escape"){searchInput.value="";searchBox.hidden=true;}if(e.key==="Enter"){const first=searchBox.querySelector("[data-search-page]");first?.click();}});document.addEventListener("click",e=>{if(!e.target.closest(".global-search-wrap")&&!e.target.closest(".search-results"))searchBox.hidden=true;});document.addEventListener("keydown",e=>{if(e.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();searchInput.focus();}});
 function connection(){const el=$("#connectionLabel");if(el)el.textContent=navigator.onLine?"অনলাইন":"অফলাইন";}window.addEventListener("online",connection);window.addEventListener("offline",connection);connection();
 window.addEventListener("hashchange",()=>{Dinbox.render();closeMenu();});
 window.addEventListener("DOMContentLoaded",()=>{});
 $("#year").textContent=new Date().getFullYear();
 DinboxTheme.apply();DinboxLanguage.apply();$("#profileName").textContent=DinboxStore.all().settings.profileName||"আমার DINBOX";Dinbox.render();
 if("serviceWorker" in navigator && location.protocol==="https:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js",{scope:"./"}).then(reg=>console.info("DINBOX SW ready",reg.scope)).catch(err=>console.error("DINBOX SW registration failed",err)));}
})();