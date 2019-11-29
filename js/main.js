var quizLength = 6;
var answers = [
  ["a", 0],
  ["b", 0],
  ["c", 0],
  ["d", 0]
];
var timeline = [];

function checkQuizDone(answers, quizLength) {
  var answerSum = 0;
  for (var i = 0; i < answers.length; i++) {
    answerSum += answers[i][1];
  }
  return answerSum === quizLength ? true : false;
}

function checkAnswers(answers) {
  var results = "";
  var currentAnswer = 0;

  for (var i = 0; i < answers.length; i++) {
    var answer = answers[i][1];
    var answerKey = answers[i][0];

    if (answer === currentAnswer) {
      var coinToss = Math.floor(Math.random() * 2);
      if (coinToss === 1) {
        currentAnswer = answer;
        results = answerKey;
      }
    } else {
      if (answer > currentAnswer) {
        currentAnswer = answer;
        results = answerKey;
      }
    }
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
    .to(allAnswer, { duration: 0, x: 0 })
    .to(questions, {
      duration: 0,
      x: "0"
    })
    .to(".result-" + results, { duration: 0.5, opacity: 0, zIndex: 0 })
    .to(".questions", { duration: 0.5, opacity: 1 }, 1)
    .to(".hero-image", { duration: 0.5, opacity: 1 }, 1)
    .to("footer", { duration: 0.5, opacity: 1 }, 1);

  for (var i = 0; i < answers.length; i++) {
    answers[i][1] = 0;
  }
}

var resetButton = document.querySelectorAll(".button-reset");
resetButton.forEach(function(rbutton) {
  rbutton.addEventListener("click", function(event) {
    resetQuiz(answers);
  });
});

var prevButton = document.querySelector(".button-prev");
prevButton.addEventListener("click", function(event) {
  timeline["gsap"].reverse();
});

var allRadioInputs = document.querySelectorAll("input[type='radio']");
allRadioInputs.forEach(function(input) {
  input.addEventListener("click", function(event) {
    var selected = event.target;
    var answer = parseInt(selected.value);
    var question = selected.closest("fieldset");

    if (question.getAttribute("data-selected")) {
      answers[question.getAttribute("data-selected")][1] -= 1;
    }

    answers[answer][1] += 1;
    question.setAttribute("data-selected", answer);

    var selectedParent = selected.parentElement;
    var selectedName = selected.getAttribute("name");
    var quizNumber = selectedName.split("-")[1];
    var allLabels = document.querySelectorAll(
      '[data-label="' + selectedName + '"]'
    );
    var questions = document.querySelectorAll(".question");

    var labels = [];
    allLabels.forEach(function(el) {
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
          x: "-" + quizNumber * 100 + "%"
        });
    } else {
      var results = checkAnswers(answers);
      timeline["gsap"]
        .to("footer", { duration: 0, opacity: 0 }, 0)
        .to(".questions", { duration: 0.5, opacity: 0 }, 0)
        .to(".hero-image", { duration: 0.5, opacity: 0 }, 0)
        .to(".result-" + results, { duration: 0.5, opacity: 1, zIndex: 1 }, 0.5)
        .to(".button-reset", { duration: 0.5, opacity: 1, zIndex: 1 }, 0.5);
    }
  });
});
