(function(){
 const palettes=["green","blue","purple","gold"];
 window.DinboxTheme={
  current(){return DinboxStore.all().settings.theme||"light";},
  palette(){const p=DinboxStore.all().settings.palette||"green";return palettes.includes(p)?p:"green";},
  apply(){const mode=this.current();const dark=mode==="dark"||(mode==="system"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.body.classList.toggle("dark",!!dark);document.body.dataset.palette=this.palette();},
  toggle(){const next=this.current()==="dark"?"light":"dark";DinboxStore.setting("theme",next);this.apply();},
  setMode(mode){if(!["light","dark","system"].includes(mode))return;DinboxStore.setting("theme",mode);this.apply();},
  setPalette(p){if(!palettes.includes(p))return;DinboxStore.setting("palette",p);this.apply();}
 };
 if(window.matchMedia){window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change",()=>{if(DinboxTheme.current()==="system")DinboxTheme.apply();});}
})();