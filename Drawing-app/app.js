window.addEventListener("load", DrawingBoard);
//window.addEventListener("resize", DrawingBoard);

function DrawingBoard() {
  // DOM Elements
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const strokeWidth = document.getElementById("width");
  const clear = document.getElementById("clear");
  const colorsEl = document.getElementById("colors");

  const Colors = [
    "#ff0000",
    "#00ff00",
    "#00ffff",
    "#ffff00",
    "#000000",
    "#ffffff",
  ];

  addRecentColors();

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
  canvas.addEventListener("touchmove", draw);
  clear.addEventListener("click", clearAll);

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
  }

  function draw(e) {
    if (!drawing) return;

    const shapes = document.getElementById("shapes");
    const penColor = document.getElementById("color");
    const type = document.getElementsByName("type");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left || e.touches[0].clientX - rect.left;
    const y = e.clientY - rect.top || e.touches[0].clientY - rect.top;

    ctx.lineWidth = strokeWidth.value;
    ctx.lineCap = "round";
    ctx.fillStyle = penColor.value;
    ctx.strokeStyle = penColor.value;
    

    if (shapes.children[0].selected) {

      // Free hand
      ctx.lineTo(x, y); // Drawing each rounds everytime mouse moves, making a line
      if (!type[0].checked) {
        ctx.stroke(); // Giving stroke to the line
      } else {
        ctx.fill(); // Giving fill to the bounded area
      }

    }else if(shapes.children[1].selected){

      //Line
      ctx.lineTo(x,y);
      ctx.stroke();
      

    }else if(shapes.children[2].selected){
    
      //Rectangle
      ctx.rect(x, y, 150, 100);
      if (!type[0].checked) {
        ctx.stroke(); 
      } else {
        ctx.fill(); 
      }

    }else if(shapes.children[3].selected){
    
      //Arc
      ctx.arc(x, y, 50, 0, 1.5* Math.PI);
      if (!type[0].checked) {
        ctx.stroke(); 
      } else {
        ctx.fill(); 
      }

    }else{

      //Circle
      ctx.arc(x, y, 50, 0, 2 * Math.PI);
      if (!type[0].checked) {
        ctx.stroke(); 
      } else {
        ctx.fill(); 
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
}

function changeColor(color) {
  const penColor = document.getElementById("color");
  penColor.value = color;
}
