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
  const greetings = ["Hello world!", "¡Hola Mundo!", "你好，世界！", "Bonjour le monde!","Salut :^)"];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById("greeting-container");
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
  fetch("/data").then(response => response.json()).then((commentsArray) => {
    var quote = "";
    for (var i = 0; i < commentsArray.length; i++){
      quote = quote + commentsArray[i].message + "\n";
    }
    document.getElementById("data-container").innerText = quote;
  });
}

var currentComments; // Array of local comments
function loadComments(){
  fetch("/data").then(response => response.json()).then((commentsArray) => {
    const commentsListElement = document.getElementById("comments-list");
    currentComments = commentsArray;
    commentsArray.forEach((comment) => {
      commentsListElement.appendChild(createCommentElement(comment));
    })
  });
}

// Creating comment element with delete button 
function createCommentElement(comment) {
  const commentElement = document.createElement("li");
  commentElement.className = "comment";

  const usernameElement = document.createElement("div");
  usernameElement.innerText = comment.username;
  usernameElement.className = "namediv";
  const messageElement = document.createElement("div");
  messageElement.innerText = comment.message;
  messageElement.className = "messagediv";

  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.innerText = "Del";
  deleteButtonElement.addEventListener("click", () => {
    if(comment.username == getCookie("username")){
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

// Deleting a comment from server
function deleteComment(comment) {
  const params = new URLSearchParams();
  params.append("id", comment.id);
  fetch("/delete-comment", {method: "POST", body: params});
}

function getData() {
  var xhr = new XMLHttpRequest();                 
  xhr.onload = function() {                       
    if(xhr.status === 200) {
      var text = xhr.responseText;                  
      refreshComments(JSON.parse(text)); 
    }
  };
  xhr.open("GET", "/data", true);        
  xhr.send(null);                               
}

// Refreshes the data each 2 seconds
const sec = 2;
setInterval(getData, 1000*sec);

// New comments(=comments) are added to the page, and old comments(=currentComments) are removed
function refreshComments(comments){
  var i = comments.length - 1;
  var j = currentComments.length - 1;
  if((i==-1 && j> -1) || (currentComments[0].timestamp < comments[i].timestamp)){
    while(j>-1){
      removeCommentElement(j);
      currentComments.splice(j,1);
      j--;
    }
  }else{
    while(currentComments[0].timestamp >= comments[i].timestamp){
      if(currentComments[j].timestamp!=comments[i].timestamp){
        removeCommentElement(j);
        currentComments.splice(j,1);
        if(j>0)
            j--;
      }
      else{
        if(j>0 && i >0){
            j--;
            i--;
        }else if(j>0){
            j--;
        }else if(i>0){
            i--;
        }else{
            break;
        }
      }
    }
  }
  currentCommentsTS = 0;
  if(j>-1)
    currentCommentsTS = currentComments[0].timestamp;
  while(i>-1 && currentCommentsTS<comments[i].timestamp){
    newComment = createCommentElement(comments[i]);
    const commentsListElement = document.getElementById("comments-list");
    commentsListElement.insertBefore(newComment,commentsListElement.firstChild);
    i--;
  }
  currentComments = comments;
}


// The visual comment element is removed from page
function removeCommentElement(k){
  const commentsListElement = document.getElementById("comments-list").childNodes;
  commentsListElement[k+1].remove();
}

var username=getCookie("username");; 

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user=getCookie("username");
  if (user == "") {
    user = prompt("Please enter your name, in order to be able to delete your own comments:","");
    if (user != "" && user != null) {
      setCookie("username", user, 30);
      username = user;
      document.getElementById("greetings").innerText="Hi "+ user +"! Log Out.";
      document.getElementById("login").innerText = "Log out";
      document.getElementById("name").value = username;
    }
  }else{
      document.getElementById("greetings").innerText="";
      username="";
      document.getElementById("login").innerText = "Log in"
      setCookie("username", "", 30);
  }
} 

function checkLoginStatus(){
  var form = document.getElementById("postcomment");
  if(username == "")
    form.style.visibility = "hidden";
  else {
        form.style.visibility ="visible";
  }
}

/*
function fetchBlobstoreUrlAndShowForm() {
  fetch("/blobstore-upload-url")
    .then((response) => {
      return response.text();
    })
    .then((imageUploadUrl) => {
      const messageBlob = document.getElementById("my-form");
      messageBlob.action = imageUploadUrl;
    });

  fetch("/data-blob")
    .then(response => response.json()).then((blobsArray) => {
    const blobsListElement = document.getElementById("blobs-list");
    blobsArray.forEach((blob) => {
      blobsListElement.appendChild(createBlobElement(blob));
    })
  });
}

function createBlobElement(blob){
  const blobElement = document.createElement("img");
  blobElement.className = "image";
  blobElement.src = blob.url;

  return blobElement;
}
*/

let map;

/* Editable marker that displays when a user clicks in the map. */
let editMarker;

/** Creates a map that allows users to add markers. */
function createMap() {
  map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: 45.5343, lng: 25.2181}, zoom: 4});

  // When the user clicks in the map, show a marker with a text box the user can
  // edit.
  map.addListener('click', (event) => {
    createMarkerForEdit(event.latLng.lat(), event.latLng.lng());
  });

  fetchMarkers();
}

