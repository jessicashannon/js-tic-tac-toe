var $square = $(".column");
var turnCount = 0;
var players = [1,2];
var playerTurn = 1;
var $playerTurn = $(".player-turn")

function applyXO(element){
  if(playerTurn == 1){
    element.html("<i class='fa fa-times'></i>");
    element.addClass("player-1");
  } else{
    element.html("<i class='fa fa-circle'></i>");
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

function winCondition(i, playerNumber, rowOrColumn){
  if($(".player-" + playerNumber + "." + rowOrColumn + "-" + i).length == 3){
    $(".message").text("Player " + playerNumber + " wins!");
  };
};

function checkForWin(){
  $.each(["row", "column"], function( index, rowOrColumn){
    $.each( players, function( index, playerNumber ){
      for(var i = 1; i <= 3; i++){
        winCondition(i, playerNumber, rowOrColumn);
      };
    });
  });
};

function checkForAscendingDiagonalWin(){
  var array = [$(".row-3.column-1.player-1"),
               $(".row-2.column-2.player-1"),
               $(".row-1.column-3.player-1")];
  if(ascendingElements.length == 3){
    $(".message").text("Player 1 wins!");
  };
};


  // or vice versa
  // row-1 column-3, row-2 column-2, row-1 column-3


function checkForDescendingDiagonalWin(){
  // Row ascending and column ascending,
  //  row-1 column-1, row-2-column-2, row-3-column-3
};

function takeTurn(){
  var $element = $(this);
  if ($element.hasClass("clicked")){
    $(".message").text("This square is taken.")
  } else {
    $(".message").empty();
    applyXO($element);
    $element.addClass("clicked");
    updatePlayerTurn();
    updateTurnCount();
    checkForWin();
    checkForAscendingDiagonalWin();
  }
};



$square.click(this, takeTurn);
