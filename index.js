$(document).ready(function () {
  $('#input').prop('disabled', true).val('');
});

const game = {
  time: 10,
  score: 0
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

const functions = {
  selection: [],
  add: addition,
  sub: subtraction,
  mul: multiplication,
  div: division
}

let randomFunc = function () {
  let randomEq = functions.selection[Math.floor(Math.random() * functions.selection.length)];
  functions['' + randomEq]();
}

let updateTime = function () {
  $('#time').empty().append(game.time);
}

$('#start').click(function () {
  $('input:checked').each(function () {
    functions.selection.push($(this).attr('data-function'));
  });

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
    if(Number($('#input').val()) === Number($('#equation').attr('data-result'))) {
      $('#input').val('');

      game.time += 1;
      game.totalTime += 1;
      $('#time').empty().append(game.time);

      game.score += 10;
      $('#score').empty().append(game.score);

      $('#input').attr('placeholder', '');

      $('#equation').empty();

      randomFunc();
  }
});

$('.limit').change(function () {
  let newLimit = $(this).val();
  $('.limit').each(function () {
    $(this).val(newLimit);
  });
});