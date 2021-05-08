// 2D canvas Setup
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

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

const x = canvas.width / 2
const y = canvas.height / 2

const player = new Player(x, y, 30, "white")
const projectiles = []
const enemies = []

// Animating Projectiles and Enemies & removing
function animate() {
  requestAnimationFrame(animate)
  // Clearing canvas by applying big Rect on Top of canvas before firing another projectile
  ctx.clearRect(0, 0, 2 * x, 2 * y)
  //To not clear Player
  player.draw()

  projectiles.forEach((projectile) => {
    projectile.draw()
    projectile.update()
  })

  enemies.forEach((enemy, enemyIndex) => {
    enemy.draw()
    enemy.update()

    // Remove projectile and enemy on collision
    projectiles.forEach((projectile, projectileIndex)=>{
      const dist =  Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

      if(dist - projectile.radius - enemy.radius < 1){
        // setTimout to get rid of re-rendered flash effect after enemy and projectile are cleared
        setTimeout(()=>{
          enemies.splice(enemyIndex, 1)
          projectiles.splice(projectileIndex, 1)
        },0)
      }
    })
  })
}

animate()

// Firing Projectiles on click
addEventListener("click", (e) => {
  const Xposn = e.clientX || e.touches[0].clientX
  const Yposn = e.clientY || e.touches[0].clientY
  const angle = Math.atan2(Yposn - y, Xposn - x);
  const velocity = {
    xV: Math.cos(angle),
    yV: Math.sin(angle)
  }

  projectiles.push(new Projectile(x, y, 5, "red", velocity))
})

// Spawning new Enemies every sec
function spawnEnemies() {
  setInterval(() => {
    // To randomize radius from 5 to 35
    let radius = Math.random() * (35 - 5) + 5 
    let Xposn, Yposn

    if(Math.random() > 0.5){
      Xposn = Math.random() < 0.5 ? 0 - radius : 2*x + radius
      Yposn = Math.random() * 2*y
    }else{
      Xposn = Math.random() * 2*x
      Yposn = Math.random() < 0.5 ? 0 - radius : 2*y + radius
    }

    const angle = Math.atan2(y - Yposn, x - Xposn)
    const velocity = {
      xV: Math.cos(angle),
      yV: Math.sin(angle),
    }

    enemies.push(new Enemy(Xposn, Yposn, radius, "pink", velocity))
  }, 1000)
}

spawnEnemies()
