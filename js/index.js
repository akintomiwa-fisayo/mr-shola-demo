function handleFormNumberValidation (event){
  var {value} = event.target;
  var error = "";

  if(isNaN(value)){
    error = ": must be a valid numiber";
  
  }else if(value.length < 8 || value.length > 13){
    error = ": length must be between 8 and 13"
  }

  var heroInput = isDescendant(event.target, ".hero-input");
  var errorLabel = heroInput.querySelectorAll(".hero-input-label .error")[0];

  errorLabel.innerText = `${error}`;

  console.log("hero input in transversing", {heroInput, errorLabel})
}

function handleFormEmailValidation (event){
  var {value} = event.target;
  var error = "";

  if(!isEmail(value)){
    error = ": invalid email";  
  }

  var heroInput = isDescendant(event.target, ".hero-input");
  var errorLabel = heroInput.querySelectorAll(".hero-input-label .error")[0];

  errorLabel.innerText = `${error}`;

  console.log("hero input in transversing", {heroInput, errorLabel})

}


$(document).ready(function(){
  var heroInputs = document.querySelectorAll(".hero-input");

  heroInputs.forEach(function (heroInput) {
    var inputField = heroInput.getElementsByClassName("hero-input-field")[0];

    if(inputField.getAttribute("name") === "mobile-number" || inputField.getAttribute("name") === "whatsapp-number"){
      inputField.addEventListener("change", handleFormNumberValidation)
      
    }else if(inputField.getAttribute("name") === "email"){
      inputField.addEventListener("change", handleFormEmailValidation)

    }
  });

});
