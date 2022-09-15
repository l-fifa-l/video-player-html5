// get the elements from HTML
let video = document.getElementById('video');
let seekbar = document.getElementById('seekbar');
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
video.addEventListener('loadedmetadata', initializeVideo);

// when the Page loades
window.onload = function () {
  video.addEventListener('timeupdate', UpdateTheTime, false);
  video.addEventListener('durationchange', SetSeekBar, false);
};

// seek by value (forward, backward)
let value = 10;

// function to play pause the video
function playPauseVideo() {
  if (video.paused || video.ended) {
    video.play();
    document.getElementById('playPauseButton').innerHTML = 'Playing';
  } else {
    video.pause();
    document.getElementById('playPauseButton').innerHTML = 'Paused';
  }
}

// Forward the video
function forward() {
  video.currentTime += value;
}

// Backward the video
function backward() {
  video.currentTime -= value;
}

// --------------------------------------------------------------------------------------------------
// Seekbar Controll Functions Start
// --------------------------------------------------------------------------------------------------

// fires when page loads, it sets the min and max range of the video
function SetSeekBar() {
  seekbar.min = 0;
  seekbar.max = video.duration;
}

// fires when seekbar is changed
function ChangeTheTime() {
  video.currentTime = seekbar.value;
}

// Set Duration of the video
// formatTime takes a time length in seconds and returns the time in
// minutes and seconds
function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
}
// initializeVideo sets the video duration, and maximum value of the
// progressBar
function initializeVideo() {
  const videoDuration = Math.round(video.duration);
  const time = formatTime(videoDuration);
  duration.innerText = `${time.minutes}:${time.seconds}`;
  duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
}

// Update Duration of the video
// fires when video plays and the time is updated in the video element, this
//  writes the current duration elapsed in the label element
function UpdateTheTime() {
  let sec = video.currentTime;
  let h = Math.floor(sec / 3600);
  sec = sec % 3600;
  let min = Math.floor(sec / 60);
  sec = Math.floor(sec % 60);
  if (sec.toString().length < 2) sec = '0' + sec;
  if (min.toString().length < 2) min = '0' + min;
  document.getElementById('time-elapsed').innerHTML = h + ':' + min + ':' + sec;
  seekbar.min = video.startTime;
  seekbar.max = video.duration;
  seekbar.value = video.currentTime;
}

// --------------------------------------------------------------------------------------------------
// Seekbar Controll Functions End
// --------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------
// Select Video File
// --------------------------------------------------------------------------------------------------
const localFileVideoPlayer = () => {
  let URL = window.URL || window.webkitURL;
  let playSelectedFile = function (event) {
    let file = this.files[0];
    let fileURL = URL.createObjectURL(file);
    video.src = fileURL;
  };
  let inputNode = document.getElementById('videofile');
  inputNode.addEventListener('change', playSelectedFile, false);
};

localFileVideoPlayer();

// --------------------------------------------------------------------------------------------------
// Select SRT File
// --------------------------------------------------------------------------------------------------
const localFileSrt = () => {
  function handleFiles() {
    let file = this.files[0];
    let fileURL = URL.createObjectURL(file);
    let srtTrack = document.getElementById('subtitlesfile');
    srtTrack.src = fileURL;
  }

  let srtTrack = document.getElementById('srtfile');
  srtTrack.addEventListener('change', handleFiles, false);
};

localFileSrt();
