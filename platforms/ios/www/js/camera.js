
function onDeviceReady(){
  navigator.camera.getPicture(onSuccess, onFail, { quality: 100, targetWidth: 720, targetHeight: 480, destinationType: Camera.DestinationType.FILE_URI });
    //document.getElementById("note").innerHTML = "ready";
}

function onSuccess(imageURI) {
    var image = document.getElementById('patientRoom');
    //image.style.backgroundImage = "url(" + string + ")";
    image.src = imageURI;
    navigator.camera.cleanup(afterSuccess, afterFail);
    //document.getElementById("note").innerHTML = imageURI;
}

function onFail(message) {
  //document.getElementById("note").innerHTML = message;
}

function afterSuccess() {
  //document.getElementById("note").innerHTML = "clear success";
}

function afterFail(message) {
  //document.getElementById("note").innerHTML = "clear fail " + message;
}

function takePhoto(){
  document.getElementById('logNotes').innerHTML = "clicked"
  document.addEventListener("deviceready", onDeviceReady, false);
}

function init(){
  document.getElementById('take_photo').addEventListener('click', takePhoto);
  //canvasCreator();
  //document.getElementById("note").innerHTML = "here";
}

function canvasCreator(){
  for(var j=1; j<6; j++){
    for(var i = 0; i<5; i++){
      var headerOne = document.createElement("h1");
      var num = i * 13;
      headerOne.id = i + "" + j;
      console.log(headerOne.id);
      var row = "row"+j;
      headerOne.className="image_div";
      headerOne.style.marginLeft=num+"vw";
      headerOne.style.backgroundColor="none";
      document.getElementById(row).appendChild(headerOne);
    }
  }
}

window.addEventListener('load', init);