/** Fetches markers from the backend and adds them to the map. */
function fetchMarkers() {
  fetch('/markers').then(response => response.json()).then((markers) => {
    markers.forEach(
        (marker) => {
            createMarkerForDisplay(marker.lat, marker.lng, marker.content)});
  });
}

/** Creates a marker that shows a read-only info window when clicked. */
function createMarkerForDisplay(lat, lng, content) {
  const marker =
      new google.maps.Marker({position: {lat: lat, lng: lng}, map: map});

  const infoWindow = new google.maps.InfoWindow({content: content});
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}

/** Sends a marker to the backend for saving. */
function postMarker(lat, lng, content) {
  const params = new URLSearchParams();
  params.append('lat', lat);
  params.append('lng', lng);
  params.append('content', content);

  fetch('/markers', {method: 'POST', body: params});
}

/** Creates a marker that shows a textbox the user can edit. */
function createMarkerForEdit(lat, lng) {
  // If we're already showing an editable marker, then remove it.
  if (editMarker) {
    editMarker.setMap(null);
  }

  editMarker =
      new google.maps.Marker({position: {lat: lat, lng: lng}, map: map});

  const infoWindow =
      new google.maps.InfoWindow({content: buildInfoWindowInput(lat, lng)});

  // When the user closes the editable info window, remove the marker.
  google.maps.event.addListener(infoWindow, 'closeclick', () => {
    editMarker.setMap(null);
  });

  infoWindow.open(map, editMarker);
}

/**
 * Builds and returns HTML elements that show an editable textbox and a submit
 * button.
 */
function buildInfoWindowInput(lat, lng) {
  const textBox = document.createElement('textarea');
  const button = document.createElement('button');
  button.appendChild(document.createTextNode('Submit'));

  button.onclick = () => {
    postMarker(lat, lng, textBox.value);
    createMarkerForDisplay(lat, lng, textBox.value);
    editMarker.setMap(null);
  };

  const containerDiv = document.createElement('div');
  containerDiv.appendChild(textBox);
  containerDiv.appendChild(document.createElement('br'));
  containerDiv.appendChild(button);

  return containerDiv;
}

function drawChart() {
  fetch('/ufos-data').then(response => response.json())
    .then((ufosSightings) => {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Year');
      data.addColumn('number', 'Sightings');
      Object.keys(ufosSightings).forEach((currentYear) => {
      data.addRow([currentYear, ufosSightings[currentYear]]);
  });

  const options = {
    'title': 'Ufos Sightings',
    'width':600,
    'height':500
  };

  const chart = new google.visualization.LineChart(document.getElementById('chart-container'));
    chart.draw(data, options);
  });
}