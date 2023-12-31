let currentSongIndex = 0;
let randomMode = false;

const nextButton = document.getElementById("next");
const stopButton = document.getElementById("stop");
const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const randomButton = document.getElementById("random");
const progres = document.getElementById("progress");
const barraProgres = document.getElementById("progress-bar");
const volumeBar = document.getElementById("progress-volume");
const iconVolume = document.getElementById("volume-icon");
const moreVolume = document.getElementById("more-volume");
const lessVolume = document.getElementById("less-volume");
const audio = new Audio();


// Funcio per canviar la foto, el nom de la canço i el de l'artista
function updateSongInfo(index) {
    const song = playlistData.songs[index];

    document.getElementById("song").textContent = song.title;
    document.getElementById("artist").textContent = song.artist;
    document.getElementById("image").src = song.cover;
    audio.src = song.url;
}

// Funcio que fa funcionar el boto de play/stop
function toggleAudio() {
    if (audio.paused) {
        playButton.title = "Pausa";
        audio.play();
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-pause");
    } else {
        playButton.title = "Reprodueix";
        audio.pause();
        playButton.classList.remove("fa-pause");
        playButton.classList.add("fa-play");
    }
}

// Funcio pel funcionament de saltar a la seguent canço
function nextSong() {
    if (randomMode) {
        currentSongIndex = randomIndex(currentSongIndex, playlistData.songs.length);
    } else {
        currentSongIndex = (currentSongIndex + 1) % playlistData.songs.length;
    }

    updateSongInfo(currentSongIndex);
    toggleAudio();
}

// Funcio pel funcionament de saltar a l'anterior canço
function previousSong() {
    currentSongIndex = (currentSongIndex - 1) % playlistData.songs.length;
    
    updateSongInfo(currentSongIndex);
    toggleAudio();
}

// Funcio per canviar el color de aleatori per despres fer funcionar la funcio randomSong
function changeColor() {
    const colorActual = window.getComputedStyle(randomButton).color;

    if (colorActual == "rgb(102, 102, 102)") {
        randomButton.style.color = "rgb(100, 189, 106)";
        randomMode = true;
    } else if (colorActual == "rgb(100, 189, 106)") {
        randomButton.style.color = "rgb(102, 102, 102)";
        randomMode = false;
    }

    // Poso els colors amb rgb perque hi han navagadors (com el que utilitzo) que si ho poses amb # no anira
}

// Funcio per crear un numero aleatori de la mida de l'array i mira que no concideixi amb la posicio actual
function randomIndex(currentIndex, playlistLength) {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * playlistLength);
    } while (randomIndex == currentIndex);

    return randomIndex;
}

// Funcio pel funcionament del modo aleatori
function randomSong () {
    const newIndex = randomIndex(currentSongIndex, playlistData.length);
    const colorActual = window.getComputedStyle(aleatori).color;

    if (colorActual == "rgb(0, 80, 0)") {
        currentSongIndex = newIndex;

        updateSongInfo(currentSongIndex);
        toggleAudio();
    }
}

// Funcio pel funcionament del aturar canço
function stopSong () {
    if (audio.play) {
        playButton.title = "Reprodueix";
        audio.pause();
        playButton.classList.remove("fa-pause");
        playButton.classList.add("fa-play");
        audio.currentTime = 0;
    }
}

// Funcio per fer moure la barra de progres
function progressBar () {
    const percentatgeProgressio = (audio.currentTime / audio.duration) * 100;

    progres.style.width = `${percentatgeProgressio}%`;
}

// Funcio per fer fucnionar el click a la barra, on cliqui aniria la canço
function setBar (e) {
    const barraAmple = barraProgres.clientWidth;
    const clicX = e.offsetX; // OffsetX et dona la posicio del clic respecte de l'element actual

    const nouTemps = (clicX / barraAmple) * audio.duration;
    audio.currentTime = nouTemps;

    // amb chrome no funcionaria, millor amb firefox
}

// Funcio per actualitzar el temps que porta i que dura la canço
function updateTime () {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    document.getElementById("temps-actual").textContent = formatTime(currentTime);
    document.getElementById("total-temps").textContent = formatTime(duration);
}

// Funcio per posar el format de la canço en minuts i segons
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    // seconds < 10 ? "0" : "" es per afegir un 0 si els numero son inferiors a 10 es a dir, sera 02 i no 2
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}


// Funcio per canviar l'informacio de canço a traves de l'index de la canço escollida del llistat de la playlist
function playlistSong(index) {
    currentSongIndex = index;

    updateSongInfo(currentSongIndex);
    toggleAudio();
}
//aquesta funcio esta cridada en el html perque he hagut d'utilitzar php en onclick i no se si es pot fer per js.


