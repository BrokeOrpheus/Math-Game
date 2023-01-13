$(document).ready(function () {
  $('#input').prop('disabled', true).val('');
});

const game = {
  time: 10,
  score: 0,
  highScore: 0,
  mode: []
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
  let result = newNumbers[0] + newNumbers[1];
  $('#equation').empty().append(equation).attr('data-result', result);
}

let subtraction = function () {
  let newNumbers = createNumbers();
  let equation = newNumbers[0] + ' - ' + newNumbers[1];
  let result = newNumbers[0] - newNumbers[1];
  $('#equation').empty().append(equation).attr('data-result', result);
}

let multiplication = function () {
  let newNumbers = createNumbers();
  let equation = newNumbers[0] + ' * ' + newNumbers[1];
  let result = newNumbers[0] * newNumbers[1];
  $('#equation').empty().append(equation).attr('data-result', result);
}

let division = function () {
  let newNumbers = createNumbers();
  while (newNumbers[0] % newNumbers[1] !== 0) {
    newNumbers = createNumbers();
  }
  let equation = newNumbers[0] + ' / ' + newNumbers[1];
  let result = newNumbers[0] / newNumbers[1];
  $('#equation').empty().append(equation).attr('data-result', result);
}

let randomFunc = function () {
  let random = game.mode[Math.floor(Math.random() * game.mode.length)];
  switch (random) {
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
  $('#time').empty().append(game.time);

  if (game.time <= 3) {
    $('#time').css('font-size', '75px').css('color', 'red').animate({
      fontSize: '50px'
    });
  } else {
    $('#time').css('color', 'white');
  }
}

$('#start').click(function (event) {

  game.mode = [];
  
  $('input:checked').each(function () {
    game.mode.push($(this).attr('data-function'));
  });

  if (game.mode.length === 0) {
    $('input[data-function="add"]').prop('checked', true);
    game.mode.push('add');
  }

  game.limit = $('#slider').val();
  game.time = 10;
  updateTime();
  randomFunc();
});

let timer = function () {
  game.score = 0;
  $('#score').empty().append(game.score);
  $('#input').prop('disabled', false);
  $('#start').prop('disabled', true);
  $('#input').focus();

  let startTime = setInterval(function () {
    game.time -= 1;
    updateTime();

    if (game.time === 0) {
      clearInterval(startTime);
      $('#input').prop('disabled', true).val('');
      $('#start').prop('disabled', false);
      $('#equation').empty().append('<p>Time\'s Up!</p>');
    }
  }, 1000);
}

$(document).on('input', '#input', function () {
  if (Number($('#input').val()) === Number($('#equation').attr('data-result'))) {
    $('#input').val('');

    game.time += 1;
    updateTime();

    game.score += 1;
    $('#score').empty().append(game.score);

    if (game.score > game.highScore) {
      game.highScore = game.score;
      $('#highScore').empty().append(game.highScore);
    }
    
    randomFunc();
  }
});

$('.limit').change(function () {

  let input = $('#numberLimit');
  let inputValue = Number($('#numberLimit').val());
  switch (true) {
    case inputValue < 10:
      input.val(10);
      break;
    case inputValue > 100:
      input.val(100);
      break;
    case inputValue > 10 && inputValue % 5 !== 0:
      while (inputValue % 5 !== 0) {
        inputValue += 1;
      }
      input.val(inputValue);
      break;
    default:
      break;
  }

  let newLimit = $(this).val();
  $('.limit').each(function () {
    $(this).val(newLimit);
  });

});