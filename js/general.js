const HERO_INPUTS = {
  all : function(){ return document.querySelectorAll(".hero-input") },
  currentFocused : null,
  lastBlurred : null,
  onFocused : function(){
      //console.log("focusing from the object")
      
  },
  onBlurred : function(){
      validateAllHeroInputs();

      //console.log("blurring from the object")
  },
  addOnBlurredFunc : function(func){
      var temp = this.onBlurred;
      this.onBlurred = function(){
          temp();
          func();
      }
  },
  addOnFocusedFunc : function(func){
      var temp = this.onFocused; 
      this.onFocused = function(){
          temp();
          func();
      }
  },
  init_ : function(){
      var heroInputs = this.all();
      for(var i = 0; i < heroInputs.length; i++){
          //var hi = 
          if ( !(heroInputs[i].init_hero_input == true) ) {
              var input = heroInputs[i].getElementsByClassName("hero-input-field")[0];
              heroInputs[i].init_hero_input = true;

             /* heroInputs[i].onclick = function(event){
                  // alert("got the fucker man")
                  var heroInputField = this.getElementsByClassName("hero-input-field")[0];
                  // if (document.activeElement !== heroInputField ) {}
                  if( this.classList.contains("focused") ){

                  }else{
                      event.preventDefault();
                      heroInputField.focus();
                  }

              }*/

              input.addEventListener("focus", function(){
                  var heroInput = isDescendant(this, ".hero-input");
                  if ( !(heroInput.classList.contains("focused")) ) {
                      $(heroInput).addClass("focused");
                      validateHeroInput(heroInput);
                      HERO_INPUTS.currentFocused = heroInput;
                      HERO_INPUTS.onFocused();
                  }
                      
              })

              input.addEventListener("blur", function(){
                  //console.log("blurred a bitch")
                  var heroInput = isDescendant(this, ".hero-input");
                  if (heroInput.classList.contains("focused")) {
                      $(heroInput).removeClass("focused");
                      validateHeroInput(heroInput);
                      HERO_INPUTS.lastBlurred = heroInput;

                      HERO_INPUTS.currentFocused = null;
                      HERO_INPUTS.onBlurred();
                      //popAlert("blurring  from blurHeroInputs()")
                  }
                          //validateHeroInput(heroInputs[i]);
                      
              })

              input.addEventListener("input", function(){
                  var heroInput = isDescendant(this, ".hero-input");
                  if ( $(heroInput).hasClass("mandatory")) {
                      if( isEmpty(this.value) ){
                          $(heroInput).addClass("Error");
                          console.log("we just added Error")

                      }else{
                          $(heroInput).removeClass("Error");

                      }
                  }
              });

              if( isEmpty(input.value) && $(input).attr("value")) {
                  input.focus();
                  input.value = $(input).attr("value");                    
                  input.blur();

              }
          }
      } 
  }
}

function isEmpty (str) {
  return (str ? !str.trim() : true);
}

function validateAllHeroInputs() {
  var heroInputs = HERO_INPUTS.all();
  for(var i = 0; i < heroInputs.length; i++){
    validateHeroInput(heroInputs[i]);
  } 
};

function validateHeroInput (heroInput){
  if ( heroInput.getElementsByClassName("hero-input-field")[0].value == "" ) {
    $(heroInput).removeClass("filled");
      
  }else{
    $(heroInput).addClass("filled");
  }
};

function isElement (o)  {
  return (
  typeof HTMLElement === 'object' ? o instanceof HTMLElement
    : o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string'
  );
}

function isDescendant(e, query)  {
  const matches = typeof (query) === 'string' ? document.querySelectorAll(query) : query;
  let el = isElement(e) ? e : document.querySelector(e);
  let matchesLen = 0;
  if (isElement(matches)) {
    if (query.contains(el)) return query;
  } else if (matches) {
    matchesLen = matches.length;
    while (el && !(el.tagName === 'HTML')) {
      for (let i = 0; i < matchesLen; i += 1) {
        if (el === matches[i]) return el;
      }

      el = el.parentElement;
    }
  }
  return false;
};

function isEmail (str) {
  return (!((/[a-z0-9]+@+[a-z0-9]+\.+[a-z]{3,}/i.test(str) === false || /[^a-z0-9._@]/i.test(str) === true)));
}


function onAnimationStart(target, animationName) {
  //console.log("actuallyt in pTech ~ animationName is : " + animationName)
  if( animationName == 'onAutoFillStart' ){
    $( isDescendant(target, ".hero-input") ).addClass("filled");
  }
          
}

$(document).ready(function(){
  document.getElementsByTagName("html")[0].addEventListener('animationstart', function(event){
    popMessage("an animationi starting")
    onAnimationStart(event.target, event.animationName);
  });
  HERO_INPUTS.init_();
});