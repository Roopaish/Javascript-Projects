window.addEventListener("load", DrawingBoard);
window.addEventListener("resize", DrawingBoard);

function DrawingBoard() {
  // DOM Elements
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const fillColor = document.getElementById("fill");
  const strokeColor = document.getElementById("stroke");
  const shapes = document.getElementById("shapes");
  const strokeWidth = document.getElementById("width");
  strokeWidth.value = "3";

  canvas.width = 0.8 * window.innerWidth;
  canvas.height = 0.8 * window.innerHeight;
  let drawing = false;

  // EventListeners
  canvas.addEventListener("mousedown", startPosn);
  canvas.addEventListener("mouseup", finishPosn);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("touchstart", startPosn);
  canvas.addEventListener("touchend", finishPosn);
  canvas.addEventListener("touchmove", drawTouch);

  // Function
  function startPosn() {
    drawing = true;
  }

  function finishPosn() {
    drawing = false;
    ctx.beginPath(); // Reset the beginning of the line
  }

  function draw(e) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Giving our pen properties
    ctx.lineWidth = strokeWidth.value;
    ctx.lineCap = "round";
    ctx.fillStyle = fillColor.value;
    ctx.strokeStyle = strokeColor.value;

    // Drawing each rounds everytime mouse moves, making a line
    ctx.lineTo(x, y);
    ctx.stroke(); // Giving stroke to the line
  }

  function drawTouch(e) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;

    ctx.lineWidth = strokeWidth.value;
    ctx.lineCap = "round";
    ctx.fillStyle = fillColor.value;
    ctx.strokeStyle = strokeColor.value;

    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// ctx.strokeStyle = "red";
// ctx.fillStyle ="blue";
// ctx.fillRect(50,50,100,100);
// ctx.lineWidth = "10";
// ctx.strokeRect(100,100,100,100);

//ctx.beginPath();// begin path
// ctx.moveTo(50,50);//put our cursor in there
// ctx.lineTo(100,100);//make line to here
// ctx.lineTo(100,200);
// ctx.closePath();//close loop
// ctx.stroke(); //apply stroke in the path
