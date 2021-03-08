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
//https://cors-anywhere.herokuapp.com/   ,{headers:new Headers({"X-Requested-With":"yesyes"})}
var NewsApi = function () {
  // fetch('http://newsapi.org/v2/top-headlines?country=us&apiKey=bc91210a0992438696a09b31fc10db30')
  // .then(a => a.json())
  // .then(response =>{
  //   for(var i;i<response.articles.length;i++){
  //     document.getElementById('news').innerHTML = "hi";
  //     // "<div style='padding-top:20px;'> <img style='float:left; width:150px;' src="+response.articles[i].urlToImage+"><h1>"+response.articles[i].title+"</h1>"+response.articles[i].source.name+"<br>"+response.articles[i].description+"<a href='"+response.articles[i].url+"'>"+response.articles[i].url+"</a> </div>";
  //   }
  // })

  
};
