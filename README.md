# DINBOX 2.0 — Premium Upgrade

**আপনার প্রতিদিনের ডিজিটাল সঙ্গী।**

DINBOX হলো বাংলাদেশি ব্যবহারকারীদের জন্য বাংলা-প্রধান, offline-first ব্যক্তিগত ড্যাশবোর্ড। এতে দৈনিক পরিকল্পনা, শিক্ষার্থী, ব্যবসা, আয়-ব্যয়, বাজার, বিল, ডকুমেন্ট রিমাইন্ডার, ক্যারিয়ার, ক্যালকুলেটর ও পরিবার-সংক্রান্ত স্থানীয় রেকর্ড রাখা যায়।

## বৈশিষ্ট্য
- বাংলা / English interface toggle
- Light / Dark / System theme এবং Green / Blue / Purple / Gold palette
- Global Search: বিভাগ ও নিজের সংরক্ষিত রেকর্ড খোঁজা
- Favourite workspace shortcuts
- CSV export এবং যাচাইকৃত JSON backup restore
- Online / Offline status indicator
- Daily planner এবং task completion
- Student, business, finance, bazar, bills, documents, career ও family records
- Discount, profit/loss, VAT এবং savings calculator
- JSON backup export/import
- Local browser storage; কোনো account বা backend প্রয়োজন নেই
- PWA manifest ও service worker offline shell caching
- Responsive mobile, tablet ও desktop layout

## GitHub Pages-এ প্রকাশ
1. এই ZIP-এর ভেতরের সব ফাইল ও ফোল্ডার repository-র root-এ upload করুন (Dinbox নামের parent folder নয়)।
2. GitHub repository → **Settings → Pages**।
3. **Deploy from a branch** নির্বাচন করুন।
4. Branch `main`, folder `/ (root)` নির্বাচন করে Save করুন।
5. প্রকাশিত URL খুলে পরীক্ষা করুন। Service worker এবং installable PWA চালাতে HTTPS (GitHub Pages) প্রয়োজন।

## লোকাল পরীক্ষা
`index.html` সরাসরি `file://` দিয়ে খুললে কিছু PWA সুবিধা কাজ করবে না। স্থানীয় HTTP server ব্যবহার করুন, যেমন:
- Python: `python -m http.server 8000`
- তারপর `http://localhost:8000` খুলুন।

## ডেটা ও গোপনীয়তা
DINBOX-এর রেকর্ড একই ব্রাউজারের localStorage-এ থাকে। বিদ্যমান `dinbox_data_v1` storage key অপরিবর্তিত রাখা হয়েছে। কোনো সার্ভারে পাঠানো হয় না। Browser data মুছে গেলে রেকর্ড হারাতে পারে—নিয়মিত Settings থেকে JSON backup export করুন। Import করলে বর্তমান ডেটা প্রতিস্থাপিত হয়।

**গুরুত্বপূর্ণ:** Document Vault কেবল ডকুমেন্টের নাম/তারিখ/সাধারণ নোট রাখার জন্য। NID নম্বর, পাসওয়ার্ড, ব্যাংক/কার্ড তথ্য বা সংবেদনশীল নথির ছবি সংরক্ষণ করবেন না। এটি encrypted vault নয়। VAT calculator-এ নিজের ক্ষেত্রে প্রযোজ্য হার যাচাই করে ব্যবহার করুন।

## সীমাবদ্ধতা
- কোনো cloud sync, multi-user login বা shared database নেই।
- Global Search, theme, favorites, backup ও export স্থানীয়ভাবে কাজ করে।
- Browser বন্ধ থাকলে নির্ভরযোগ্য scheduled push reminder নিশ্চিত নয়।
- Live government data, live market prices, SMS বা server push notifications নেই।
- Android/Desktop-এ PWA install করা যায় supported browser-এ; এটি native APK বা Play Store app নয়।
- Google Fonts ব্যবহারের কারণে প্রথমবার ইন্টারনেট থাকলে ফন্ট ভালোভাবে লোড হবে; পরে fallback font থাকবে।

## লাইসেন্স
এই প্রাথমিক সংস্করণে আলাদা open-source license যোগ করা হয়নি। ব্যবহারের আগে নিজের প্রয়োজন অনুযায়ী লাইসেন্স নির্বাচন করুন।
