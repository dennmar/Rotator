var StartingMenu = {
  icons: [
    "help",
    "play",
    "settings"
  ],
  labels: {
    help: "#helpLabel",
    play: "#playLabel",
    settings: "#settingsLabel"
  },

  /**
   * Sets a hover effect and click listener for all the start menu icons.
   */
  init: function() {
    this.icons.forEach( function( icon ) {
      var iconSelector = "#" + icon;
      setIconHover( icon, iconSelector, StartingMenu.labels );
    });

    this.setPlayListener();
  },

  /**
   * Sets a click listener for the play icon to lead to the game selection 
   *   screen.
   */
  setPlayListener: function() {
    $( "#play" ).on( "click", function() {
      $( "#startMenu" ).fadeOut( 300, function() {
        GameSelectionMenu.init();
      });
    });
  }
};

var GameSelectionMenu = {
  icons: [ 
    "easy",
    "medium",
    "hard"
  ],
  labels: {
    easy: "#easyLabel",
    medium: "#mediumLabel",
    hard: "#hardLabel"
  },

  /**
   * Sets a hover effect and click listener for all the game selection icons.
   */
  init: function() {
    $( "#gameSelectMenu" ).removeClass( "removed" );

    this.icons.forEach( function( icon ) {
      var iconSelector = "#" + icon;
      setIconHover( icon, iconSelector, GameSelectionMenu.labels );
    });

    this.setIconListeners();
  },

  /**
   * Sets a click listener for the easy, medium, and hard icons to lead to the
   *   random Rotator game of the corresponding difficulty.
   */
  setIconListeners: function() {
    this.icons.forEach( function( icon ) {
      var iconSelector = "#" + icon;
      $( iconSelector ).on( "click", function() {
        $( "#gameSelectMenu" ).fadeOut( 300, function() {
          var RotatorBoard = new Board( icon );
          RotatorBoard.init();
        });
      });
    });
  }
};

