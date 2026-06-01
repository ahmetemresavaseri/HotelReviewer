/* ===== Amara Comfort Resort — Review subpage i18n + interaction ===== */
(function(){
  "use strict";

  const AREAS = ["a_overall","a_room","a_service","a_food","a_beach","a_value","a_spa","a_location"];

  /* ===== Backend (Google Sheet via Apps Script) =====
     Hier die Web-App-URL eintragen, die ihr beim "Bereitstellen" des Apps
     Scripts bekommt (Anleitung in BACKEND.md). Bleibt sie leer, wird die
     Bewertung nur lokal angezeigt und NICHT gespeichert. */
  const ENDPOINT = "";

  const I18N = {
    de:{
      _name:"Deutsch",
      nav_home:"Startseite", nav_rooms:"Zimmer", nav_gallery:"Galerie", nav_contact:"Kontakt",
      reserve:"Reservierung",
      heading:"Ihre Erfahrung",
      intro:"Wir würden uns sehr freuen, von Ihrem Aufenthalt zu hören. Ihre Bewertung hilft uns, Amara Comfort noch besser zu machen.",
      start_intro:"Bevor Sie Ihren Aufenthalt bewerten, erzählen Sie uns bitte kurz etwas über sich.",
      intro_continue:"Weiter zur Bewertung",
      f_name_req:"Bitte geben Sie Ihren Namen ein.",
      field_required:"Bitte füllen Sie dieses Feld aus.",
      hello:"Schön, Sie zu sehen,",
      ratings_title:"Wie war Ihr Aufenthalt?",
      ratings_sub:"Bitte bewerten Sie die folgenden Bereiche.",
      a_overall:"Gesamteindruck", a_room:"Zimmer & Sauberkeit", a_service:"Service & Personal",
      a_food:"Essen & Getränke", a_beach:"Strand & Pool", a_value:"Preis-Leistung",
      a_spa:"Spa & Wellness", a_location:"Lage",
      guest_title:"Über Ihren Aufenthalt",
      f_name:"Name", f_room:"Zimmernummer", f_birthyear:"Geburtsjahr",
      ph_name:"Ihr Name", ph_room:"z. B. 412", ph_birthyear:"z. B. 1985",
      feedback_title:"Weiteres Feedback",
      ph_feedback:"Möchten Sie uns noch etwas mitteilen?",
      submit:"Bewertung absenden",
      score_label:"Ihre Bewertung", not_rated:"Noch nicht bewertet",
      thanks_title:"Vielen Dank!",
      thanks_text:"Ihre Bewertung wurde übermittelt. Wir freuen uns, Sie schon bald wieder bei Amara Comfort begrüßen zu dürfen.",
      google_lead:"Es freut uns sehr, dass Ihnen Ihr Aufenthalt gefallen hat! Würden Sie Ihre Erfahrung auch auf Google teilen? Das hilft anderen Gästen bei ihrer Wahl.",
      google_btn:"Auf Google bewerten",
      thanks_back:"Neue Bewertung"
    },
    en:{
      _name:"English",
      nav_home:"Home", nav_rooms:"Rooms", nav_gallery:"Gallery", nav_contact:"Contact",
      reserve:"Reservation",
      heading:"Your Experience",
      intro:"We'd love to hear about your stay. Your review helps us make Amara Comfort even better.",
      start_intro:"Before you rate your stay, please tell us a little about yourself.",
      intro_continue:"Continue to review",
      f_name_req:"Please enter your name.",
      field_required:"Please fill in this field.",
      hello:"Lovely to see you,",
      ratings_title:"How was your stay?",
      ratings_sub:"Please rate the following areas.",
      a_overall:"Overall", a_room:"Room & Cleanliness", a_service:"Service & Staff",
      a_food:"Food & Drinks", a_beach:"Beach & Pool", a_value:"Value for Money",
      a_spa:"Spa & Wellness", a_location:"Location",
      guest_title:"About your stay",
      f_name:"Name", f_room:"Room number", f_birthyear:"Year of birth",
      ph_name:"Your name", ph_room:"e.g. 412", ph_birthyear:"e.g. 1985",
      feedback_title:"Further feedback",
      ph_feedback:"Anything else you'd like to share with us?",
      submit:"Submit review",
      score_label:"Your rating", not_rated:"Not rated yet",
      thanks_title:"Thank you!",
      thanks_text:"Your review has been submitted. We look forward to welcoming you back to Amara Comfort very soon.",
      google_lead:"We're so glad you enjoyed your stay! Would you share your experience on Google too? It helps other guests choose with confidence.",
      google_btn:"Review us on Google",
      thanks_back:"New review"
    },
    tr:{
      _name:"Türkçe",
      nav_home:"Anasayfa", nav_rooms:"Odalar", nav_gallery:"Galeri", nav_contact:"İletişim",
      reserve:"Rezervasyon",
      heading:"Deneyiminiz",
      intro:"Konaklamanız hakkındaki görüşlerinizi duymak isteriz. Değerlendirmeniz, Amara Comfort'u daha da iyi yapmamıza yardımcı olur.",
      start_intro:"Konaklamanızı değerlendirmeden önce, lütfen bize kısaca kendinizden bahsedin.",
      intro_continue:"Değerlendirmeye devam et",
      f_name_req:"Lütfen adınızı girin.",
      field_required:"Lütfen bu alanı doldurun.",
      hello:"Sizi görmek güzel,",
      ratings_title:"Konaklamanız nasıldı?",
      ratings_sub:"Lütfen aşağıdaki alanları değerlendirin.",
      a_overall:"Genel İzlenim", a_room:"Oda & Temizlik", a_service:"Servis & Personel",
      a_food:"Yiyecek & İçecek", a_beach:"Plaj & Havuz", a_value:"Fiyat-Performans",
      a_spa:"Spa & Wellness", a_location:"Konum",
      guest_title:"Konaklamanız hakkında",
      f_name:"İsim", f_room:"Oda numarası", f_birthyear:"Doğum yılı",
      ph_name:"Adınız", ph_room:"örn. 412", ph_birthyear:"örn. 1985",
      feedback_title:"Diğer geri bildirim",
      ph_feedback:"Bizimle paylaşmak istediğiniz başka bir şey var mı?",
      submit:"Değerlendirmeyi gönder",
      score_label:"Değerlendirmeniz", not_rated:"Henüz değerlendirilmedi",
      thanks_title:"Teşekkürler!",
      thanks_text:"Değerlendirmeniz alınmıştır. Sizi çok yakında yeniden Amara Comfort'ta ağırlamaktan mutluluk duyarız.",
      google_lead:"Konaklamanızdan memnun kaldığınıza çok sevindik! Deneyiminizi Google'da da paylaşır mısınız? Bu, diğer misafirlerin seçim yapmasına yardımcı olur.",
      google_btn:"Google'da değerlendir",
      thanks_back:"Yeni değerlendirme"
    },
    ru:{
      _name:"Русский",
      nav_home:"Главная", nav_rooms:"Номера", nav_gallery:"Галерея", nav_contact:"Контакты",
      reserve:"Бронирование",
      heading:"Ваши впечатления",
      intro:"Нам будет приятно узнать о вашем отдыхе. Ваш отзыв помогает нам делать Amara Comfort ещё лучше.",
      start_intro:"Прежде чем оценить ваш отдых, пожалуйста, расскажите немного о себе.",
      intro_continue:"Перейти к оценке",
      f_name_req:"Пожалуйста, введите ваше имя.",
      field_required:"Пожалуйста, заполните это поле.",
      hello:"Рады вас видеть,",
      ratings_title:"Как прошёл ваш отдых?",
      ratings_sub:"Пожалуйста, оцените следующие категории.",
      a_overall:"Общее впечатление", a_room:"Номер и чистота", a_service:"Сервис и персонал",
      a_food:"Еда и напитки", a_beach:"Пляж и бассейн", a_value:"Цена и качество",
      a_spa:"Спа и велнес", a_location:"Расположение",
      guest_title:"О вашем отдыхе",
      f_name:"Имя", f_room:"Номер комнаты", f_birthyear:"Год рождения",
      ph_name:"Ваше имя", ph_room:"напр. 412", ph_birthyear:"напр. 1985",
      feedback_title:"Дополнительный отзыв",
      ph_feedback:"Хотите рассказать нам что-то ещё?",
      submit:"Отправить отзыв",
      score_label:"Ваша оценка", not_rated:"Ещё не оценено",
      thanks_title:"Спасибо!",
      thanks_text:"Ваш отзыв отправлен. Будем рады снова видеть вас в Amara Comfort в ближайшее время.",
      google_lead:"Мы очень рады, что вам понравился отдых! Не могли бы вы поделиться впечатлениями и на Google? Это помогает другим гостям с выбором.",
      google_btn:"Оценить на Google",
      thanks_back:"Новый отзыв"
    }
  };

  const LANGS = ["tr","en","de","ru"];
  const ratings = {};

  // Ab diesem Schnitt (Durchschnitt der bewerteten Bereiche) bitten wir
  // den Gast, die Bewertung zusätzlich auf Google zu hinterlassen.
  const GOOGLE_THRESHOLD = 4.5;

  // Web-App-URL des Google Apps Script (endet auf /exec). Hier eintragen:
  const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbwlkJ0ysoD5v6AWdefQuOOO4TLUkt7dWgVbTRGCNlvIeumpoUgb0jR3YkOi6THwlpE/exec";

  // Schickt die Bewertung ans Google Sheet. "Fire and forget" – die Danke-Seite
  // wird unabhängig vom Ergebnis angezeigt, damit der Gast nie hängen bleibt.
  function sendToSheet(){
    if(SHEET_ENDPOINT.indexOf("DEINE_DEPLOY_ID")!==-1) return; // noch nicht konfiguriert
    let guest={};
    try{ guest=JSON.parse(localStorage.getItem("amara_guest")||"{}"); }catch(e){}
    const fb=document.querySelector("form.review-form [name=feedback]");
    const payload={
      submitted_at:new Date().toISOString(),
      name:guest.name||"", room:guest.room||"", birthyear:guest.birthyear||"",
      lang:current(), average:avgScore().toFixed(2),
      feedback:(fb&&fb.value)||""
    };
    AREAS.forEach(a=>{ payload[a]=ratings[a]||0; });
    const body=new URLSearchParams(payload);
    fetch(SHEET_ENDPOINT,{method:"POST",mode:"no-cors",body:body})
      .catch(function(err){ console.error("Sheet-Send fehlgeschlagen:",err); });
  }

  function t(lang,key){ return (I18N[lang]&&I18N[lang][key])||I18N.en[key]||key; }

  function buildStars(){
    document.querySelectorAll(".stars[data-area]").forEach(function(box){
      if(box.dataset.built) return;
      box.dataset.built="1";
      const area=box.dataset.area;
      ratings[area]=0;
      for(let i=1;i<=5;i++){
        const s=document.createElement("span");
        s.className="star"; s.textContent="★"; s.dataset.v=i;
        s.setAttribute("role","button");
        s.addEventListener("mouseenter",function(){ paint(box,i,true); });
        s.addEventListener("click",function(){
          ratings[area]=i; paint(box,i,false); updateScore();
        });
        box.appendChild(s);
      }
      box.addEventListener("mouseleave",function(){ paint(box,ratings[area],false); });
    });
  }

  function paint(box,val,preview){
    box.querySelectorAll(".star").forEach(function(s){
      const v=+s.dataset.v;
      s.classList.remove("on","preview");
      if(v<=val) s.classList.add(preview?"preview":"on");
    });
  }

  function avgScore(){
    const vals=AREAS.map(a=>ratings[a]).filter(v=>v>0);
    return vals.length?(vals.reduce((a,b)=>a+b,0)/vals.length):0;
  }

  function updateScore(){
    const avg=avgScore();
    document.querySelectorAll("[data-score-value]").forEach(function(el){
      el.textContent=avg?avg.toFixed(1):"–";
    });
    document.querySelectorAll("[data-score-stars]").forEach(function(box){
      box.querySelectorAll(".star").forEach(function(s){
        const v=+s.dataset.v; s.classList.toggle("on",v<=Math.round(avg));
      });
    });
    const lang=current();
    document.querySelectorAll("[data-score-state]").forEach(function(el){
      el.textContent = avg ? t(lang,"score_label") : t(lang,"not_rated");
    });
  }

  function current(){ return document.documentElement.dataset.lang || "tr"; }

  function applyLang(lang){
    if(!I18N[lang]) lang="tr";
    document.documentElement.dataset.lang=lang;
    document.documentElement.lang=lang;
    try{ localStorage.setItem("amara_lang",lang); }catch(e){}
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      el.textContent=t(lang,el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function(el){
      el.setAttribute("placeholder",t(lang,el.dataset.i18nPh));
    });
    document.querySelectorAll(".lang-switch button").forEach(function(b){
      b.classList.toggle("active",b.dataset.lang===lang);
    });
    updateScore();
    if(typeof applyGreeting==="function") applyGreeting();
  }

  function wireLang(){
    document.querySelectorAll(".lang-switch button").forEach(function(b){
      b.addEventListener("click",function(){ applyLang(b.dataset.lang); });
    });
  }

  function collectSubmission(form){
    let guest={};
    try{ guest=JSON.parse(localStorage.getItem("amara_guest")||"{}"); }catch(e){}
    const feedbackEl=form.querySelector("[name=feedback]");
    const vals=AREAS.map(a=>ratings[a]).filter(v=>v>0);
    const avg=vals.length?(vals.reduce((a,b)=>a+b,0)/vals.length):0;
    const data={
      name:guest.name||"",
      room:guest.room||"",
      birthyear:guest.birthyear||"",
      feedback:(feedbackEl&&feedbackEl.value)||"",
      lang:current(),
      average:avg?avg.toFixed(2):"",
      submitted_at:new Date().toISOString()
    };
    AREAS.forEach(function(a){ data[a]=ratings[a]||0; });
    return data;
  }

  function sendSubmission(data){
    if(!ENDPOINT) return;            // noch keine URL hinterlegt → nichts senden
    try{
      const body=new URLSearchParams();
      Object.keys(data).forEach(function(k){ body.append(k,data[k]); });
      // no-cors: "fire and forget" – der Gast wird nicht blockiert, falls das
      // Sheet kurz nicht erreichbar ist; die Antwort lesen wir nicht.
      fetch(ENDPOINT,{method:"POST",mode:"no-cors",body:body}).catch(function(){});
    }catch(e){}
  }

  function wireSubmit(){
    document.querySelectorAll("form.review-form").forEach(function(form){
      form.addEventListener("submit",function(e){
        e.preventDefault();
        sendSubmission(collectSubmission(form));
        sendToSheet();
        const page=form.closest("[data-review-page]")||document;
        page.classList.add("is-submitted");
        const thanks=page.querySelector(".thanks");
        if(thanks) thanks.classList.add("show");
        const cta=page.querySelector("[data-google-cta]");
        if(cta) cta.hidden = avgScore() <= GOOGLE_THRESHOLD;
        window.scrollTo({top:0,behavior:"smooth"});
      });
    });
    document.querySelectorAll("[data-reset]").forEach(function(btn){
      btn.addEventListener("click",function(){
        const page=btn.closest("[data-review-page]")||document;
        page.classList.remove("is-submitted");
        const thanks=page.querySelector(".thanks");
        if(thanks) thanks.classList.remove("show");
        const cta=page.querySelector("[data-google-cta]");
        if(cta) cta.hidden=true;
        AREAS.forEach(a=>ratings[a]=0);
        document.querySelectorAll(".stars .star").forEach(s=>s.classList.remove("on","preview"));
        page.querySelectorAll("input.txt,textarea.txt").forEach(i=>i.value="");
        updateScore();
      });
    });
  }

  function wireIntro(){
    const form=document.querySelector("form.intro-form");
    if(!form) return;
    // Pflichtfelder: lokalisierte Meldung statt der Browser-Standardsprache.
    const reqFields=form.querySelectorAll("[required]");
    reqFields.forEach(function(field){
      field.addEventListener("invalid",function(){
        field.setCustomValidity(t(current(),"field_required"));
      });
      field.addEventListener("input",function(){ field.setCustomValidity(""); });
    });
    form.addEventListener("submit",function(e){
      e.preventDefault();
      const data={
        name:(form.querySelector("[name=name]")||{}).value||"",
        room:(form.querySelector("[name=room]")||{}).value||"",
        birthyear:(form.querySelector("[name=birthyear]")||{}).value||"",
        feedback:(form.querySelector("[name=feedback]")||{}).value||""
      };
      try{ localStorage.setItem("amara_guest",JSON.stringify(data)); }catch(err){}
      window.location.href="review.html";
    });
  }

  function applyGreeting(){
    const el=document.querySelector("[data-greeting]");
    if(!el) return;
    let name="";
    try{ name=(JSON.parse(localStorage.getItem("amara_guest")||"{}").name||"").trim(); }catch(e){}
    if(name){
      el.textContent=t(current(),"hello")+" "+name;
      el.style.display="";
    }else{
      el.style.display="none";
    }
  }

  function init(){
    buildStars();
    wireLang();
    wireSubmit();
    wireIntro();
    let saved="tr";
    try{ saved=localStorage.getItem("amara_lang")||"tr"; }catch(e){}
    applyLang(saved);
    applyGreeting();
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init);
  }else{ init(); }

  window.AmaraReview={applyLang,I18N,LANGS};
})();
