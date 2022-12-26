const fileInput = document.getElementById("fileInput");
const addSongWindow = document.querySelector(".add-song-window");
const addSong = document.getElementById("add-song");
const uploadBtn = document.getElementById("upload-btn");
const exit = document.getElementById("exit");
const add = document.getElementById("add");
const audio = document.getElementById("player");
const fileName = document.getElementById("current-file-info");
const artistName = document.querySelector(".artist-name");
const songName = document.querySelector(".song-name");
const songsContainer = document.querySelector(".songs-container");
const library = [];
let temp;
let file;
let audioDuration;

fileInput.onchange = loadFile; //oninputchange do

function loadFile() {
	file = fileInput.files[0];
	if (!file) {
		alert("Please choose a file first.");
		fileName.innerHTML = "File: ";
		return;
	}
	fileName.innerHTML = `File: ${file.name}`;
	const tempAudio = document.createElement("audio");
	tempAudio.src = URL.createObjectURL(file);
	tempAudio.onloadedmetadata = function () {
		audioDuration = tempAudio.duration;
		console.log("loadedmd");
		return [file, audioDuration];
	};
}

addSong.onclick = () => {
	addSongWindow.style.display = "flex";
};
uploadBtn.onclick = () => {
	fileInput.click();
};
exit.onclick = () => {
	addSongWindow.style.display = "none";
};

add.onclick = () => {
	if (!file) {
		alert("Please upload");
		return;
	}
	if (!artistName.value || !songName.value) {
		alert("Please fill the data");
		return;
	}

	let url = URL.createObjectURL(file);
	// console.log(url);
	// audio.src = url;

	// console.log("add");
	// audioDuration = audio.duration;

	const newSongData = {
		artist: artistName.value,
		song: songName.value,
		file: url,
		audioDur: Math.floor(audioDuration),
	};
	library.push(newSongData);

	artistName.value = "";
	songName.value = "";
	fileInput.value = "";
	fileName.innerHTML = "File:";
	audioDuration = 0;
	addSongWindow.style.display = "none";
	songsContainer.style.height = `${songsContainer.offsetHeight + 50}px`;
	updateSongs();
};

function updateSongs() {
	songsContainer.innerHTML = "";

	library.forEach((element, index) => {
		// console.log(element.file2.src)
		console.log(element);
		songsContainer.insertAdjacentHTML(
			"beforeend",
			`<div class="song-${index} songs">
          <span id="play-stop-button-${index}" class='play-stop-button'>▶️</span>
			<span id="delete-button-${index}" class='delete-button'>❌</span>

    
        <p id="artist-name">${element.artist}</p>
        <p id="song-name">${element.song}</p>
        <p id="audio-length">${
					Math.floor(element.audioDur / 60) +
					"min " +
					Math.floor(element.audioDur % 60) +
					"s"
				}</p>
        <audio class='audio-${index}' src='${element.file}'></audio>
      </div>`
		);
		//prettier-ignore
		document.getElementById(`play-stop-button-${index}`).addEventListener('click',function () {
			temp = this.parentNode.querySelector(`.audio-${index}`);
			if (temp.paused) {
				// console.log("play");
				temp.play();
				this.textContent = "⏸️";
			} else {
				// console.log("puase");
				temp.pause();
				this.textContent = "▶️";
			}
		})

		document
			.getElementById(`delete-button-${index}`)
			.addEventListener("click", function () {
				this.parentNode.remove();
				library.splice(index, 1);
				songsContainer.style.height = `${songsContainer.offsetHeight - 50}px`;
			});
	});
}

