var turnCount = 0;
var players = [1,2];
var playerTurn = 1;
var $playerTurn = $(".player-turn");
var boardSize = 4;
var $tableTarget = $(".table-target");
var gameOver = false;
var $square = $("");
var $buttons = $("button");

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
      table = table + row + cells + "</div>";
    };
    $tableTarget.html(table);
  };

tableHTML(boardSize);
$square = $(".square");

function setBoardSize(){
  boardSize = parseInt($(this).text().split("")[0]);
  tableHTML(boardSize);
  $square = $(".square");
  $square.click(this, takeTurn);
  return false;
};

$buttons.click(this, setBoardSize);

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
  $(".message").html("<div class='message text-success'>Player " + num + " wins!</div>")
  gameOver = true;
};

function checkForRowAndColumnWin(){
  $.each(["row", "column"], function( index, rowOrColumn){
    $.each( players, function( index, num ){
      for(var i = 1; i <= boardSize; i++){
        if($(".player-" + num + "." + rowOrColumn + "-" + i).length == boardSize){
          winAction(num);
        };
      };
    });
  });
};

function checkForAscendingDiagonalWin(num){
  var array = []
  for(i = 0; i < boardSize; i++){
    array.push($(".row-" + (boardSize - i) + ".column-" + (1 + i) + ".player-" + num).length)
    };
  var sum = array.reduce(function(a,b){ return a + b; });
  if(sum == boardSize){
    winAction(num);
  };
};

function checkForDescendingDiagonalWin(num){
  var array = []
  for(i = 1; i <= boardSize; i++){
    array.push($(".row-" + i + ".column-" + i + ".player-" + num).length)
    };
  var sum = array.reduce(function(a,b){ return a + b; });
  if(sum == boardSize){
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
    $(".message").addClass("text-danger").text("Game over! Refresh to play again.")
  } else if ($element.hasClass("clicked")){         // Do not play a clicked square
    $(".message").addClass("text-danger").text("This square is taken.")
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
