// start slingin' some d3 here.
/*
1. Draw the enemies in an svg element.
2. Make it so that the enemies move to a new random location every second.
3. Make a differently-colored dot to represent the player. Make it draggable.
4. Detect when a enemy touches you.
5. Keep track of the user's score, and display it.
6. Use css3 animations to make the enemies whirling shuriken.
*/

gameBoard = {
  width: 600,
  height: 600,
  enemies: 8,
  score: 0,
  collisions: 0
};

var svg = d3.select('.board').append('svg')
  .attr('width', gameBoard.width)
  .attr('height', gameBoard.height);

var image = svg.append('defs').append('svg:pattern')
  .attr('id', 'trump')
  .attr('width', 1)
  .attr('height', 1)
  .append('svg:image')
  .attr('width', 80)
  .attr('height', 80)
  .attr('xlink:href', 'trump.png');


// svg.selectAll('circle').data(_.range(1, gameBoard.enemies))
svg.selectAll('circle').data(_.range(1, gameBoard.enemies))
  .enter()
  // .append('svg:image')
  // .attr('xlink:href', 'https://40.media.tumblr.com/e8258a36ccf95080f68f2ecf1a0ad021/tumblr_inline_nvs0vwJyjO1r33elg_540.png')
  // .attr('height', 20)
  // .attr('width', 20)
  .append('circle')
  .style('fill', 'url(#trump)')
  // .attr('r', function(d) {
  //   return 15 + (Math.random() * 20);
  // })
  .attr('r', function(d) {
    return 40;
  })
  .attr('class', 'enemy')
  .attr('cx', function(d) {
    return 10 + Math.random() * (gameBoard.width - 20);
  })
  .attr('cy', function(d) {
    return 10 + Math.random() * (gameBoard.height - 20);
  });

var drag = d3.behavior.drag()
// drag behavior function adds listeners to objects that .call() it
            .on('dragstart', function() {

            })
            .on('drag', function() {
// drag creates d3.event object, with x&y position of mouse              
              d3.select('.player').attr('cx', function() {
                if (d3.event.x < 10) {
                  return 10;
                } else if (d3.event.x > gameBoard.width - 10) {
                  return gameBoard.width - 10;
                } else { return d3.event.x; }
              });
              d3.select('.player').attr('cy', function() {
                if (d3.event.y < 10) {
                  return 10;
                } else if (d3.event.y > gameBoard.height - 10) {
                  return gameBoard.height - 10;
                } else { return d3.event.y; }
              });
            })
            .on('dragend', function() {

            });

var player = svg.selectAll('circle').data([{player: 'green'}],
    function(d) { return d.player; })
  .enter()
  .append('circle')
  .attr('class', 'player')
  .attr('fill', function(d) {
    return d.player;
  })
  .attr('r', 10)
  .attr('cx', gameBoard.width / 2)
  .attr('cy', gameBoard.height / 2)
  .call(drag); // drag event listeners added

function update() {
  svg.selectAll('circle.enemy')
    .transition().duration(1000)
    .attr('cx', function(d) {
      return 10 + Math.random() * (gameBoard.width - 20);
    })
    .attr('cy', function(d) {
      return 10 + Math.random() * (gameBoard.width - 20);
    });
}

// we have a score that keeps increasing with time
// the score gets reset to 0 upon a collision
// the '.current > span' will always equal score

function collisionCheck() {
  var enemy = svg.selectAll('.enemy');
  var playerX = svg.select('.player').attr('cx');
  var playerY = svg.select('.player').attr('cy');
  enemy[0].forEach(function(circle) {
    if (Math.abs(circle.cx.animVal.value - playerX) < circle.r.animVal.value + 10 && Math.abs(circle.cy.animVal.value - playerY) < circle.r.animVal.value + 10) {
      gameBoard.score = 0;
      svg.transition().duration(10)
        .style('background-color', 'red')
        .transition().duration(250)
        .style('background-color', 'gold');
      throttledCollisions();
    }
  });

  d3.select('.collisions').select('span').data([gameBoard.collisions]).text(function(d) {
    return d;
  });
}

var throttledCollisions = _.throttle(function() {
  gameBoard.collisions++;
}, 1200);

var incrementScore = function(score) {
  d3.select('.current').select('span').data([score]).text(function(d) {
    return d;
  });

  var highscore = d3.select('.highscore').select('span');
  highscore.data([score]).text(function(d) {
    return Math.max(d, highscore.text());
  });
};

// need to register collison counter, score, high score

// collisionCheck();
// setInterval(collisionCheck, 10);
setInterval(function() {
  collisionCheck();
  gameBoard.score++;
  incrementScore(gameBoard.score);
}, 10);
// update();
setInterval(update, 1000);




