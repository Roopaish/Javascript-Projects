body = document.querySelector("body");
add = document.querySelector(".add");
list = document.querySelector(".list");

add.addEventListener("click", () => {
  task = document.getElementById("task");
  list.innerHTML += `
  <div class="todo">
          <li>${task.value}<i class="fa fa-trash-alt"></i><i class="fa fa-check"></i></li>
  </div>
  `;
});
