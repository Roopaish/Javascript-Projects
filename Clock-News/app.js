var CurrentTime = function () {
  clock = document.getElementById("clock");

  now = new Date();

  hr = now.getHours();
  meridian = "AM";
  if (hr > 12) {
    hr = hr - 12;
    meridian = "PM";
  }

  min = now.getMinutes();
  sec = now.getSeconds();

  clock.innerText = `${hr}:${min}:${sec} ${meridian}`;
};
setInterval(CurrentTime, 1000); //calling fxn every second
window.addEventListener("load", () => {
  NewsApi();
});

// News
// image = document.getElementById('image');
// author_date = document.getElementById('author-date');
// title = document.getElementById('title');
// description = document.getElementById('description');
// link = document.getElementById('link');
news = document.getElementById("news");
var NewsApi = function () {
  fetch(
    "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=vHGgEvamzPaHT4fAn8SOZA2QdSGK1ZHK"
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      for (var i = 0; i <= res.num_results; i++) {
        news.innerHTML += `
        <div id="news${i}">
        <div id="image">
          <img src="${res.results[i].multimedia[0].url}" alt="">
        </div>
        <div id="title">
          ${res.results[i].title}
        </div>
        <div id="author-date">
          ${res.results[i].byline}    ${res.results[i].published_date}
        </div>
        <div id="description">
          ${res.results[i].abstract}
        </div>
        <div id="link">
          <a href="${res.results[i].url}" target="_blank">Full Article</a>
        </div>
        </div>
        `;
      }
    });
};

//f82e56fc8b7358f0df8fbf1116fa31fe
