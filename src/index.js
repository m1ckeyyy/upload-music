const uploadBtn = document.querySelector("#upload-btn");
const fileInput = document.querySelector("#fileInput");
const addSong = document.querySelector("#add-song");
const app = document.querySelector("#app");
const addSongWindow = document.querySelector(".add-song-window");
const exit = document.querySelector("#exit");
const artistName = document.querySelector(".artist-name");
const songName = document.querySelector(".song-name");

const fileName = document.querySelector("#current-file-info");
const add = document.querySelector("#add");
const songsLibrary = [];
let file, audioDuration;

uploadBtn.addEventListener("click", function () {
  fileInput.click();
});

addSong.addEventListener("click", function () {
  //display: grid;
  app.style.display = "none";
  addSongWindow.style.display = "flex";
});
exit.addEventListener("click", function () {
  app.style.display = "grid";
  addSongWindow.style.display = "none";
});

const loadFile = function () {
  file = fileInput.files[0];
  fileName.innerHTML = String(file.name);
  const tempAudio = document.createElement("audio");
  tempAudio.src = URL.createObjectURL(file);
  tempAudio.onloadedmetadata = function () {
    audioDuration = tempAudio.duration;
  };
};
fileInput.onchange = loadFile;

add.addEventListener("click", function () {
  if (!file) {
    alert("Please choose a file first.");
    return;
  }
  if (songName.value === "" || artistName.value === "") {
    alert("Fill the missing details");
    return;
  }
  const newSongData = {
    artist: artistName.value,
    song: songName.value,
    file: URL.createObjectURL(file),
    audioDur: Math.floor(audioDuration)
  };
  songsLibrary.push(newSongData);

  artistName.value = "";
  songName.value = "";
  fileInput.value = "";
  fileName.innerHTML = "";
  audioDuration = 0;
  app.style.display = "grid";
  addSongWindow.style.display = "none";
  app.style.height = `${app.offsetHeight + 72}px`;
  file=null;
  updateSongs();
});

const updateSongs = function () {
  app.innerHTML='';
  app.insertAdjacentHTML('beforeend','<h1>Spotify</h1><button id="add-song">ADD</button>')
  document.querySelector("#add-song").addEventListener("click", function () {
    //display: grid;
    app.style.display = "none";
    addSongWindow.style.display = "flex";
  });
  songsLibrary.forEach((element, index) => {
    app.insertAdjacentHTML(
      "beforeend",
      `<div class="song-${index} song">
          <button id="play-stop-button-${index}" class='play-button'>▶️</button>
			    <button id="delete-button-${index}" class='delete-button'>✖</button>

    
        <span class="artist">${element.artist}</span>
        <span class="title">${element.song}</span>
        <span class="duration">${
          Math.floor(element.audioDur / 60) +
          "min " +
          Math.floor(element.audioDur % 60) +
          "s"
        }</span>
        <audio class='audio-${index}' src='${element.file}'></audio>
      </div>`
    );
    //prettier-ignore
    document.getElementById(`play-stop-button-${index}`).addEventListener('click',function () {
			if (document.querySelector(`.audio-${index}`).paused) {
        document.querySelector(`.audio-${index}`).play();
				this.textContent = "⏸️";
			} else {
        document.querySelector(`.audio-${index}`).pause();
				this.textContent = "▶️";
			}
		});
    //   <div class="song">
    //   <span class="artist">The Weeknd</span>
    //   <span class="title">After Hours</span>
    //   <span class="duration">3:20</span>
    //   <button class="play-button">▶</button>
    // </div>
    document
      .getElementById(`delete-button-${index}`)
      .addEventListener("click", function () {
        this.parentNode.remove();
        songsLibrary.splice(index, 1);
        app.style.height = `${app.offsetHeight - 50}px`;
      });
  });
};
