// 2D canvas Setup
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const scoreEl = document.getElementById("score")
const startGameBtn = document.getElementById("startGameBtn")
const menuEl = document.getElementById("menu")
const bigScoreEl = document.getElementById("bigScore")

canvas.width = innerWidth
canvas.height = innerHeight

// Player class
class Player {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

// Projectiles to be fired by Player
class Projectile extends Player {
  constructor(x, y, radius, color, velocity) {
    super(x, y, radius, color)
    this.velocity = velocity
  }

  update() {
    this.x += this.velocity.xV
    this.y += this.velocity.yV
  }
}

// Enemy
class Enemy extends Projectile {
  constructor(x, y, radius, color, velocity) {
    super(x, y, radius, color, velocity)
  }
}

// Particles
const friction = 0.99
class Particle extends Projectile {
  constructor(x, y, radius, color, velocity) {
    super(x, y, radius, color, velocity)
    this.alpha = 1
  }

  emitParticles() {
    ctx.save()
    ctx.globalAlpha = this.alpha //save and restore is for globalAlpha to work
    this.draw()
    ctx.restore()
  }
}

const x = canvas.width / 2
const y = canvas.height / 2

let player = new Player(x, y, 10, "white")
let projectiles = []
let enemies = []
let particles = []

function init(){
  score = 0
  scoreEl.innerText = score
  bigScoreEl.innerText = score
  player = new Player(x, y, 10, "white")
  projectiles = []
  enemies = []
  particles = []
}

// Animating Projectiles and Enemies & removing
let animationId, score = 0
function animate() {
  animationId = requestAnimationFrame(animate)
  // Clearing canvas by applying big Rect on Top of canvas before firing another projectile
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)" // alpha value for smooth fading effect
  ctx.fillRect(0, 0, 2 * x, 2 * y)
  //To not clear Player
  player.draw()

  particles.forEach((particle, particleIndex) => {
    particle.emitParticles()
    if (particle.alpha <= 0.1) {
      particles.splice(particleIndex, 1)
    }
    particle.alpha -= 0.01
    particle.velocity.xV *= friction;
    particle.velocity.yV *= friction;
    particle.update()
  })

  projectiles.forEach((projectile, projectileIndex) => {
    projectile.draw()
    projectile.update()

    // Free projectiles when they go affscreen
    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > 2 * x ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > 2 * y
    ) {
      setTimeout(() => {
        projectiles.splice(projectileIndex, 1)
      }, 0)
    }
  })

  enemies.forEach((enemy, enemyIndex) => {
    enemy.draw()
    enemy.update()

    // Detecting collision on player (game end)
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
    if (dist - player.radius - enemy.radius < 1) {
      cancelAnimationFrame(animationId)
      bigScoreEl.innerText = `${score}`
      startGameBtn.innerText = 'Restart'
      menuEl.style.display = 'flex'
    }

    // Remove projectile and enemy on collision
    projectiles.forEach((projectile, projectileIndex) => {
      
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

      if (dist - projectile.radius - enemy.radius < 1) {

        // Defining Particles
        for (let i = 0; i < enemy.radius; i++) {
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 2,
              enemy.color,
              {
                xV: (Math.random() - 0.5) * Math.random() * 5,
                yV: (Math.random() - 0.5) * Math.random() * 5,
              }
            )
          )
        }

        // setTimout to get rid of re-rendered flash effect after enemy and projectile are cleared
        setTimeout(() => {
          if (enemy.radius - 10 > 10) {
             //Score Update
            score += 50;
            scoreEl.innerText = `${score}`

            gsap.to(enemy, {
              radius: enemy.radius - 10,
            })
            projectiles.splice(projectileIndex, 1)
          } else {
             //Score Update
            score += 100;
            scoreEl.innerText = `${score}`

            enemies.splice(enemyIndex, 1)
            projectiles.splice(projectileIndex, 1)
          }
        }, 0)
      }
    })
  })
}


// Firing Projectiles on click
addEventListener("click", (e) => {
  const Xposn = e.clientX || e.touches[0].clientX
  const Yposn = e.clientY || e.touches[0].clientY
  const angle = Math.atan2(Yposn - y, Xposn - x)
  const velocity = {
    xV: Math.cos(angle) * 5,
    yV: Math.sin(angle) * 5,
  }

  projectiles.push(new Projectile(x, y, 5, "white", velocity))
})

// Spawning new Enemies every sec
function spawnEnemies() {
  setInterval(() => {
    // To randomize radius from 5 to 35
    let radius = Math.random() * (35 - 5) + 5
    let Xposn, Yposn

    if (Math.random() > 0.5) {
      Xposn = Math.random() < 0.5 ? 0 - radius : 2 * x + radius
      Yposn = Math.random() * 2 * y
    } else {
      Xposn = Math.random() * 2 * x
      Yposn = Math.random() < 0.5 ? 0 - radius : 2 * y + radius
    }

    const angle = Math.atan2(y - Yposn, x - Xposn)
    const velocity = {
      xV: Math.cos(angle),
      yV: Math.sin(angle),
    }

    enemies.push(
      new Enemy(
        Xposn,
        Yposn,
        radius,
        `hsl(${Math.random() * 360},50% ,50%)`,
        velocity
      )
    )
  }, 1000)
}


startGameBtn.addEventListener('click',()=>{
  init()
  animate()
  spawnEnemies()
  menuEl.style.display = 'none'
})