console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.querySelectorAll('.songItem'));
let masterSongName = document.getElementById('masterSongName');


let songs = [
    { songName: "Teri baaton me aisa", filePath: "1.mp3", coverPath: "1.jpg" },
    { songName: "Tera hone laga hoon", filePath: "2.mp3", coverPath: "6.jpg" },
    { songName: "Sataranga", filePath: "3.mp3", coverPath: "2.jpg" },
    { songName: "Nadaan Parindey", filePath: "4.mp3", coverPath: "3.jpg" },
    { songName: "Main tera dhadkan teri", filePath: "5.mp3", coverPath: "6.jpg" },
    { songName: "Hawaiyen", filePath: "6.mp3", coverPath: "6.jpg" },
    { songName: "Akhiyaan Gulab", filePath: "7.mp3", coverPath: "1.jpg" },
    { songName: "Tu hain ki nahi", filePath: "8.mp3", coverPath: "4.jpg" },
    { songName: "Sooraj dooba hain", filePath: "9.mp3", coverPath: "4.jpg" },
];

songItems.forEach((Element, i) => {
    console.log(Element, i);
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        audioElement.pause();
        gif.style.opacity = 0;
    }
});


audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {
        Element.classList.remove('fa-pause-circle');
        Element.classList.add('fa-play-circle');
    })
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 8) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    masterSongName.innerText = songs[songIndex].songName;
})


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    masterSongName.innerText = songs[songIndex].songName;
})

