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
const highRisk = document.getElementById("highRisk");
const lowRisk = document.getElementById("lowRisk");
const vaccinated = document.getElementById("vaccinated");
const unvaccinated = document.getElementById("unvaccinated");
const nameQr = document.getElementById("name");
const tempData = document.getElementById("tempData");
const form = document.getElementById("form");

var result = '';
var x = '';

let scanning = false;

qrCode.callback = async (res) => {
  if (res) {
    result = JSON.parse(res);
    outputData.innerText = result;
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = true;
    canvasElement.hidden = true;
    btnScanQR.hidden = true;
    if (outputData.innerText != undefined) {
      temp.hidden = false;
      form.hidden = false;
      qr.hidden = true;
    }

  }
};

async function runChecks() {
  const inputTemp = parseFloat(document.getElementById("inputTemp").value);
  temp.hidden = true;
  form.hidden = true;


  if (result.risk == "low" && result.vacc == "true") {
    if (inputTemp < 37.0) {
      granted.hidden = false;
    } else {
      denied.hidden = false;
    }
    vaccinated.hidden = false;
    lowRisk.hidden = false;
  } else {
    denied.hidden = false;
    if (result.risk == "high") {
      highRisk.hidden = false;
    } else {
      lowRisk.hidden = false;
    }
    if (result.vacc == "false") {
      unvaccinated.hidden = false;
    } else {
      vaccinated.hidden = false;
    }
  }
  nameQr.innerText = result.name;
  tempData.innerText = inputTemp + "°C";

  nameQr.hidden = false;
  tempData.hidden = false;
  console.log(inputTemp)
}



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

function reset() {
  location.reload();
}


function waitforme(milisec) {
  return new Promise(resolve => {
    setTimeout(() => { resolve('') }, milisec);
  })
}
