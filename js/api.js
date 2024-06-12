import { renderSearchMusic, renderSongs, updateTitle } from "./ui.js";

//* İnputa girilen veriye göre aratacağımız api
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "d0e15ac2c8msh52e217e5beedbdap125aa1jsnb7ae30d32411",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};
//*Populer müzikleri getiriceğimiz api key
const optionsTop = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "d0e15ac2c8msh52e217e5beedbdap125aa1jsnb7ae30d32411",
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
  },
};

export class API {
  constructor() {
    this.songs = [];
  }

  //*inputa girilen veriye göre apiden gelen cevabı getirir
  async searchMusic(query) {
    try {
      const res = await fetch(
        `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR&limit=5`,
        options
      );
      const data = await res.json();
      let newData = data.tracks.hits;
      newData = newData.map((song) => ({ ...song.track }));
      //*Yani, newData dizisindeki her bir song nesnesinin içindeki track nesnesi alınır ve bu nesnelerden yeni bir dizi oluşturulur.

      this.songs = newData;
      //*Ekrana api'den gelen herbir şarkıyı yazdırıcağımız method
      renderSearchMusic(this.songs);
      updateTitle(`${query} için sonuçlar`);
    } catch (error) {
      console.error(error);
    }
  }

  async topPopular() {
    const url =
      "https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry";
    try {
      // Api'ye fetch isteği at
      const response = await fetch(url, optionsTop);
      //Veriyi json formatına çevir
      const result = await response.json();
      // tanımladıgımız songs dizisine gelen cevabı aktar
      this.songs = result.tracks;
      renderSongs(this.songs);
    } catch (error) {
      error;
    }
  }
}
