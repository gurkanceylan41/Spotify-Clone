import { API } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayingInfo } from "./js/ui.js";

const api = new API();

//* Form gönderildigi anda api istek at ve gelen cevabı ekrana yazdır
elements.form.addEventListener("submit", (e) => {
  //*Ekranın yenilenmesini engelledik
  e.preventDefault();
  //*form yapısına olay dinleyicisi ekleyip içine girilen değere ulaştık
  const query = e.target[0].value;

  //*inputa girilen değer boş ise kullanıcıya uyarı bastırdık ve return ile durdurduk
  if (!query) {
    alert("Lütfen bir müzik ismi giriniz!");
    return;
  }
  api.searchMusic(query);
});

//*Sayfa yüklendigi anda api istek atıp populer müzikleri getir.
document.addEventListener("DOMContentLoaded", async () => {
  await api.topPopular();
});

const playMusic = (url) => {
  //*müzigin urlini htmle aktardık
  elements.audioSource.src = url;
  //*audio elementinin müzigi yüklemesini sağladık
  elements.audio.load();
  //* audio elementinin oynatmasını sağladık
  elements.audio.play();
};
//*liste alanındaki tıklamalarda çalışır
const handleClick = (e) => {
  if (e.target.id === "play-btn") {
    //parantElement yerine kullanırız en yakın kapsayıcısına götürür.
    const parent = e.target.closest(".cart");
    renderPlayingInfo(parent.dataset);
    //*Müzigi çalar
    playMusic(parent.dataset.url);
  }
};
//*liste alanındaki tıklamaları izler
document.addEventListener("click", handleClick);

//*Fotoğrafı döndürür
const animatePhoto = () => {
  const img = document.querySelector(".info img");
  console.log(img);
  img.className = "animate";
};
//img etiketine ekledigimiz animate classını kaldırır
const stopAnimation = () => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
  console.log(img);
};

//* Müzigi çalma ve durdurma olaylarını izler
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);
