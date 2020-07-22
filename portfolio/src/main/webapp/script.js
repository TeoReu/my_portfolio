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
        var quote = "";
        for (var i = 0; i<commentsArray.length; i++ ){
            quote = quote + commentsArray[i].message + "\n";
        }
        document.getElementById('data-container').innerText = quote;
    });
}

var currentComments;
function loadComments(){
    fetch('/data').then(response => response.json()).then((commentsArray) => {
        const commentsListElement = document.getElementById('comments-list');
        currentComments = commentsArray;
        commentsArray.forEach((comment) => {
            commentsListElement.appendChild(createCommentElement(comment));
        })
    });
}

function createCommentElement(comment) {
    const commentElement = document.createElement('li');
    commentElement.className = 'comment';

    const usernameElement = document.createElement('div');
    usernameElement.innerText = comment.username;
    usernameElement.className = 'namediv';
    const messageElement = document.createElement('div');
    messageElement.innerText = comment.message;
    messageElement.className = 'messagediv';

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.innerText = 'Delete';
    deleteButtonElement.addEventListener('click', () => {
        let test = prompt("Enter passcode:", "");
        if(test == "1234"){
            deleteComment(comment);
            var index = currentComments.indexOf(comment);
            currentComments.splice(index,1);
            commentElement.remove();
        }
    });

    commentElement.appendChild(usernameElement);
    usernameElement.appendChild(deleteButtonElement);
    commentElement.appendChild(messageElement);

    return commentElement;
}

function deleteComment(comment) {
    const params = new URLSearchParams();
    params.append('id', comment.id);
    fetch('/delete-comment', {method: 'POST', body: params});
}

function getData() {
  var xhr = new XMLHttpRequest();                 // Create XMLHttpRequest object

  xhr.onload = function() {                       // When response has loaded
    // The following conditional check will not work locally - only on a server
    if(xhr.status === 200) {
      var text = xhr.responseText;
      document.getElementById('live').innerHTML = text;
      document.getElementById('check').innerHTML = JSON.parse(text);                         // If server status was ok
      refreshComments(JSON.parse(text)); // Update
    }
  };

  xhr.open('GET', '/data', true);        // Prepare the request
  xhr.send(null);                                 // Send the request
}

setInterval(getData, 1000*10);

function refreshComments(comments){
  document.getElementById('check').innerHTML = currentComments.length; 
  for( var i = 0; i<currentComments.length; i++){
    if(objNotInList(currentComments[i],comments)){
        currentComments[i].remove(); //how do i get to the graphic element
    }
  }

  for( var j = comments.length - 1; j > -1; j--){
      if(objNotInList(comments[j],currentComments)){
          newComment = createCommentElement(comments[j]);
          const commentsListElement = document.getElementById('comments-list');
          commentsListElement.appendChild(newComment);
          document.getElementById('check').innerHTML = "Hiiiiiiii"; 
      }
  }
  currentComments = comments;
}


function objNotInList(comment, comments){
  for( var i = 0; i<comments.length; i++){
    if(comment.timestamp == comments[i].timestamp)
      return false;
  }
  return true;
}