// Funcio per canviar el volum, pujar o baixar
function changeMoreVolume () {
    audio.volume = audio.volume + 0.1;
    changeVolumeIcon();
}

function changeLessVolume () {
    audio.volume = audio.volume - 0.1;
    changeVolumeIcon();
}

function changeVolumeIcon () {
    if (audio.volume < 0.1) {
        iconVolume.classList.remove("fa-volume-low");
        iconVolume.classList.remove("fa-volume-high");
        iconVolume.classList.add("fa-volume-off");
    } else if (audio.volume >= 0.1 && audio.volume < 0.7) {
        iconVolume.classList.remove("fa-volume-off");
        iconVolume.classList.remove("fa-volume-high");
        iconVolume.classList.add("fa-volume-low");
    } else if (audio.volume >= 0.7) {
        iconVolume.classList.remove("fa-volume-off");
        iconVolume.classList.remove("fa-volume-low");
        iconVolume.classList.add("fa-volume-high");
    }
}


function moveMoreVolumeBar() {
    let currentWidth = "100%";

    if (volumeBar.style.width) {
        currentWidth = volumeBar.style.width;
    }

    let currentWidthNumber = parseInt(currentWidth);
    currentWidthNumber += 10;

    if (currentWidthNumber > 100) {
        currentWidthNumber = 100;
    }

    volumeBar.style.width = currentWidthNumber + "%";
}

function moveLessVolumeBar() {
    let currentWidth = "100%";

    if (volumeBar.style.width) {
        currentWidth = volumeBar.style.width;
    }

    let currentWidthNumber = parseInt(currentWidth);
    currentWidthNumber -= 10;
    if (currentWidthNumber < 0) {
        currentWidthNumber = 0;
    }
    volumeBar.style.width = currentWidthNumber + "%";
}


// Funcio quan cliques espai que soni la canço
function playSpace (e) {
    if (e.keyCode == 32 || e.code == "Space") {
        toggleAudio();
    }
}

// Funcio quan cliques fletxa amunt que puji el volum
function upArrow (e) {
    if (e.keyCode == 38 || e.code == "ArrowUp") {
        changeMoreVolume();
        moveMoreVolumeBar();
    }
}

// Funcio quan cliques fletxa abaix que baixi el volum
function downArrow (e) {
    if (e.keyCode == 40 || e.code == "ArrowDown") {
        changeLessVolume();
        moveLessVolumeBar();
    }
}

// Funcio quan cliques fletxa de la dreta que avançi la canço
function rightArrow (e) {
    if (e.keyCode == 39 || e.code == "ArrowRight") {
        audio.currentTime = audio.currentTime + 5;
        progressBar();
    }
}

// Funcio quan cliques fletxa de la esquerra que retrocedeixi la canço
function leftArrow (e) {
    if (e.keyCode == 37 || e.code == "ArrowLeft") {
        audio.currentTime = audio.currentTime - 5;
        progressBar();

    }
}


// addEventListener per la funcio toggleAudio en el boto playButton
playButton.addEventListener("click", toggleAudio);

// addEventListener per la funcio nextSong en audio
audio.addEventListener("ended", nextSong);

// addEventListener per la funcio nextSong en el boto nextButton
nextButton.addEventListener("click", nextSong);

// addEventListener per la funcio randomSong en el boto randomButton
randomButton.addEventListener("click", changeColor);

// addEventListener per la funcio randomSong en el boto nextButton
randomButton.addEventListener("click", randomSong);

// addEventListener per la funcio previousSong en el boto previousButton
previousButton.addEventListener("click", previousSong);

// addEventListener per la funcio stopSong en el boto stopButton
stopButton.addEventListener("click", stopSong);

// addEventListener per la funcio setBar en barraProgres
barraProgres.addEventListener("click", setBar);

// addEventListener per la funcio progresBarra en audio
audio.addEventListener("timeupdate", progressBar);

// addEventListener per la funcio updateTime en audio
audio.addEventListener("timeupdate", updateTime);

// addEventListener per la funcio changeMoreVolume en moreVolume
moreVolume.addEventListener("click", changeMoreVolume);
moreVolume.addEventListener("click", moveMoreVolumeBar);

// addEventListener per la funcio changeLessVolume en lessVolume
lessVolume.addEventListener("click", changeLessVolume);
lessVolume.addEventListener("click", moveLessVolumeBar);

// Fer funcionar les flextes i l'espai
document.addEventListener("keypress", playSpace);
document.addEventListener("keydown", upArrow);
document.addEventListener("keydown", downArrow);
document.addEventListener("keydown", rightArrow);
document.addEventListener("keydown", leftArrow);

// Inicia la primera canço de la llista amb la seva informacio
updateSongInfo(currentSongIndex);
