// إظهار رسالة الترحيب أول 5 ثواني
window.onload = function() {
  setTimeout(() => {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("main").style.display = "block";
  }, 5000);
};

let videoData = null;

// عند اختيار ملف الفيديو
document.getElementById("videoFile").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    videoData = e.target.result;
    document.getElementById("choicePopup").style.display = "block";
  };
  reader.readAsDataURL(file);
});

// زر استخراج اللينك
document.getElementById("linkBtn").addEventListener("click", () => {
  if (!videoData) return alert("لم يتم رفع الفيديو بعد!");

  // إنشاء صفحة HTML صغيرة فيها الفيديو
  const htmlCode = `
  <!DOCTYPE html>
  <html lang="ar">
  <head><meta charset="UTF-8"><title>فيديو النجم</title></head>
  <body style="margin:0;background:black;display:flex;justify-content:center;align-items:center;height:100vh;">
  <video controls autoplay style="width:90%;max-width:700px;" src="${videoData}"></video>
  </body></html>
  `;

  // تحويلها إلى رابط جاهز للفتح
  const encoded = encodeURIComponent(htmlCode);
  const finalLink = `data:text/html,${encoded}`;
  showResult(finalLink);
});

// زر استخراج HTML كملف
document.getElementById("htmlBtn").addEventListener("click", () => {
  if (!videoData) return alert("لم يتم رفع الفيديو بعد!");
  
  const htmlFile = `
  <!DOCTYPE html>
  <html lang="ar">
  <head>
  <meta charset="UTF-8">
  <title>فيديو النجم</title>
  <style>
  body {background:black;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}
  video {width:90%;max-width:700px;border-radius:10px;}
  </style>
  </head>
  <body>
  <video controls autoplay src="${videoData}"></video>
  </body>
  </html>
  `;

  const blob = new Blob([htmlFile], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "video_najm.html";
  link.click();

  document.getElementById("choicePopup").style.display = "none";
});

// عرض النتيجة
function showResult(link) {
  document.getElementById("choicePopup").style.display = "none";
  const popup = document.getElementById("resultPopup");
  const linkElem = document.getElementById("videoLink");
  linkElem.href = link;
  linkElem.textContent = "اضغط هنا لفتح الفيديو";
  popup.style.display = "block";
}

// إغلاق النافذة
function closePopup() {
  document.getElementById("resultPopup").style.display = "none";
}
