const carousel = document.querySelector(".c-carousel");
const nextButton = document.querySelector(".c-carousel-control-next");
const prevButton = document.querySelector(".c-carousel-control-prev");
const carouselItems = document.querySelectorAll(".c-carousel-item");
const carouselImages = document.querySelectorAll(".c-carousel-item img");
const indicatorLi = document.querySelectorAll(".c-carousel-indicator-li");
const indicatorUl = document.querySelector(".c-carousel-indicators ul");
var itemCount = carouselItems.length;
var timeCount = 0;
var autoTimer ="0";
var indicatorUlWidth = indicatorUl.offsetWidth;
var tempUrl = "";
var imgCounter = 0;
var timeInterval = 0;
var imgUrls = [];
var indicatorWidth = indicatorUlWidth/(itemCount+1.5);

carouselImages.forEach((item, i) => {
  imgUrls[i] = item.src;
});

function autoNext(){
  var itemIndex = 0;
  carouselItems.forEach((item, i) => {
    if(item.classList.contains("active"))
    {
      itemIndex = i;
    }
  });
  removeActiveStatus();
  itemIndex++;
  if(itemIndex >= itemCount)
  {
    itemIndex = 0;
  }
  addActiveStatus(itemIndex);
}

if(carousel.hasAttribute('data-interval')){
  timeInterval = carousel.getAttribute('data-interval');
  autoTimer = setInterval(autoNext,timeInterval);
}

window.addEventListener('resize',()=>{
  indicatorUlWidth = indicatorUl.offsetWidth;
  indicatorWidth = indicatorUlWidth/(itemCount+1.5);
  indicatorLi.forEach((item, i) => {
    item.style.width = indicatorWidth+"px";
    item.style.height = (indicatorWidth/1.777)+"px";
  });
});

nextButton.addEventListener('click',() =>{
  var itemIndex = 0;
  carouselItems.forEach((item, i) => {
    if(item.classList.contains("active"))
    {
      itemIndex = i;
    }
  });
  removeActiveStatus();
  itemIndex++;
  if(itemIndex >= itemCount)
  {
    itemIndex = 0;
  }
  addActiveStatus(itemIndex);
  clearInterval(autoTimer);
  autoTimer = setInterval(autoNext,5000);
});

prevButton.addEventListener('click',()=> {
  carouselItems.forEach((item, i) => {
    if(item.classList.contains("active"))
    {
      itemIndex = i;
    }
  });
  removeActiveStatus();
  itemIndex--;
  if(itemIndex < 0){
    itemIndex = itemCount-1;
  }
  addActiveStatus(itemIndex);
  clearInterval(autoTimer);
  autoTimer = setInterval(autoNext,5000);
});

function removeActiveStatus(){
  carouselItems.forEach((item, i) => {
    item.classList.remove("active");
    indicatorLi[i].classList.remove("active");
  });
}

function addActiveStatus(target){
  carouselItems[target].classList.add("active");
  indicatorLi[target].classList.add("active");
}
