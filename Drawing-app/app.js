const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// DOM Elements
const clear = document.getElementById("clear");
const colorsEl = document.getElementById("colors");
const undoEl = document.getElementById("undo");
const redoEl = document.getElementById("redo");
const penEl = document.getElementById("pen-range");
let history = [];
let index = -1;

const Colors = [
  "#ff0000",
  "#00ff00",
  "#00ffff",
  "#ffff00",
  "#000000",
  "#ffffff",
];

addRecentColors();

penEl.value = "3";

canvas.width = 0.8 * window.innerWidth;
canvas.height = 0.8 * window.innerHeight;
let drawing = false;

// EventListeners
canvas.addEventListener("mousedown", startPosn);
canvas.addEventListener("mouseup", finishPosn);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchstart", startPosn);
canvas.addEventListener("touchend", finishPosn);
canvas.addEventListener("touchmove", draw);
clear.addEventListener("click", clearAll);
undoEl.addEventListener("click",undo);
redoEl.addEventListener("click",redo);


// Function
function startPosn(e) {
  drawing = true;
  draw(e); // for the dots
}

function finishPosn() {
  drawing = false;
  ctx.beginPath(); // Reset the beginning of the line
  
  const penColor = document.getElementById("color");

  let isDuplicate = false;
  Colors.forEach((color) => {
    if (color == penColor.value) {
      isDuplicate = true;
    }
  });
  if (!isDuplicate) {
    Colors.unshift(penColor.value);
    Colors.splice(4, 1);
    addRecentColors();
  }

  history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  index = history.length - 1;
}

function draw(e) {
  if (!drawing) return;

  const shapes = document.getElementById("shapes");
  const penColor = document.getElementById("color");
  const type = document.getElementsByName("type");
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left || e.touches[0].clientX - rect.left;
  const y = e.clientY - rect.top || e.touches[0].clientY - rect.top;

  ctx.lineWidth = penEl.value;
  ctx.lineCap = "round";
  ctx.fillStyle = penColor.value;
  ctx.strokeStyle = penColor.value;


  if (shapes.children[0].selected) {

    // Free hand
    ctx.lineTo(x, y); // Drawing each rounds everytime mouse moves, making a line
    applyColor()      

  }else if(shapes.children[1].selected){
  
    //Rectangle
    ctx.rect(x, y, 150, 100);
    applyColor()      

  }else if(shapes.children[2].selected){
  
    //Arc
    ctx.arc(x, y, 50, 0, 1.5* Math.PI);
    applyColor()      

  }else{

    //Circle
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    applyColor()      
  }

  function applyColor(){
    if (type[0].checked) {
      floodFill(x, y, getColor(x, y), penColor);
    }else if(type[1].checked){
      ctx.fill(); // Giving fill to the bounded area
    }else{
      ctx.stroke(); // Giving stroke to the line
    }
  }
}

function clearAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function addRecentColors() {
  colorsEl.innerHTML = "";
  Colors.forEach((color) => {
    colorsEl.innerHTML += `
    <button onclick="changeColor('${color}')">
      <i class="fa fa-circle" aria-hidden="true" style="color:${color};"></i>
    </button>
  `;
  });
}

function changeColor(color) {
  const penColor = document.getElementById("color");
  penColor.value = color;
}

function undo(){
  if(index <= 0){
    clearAll();
  }else{
    index -= 1;
    ctx.putImageData(history[index], 0, 0);
  }
}

function redo(){
  if(index >= history.length){
    ctx.putImageData(history[index], 0, 0)
  }else{
    index += 1;
    ctx.putImageData(history[index], 0, 0);
  }
}



//extra
// function getColor(x,y){
//   var p = ctx.getImageData(x, y, 1, 1).data; //Uint8ClampedArray(4)[r, g, b, a]]
//   var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
//   console.log(p,hex)
// }

// function rgbToHex(r, g, b) {
//   // if (r > 255 || g > 255 || b > 255)
//   //     throw "Invalid color component";
//   return ((r << 16) | (g << 8) | b).toString(16);
// }

// function hexToRgb(hex) {
//   return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
// }


// function setColor(x, y, fillColor){
//   var imgData = ctx.createImageData(1, 1);
//   var color = hexToRgb(fillColor)
//   console.log(color)
//   for (var i = 0; i < imgData.data.length; i += 4) {
//     imgData.data[i+0] = color[0];
//     imgData.data[i+1] = color[1];
//     imgData.data[i+2] = color[2];
//     imgData.data[i+3] = 255;
//   }
//   ctx.putImageData(imgData, x, y);
// }

// function floodFill(x, y, oldColor, fillColor){
//   if(getColor(x, y) == oldColor){
//     setColor(x, y, fillColor)
//     floodFill(x, y+1, oldColor, fillColor)
//     floodFill(x+1, y, oldColor, fillColor)
//     floodFill(x, y-1, oldColor, fillColor)
//     floodFill(x-1, y, oldColor, fillColor)
//   }
// }
