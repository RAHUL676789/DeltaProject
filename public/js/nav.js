let lastScrollTop=0;

let navbar = document.querySelector(".navbar");

window.addEventListener("scroll",(event)=>{
    // console.dir(event);
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if(scrollTop > lastScrollTop){
        navbar.style.top = "-5rem";

    }
    else{
        navbar.style.top = "0px";
    }
// console.log(document.documentElement.scrollTop);
    // console.log(lastScrollTop,scrollTop);
    lastScrollTop = scrollTop;
})
