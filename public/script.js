const recordingsContainer = document.getElementById("track-container")
var database = null;
getData();

//setTimeout(makeEventForCheckbox,3000)
// console.log(recordingsContainer);
0
let chunks = []; // will be used later to record audio
let mediaRecorder = null; // will be used later to record audio
let audioBlob = null; // the blob that will hold the recorded audio


function getData() {

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    database = JSON.parse(this.responseText)
  }

  xhr.open("GET", "/data")
  xhr.send()

}

makeEventForCheckbox();

function makeEventForCheckbox() {
  const querySelector = document.querySelectorAll(".checkboxx");
  querySelector.forEach(element => {
    element.addEventListener("click", filterTracks);
  });
}


function filterTracks(event) {

  const querySelector = document.querySelectorAll(".checkboxx");
  const checkedArray = [];

  querySelector.forEach(element => {

    if (element.checked) {
      checkedArray.push(element.value);
    }

  })
  displayFiltredTracks(checkedArray);
  //console.log(checkedArray);
}

function displayFiltredTracks(checkedArray) {
  let filteredArray = []

  database.tracks.forEach(element => {
      if ( checkedArray.includes(element.class)) {
        filteredArray.push(element)
      }
  })
  createRecordingElement(filteredArray)
}

function playTrack(event){
//console.log(event.target);
event.target.parentElement.parentElement.children[0].play()

}

function createRecordingElement(filteredArray) {

  let n=0;
  html = "";
  filteredArray.forEach(element => {
    html += `<div class="row" id="recording">

  

        <div class="play-box">
        <audio src="/${element.id}.mp3"></audio>
          <small style="font-size: 18px;"> ${element.name} </small>
          <small style="float: right; font-size:18px;"> 00:10 </small><br><br>
          <div class="botón position divPlay" onclick="this.classList.toggle('active')">
            <div class="fondo" x="0" y="0" width="200" height="200"></div>
            <div class="icono" width="200" height="200">
              <div class="parte izquierda" x="0" y="0" width="200" height="200" fill="#fff"></div>
              <div class="parte derecha" x="0" y="0" width="200" height="200" fill="#fff"></div>
            </div>
            <div class="puntero" onclick="playTrack(event)"></div>
          </div>

        </div>

        <select name="select_modal" id="select_modal" class="select_modal">
          <option value="${element.class}">${element.class}</option >
        </select>

        <div id="datetime-1" class="datetime">2022-09-08 10-22-14</div>

        <div class="dropdown">
          <div class="moreSign"></div>
          <div class="dropdown-content">
            <a href="#">link 1</a>
            <a href="#">link 2</a>
            <a href="#">link 3</a>
          </div>
        </div>

      </div> `

  })
    
  
  document.getElementById('NewrowBottomRight').innerHTML = html;

}

/*function updateHtmlBottomRight(listOfSounds) {
  html = "";
  for (let i = 0; i < listOfSounds.length; i++) {
    html += `
        <div class="row">
    
            <div class="play-box">
                <small style="font-size: 18px;">${listOfSounds[i]}</small>
                <small style="float: right; font-size:18px;"> 00:10 </small><br><br>
                <div class="botón position divPlay" onclick="this.classList.toggle('active')">
                 <div class="fondo" x="0" y="0" width="200" height="200"></div>
                    <div class="icono" width="200" height="200">
                      <div class="parte izquierda" x="0" y="0" width="200" height="200" fill="#fff"></div>
                      <div class="parte derecha" x="0" y="0" width="200" height="200" fill="#fff"></div>
                    </div>
                    <div class="puntero"></div>
                </div>
    
            </div>
    
        <select name="select-1" id="select-1" class="level">
          <option value="C1">C1</option>
          <option value="C2">C2</option>
          <option value="C3">C3</option>
          <option value="C4">C4</option>
        </select>
    
        <div id="datetime-1" class="datetime">2022-09-08 10-22-14</div>
    
        <div class="dropdown">
          <div class="moreSign"></div>
          <div class="dropdown-content">
            <a href="#">link 1</a>
            <a href="#">link 2</a>
            <a href="#">link 3</a>
          </div>
        </div>
    
      </div> `
  }
 
  document.getElementById('NewrowBottomRight').innerHTML = html;
}*/



function hiderec() {
  const div = document.getElementById("ToHideWhenRec")
  div.className = "hiding"
}

/* function mediaRecorderStop() {
    // check if there are any previous recordings and remove them
    if (recordedAudioContainer.firstElementChild.tagName === 'AUDIO') {
        recordedAudioContainer.firstElementChild.remove();
    }
    /* const audioElm = document.createElement('audio');
    audioElm.setAttribute('controls', ''); // add controls
    audioBlob = new Blob(chunks, { type: 'audio/mp3' });
    const audioURL = window.URL.createObjectURL(audioBlob);
    audioElm.src = audioURL;
    // show audio
    const audio = document.getElementById("audioContainer"); 
    recordedAudioContainer.insertBefore(audioElm,audio);
    recordedAudioContainer.classList.add('d-flex');
    recordedAudioContainer.classList.remove('d-none');
    // reset to default
    mediaRecorder = null;
     *///chunks = [];
//let audio = `<audio src=""></audio>`

//} 


