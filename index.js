const game = {
  time: 10,
  result: 0,
  limit: 0,
  score: 0,
  highScore: 0,
  mode: []
}

// Functions

let enable = function (ele) {
  $(ele).prop('disabled', false);
}
let disable = function (ele) {
  $(ele).prop('disabled', true);
}
let display = function (ele, val) {
  $(ele).empty().append(val);
}

let createNumbers = function () {
  let numbers = [Math.ceil(Math.random() * game.limit), Math.ceil(Math.random() * game.limit)];
  numbers.sort(function compareNumbers(a, b) {
    return b - a;
  });
  return numbers;
}

let addition = function () {
  let newNumbers = createNumbers();
  let equation = newNumbers[0] + ' + ' + newNumbers[1];
  game.result = newNumbers[0] + newNumbers[1];
  display('#equation', equation);
}

let subtraction = function () {
  let newNumbers = createNumbers();
  let equation = newNumbers[0] + ' - ' + newNumbers[1];
  game.result = newNumbers[0] - newNumbers[1];
  display('#equation', equation);
}

let multiplication = function () {
  let newNumbers = createNumbers();
  let equation = newNumbers[0] + ' * ' + newNumbers[1];
  game.result = newNumbers[0] * newNumbers[1];
  display('#equation', equation);
}

let division = function () {
  let newNumbers = createNumbers();
  while (newNumbers[0] % newNumbers[1] !== 0) {
    newNumbers = createNumbers();
  }
  let equation = newNumbers[0] + ' / ' + newNumbers[1];
  game.result = newNumbers[0] / newNumbers[1];
  display('#equation', equation);
}

let randomFunc = function () {
  let randomIndex = game.mode[Math.floor(Math.random() * game.mode.length)];
  switch (randomIndex) {
    case 'add':
      addition();
      break;
    case 'sub':
      subtraction();
      break;
    case 'mul':
      multiplication();
      break;
    case 'div':
      division();
      break;
    default:
      break;
  }
}

let updateTime = function () {
  display('#time', game.time);

  if (game.time <= 3) {
    $('#time').css('color', 'red').css('font-size', '75px').animate({
      fontSize: '50px'
    });
  } else {
    $('#time').css('color', 'white');
  }
}

// Listeners

$(document).ready(function () {
  disable('#input');
  $('#input').val('');
});

$('.limit').change(function () {
  let input = $('#numberLimit');
  let currValue = Number($('#numberLimit').val());

  switch (true) {
    case currValue < 10:
      input.val(10);
      break;
    case currValue > 100:
      input.val(100);
      break;
    case currValue > 10 && currValue % 5 !== 0:
      while (currValue % 5 !== 0) {
        currValue += 1;
      }
      input.val(currValue);
      break;
    default:
      break;
  }

  let newLimit = $(this).val();
  $('.limit').each(function () {
    $(this).val(newLimit);
  });

});

$('#start').click(function () {
  game.time = 10;
  game.score = 0;
  game.limit = Number($('#slider').val());
  game.mode = [];
  
  $('input:checked').each(function () {
    game.mode.push($(this).attr('data-function'));
  });

  if (game.mode.length === 0) {
    $('input[data-function="add"]').prop('checked', true);
    game.mode.push('add');
  }

  updateTime();
  display('#score', game.score);
  enable('#input');
  $('#input').focus();
  disable('#start');
  randomFunc();

  let startTime = setInterval(function () {
    game.time -= 1;
    updateTime();

    if (game.time === 0) {
      clearInterval(startTime);
      disable('#input');
      $('#input').val('');
      enable('#start');
      display('#equation', '<p>Time\'s Up!</p>');
    }
  }, 1000);

});

$('#input').on('input', function () {
  if (Number($('#input').val()) === game.result) {
    game.time += 1;
    game.score += 1;

    $('#input').val('');
    updateTime();
    display('#score', game.score);
    randomFunc();

    if (game.score > game.highScore) {
      game.highScore = game.score;
      display('#highScore', game.highScore);
    }
  }
});