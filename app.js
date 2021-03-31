const projects = [
  "Clock-News",
  "Tip-Calculator",
  "To-do list",
  "CSS-Grid gallery",
  "Drawing-app"
];
const main = document.getElementById("main");
const images = [
  "clocknews.png",
  "tip-calculator.png",
  "To-do.png",
  "gallery.png",
  "Drawing-app.png"
];

addProjectsToDOM();
function addProjectsToDOM() {
  projects.forEach((project, index) => {
    main.innerHTML += `
    
    <div class="item">
      <a href="${project}/index.html">
        <img src="img/${images[index]}" alt="${project}">
      </a>
      <p>${project}</p>
    </div>
  `;
  });
}

console.log(main.innerHTML);