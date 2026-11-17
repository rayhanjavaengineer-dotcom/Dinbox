/* DINBOX local data store: all records stay in this browser. */
(function(){
  const KEY="dinbox_data_v1";
  const empty={tasks:[],expenses:[],sales:[],shopping:[],study:[],business:[],bills:[],documents:[],career:[],family:[],settings:{language:"bn",theme:"light",profileName:"আমার DINBOX"}};
  function clone(v){return JSON.parse(JSON.stringify(v));}
  function read(){try{const raw=localStorage.getItem(KEY);if(!raw)return clone(empty);const d=JSON.parse(raw);return {...clone(empty),...d,settings:{...empty.settings,...(d.settings||{})}};}catch(e){return clone(empty);}}
  let data=read();
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(data));return true;}catch(e){window.Dinbox?.toast("স্টোরেজ পূর্ণ বা অনুপলব্ধ। ব্যাকআপ নিন।","error");return false;}}
  const api={
    all(){return clone(data);},
    get(key){return clone(data[key]||[]);},
    add(key,item){if(!Array.isArray(data[key]))data[key]=[];const record={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),createdAt:new Date().toISOString(),...item};data[key].unshift(record);persist();return clone(record);},
    update(key,id,patch){const i=(data[key]||[]).findIndex(x=>x.id===id);if(i<0)return false;data[key][i]={...data[key][i],...patch,updatedAt:new Date().toISOString()};persist();return true;},
    remove(key,id){data[key]=(data[key]||[]).filter(x=>x.id!==id);persist();},
    setting(key,value){data.settings[key]=value;persist();},
    export(){return JSON.stringify({app:"DINBOX",version:1,exportedAt:new Date().toISOString(),data},null,2);},
    import(obj){if(!obj||obj.app!=="DINBOX"||!obj.data||typeof obj.data!=="object")throw new Error("এটি বৈধ DINBOX ব্যাকআপ নয়");data={...clone(empty),...obj.data,settings:{...empty.settings,...(obj.data.settings||{})}};persist();},
    clear(){data=clone(empty);persist();}
  };
  window.DinboxStore=api;
})();