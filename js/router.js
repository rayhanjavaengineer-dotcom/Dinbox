(function(){
 const titles={home:"হোম",planner:"দৈনিক পরিকল্পনা",student:"স্টুডেন্ট জোন",business:"ব্যবসা",finance:"আমার হিসাব",bazar:"বাজার তালিকা",bills:"বিল ম্যানেজার",documents:"ডকুমেন্ট ভল্ট",career:"ক্যারিয়ার",calculator:"ক্যালকুলেটর",family:"পরিবার",settings:"সেটিংস ও ব্যাকআপ"};
 window.DinboxRouter={titles,current(){const p=location.hash.replace("#","");return titles[p]?p:"home";},go(p){location.hash=p;}};
})();