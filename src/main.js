const qrCode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
const temp = document.getElementById("temp");
const qr = document.getElementById("qr");
const granted = document.getElementById("granted");
const denied = document.getElementById("denied");

let scanning = false;

qrCode.callback = async (res) => {
  if (res) {
    outputData.innerText = res;
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = true;
    canvasElement.hidden = true;
    btnScanQR.hidden = true;
    if (outputData.innerText != undefined) {
      temp.hidden = false;
      qr.hidden = true;
      var qrData = res;
    }
    await waitforme(3000);
    temp.hidden = true;
    if (qrData == "true"){
      granted.hidden = false;
    }else {
      denied.hidden = false;
    }
    
  }
};

btnScanQR.onclick = () => {
  qr.hidden = false
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "user" } })
    .then(function (stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true);
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrCode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

function reset(){
  granted.hidden = true;
  denied.hidden = true;
  btnScanQR.hidden = false;
}

function waitforme(milisec) {
  return new Promise(resolve => {
      setTimeout(() => { resolve('') }, milisec);
  })
}
