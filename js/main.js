var turnCount = 0;
var players = [1,2];
var playerTurn = 1;
var $playerTurn = $(".player-turn");
var boardSize = 3;
var $tableTarget = $(".table-target");
var gameOver = false;

function tableHTML(x){
  var table = "";
  for(j = 1; j <= x; j++){
    var row = ("<div class='row row-" + j + "'>");
    var cells = function(){
      var column = "";
      for(i = 1; i <= x; i++){
          column = column + ("<div class='square col-xs-1 row-" + j + " column-" + i + "'><i class='fa fa-square-o fa-3x'></i></div>");
        };
        return column;
      }();
      table = table + row + "<div class='col-xs-4'></div>" + cells + "</div>";
    };
    $tableTarget.html(table);
  };

tableHTML(boardSize);
var $square = $(".square");

function applyXO(element){
  if(playerTurn == 1){
    element.html("<i class='fa fa-times fa-3x text-success'></i>");
    element.addClass("player-1");
  } else{
    element.html("<i class='fa fa-circle-o fa-3x text-primary'></i>");
    element.addClass("player-2");
  };
};

function updatePlayerTurn(){
  if(playerTurn == 1){
    playerTurn ++;
  } else{
    playerTurn --;
  }
  $playerTurn.text(playerTurn);
};

function updateTurnCount(){
  turnCount ++;
  $(".turn-count").text(turnCount);
};

function winAction(num){
  $(".message").text("Player " + num + " wins!");
  gameOver = true;
};

function winCondition(i, num, rowOrColumn){
  if($(".player-" + num + "." + rowOrColumn + "-" + i).length == 3){
    winAction(num);
  };
};

function checkForRowAndColumnWin(){
  $.each(["row", "column"], function( index, rowOrColumn){
    $.each( players, function( index, num ){
      for(var i = 1; i <= 3; i++){
        winCondition(i, num, rowOrColumn);
      };
    });
  });
};

function checkForAscendingDiagonalWin(num){
  var array = [$(".row-3.column-1.player-" + num).length,
               $(".row-2.column-2.player-" + num).length,
               $(".row-1.column-3.player-" + num).length];
  var sum = array.reduce(function(a,b){ return a + b; });
  if(sum == 3){
    winAction(num);
  };
};

function checkForDescendingDiagonalWin(num){
  var array = [$(".row-1.column-1.player-" + num).length,
               $(".row-2.column-2.player-" + num).length,
               $(".row-3.column-3.player-" + num).length];
  var sum = array.reduce(function(a,b){ return a + b; });
  if(sum == 3){
    winAction(num);
  };
};

function checkForWin(){
  checkForRowAndColumnWin();
  $.each(players, function(index, value){
    checkForAscendingDiagonalWin(value);
    checkForDescendingDiagonalWin(value);
  });
};

function takeTurn(){
  var $element = $(this);
  if (gameOver == true){                             // Do not play when game is ended
    $(".message").text("Game over! Refresh to play again.")
  } else if ($element.hasClass("clicked")){         // Do not play a clicked square
    $(".message").text("This square is taken.")
  } else {                                          // Play game!
    $(".message").empty();
    applyXO($element);
    $element.addClass("clicked");
    updatePlayerTurn();
    updateTurnCount();
    checkForWin();
  }
};

$square.click(this, takeTurn);
