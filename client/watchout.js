// start slingin' some d3 here.
/*
1. Draw the enemies in an svg element.
2. Make it so that the enemies move to a new random location every second.
3. Make a differently-colored dot to represent the player. Make it draggable.
4. Detect when a enemy touches you.
5. Keep track of the user's score, and display it.
6. Use css3 animations to make the enemies whirling shuriken.
*/

//globals
var height = 800;
var width = 800;
var numOfEnemies = 100;

//used to generate dataset
var Enemy = function(id) {
  this.x = Math.random() * height;
  this.y = Math.random() * width;
  this.id = id;
};

var createEnemyData = function() {
  var enemies = [];
  for (var i = 0; i < numOfEnemies; i++) {
    enemies.push(new Enemy(i));
  }

  return enemies;
};

var drawEnemies = function() {
  d3.select('svg').selectAll('circle').data(createEnemyData())
    .enter().append('circle')
    .attr('fill', 'red')
    .attr('class', 'enemy')
    .attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    })
    .attr('r', '10px')
  ;
};

var svg = d3.select('.board').append('svg')
                  .attr('height', height)
                  .attr('width', width);

drawEnemies();

// on the board make enemies
// data should be their {id: number, x: x, y: y}


//determine the number of enemies

//create all the enemies using constructor, put in dataset




// svg.selectAll(enemies).data(dataStuff).append()
// d3.selectAll('div').data([1, 2, 3]).enter().append()

// update enemies by changing x and y based on the data



// <circle cx="x" cy="y" fill="black" r="20">