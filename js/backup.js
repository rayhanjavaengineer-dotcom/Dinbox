(function(){
 window.DinboxBackup={
 render(){return `<div class="toolbar"><div><h1>সেটিংস ও ব্যাকআপ</h1><p>ভাষা, থিম ও নিজের তথ্য নিয়ন্ত্রণ করুন।</p></div></div>
 <div class="settings-grid">
 <section class="panel"><h3>ব্যক্তিগত পছন্দ</h3><div class="form-fields" style="margin-top:14px"><div class="field"><label for="profileInput">প্রোফাইল নাম</label><input id="profileInput" maxlength="40" value="${Dinbox.escape(DinboxStore.all().settings.profileName||"আমার DINBOX")}"></div><div class="field"><label>ভাষা</label><button class="btn btn-ghost" id="settingsLanguage">${DinboxLanguage.current()==="bn"?"বাংলা":"English"}</button></div><div class="field"><label>থিম</label><button class="btn btn-ghost" id="settingsTheme">${DinboxTheme.current()==="dark"?"Dark":"Light"}</button></div><button class="btn btn-primary" id="saveProfile">নাম সংরক্ষণ</button></div></section>
 <section class="panel"><h3>ডেটা ব্যাকআপ</h3><p>আপনার সব DINBOX রেকর্ড JSON ফাইলে ডাউনলোড করুন।</p><div class="setting-action"><button class="btn btn-primary" id="exportData">ব্যাকআপ ডাউনলোড</button><label class="btn btn-ghost" for="importFile">ব্যাকআপ ইমপোর্ট</label><input id="importFile" type="file" accept=".json,application/json" hidden></div><p class="footer-note">নতুন ব্যাকআপ ইমপোর্ট করলে বর্তমান ডেটা প্রতিস্থাপিত হবে। আগে Export করে রাখুন।</p></section>
 <section class="panel"><h3>ডেটা ও গোপনীয়তা</h3><p>আপনার রেকর্ড এই ব্রাউজারের Local Storage-এ থাকে। DINBOX কোনো সার্ভারে পাঠায় না।</p><div class="setting-action"><button class="btn btn-danger" id="clearData">সব স্থানীয় ডেটা মুছুন</button></div></section>
 <section class="panel"><h3>গুরুত্বপূর্ণ সতর্কতা</h3><div class="notice">NID নম্বর, পাসওয়ার্ড, ব্যাংক/কার্ড তথ্য বা সংবেদনশীল ডকুমেন্টের ছবি সংরক্ষণ করবেন না। এটি এনক্রিপ্টেড পাসওয়ার্ড ম্যানেজার বা ক্লাউড ভল্ট নয়। একই ডিভাইস/ব্রাউজারে তথ্য পাওয়া যাবে।</div></section>
 </div>`;}
 };
})();