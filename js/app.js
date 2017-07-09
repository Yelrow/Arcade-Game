// Enemies our player must avoid
var score = "0";
document.getElementById("score").innerHTML = score;

// wanted the final enemy to spawn randomly in one of the rows.
var STARTING_POSITIONS = [60, 140, 225];

var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 5 + 1)
    // (Math.floor(Math.random() * (650 - 150) + 150) * dt);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Math.floor(Math.random() * (max - min + 1)) + min - creates a range
    if (this.x < 505) {
        this.x += this.speed
    } else {
        this.x = -100;
    }

    //1st - tests whether he is in the road
    //2nd - allows him behind the enemies
    //3rd - allows him in front of enemies
    //need better solution...because if enemies are sent at different intervals, tests will return true.
    // TODO need height booleans
    if ((this.x < player.x + 60) && (this.x + 50 > player.x) && this.y < player.y + 60 && this.y > player.y - 40 ) {
        score = 0;
        document.getElementById('score').innerHTML = 0;
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};


Player.prototype.update = function(dt) {
    if (this.y < 10) {
        score++;
        document.getElementById('score').innerHTML = score;
        this.reset();
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y > 420) {
        this.y = 420;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        // move x to the left
        this.x = this.x - 50;
    }
    if (key == 'right') {
        // move x to the right
        this.x = this.x + 50;
    }
    if (key == 'up') {
        // move y up
        this.y = this.y - 50;
    }
    if (key == 'down') {
        // move y down
        this.y = this.y + 50;
    }
};

Player.prototype.reset = function() {
    // resets to original position
    this.x = 200;
    this.y = 420;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Math.floor(Math.random() * (max - min + 1)) + min
var player = new Player(200,420);
var allEnemies = [];
allEnemies[0] = new Enemy((Math.random() * 400) * -1, 60);
allEnemies[1] = new Enemy((Math.random() * 400) * -1, 140);
allEnemies[2] = new Enemy((Math.random() * 400) * -1, 225);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
