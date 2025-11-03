// إخفاء شاشة الترحيب بعد 5 ثواني
window.onload = () => {
  setTimeout(() => {
    document.getElementById("welcome-screen").style.display = "none";
    document.querySelector(".container").style.display = "block";
  }, 5000);
};

// استخراج رابط مباشر للفيديو
document.getElementById("generateLink").addEventListener("click", () => {
  const file = document.getElementById("videoInput").files[0];
  if (!file) {
    alert("⚠️ من فضلك اختر فيديو أولًا!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const videoUrl = e.target.result;
    const output = document.getElementById("output");
    output.innerHTML = `<p>📎 الرابط المباشر للفيديو:</p>
      <a href="${videoUrl}" target="_blank" style="color:#4ade80;">افتح الفيديو</a>`;
  };
  reader.readAsDataURL(file);
});

// إنشاء ملف HTML للرسالة + الفيديو
document.getElementById("generateHtml").addEventListener("click", () => {
  const file = document.getElementById("videoInput").files[0];
  const message = document.getElementById("messageInput").value;

  if (!file) {
    alert("⚠️ اختر فيديو أولًا!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const videoUrl = e.target.result;
    const htmlContent = `
<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <title>🎁 فيديو خاص لك</title>
  <style>
    body { font-family:'Cairo',sans-serif;text-align:center;background:#0d1117;color:white;overflow:hidden;}
    #msg {position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,0.9);font-size:22px;animation:fadeOut 1s ease 4s forwards;}
    @keyframes fadeOut {to{opacity:0;visibility:hidden;}}
    video{width:90%;margin-top:100px;border-radius:15px;}
  </style>
</head>
<body>
  <div id="msg">${message}</div>
  <video controls autoplay>
    <source src="${videoUrl}" type="${file.type}">
  </video>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "video_message.html";
    link.textContent = "📥 تحميل ملف HTML";

    const output = document.getElementById("output");
    output.innerHTML = "";
    output.appendChild(link);
  };

  reader.readAsDataURL(file);
});
