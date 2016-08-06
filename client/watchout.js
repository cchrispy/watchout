// start slingin' some d3 here.
/*
1. Draw the enemies in an svg element.
2. Make it so that the enemies move to a new random location every second.
3. Make a differently-colored dot to represent the player. Make it draggable.
4. Detect when a enemy touches you.
5. Keep track of the user's score, and display it.
6. Use css3 animations to make the enemies whirling shuriken.
*/

gameRules = {
  height: 800,
  width: 800,
  numOfEnemies: 4
};

//refactor later
var enemyData;
var cursorCoordinates;
var ballx;
var bally;


var Enemy = function(id) {
  this.x = Math.random() * gameRules.height;
  this.y = Math.random() * gameRules.width;
  //remove if necessary
  this.id = id;
};

var createEnemyData = function() {
  var enemies = [];
  for (var i = 0; i < gameRules.numOfEnemies; i++) {
    enemies.push(new Enemy(i));
  }

  return enemies;
};

var drawEnemies = function() {
  enemyData = createEnemyData();
  d3.select('svg').selectAll('circle').data(enemyData)
    .enter().append('circle')
    .attr('fill', 'white')
    .attr('class', 'enemy')
    .attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    })
    .attr('r', '100px')
    /*
    .on('mouseenter', function() {
      //reset
      //high score
      console.log('collision');
    })
    */
  ;
};

var updateEnemyPositions = function() {
  enemyData = createEnemyData();
  console.log(enemyData);
  //select all enemies
  d3.select('svg').selectAll('circle').data(enemyData)
  //apply a transition so they move
    .transition().duration(1000)
  //update attributes cx and cy
    .attr('cx', function(d) {
      // check if x and y are touching the mouse
      // then reset score
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    });
};

var makeBall = function() {
  var ball = d3.select('svg').selectAll('circle').data([{id: 'ball'}], function(d) {
    return d.id;
  });

  //ball position update and collision detection
  var drag = d3.behavior.drag()
    .on('drag', function() {
      ball.attr('cx', cursorCoordinates[0]);
      ball.attr('cy', cursorCoordinates[1]);

      //apply collision detection when dragging
      d3.select('svg').selectAll('.enemy')
      .on('mouseenter', function() {
        console.log('collision');
      });
      //when let go of drag, overwrite mouseenter event listener to stop collision detection
      d3.select('svg').on('mouseup', function() {
        d3.select('svg').selectAll('.enemy')
        .on('mouseenter', null);
        ballx = d3.select('.ball').attr('cx');
        bally = d3.select('.ball').attr('cy');
      });
    });

  ball.enter().append('circle')
    .attr('fill', 'green')
    .attr('class', 'ball')
    .attr('cx', 100)
    .attr('cy', 100)
    .attr('r', '10px')
    .call(drag)
  ;
};

var updateCursorPosition = function() {
  svg.on('mousemove', function() {
    cursorCoordinates = d3.mouse(this);
  });
};

var currentScore = function() {
  var score = 0;
  
  setInterval(function() {
    score++;
    d3.select('.current > span').data(score).text(score);
  }, 100);
};

var svg = d3.select('.board').append('svg')
                  .attr('height', gameRules.height)
                  .attr('width', gameRules.width);

drawEnemies();
setInterval(updateEnemyPositions, 1000);
currentScore();
updateCursorPosition();
makeBall();



// on the board make enemies
// data should be their {id: number, x: x, y: y}


//determine the number of enemies

//create all the enemies using constructor, put in dataset




// svg.selectAll(enemies).data(dataStuff).append()
// d3.selectAll('div').data([1, 2, 3]).enter().append()

// update enemies by changing x and y based on the data



// <circle cx="x" cy="y" fill="black" r="20">