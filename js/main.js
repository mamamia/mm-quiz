var quizLength = 6;
var answers = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0,
};
var answered = 0;
var timeline = [];

function checkQuizDone(answers, quizLength) {
  return quizLength === answered ? true : false;
}

function checkAnswers(answers) {
  //check the answers and return the one witht the highest value. if there are multiple answers with the same value, pick one at random.
  var results = "";
  var highestValue = 0;
  var highestValueKey = [];
  var answerKeys = Object.keys(answers);
  answerKeys.forEach((key) => {
    if (answers[key] > highestValue) {
      highestValue = answers[key];
      highestValueKey = [key];
    } else if (answers[key] === highestValue) {
      highestValueKey.push(key);
    }
  });
  // if there are multiple answers with the same value, pick one at random.
  if (highestValueKey.length > 1) {
    results =
      highestValueKey[Math.floor(Math.random() * highestValueKey.length)];
  } else {
    results = highestValueKey[0];
  }
  return results;
}

function resetQuiz(answers) {
  var results = checkAnswers(answers);
  var allRadioButtons = document.querySelectorAll('input[type="radio"]');

  for (var i = 0; i < allRadioButtons.length; i++) {
    allRadioButtons[i].checked = false;
  }

  var questions = document.querySelectorAll(".question");
  var allAnswer = document.querySelectorAll(".answer");
  timeline["gsap"]
    .set(allAnswer, { x: 0 })
    .set(questions, {
      x: "0",
    })
    .to(".result-" + results, { duration: 0.5, opacity: 0, zIndex: 0 })
    .to(
      [".questions", ".hero-image", "footer"],
      { duration: 0.5, opacity: 1 },
      1
    );
  // .to(".hero-image", { duration: 0.5, opacity: 1 }, 1)
  // .to("footer", { duration: 0.5, opacity: 1 }, 1);

  var answerKeys = Object.keys(answers);
  for (var i = 0; i < answerKeys.length; i++) {
    answers[answerKeys[i]] = 0;
  }
}

var resetButton = document.querySelectorAll(".button-reset");
resetButton.forEach(function (rbutton) {
  rbutton.addEventListener("click", function (event) {
    resetQuiz(answers);
  });
});

var prevButton = document.querySelector(".button-prev");
prevButton.addEventListener("click", function (event) {
  timeline["gsap"].reverse();
});

var allRadioInputs = document.querySelectorAll("input[type='radio']");
allRadioInputs.forEach((input) => {
  input.addEventListener("change", function (event) {
    console.log("input change", this.value);
    var selected = this;
    var answer = this.value;
    var question = selected.closest("fieldset");

    if (question.getAttribute("data-selected")) {
      const dataSelected = question.getAttribute("data-selected");
      for (let i = 0; i < dataSelected.length; i++) {
        if (dataSelected[i] > 0) {
          answers[dataSelected[i]] -= 1;
        }
      }
      if (answered > 0) answered -= 1;
      question.removeAttribute("data-selected");
    }

    question.setAttribute("data-selected", answer);
    if (answered < quizLength) {
      answered += 1;
    }
    for (let i = 0; i < answer.length; i++) {
      answers[answer[i]] += 1;
    }

    var selectedParent = selected.parentElement;
    var selectedName = selected.getAttribute("name");
    var quizNumber = selectedName.split("-")[1];
    var allLabels = document.querySelectorAll(
      '[data-label="' + selectedName + '"]'
    );
    var questions = document.querySelectorAll(".question");

    var labels = [];
    allLabels.forEach(function (el) {
      if (el === selectedParent) {
        return;
      }
      labels.push(el);
    });

    timeline["gsap"] = gsap.timeline();
    if (quizNumber != questions.length) {
      timeline["gsap"]
        .to(labels, { duration: 1, x: "-120%", stagger: 0.2 }, selectedName)
        .to(questions, {
          duration: 1,
          x: "-" + quizNumber * 100 + "%",
        });
    } else {
      var results = checkAnswers(answers);
      timeline["gsap"]
        .set("footer", { opacity: 0 }, 0)
        .to([".questions", ".hero-image"], { duration: 0.5, opacity: 0 }, 0)
        .to(
          [".result-" + results, ".button-reset"],
          { duration: 0.5, opacity: 1, zIndex: 1 },
          0.5
        );
      // .to(".button-reset", { duration: 0.5, opacity: 1, zIndex: 1 }, 0.5);
    }
  });
});
