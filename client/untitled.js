
gameRules = {
  height: 800,
  width: 800,
  numOfEnemies: 4
};

var enemyData;
var cursorCoordinates;
var ballx;
var bally;

var svg = d3.select('.board').append('svg')
            .attr('height', gameRules.height)
            .attr('width', gameRules.width);
