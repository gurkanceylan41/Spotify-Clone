import { elements } from "./helpers.js";
//*Ekrana gönderilen müzikleri aktarır
export const renderSearchMusic = (songs) => {
  elements.list.innerHTML = "";
  songs.forEach((song) => {
    console.log(song);
    const div = document.createElement("div");
    //* Kart datasına kart elemanına bazı verileri ekleme
    div.dataset.url = song.hub.actions.pop().uri;
    div.dataset.title = song.title;
    div.dataset.img = song.images.coverart;
    div.className = "cart";
    console.log(div);

    div.innerHTML = `
    <figure>
              <img  src="${song.images.coverart}" alt="" />
              <div class="play">
                <i class="bi bi-play-fill" id="play-btn"></i>
              </div>
              <h4>${song.subtitle}</h4>
              <h4>${song.title.slice(0, 15) + "..."}</h4>
            </figure>
    `;
    elements.list.appendChild(div);
  });
};

//*Başlıgı aldıgı parametreye göre günceller
export const updateTitle = (message) => {
  elements.title.innerText = message;
};

export const renderSongs = (songs) => {
  elements.list.innerHTML = "";
  songs.forEach((song) => {
    const div = document.createElement("div");

    div.dataset.url = song.preview_url;
    div.dataset.title = song.name;
    div.dataset.img = song.album.images[1].url;
    div.className = "cart";

    div.innerHTML = `

            <figure>
                <img width="100" src="${song.album.images[1].url}" alt="" />
                <div class="play">
                    <i class="bi bi-play-fill" id="play-btn"></i>
                </div>
                <h4>${song.album.artists[0].name}</h4>
                <h4>${song.name.slice(0, 15) + "..."}</h4>
            </figure>
    `;
    elements.list.appendChild(div);
  });
};

//* Playinginfo kısmına resmi ve title aktardık
export const renderPlayingInfo = (song) => {
  elements.playingInfo.innerHTML = `
    <img
    src="${song.img}"
    class="animate"
    id="info-img"
    alt=""
  />
  <div>
    <p>Şu an oynatılıyor...</p>
    <h3>${song.title}</h3>
  </div>
  `;
};
