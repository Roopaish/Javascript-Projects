// 2D canvas Setup
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight


// Player class
class Player{
  constructor(x,y,radius,color){
    this.x = x 
    this.y = y 
    this.radius = radius 
    this.color = color 
  }

  draw(){
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

const x = canvas.width / 2;
const y = canvas.width / 2;

const player = new Player(x,y,30,'white')


// Projectiles to be fired by Player
class Projectile extends Player{
  constructor(x,y,radius,color,velocity){
    super(x,y,radius,color)
    this.velocity = velocity
  }

  update(){
    this.x += this.velocity.xV
    this.y += this.velocity.yV
  }
}

const projectiles = [
  new Projectile(x, y, 5, 'pink',{xV : 1, yV : 1})
]


addEventListener('click',(e)=>{
  const Xposn = e.clientX || e.touches[0].clientX  
  const Yposn = e.clientY || e.touches[0].clientY
  const angle = Math.atan2(Yposn - x, Xposn - y)
  const velocity = {
    xV : Math.cos(angle),
    yV : Math.sin(angle)
  }

  projectiles.push(
    new Projectile(x, y, 5, 'red',velocity)
  )

})

function animate(){
  requestAnimationFrame(animate)
  // Clearing canvas by applying big Rect on Top of canvas before firing another projectile
  ctx.clearRect(0, 0, 2 * x, 2 * y) 
  player.draw() 

  projectiles.forEach((projectile)=>{
    projectile.draw()
    projectile.update()
  })
}

animate()