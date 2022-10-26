var microm = new Microm();
var mp3 = null;
/*
start();
setTimeout(stop, 1500);
*/
function start() {

  const record = document.getElementById("button1")
  record.onclick = stop
  microm.record().then(function() {
    console.log('recording...')
  }).catch(function() {
    console.log('error recording');
  });

  hiderec()
  showWhileRec()
}

function stop() {
  microm.stop().then(function(result) {
    mp3 = result;
    console.log(mp3.url, mp3.blob, mp3.buffer);

    play();
    download();
  });
}

function play() {
  microm.play();
}

function download() {
  var fileName = 'cat_voice';
  microm.download(fileName);
}