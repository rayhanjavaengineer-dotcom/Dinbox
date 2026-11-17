(function(){
 const labels={
 bn:{home:"হোম",planner:"দৈনিক পরিকল্পনা",student:"স্টুডেন্ট জোন",business:"ব্যবসা",finance:"আমার হিসাব",bazar:"বাজার তালিকা",bills:"বিল ম্যানেজার",documents:"ডকুমেন্ট ভল্ট",career:"ক্যারিয়ার",calculator:"ক্যালকুলেটর",family:"পরিবার",settings:"সেটিংস ও ব্যাকআপ"},
 en:{home:"Home",planner:"Daily Planner",student:"Student Zone",business:"Business Desk",finance:"My Finance",bazar:"Smart Bazar",bills:"Bill Manager",documents:"Document Vault",career:"Career Desk",calculator:"Calculator",family:"Family Desk",settings:"Settings & Backup"}
 };
 window.DinboxLanguage={
 current(){return DinboxStore.all().settings.language||"bn";},
 toggle(){const next=this.current()==="bn"?"en":"bn";DinboxStore.setting("language",next);this.apply();window.Dinbox?.render();},
 apply(){const lang=this.current();document.documentElement.lang=lang;document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(labels[lang][k])el.textContent=labels[lang][k];});const b=document.getElementById("languageButton");if(b)b.textContent=lang==="bn"?"বাংলা":"English";}
 };
})();