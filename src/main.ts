import lib from "../lib/index";
import shipImg from "../res/images/ship.png";
import bgImg from "../res/images/bg.png";
import bulletImg from "../res/images/bullet.png";
import enemyImg from "../res/images/baddie.png";
import buildingImg from "../res/images/building.png";
import crosshairPng from "../res/images/crosshair.png";
import * as math from "../lib/utils/Math";

const {
  KeyControls,
  MouseControls,
  Container,
  CanvasRenderer,
  TextNode,
  Texture,
  Sprite,
  Game
} = lib;

const game = new Game(640, 300);
const { scene, w, h } = game;

// game objects
//const scene = new Container();
const textures = {
  ship: new Texture(shipImg),
  bg: new Texture(bgImg),
  bullet: new Texture(bulletImg),
  enemy: new Texture(enemyImg),
  building: new Texture(buildingImg),
  crosshair: new Texture(crosshairPng),
};
const controls = new KeyControls();
const SPEED = 200;

// Ship
const ship = scene.add(new Sprite(textures.ship));
ship.pos = { x: 80, y: 120 };

ship.update = function(dt, t) {
  // Wobbly ship

};
const ships = new Container();
for (let i = 0; i < 10; i++) {
  const ship = ships.add(new Sprite(textures.ship));
  ship.pivot = { x: 16, y: 16 };
  ship.pos.x = i * 48;
}

// Bullets
// const bullets = new Container();
// function fireBullet(x, y) {
//   const bullet = new Sprite(textures.bullet);
//   bullet.pos.x = x;
//   bullet.pos.y = y;
//   bullet.update = function(dt) {
//     this.pos.x += 400 * dt;
//   };
//
//   bullets.add(bullet);
//
//   // Destroy bullets when they go out of the screen
//   bullets.children.forEach(bullet => {
//     if (bullet.pos.x >= w + 20) {
//       bullet.dead = true;
//     }
//   });
// }
//
// // Bad guys
// const enemies = new Container();
// function spawnEnemy(x, y, speed) {
//   debugger;
//   const enemy = new Sprite(textures.enemy);
//   enemy.pos.x = x;
//   enemy.pos.y = y;
//   enemy.update = function(dt) {
//     this.pos.x += speed * dt;
//   };
//   enemies.add(enemy);
// }

// Add the score game object
// const score = new TextNode("score:", {
//   font: "20px sans-serif",
//   fill: "#8B8994",
//   align: "center"
// });
// score.pos.x = w / 2;
// score.pos.y = h - 30;
//
// // Game state variables
// let lastShot = 0;
// let lastEnemy = 0;
// let enemySpeed = 1.0;
// let scoreAmount = 0;
// let gameOver = false;
//
// // game over
// function doGameOver() {
//   const gameOverMessage = new TextNode("Game Over", {
//     font: "30pt sans-serif",
//     fill: "#8B8994",
//     align: "center"
//   });
//   gameOverMessage.pos.x = w / 2;
//   gameOverMessage.pos.y = 120;
//
//   scene.add(gameOverMessage);
//   scene.remove(ship);
//   gameOver = true;
// }

// buildings
const buildings = scene.add(new Container());
const makeRandom = (b, x) => {
  b.scale.x = math.randf(1, 3);
  b.scale.y = math.randf(1, 4);
  b.pos.x = x;
  b.pos.y = h - b.scale.y * 64;
};
for (let x = 0; x < 20; x++) {
  const b = buildings.add(new Sprite(textures.building));
  makeRandom(b, math.rand(w));
}

// Add everything to scene container
scene.add(new Sprite(textures.bg));
scene.add(ship);
scene.add(ships);
scene.add(buildings);
//scene.add(bullets);
//scene.add(enemies);
//scene.add(score);

// RUN GAME
game.run((dt, t) => {
  // game logic code
  // if (!gameOver && controls.action && t - lastShot > 0.15) {
  //   lastShot = t;
  //   fireBullet(ship.pos.x + 24, ship.pos.y + 10);
  // }
  buildings.map(b => {
    b.pos.x -= 100 * dt;
    if (b.pos.x < -80) {
      makeRandom(b, w);
    }
  });

  const rps = Math.PI * 2 * dt;
  ships.map((s, i) => {
    s.rotation += i * rps;
  });
  // score.text = "score: " + scoreAmount; // update score

  // Check for collisions, or out of screen
  // enemies.children.forEach(enemy => {
  //   bullets.children.forEach(bullet => {
  //     // Check distance between baddie and bullet
  //     const dx = enemy.pos.x + 16 - (bullet.pos.x + 8);
  //     const dy = enemy.pos.y + 16 - (bullet.pos.y + 8);
  //     if (Math.sqrt(dx * dx + dy * dy) < 24) {
  //       // A hit!
  //       bullet.dead = true;
  //       enemy.dead = true;
  //       scoreAmount += Math.floor(t);
  //     }
  //     // Bullet out of the screen?
  //     if (bullet.pos.x >= w + 20) {
  //       bullet.dead = true;
  //     }
  //   });
  //
  //   // Check if baddie reached the city
  //   if (enemy.pos.x < -32) {
  //     if (!gameOver) {
  //       doGameOver();
  //     }
  //     enemy.dead = true;
  //   }
  // });

  // Spawn bad guys
  // if (t - lastEnemy > enemySpeed) {
  //   lastEnemy = t;
  //   const speed = -50 - Math.random() * Math.random() * 100;
  //   const position = Math.random() * (h - 24);
  //   spawnEnemy(w, position, speed);
  //
  //   // Accelerating for the next spawn
  //   enemySpeed = enemySpeed < 0.05 ? 0.6 : enemySpeed * 0.97 + 0.001;
  // }
});
