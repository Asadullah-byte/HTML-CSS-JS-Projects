const facts = [
  {
    statement: "JavaScript was invented in 1995",
    answer: "true",
    explanation:
      "Brendan Eich created JS at Netscape in 1995. The initial version of the language was written in just 10 days.",
  },
  {
    statement: "Strings in JS are editable values",
    answer: "false",
    explanation:
      "In JavaScript strings are immutable values, meaning they cannot be edited; however, they can replaced with new, different strings.",
  },
  {
    statement: "1 + 1 === 2",
    answer: "true",
    explanation: "The plus operator gives the sum of two numbers.",
  },
  {
    statement: "'1' + '1' === '2'",
    answer: "false",
    explanation:
      "The plus operator concatenates (joins together) strings, so '1' + '1' === '11'.",
  },
  {
    statement: "typeof ['J', 'S'] === 'array'",
    answer: "false",
    explanation:
      "Arrays have the type 'object'. In JS, everything is either a primitive data type (e.g. 'string', 'number') or an object. Arrays are a kind of object with some special properties.  ",
  },
];
let factsBackup = [...facts]; 
function hide(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}

const startingmin = 0.2;
let time = startingmin * 60;
let timer = document.getElementById("timer");
let interval;

function updateCounter() {
  let min = Math.floor(time / 60);
  let sec = time % 60;

  sec = sec < 10 ? "0" + sec : sec;
  min = min < 10 ? "0" + min : min;

  document.getElementById("min").textContent = min;
  document.getElementById("sec").textContent = sec;
  if (time <= 0) {
    clearInterval(interval);
    showModal();
    restartQuiz();
  }
  time--;
}

//Calculates the time in the time in which quiz was completed
function completedIn() {
  let elapsedTime = startingmin * 60 - time; // Calculate the elapsed time in seconds
  let elapsedMin = Math.floor(elapsedTime / 60);
  let elapsedSec = elapsedTime % 60;

  //Zero base handling for UI
  elapsedSec = elapsedSec < 10 ? "0" + elapsedSec : elapsedSec;
  elapsedMin = elapsedMin < 10 ? "0" + elapsedMin : elapsedMin;

  //Applying in modal
  document.getElementById("modal-min").textContent = elapsedMin;
  document.getElementById("modal-sec").textContent = elapsedSec;
}

//Start button to start the quiz
const start = document.getElementById("start");
const buttonSpan = document.getElementById("button-span");

//Event to change the visiblity property
start.addEventListener("mouseover", function () {
  buttonSpan.classList.add("show");
  buttonSpan.classList.remove("hidden");
});


//Event to change the visiblity property
start.addEventListener("mouseout", function () {
  buttonSpan.classList.add("hidden");
});
start.addEventListener(
  "click", () =>{
  startQuiz()},
  { once: true }
);

//restart Quiz Funtion
let restartbtn=()=>{
  let icon = document.getElementById("starticon");
  icon.src = "../src/assets/img/icons8-restart-34.png";
  buttonSpan.textContent = "Restart Quiz!";
}
let restartQuiz = () => {

  facts.splice(0, facts.length, ...factsBackup); // Reset facts array
  restartbtn();
  enable(start);
  
  
};

const startQuiz = () => {  

  fact = facts.shift(); // get the first fact in our array (shortening the array)

  // set the question text to the current fact's statement
  document.getElementById("statement").textContent = fact.statement;

  // hide any previous explanation
  hide(explanation);

  interval = setInterval(updateCounter, 1000);

  for (let allbuttons of optionButtons) {
    enable(allbuttons);
  }
    disable(start);
  
 

}

//add disable attribte to button
const disable = (button) => button.setAttribute("disabled", "");

// enable(button) should remove the attribute "disabled" from the button element
const enable = (button) => button.removeAttribute("disabled");

const nextButton = document.getElementById("next-question");
const optionButtons = document.querySelector("#options").children;
const explanation = document.getElementById("explanation");

let fact;

function getNextFact() {
  fact = facts.shift(); // get the first fact in our array (shortening the array)

  // set the question text to the current fact's statement
  document.getElementById("statement").textContent = fact.statement;

  // hide any previous explanation
  hide(explanation);

  for (let option of optionButtons) {
    // clear any previous classes
    option.classList.remove("correct");
    option.classList.remove("incorrect");
    // make sure buttons are enabled
    enable(option);
    option.classList.add("hover-enabled");
    nextButton.classList.remove("hover-enabled");
  }

  // disable next-question button
  disable(nextButton);
  if (fact.length() == 0) {
    updateCounter();
    restartQuiz();
  }
}

nextButton.addEventListener("click", getNextFact);

//score counter function
let correct = 0,
  completed = 0;
let showCounter = (e) => {
  const guess = e.target.value;

  if (guess === fact.answer) {
    e.target.classList.add("correct");
    correct += 1;
  } else {
    e.target.classList.add("incorrect");
  }

  explanation.textContent = fact.explanation;
  show(explanation);

  completed += 1;
  document.getElementById("correct").textContent = correct;
  document.getElementById("completed").textContent = completed;
};

for (const options of optionButtons) {
  options.addEventListener("click", (e) => {
    for (const buttons of optionButtons) {
      disable(buttons);
      buttons.classList.remove("hover-enabled");
      nextButton.classList.add("hover-enabled");
    }

    if (facts.length > 0) {
      enable(nextButton);
    } else {
      nextButton.textContent = "No more questions!";
      nextButton.classList.remove("hover-enabled");
      clearInterval(interval);
      showModal();
      restartQuiz();
      overlay.addEventListener("click", () => {
        modal.classList.remove("active");
        overlay.classList.remove("active");
      });
    }

    showCounter(e);
  });
}

function defaultDisabledButton() {
  for (let allbuttons of optionButtons) {
    disable(allbuttons);
  }
  disable(nextButton);
}

//function to show modal(aka: Popup)
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const showModal = (e) => {
  modal.classList.add("active");
  overlay.classList.add("active");

  for (const allbutton of optionButtons) {
    allbutton.setAttribute("disabled", "");
  }
  nextButton.setAttribute("disabled", "");

  completedIn();
  document.getElementById("modal-correct").textContent =
    document.getElementById("correct").textContent;
  document.getElementById("modal-completed").textContent =
    document.getElementById("completed").textContent;

  document.getElementById("close-button").addEventListener("click", () => {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
};

defaultDisabledButton();