function Board( difficulty ) {
  this.boardSizings = {
    easy: 4,
    medium: 5,
    hard: 6
  };
  this.boardSize = this.boardSizings[difficulty];
  this.maxBoardSize = this.boardSizings["hard"];
  this.moves = 0;
  this.hasWon = false;

  /**
   * Randomizes the board and adds event listeners for the squares and buttons.
   */
  this.init = function() {
    $( "#menuContainer" ).addClass( "removed" );
    $( "#gameContainer" ).removeClass( "removed" );
    this.setSquareListeners();
    this.setButtonListeners();
    this.adjustBoard();
    this.toggleSpacing();
    this.prepGameText();
  };

  /**
   * Sets a click listener for each square to rotate itself and its neighboring
   *   squares to the north, south, west, and east of it.
   */
  this.setSquareListeners = function() {
    var thisBoard = this;
    $( ".square" ).on( "click", function() {
      if ( !this.hasWon ) {
        $( this ).toggleClass( "rotated" );
        thisBoard.rotateNeighbors( $( this ).attr( "id" ) );

        thisBoard.moves++;
        $( "#moves" ).text( thisBoard.moves );

        if ( thisBoard.allUnrotated() || thisBoard.allRotated() ) {
          this.hasWon = true;
          $( "#winMessage" ).text( "VICTORY!!!" );
        }
      }
    });

    this.randomizeBoard();
  };

  /**
   * Rotates the squares to the north, south, west, and east of the clicked
   *   square.
   * @param clickedSquare The ID of the square that was clicked by the user
   */
  this.rotateNeighbors = function( clickedID ) {
    this.rotateNorthSouth( Number( clickedID[1] ), Number( clickedID[3] ) );
    this.rotateWestEast( Number( clickedID[1] ), Number( clickedID[3] ) );
  };

  /**
   * Rotates the neighboring squares to the north and south of the square that
   *   was clicked. 
   * @param rowOfClicked The row number of the square that was clicked
   * @param colOfClicked The column number of the square that was clicked
   */
  this.rotateNorthSouth = function( rowOfClicked, colOfClicked ) {
    var northRow = rowOfClicked - 1;
    var northSqID = "#r" + northRow + "c" + colOfClicked;
    var southRow = rowOfClicked + 1;
    var southSqID = "#r" + southRow + "c" + colOfClicked;

    if ( northRow >= 0 ) {
      $( northSqID ).toggleClass( "rotated" );
    }
    if ( southRow < this.boardSize ) {
      $( southSqID ).toggleClass( "rotated" );
    }
  };

  /**
   * Rotates the neighboring squares to the east and west of the square that
   *   was clicked.
   * @param rowOfClicked The row number of the square that was clicked
   * @param colOfClicked The column number of the square that was clicked
   */
  this.rotateWestEast = function( rowOfClicked, colOfClicked ) {
    var westCol = colOfClicked - 1;
    var westSqID = "#r" + rowOfClicked + "c" + westCol;
    var eastCol = colOfClicked + 1;
    var eastSqID = "#r" + rowOfClicked + "c" + eastCol;

    if ( westCol >= 0 ) {
      $( westSqID ).toggleClass( "rotated" );
    }
    if ( eastCol < this.boardSize ) {
      $( eastSqID ).toggleClass( "rotated" );
    }
  };

  /**
   * Checks if all squares are the color of an unrotated square.
   * @return True if all squares are the color of an unrotated square, false 
   *         otherwise.
   */
  this.allUnrotated = function() {
    for ( var r = 0; r < this.boardSize; r++ ) {
      for ( var c = 0; c < this.boardSize; c++ ) {
        var squareId = "#r" + r + "c" + c;
        if ( $( squareId ).hasClass( "rotated" ) ) {
          return false;
        }
      }
    }
    return true;
  }

  /** 
   * Checks if all squares are the color of a rotated square.
   * @return True if all squares are the color of a rotated square, false 
   *         otherwise.
   */
  this.allRotated = function() {
    for ( var r = 0; r < this.boardSize; r++ ) {
      for ( var c = 0; c < this.boardSize; c++ ) {
        var squareId = "#r" + r + "c" + c;
        if ( !$( squareId ).hasClass( "rotated" ) ) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Clears the board and then randomly selects a certain amount of squares to 
   *   rotate based on the board size.
   */
  this.randomizeBoard = function() {
    $( ".square" ).removeClass( "rotated" );

    var rotates = this.boardSize + 2;
    rotates += Math.floor( Math.random() * this.boardSize );

    while ( rotates > 0 ) {
      var randomRow = Math.floor( Math.random() * this.boardSize );
      var randomCol = Math.floor( Math.random() * this.boardSize );
      var randomSqID = "#r" + randomRow + "c" + randomCol;
    
      if ( !$( randomSqID ).hasClass( "rotated" ) ) {
        $( randomSqID ).addClass( "rotated" );
        rotates--;
      }
    }
  }

  /** 
   * Sets click listeners for the buttons in the side display.
   */
  this.setButtonListeners = function() {
    var thisBoard = this;
    $( "#newGameBtn" ).on( "click", function() {
      thisBoard.hasWon = false;
      thisBoard.prepGameText();
      thisBoard.randomizeBoard();
    });
  }

  /**
   * Adjusts the number of squares to match the desired difficulty.
   */
  this.adjustBoard = function() {
    for ( var r = 0; r < this.maxBoardSize; r++ ) {
      for ( var c = 0; c < this.maxBoardSize; c++ ) {
        var squareID = "#r" + r + "c" + c;
        if ( r < this.boardSize && c < this.boardSize ) {
          $( squareID ).removeClass( "removed" );
        }
        else {
          $( squareID ).addClass( "removed" );
        }
      }
    }
  };

  /**
   * Toggles the difficulty spacer classes for the squares to set up or 
   *   dismantle the grid of squares for this difficulty.
   */
  this.toggleSpacing = function() {
    var leftmost = difficulty + "-left";

    for ( var r = 0; r < this.boardSize; r++ ) {
      var firstSquareID = "#r" + r + "c0";
      $( firstSquareID ).toggleClass( leftmost );
    }
  };

  /**
   * Prepares the display on the right side with a zeroed move counter and
   *   no winning message.
   */
  this.prepGameText = function() {
    this.moves = 0;
    $( "#moves" ).text( this.moves );
    $( "#winMessage" ).text( "" );
  };
}

StartingMenu.init();

/**
 * Sets a hover effect where hovering over an icon causes it's label to 
 *   "light up".
 * @param iconID  The ID of the icon that needs the hover effect
 * @param iconSel The CSS selector used to select the icon
 * @param labels  The object that holds the icon ID and label name pairs 
 */
function setIconHover( iconID, iconSel, labels ) {
  $( iconSel ).on( "mouseenter", function() {
      $( labels[iconID] ).addClass( "full-opacity" );
    });
  $( iconSel ).on( "mouseleave", function() {
    $( labels[iconID] ).removeClass( "full-opacity" );
  });
}