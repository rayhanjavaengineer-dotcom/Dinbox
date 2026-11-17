(function(){
 window.DinboxTheme={
 current(){return DinboxStore.all().settings.theme||"light";},
 apply(){document.body.classList.toggle("dark",this.current()==="dark");},
 toggle(){const next=this.current()==="dark"?"light":"dark";DinboxStore.setting("theme",next);this.apply();}
 };
})();