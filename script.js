//const token = 'd8a486b2a13346e5937a39d4e66a2484';

//For the parallax page
const text = document.querySelector('#text');
const leaf = document.querySelector('#leaf');
const hill1 = document.querySelector('#hill1');
const hill4= document.querySelector('#hill4');
const hill5 = document.querySelector('#hill5');
//Configuring the parallax page scroll according to scroll behaviour
window.addEventListener('scroll', () => {
    const val = window.scrollY;
    text.style.marginTop = val*1.3 + 'px';
    leaf.style.top = val*-1.5 + 'px';
    leaf.style.left = val*1.5 + 'px';
    hill5.style.left = val*1.1 + 'px';
    hill4.style.left = val*-1.1 + 'px';
})

//Variables for various DOM elements
const playBtn = document.querySelector('#mainPlayBtn');
const audio = document.querySelector('#audio');
const btnPrev = document.querySelector('#btnPrev');
const btnNext = document.querySelector('#btnNext');
const artistName = document.querySelector('.artist-name');
const trackTitle = document.querySelector('.song-name');
const seek_slider = document.querySelector('.timeline-slider .slider');
const cover = document.querySelector('.cover');
const thumb = document.querySelector('.slider-thumb');
const progress = document.querySelector('.progress');
const time = document.querySelector('.time');
const fullTime = document.querySelector('.fulltime');
const volumeIcon = document.querySelector('.volume-icon');
const volumeProgress = document.querySelector('.volume-slider');
const volumeSlider = document.querySelector('.volume-slider .slider');
const shuffleBtn = document.querySelector('#shuffleBtn');
const loopBtn = document.querySelector('#loopBtn');
let muteBtn = document.querySelector('#volume-lowMute');

//For track playing
let trackPlaying = false;
//If muted
let volumeMuted = false;
//For trak no. being played
let trackID = 0;
//Random is On
let isRandom = false;
//TrackNames
const tracks = ['Immortal', 'One Love', 'Better Now', 'The Way you felt', 'One More Night', 'Demons'];
//Artist Names
const names = ['NEFFEX', 'SHUBH', 'POST MALONE', 'ALEC BENJAMIN', 'MAROON 5', 'IMAGINE DRAGONS'];
//Cover pictures
const covers = ['cover1', 'cover2', 'cover3', 'cover4', 'cover5', 'cover6'];
//To update the timer of the song
let updateTimer;
//To check whether muted or not
let muted = false;


//Event Listener on the Play button
playBtn.addEventListener('click', playTrack);
//Event Listener on the Play button
btnPrev.addEventListener('click', prevTrack);
//Event Listener on the Play button
btnNext.addEventListener('click', nextTrack);
//Event Listener on the Play button
loopBtn.addEventListener('click', loopTrack);
//Event Listener on the Play button
shuffleBtn.addEventListener('click', shuffleTrack);
//Event Listener on the Mute Button
muteBtn.addEventListener('click', muteAudio);

loadTrack(trackID);
switchTrack();
//Funtion to start playing
function playTrack() {
    trackPlaying = !trackPlaying;
    artistName.innerText = names[trackID];
    trackTitle.textContent = tracks[trackID];
    if(trackPlaying){
        audio.play();
        playBtn.textContent = '';
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    else{
        audio.pause();
        playBtn.textContent = '';
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}
//To switch tracks
function switchTrack(){
    if(trackPlaying==true){
        audio.play();
    }
}
//Getting new Address
const trackSrc = './assets/audios/'+covers[trackID]+'.mp3';
//Loading Tracks
function loadTrack(index){
    reset();
    clearInterval(updateTimer);
    audio.src = './assets/audios/'+covers[index]+'.mp3' ;
    audio.load();
    artistName.innerText = names[index];
    trackTitle.textContent = tracks[index];
    cover.src = './assets/covers/'+ covers[index]+'.jpg';
    updateTimer = setInterval(setUpdate, 1000);
}
//Previous Song
function prevTrack() {
    trackID--;
    if(trackID<0) trackID = tracks.length - 1;
    loadTrack(trackID);
    switchTrack();
}
//Next Song
function nextTrack() {
    trackID++;
    if(trackID==tracks.length) trackID =0 ;
    loadTrack(trackID);
    switchTrack();
}
//Loop over the same track
function loopTrack(){
    let curr = trackID;//Playing the same song again
    loadTrack(curr);
    switchTrack();
}
//Random Song Next
function shuffleTrack() {
    let rand;
    do{
        rand = Math.floor(Math.random() * tracks.length);
    }while((rand<0 && rand>=tracks.length)&& rand==trackID);
    loadTrack(rand); console.log(rand);
    switchTrack();
}
//Change to next song when current ends
audio.addEventListener('ended', nextTrack);
//To reset the song parameters
function reset() {
    time.textContent = '00:00';
    fullTime.textContent = '00:00';
    seek_slider.value = 0;
}
//To update the timer
function setUpdate() {
    let seekPosition = 0;
    if(!isNaN(audio.duration)){
        seekPosition = audio.currentTime * (100/ audio.duration);
        seek_slider.value = seekPosition;

        let currMin = Math.floor(audio.currentTime / 60);
        let currSec = Math.floor(audio.currentTime - currMin*60);
        let durMin = Math.floor(audio.duration / 60);
        let durSec = Math.floor(audio.duration - durMin*60);

        if(currSec < 10) {currSec = '0'+ currSec;}
        if(durSec < 10) {durSec = '0'+ durSec;}
        if(currMin < 10) {currMin = '0'+ currMin};
        if(durMin < 10) { durMin = '0'+ durMin};

        time.textContent = currMin + ":" + currSec;
        fullTime.textContent = durMin + ":" + durSec;
    }
}
//Seeking to a different portion of the song when clicked on the slider
seek_slider.addEventListener('input', function () {
    audio.currentTime = audio.duration * (seek_slider.value / 100);
    setUpdate();
});
//Changing volume as desired
volumeProgress.addEventListener('input', function(){
    audio.volume = (volumeSlider.value / 100);
})
//To mute Audio
function muteAudio() {
    muted = !muted;
    if(muted){
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
    else{
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
    }
    audio.volume = muted? 0: 1;
}