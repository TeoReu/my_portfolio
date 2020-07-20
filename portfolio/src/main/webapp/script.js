// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
    const greetings = ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!','Salut :^)'];

    // Pick a random greeting.
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];

    // Add it to the page.
    const greetingContainer = document.getElementById('greeting-container');
    greetingContainer.innerText = greeting;
}

// Change state of buton when run over
function move() {
    const elem = document.getElementById("tom");
    elem.innerHTML = "Nooo"

    const topPos=Math.floor((Math.random() * 350) + 1);
    const leftPos =Math.floor((Math.random() * 350) + 1);

    elem.style.top = topPos + "px"; 
    elem.style.left = leftPos + "px"; 
}

function stop(){
    const elem = document.getElementById("tom");
    elem.innerHTML = "Catch mee!"
}

function reveal(){
    document.getElementById("euler").innerText ="";
    document.getElementById("euler").style.backgroundImage = "url(images/euler.png)";
}

function hide(){
    document.getElementById("euler").innerText ="Euler's Identity";
    document.getElementById("euler").style.backgroundImage = none;
}

function search(){
    window.location.replace("https://github.com/TeoReu/teoreu.github.io/blob/master/Euler_s_Identity%20(8).pdf");
}


var nr = 1;

function changePhotoRight(){
    if (nr==6){
        nr = 1;
    } else {
        nr = nr + 1;
    }
    document.getElementById("photo").src = "images/gallery/" + nr + ".png";
}

function changePhotoLeft(){
    if (nr==1){
        nr = 6;
    } else {
        nr = nr - 1;
    }
    document.getElementById("photo").src = "images/gallery/" + nr + ".png";
}

function getMusic(){
    const songs = ["https://www.youtube.com/watch?v=-EzURpTF5c8",
    "https://www.youtube.com/watch?v=TNRCvG9YtYI",
    "https://www.youtube.com/watch?v=So718wk426c",
    "https://www.youtube.com/watch?v=8B1oIXGX0Io",
    "https://www.youtube.com/watch?v=d27gTrPPAyk",
    "https://www.youtube.com/watch?v=hYKYka-PNt0",
    "https://www.youtube.com/watch?v=SRmCEGHt-Qk",
    "https://www.youtube.com/watch?v=bVeOdm-29pU",
    "https://www.youtube.com/watch?v=RBSaCAxJMdI",
    "https://www.youtube.com/watch?v=lXYKGL6MgKM",
    "https://www.youtube.com/watch?v=u9sq3ME0JHQ",
    "https://www.youtube.com/watch?v=3zrSoHgAAWo",
    "https://www.youtube.com/watch?v=eKVQTLLUR3U",
    "https://www.youtube.com/watch?v=-dD2hTNEL3g"];

    const song = songs[Math.floor(Math.random() * songs.length)];
    window.location.replace(song);
}

function getData() {
    fetch('/data').then(response => response.json()).then((commentsArray) => {
        var quote = commentsArray[1];
        document.getElementById('data-container').innerText = quote;
    });
}