//TODO CLEAR the radio inputs after reusults are shown.
// Remove jQuery when converting to component

var quizLength = 6;
var answers = [
  ["a", 0],
  ["b", 0],
  ["c", 0],
  ["d", 0]
];

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

function showResults(answers, quizLength) {
  var quizFin = checkQuizDone(answers, quizLength);
  if (!quizFin) {
    return;
  }
  var results = checkAnswers(answers);
  document.querySelector(".result-" + results).classList.add("is-visible");
  document.querySelector(".button-reset").classList.add("is-visible");
  document.querySelector(".questions").classList.add("is-hidden");
  document.querySelector(".hero-image").classList.add("is-hidden");
  document.querySelector(".button-next").classList.add("is-hidden");
}

function resetQuiz(answers) {
  var results = checkAnswers(answers);
  var allRadioButtons = document.querySelectorAll('input[type="radio"');

  for (var i = 0; i < allRadioButtons.length; i++) {
    allRadioButtons[i].checked = false;
  }

  document.querySelector(".result-" + results).classList.remove("is-visible");
  document.querySelector(".button-reset").classList.remove("is-visible");
  document.querySelector(".questions").classList.remove("is-hidden");
  document.querySelector(".hero-image").classList.remove("is-hidden");
  document.querySelector(".button-next").classList.remove("is-hidden");

  for (var i = 0; i < answers.length; i++) {
    answers[i][1] = 0;
  }
  // console.log("RESET", answers);
}

function previousQuestion() {
  console.log("go to previous question");
}

$("input[type='radio']").on("change", function(e) {
  var el = e.target;
  var answer = parseInt(el.value);
  var question = el.closest("fieldset");

  if (question.getAttribute("data-selected")) {
    answers[question.getAttribute("data-selected")][1] -= 1;
  }

  answers[answer][1] += 1;
  question.setAttribute("data-selected", answer);
  showResults(answers, quizLength);
  console.log(answers);
});

$(".button-reset").on("click", function() {
  resetQuiz(answers);
});

//greensock
// var question = $(".question");
// // console.log(question[0]);
// var legend = $(".question-legend");
// var tl = new TimelineMax();
// //console.log(tl);
// $(".title").on("click", function() {
//   tl.to($(".title"), 1, { autoAlpha: 0, ease: Power1.easeOut }, 0)
//     .to($(".door-2"), 0.5, { x: "110%", ease: Power1.easeOut }, 1)
//     .to($(".door-1"), 0.5, { x: "-110%", ease: Power1.easeOut }, 1)
//     .to($(".questions"), 0.5, { autoAlpha: 1, ease: Power1.easeOut }, 1)
//     .staggerFrom(
//       $(".answer"),
//       0.5,
//       {
//         cycle: {
//           x: [650, -650],
//           autoAlpha: 1
//         },
//         ease: Power1.easeOut
//       },
//       0.25
//     );
// });
// // tl.staggerFrom(
// //   question,
// //   0.5,
// //   {
// //     cycle: {
// //       x: [600, -600]
// //     },
// //     ease: Power1.easeOut
// //   },
// //   0.25
// // ).from(legend, 0.5, { autoAlpha: 0, ease: Power1.easeNone });
// // .set(question[0], { className: "+=fill" });