function mediaRecorderDataAvailable(e) {
  chunks.push(e.data);
}

function record() {

  showWhileRec();
  hiderec();
  if (!mediaRecorder) {
    // start recording
    navigator.mediaDevices.getUserMedia({
      audio: true,
    })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        mediaRecorder.ondataavailable = mediaRecorderDataAvailable;
        //mediaRecorder.onstop = openModal;
      })
      .catch((err) => {
      });
  }
}


function showWhileRec() {

  const div = document.getElementById("circle")
  const div1 = document.getElementById("spanRec")
  const div2 = document.getElementById("stopRecButt")

  div.className = "showRecCircle"
  div1.className = "showSpanRec"
  div2.className = "buttonStopRec"

  div.style.display = "block"
  div1.style.display = "block"
  div2.style.visibility = "visible"
}

window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  backToNormalRecordVision();
  mediaRecorder.stop();
}

function openModal1() {

  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
}

function addClass(name) {

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    json = JSON.parse(xhr.responseText)
    updateHtmlBottomLeft(json.nameOfClasses)
  }
  xhr.open("GET", "/addClass?NameOfClassQuery=" + name)
  xhr.send()
}

function updateHtmlBottomLeft(input) {

  newClass = input[input.length - 1];

  string = '<input type="checkbox" id="' + newClass +
    '" class="checkboxx"> <label class="bottom" ' +
    'style="font-weight:bold;" for="checkbox1">' + newClass + '</label>' +
    '<br><br>'

  document.getElementById('ToaddFromAjax').innerHTML += string
}

function closeModall1() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "none";
}


function closeModall() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}


function showMessageSave1() {
  var message = document.getElementById("inputModalAddClass").value
  alert("Class " + message + " Saved!");
  closeModall1();
  addClass(message);
}

function dismissOperation() {
  closeModall1();
}

function showMessageSave() {
  closeModall();
  //addNewSound();
  saveRecording();
}

function saveRecording() {

  audioBlob = new Blob(chunks, { type: 'audio/mp3' });
  const audioURL = window.URL.createObjectURL(audioBlob);
  const newSoundName = document.getElementById("inputModalSound").value;
  const classSound = document.getElementById("select_modal").value;


  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.mp3');
  fetch('/record', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then(() => {
      resetRecording();
      fetchRecordings();
    })
    .catch((err) => {
      console.error(err);
      alert('An error occurred, please try again later');
      resetRecording();
    });




  fetch('/newTrackArrived', {
    method: 'POST',
    body: JSON.stringify({
      name: newSoundName,
      class: classSound
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then((res) => {
      //data = res;
    })
    .catch((err) => {
      console.log(err);
    });
}

/* function addNewSound() {
 
  const newSoundName = document.getElementById("inputModalSound").value;
 
  const xhr = new XMLHttpRequest();
 
  xhr.onload = function () {
    json = JSON.parse(xhr.responseText)
    updateHtmlBottomRight(json.tracks)
    saverJson(json.tracks)
  }
 
  xhr.open("GET", "/addedSound?NameOfAddedSound=" + newSoundName + "&classSound=" + classSound);
  xhr.send();
} */

function fetchRecordings() {
  fetch('/recordings')
    .then((response) => response.json())
    .then((response) => {
      if (response.success && response.files) {
        //remove all previous recordings shown
        //recordingsContainer.innerHTML = '';
        response.files.forEach((file) => {
          //create the recording element


          const recordingElement = createRecordingElement(file);
          //updateHtmlBottomRight(file)


          //add it the the recordings container
          //recordingsContainer.appendChild(recordingElement);
        })
      }
    })
    .catch((err) => console.error(err));
}

function resetRecording() {
  /* if (recordedAudioContainer.firstElementChild.tagName === 'AUDIO') {
    //remove the audio
    recordedAudioContainer.firstElementChild.remove();
    //hide recordedAudioContainer
    recordedAudioContainer.classList.add('d-none');
    recordedAudioContainer.classList.remove('d-flex');
  } */
  //reset audioBlob for the next recording
  //mediaRecorder = null;
  chunks = []
  audioBlob = null;
}


//create the recording element



//button4 = document.getElementById("button4")
//button4.addEventListener('click', playRecording); 

function playRecording(e) {
  let button = e.target;
  if (button.tagName === 'IMG') {
    //get parent button
    button = button.parentElement;
  }
  //get audio sibling
  const audio = button.previousElementSibling;
  if (audio && audio.tagName === 'AUDIO') {
    if (audio.paused) {
      //if audio is paused, play it
      audio.play();
      //change the image inside the button to pause
      button.firstElementChild.src = 'images/pause.png';
    } else {
      //if audio is playing, pause it
      audio.pause();
      //change the image inside the button to play
      button.firstElementChild.src = 'images/play.png';
    }
  }
}

function backToNormalRecordVision() {
  const div0 = document.getElementById("ToHideWhenRec");
  const div = document.getElementById("circle")
  const div1 = document.getElementById("spanRec")
  const div2 = document.getElementById("stopRecButt")

  div.className = "showRecCircle"
  div1.className = "showSpanRec"
  div2.className = "buttonStopRec"

  div0.style.display = "block"
  div1.style.display = "none"
  div2.style.visibility = "hidden"
  div.style.display = "none";
}



