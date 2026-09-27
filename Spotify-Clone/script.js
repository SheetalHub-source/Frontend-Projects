//==== Initialize the Variables ==//
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementsByClassName('progressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let forwardButton = document.getElementById('forwardPlayButton');
let backwardButton = document.getElementById('backwardPlayButtom');
let playListPlay = Array.from(document.getElementsByClassName('playListPlay'));
let songs = [
    {
        songName: "Choli ke peeche",
        filePath: "Songs/1.mp3",
        coverPath: "Images/1.jpg",
        gifId: "1_gif"
    },
    {
        songName: "Pasoori",
        filePath: "Songs/2.mp3",
        coverPath: "Images/2.jpg",
        gifId: "2_gif"
    },
    {
        songName: "Jhalak Dikhla ja",
        filePath: "Songs/3.mp3",
        coverPath: "Images/3.jpg",
        gifId: "3_gif"
    },
    {
        songName: "Just chill",
        filePath: "Songs/4.mp3",
        coverPath: "Images/4.jpg",
        gifId: "4_gif"
    },
    {
        songName: "Dhurandar-Title Track",
        filePath: "Songs/5.mp3",
        coverPath: "Images/5.jpg",
        gifId: "5_gif"
    },
    {
        songName: "Main teri ho gyi",
        filePath: "Songs/6.mp3",
        coverPath: "Images/6.jpg",
        gifId: "6_gif"
    },
    {
        songName: "O mere khuda",
        filePath: "Songs/7.mp3",
        coverPath: "Images/7.jpg",
        gifId: "7_gif"
    },

]
songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

//handle play/pause click
masterPlay.addEventListener('click', () => {
    console.log(songs[songIndex])
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        document.getElementById('main_gif').style.opacity = 1;
        document.getElementById(`${songIndex+1}_gif`).style.opacity = 1;
        masterPlay.src = "Images/pause-solid.png";
        playListPlay[songIndex].src = "Images/pause-solid.png";
    }
    else {
        audioElement.pause();
        document.getElementById('main_gif').style.opacity = 0;
        document.getElementById(`${songIndex+1}_gif`).style.opacity = 0;
        masterPlay.src = "Images/play-solid.png";
        playListPlay[songIndex].src = "Images/play-solid.png";
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    progress = parseInt(audioElement.currentTime / audioElement.duration * 100);
    console.log(progress);
    myProgressBar[0].value = progress;
});


myProgressBar[0].addEventListener('change', () => {
    audioElement.currentTime = myProgressBar[0].value * audioElement.duration / 100;
})
//handle forward button click
forwardButton.addEventListener('click', () => {

    // Previous song GIF off
    document.getElementById(songs[songIndex].gifId).style.opacity = 0;

    // Previous song playlist button → play
    playListPlay[songIndex].src = "Images/play-solid.png";

    // Move to next song
    songIndex++;

    // If last song, go back to first
    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    // Load current song
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    // Bottom main button → pause
    masterPlay.src = "Images/pause-solid.png";

    // Update song name
    document.getElementsByClassName('currentSongName')[0].innerText =
        songs[songIndex].songName;

    // Current song GIF → show
    document.getElementById(songs[songIndex].gifId).style.opacity = 1;

    // Current song playlist button → pause
    playListPlay[songIndex].src = "Images/pause-solid.png";
});
//handle backward button click
backwardButton.addEventListener('click', () => {

    // Current song GIF off
    document.getElementById(songs[songIndex].gifId).style.opacity = 0;

    // Current song playlist button → play
    playListPlay[songIndex].src = "Images/play-solid.png";

    // Move to previous song
    songIndex--;

    // If first song, go to last
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    // Load current song
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    // Bottom main button → pause
    masterPlay.src = "Images/pause-solid.png";

    // Update song name
    document.getElementsByClassName('currentSongName')[0].innerText =
        songs[songIndex].songName;

    // Current song GIF → show
    document.getElementById(songs[songIndex].gifId).style.opacity = 1;

    // Current song playlist button → pause
    playListPlay[songIndex].src = "Images/pause-solid.png";
});
playListPlay.forEach((button, i) => {

    button.addEventListener('click', () => {

        // Make every playlist button a play button
        playListPlay.forEach(btn => {
            btn.src = "Images/play-solid.png";
        });
        songs.forEach(song => {
            document.getElementById(song.gifId).style.opacity = 0;
        });

        // Current clicked button becomes pause
        button.src = "Images/pause-solid.png";

        songIndex = i;

        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();

        masterPlay.src = "Images/pause-solid.png";

        document.getElementsByClassName('currentSongName')[0].innerText =
            songs[songIndex].songName;

        document.getElementById(songs[songIndex].gifId).style.opacity = 1;
    });

});

let songDurations = Array.from(
    document.getElementsByClassName('songDuration')
);
function formatTime(seconds) {

    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }

    return `${minutes}:${remainingSeconds}`;
}
songs.forEach((song, i) => {

    let tempAudio = new Audio(song.filePath);

    tempAudio.addEventListener('loadedmetadata', () => {

        songDurations[i].innerText =
            formatTime(tempAudio.duration);

    });

});