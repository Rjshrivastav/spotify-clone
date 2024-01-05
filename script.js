const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const muteBtn = document.getElementById('mute-btn');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const songNameElement = document.getElementById('song-name');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');

let isPlaying = false;
let isMuted = false;
let isShuffleOn = false;
let currentSongIndex = 0;
let playlist = []

let playBtn = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>`

let pauseBtn = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10"
viewBox="0 0 320 512">
<path
    d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
</svg>`


let sBtn = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16"
viewBox="0 0 512 512">
<path
    d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z" />
</svg>`

let sOnBtn = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" fill="White"
viewBox="0 0 512 512">
<path
    d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z" />
</svg>`

let unmBtn = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18"
viewBox="0 0 576 512">
<path
    d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
</svg>`

let mBtn = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
xmlns="http://www.w3.org/2000/svg">
<path
    d="M14 14.8135V9.18646C14 6.04126 14 4.46866 13.0747 4.0773C12.1494 3.68593 11.0603 4.79793 8.88232 7.02192C7.75439 8.17365 7.11085 8.42869 5.50604 8.42869C4.10257 8.42869 3.40084 8.42869 2.89675 8.77262C1.85035 9.48655 2.00852 10.882 2.00852 12C2.00852 13.118 1.85035 14.5134 2.89675 15.2274C3.40084 15.5713 4.10257 15.5713 5.50604 15.5713C7.11085 15.5713 7.75439 15.8264 8.88232 16.9781C11.0603 19.2021 12.1494 20.3141 13.0747 19.9227C14 19.5313 14 17.9587 14 14.8135Z"
    stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
<path d="M17 9C17.6254 9.81968 18 10.8634 18 12C18 13.1366 17.6254 14.1803 17 15"
    stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
<path d="M20 7C21.2508 8.36613 22 10.1057 22 12C22 13.8943 21.2508 15.6339 20 17"
    stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`

window.addEventListener('load', updatePlaylist)
playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', playPreviousSong);
nextBtn.addEventListener('click', playNextSong);
shuffleBtn.addEventListener('click', toggleShuffle);
muteBtn.addEventListener('click', toggleMute);
progressBar.addEventListener('click', setProgress);

async function getSongs() {
    try {
        let a = await fetch("http://127.0.0.1:3000/songs");
        let response = await a.text();
        console.log(response)
        let div = document.createElement("div")
        div.innerHTML = response;
        let as = div.getElementsByTagName('a')
        let songs = []
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith('.mp3')) {
                songs.push(element.href)
            }
        }
        console.log(songs) // Filter the songs with .mp3 extension
        // let songs = data.filter(url => url.endsWith('.mp3'));
        return songs;
    } catch (error) {
        console.error('Error fetching songs:', error);
        return [];
    }
}

async function updatePlaylist() {
    try {
        playlist = await getSongs();
        console.log(playlist)
         
        let songUl = document.querySelector('.lib-middle')
        for (const list of playlist) {
            let songList=list.split('/songs/')[1].replaceAll('%20', ' ')
            let libCard = `<div class="lib-card">
<div class="lib-card-img">
<img src="assets/music.svg" alt="">
<button><img src="assets/play.svg" alt=""></button>
</div>
<div class="lib-card-text">
    <h4>${songList}</h4>
</div>
</div>`
            songUl.innerHTML = songUl.innerHTML + libCard;
        }
        if (playlist.length > 0) {
            // Load and play the first song in the updated playlist
            currentSongIndex = 0;
            loadAndPlaySong();
        }
    } catch (error) {
        console.error('Error updating playlist:', error);
    }
}

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = playBtn;
        console.log(playPauseBtn)
    } else {
        audio.play();
        playPauseBtn.innerHTML = pauseBtn;
    }

    isPlaying = !isPlaying;
}

function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadAndPlaySong();
}

function playNextSong() {
    if (isShuffleOn) {
        currentSongIndex = getRandomIndex();
    } else {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
    }

    loadAndPlaySong();
}

function loadAndPlaySong() {
    audio.src = playlist[currentSongIndex];
    audio.load();
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
        audio.play();
    }
    
    isPlaying = true;
    playPauseBtn.innerHTML = isPlaying ? playBtn : pauseBtn;
    updateSongInfo();
}

function toggleShuffle() {
    isShuffleOn = !isShuffleOn;
    shuffleBtn.innerHTML = isShuffleOn ? sOnBtn : sBtn;
}

function toggleMute() {
    audio.muted = !audio.muted;
    muteBtn.innerHTML = audio.muted ? unmBtn : mBtn;
    isMuted = audio.muted;
}

function setProgress(e) {
    const totalWidth = progressBar.clientWidth;
    const clickX = e.clientX - progressBar.getBoundingClientRect().left;
    const percentage = (clickX / totalWidth) * 100;

    audio.currentTime = (percentage / 100) * audio.duration;
}

audio.addEventListener('timeupdate', updateProgressBar);

function updateProgressBar() {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percentage}%`;

    const currentTimeFormatted = formatTime(audio.currentTime);
    currentTimeElement.textContent = currentTimeFormatted;

    const durationFormatted = formatTime(audio.duration);
    durationElement.textContent = durationFormatted;

    if (percentage === 100) {
        isPlaying = false;
        playPauseBtn.textContent = 'Play';
        playNextSong();
    }
}

audio.addEventListener('loadedmetadata', () => {
    const durationFormatted = formatTime(audio.duration);
    durationElement.textContent = durationFormatted;
});

audio.addEventListener('play', updateSongInfo);

function updateSongInfo() {
    songNameElement.textContent = playlist[currentSongIndex].split('/songs/')[1].replaceAll('%20', ' ');
    
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${(seconds < 10) ? '0' : ''}${seconds}`;
}

function getRandomIndex() {
    let newIndex = currentSongIndex;
    while (newIndex === currentSongIndex) {
        newIndex = Math.floor(Math.random() * playlist.length);
    }
    return newIndex;
}
