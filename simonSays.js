let highest=[];
let userSEq=[];
let gameSeq=[];
let btns=["red","purple","yellow","blue"];
let h3= document.querySelector("h3");
let h1=document.querySelector("h1")
let btn=document.querySelectorAll(".btn");
let started=false;
let level=0;
let score=0;
let h2= document.querySelector("h2");


document.addEventListener("keypress",function(){
   
    if(started==false){
        console.log("game started");
        started=true;
        levelUp();
    }
});


function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}



function userFlash(btn){
    btn.classList.add("uflash");
    setTimeout(function(){
        btn.classList.remove("uflash");
    },250);
}



function levelUp(){
    userSEq=[];
    level++;
    h1.innerText="Game Started";
    h3.innerText=`Level ${level}`;

    let randomIdx=Math.floor(Math.random()*3);
    let randomColor=btns[randomIdx];
    let randomBtn=document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}



function checkAns(idx){
    if(userSEq[idx]===gameSeq[idx]){
       if(userSEq.length==gameSeq.length){
       setTimeout(levelUp,1000);
       }
    }else{
        started =false;
        h3.innerHTML=`Game Over your  Score!!.. ${level} <br>Press Any key to start`;

         document.querySelector("body").style.backgroundColor="red"
         setTimeout(function(){
           document.querySelector("body").style.backgroundColor="white"
          },150);
         score=level;
         highest.push(score);
         console.log(highest);

        reset();
        
    }

}



function btnPress(){
    console.log(this);
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    console.log(userColor);
    userSEq.push(userColor);
    console.log(userSEq);
    checkAns(userSEq.length-1);
}




let allBtn=document.querySelectorAll(".btn");
       for(btn of allBtn){
    btn.addEventListener("click",btnPress);
    }

function reset(){
    started=false;
    gameSeq=[];
    userSEq=[];
    level=0;
    h1.innerText="Game Over!! "
   
}



let high=document.querySelector(".high");


function higherScore(arr){
  let highestScore = highest.reduce((max,el)=>{
   if(max>el){
      return max*10;
   }

   else{
        return el*10;
   }
  });

  h2.innerText=`(YUOR HIGHSET SCORE IS ${highestScore})!!`;
}


high.addEventListener("click",higherScore);

let ul=document.querySelector("ul")
let hide=document.querySelector(".hide");
let show=document.querySelector(".show");


hide.addEventListener("click",function(){
    show.classList.add("showen");
    ul.classList.add("hiden");
    hide.classList.add("hiden");
})
show.addEventListener("click",function(){
    show.classList.add("lost");
    ul.classList.add("showen");
    hide.classList.add("showen");
})
