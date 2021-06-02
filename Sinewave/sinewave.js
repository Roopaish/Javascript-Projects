// Dom
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const rangesEl = document.querySelectorAll(".slider")
const valuesEl = document.querySelectorAll(".value")

canvas.width = innerWidth
canvas.height = innerHeight

const x = canvas.width
const y = canvas.height

ctx.translate(x / 2, y / 2)

let wave = {
  amplitude: 100,
  length: 100,
  frequency: 0.01,
}

for (let i = 0; i < rangesEl.length; i++) {
  rangesEl[i].oninput = () => {
    wave.amplitude = rangesEl[0].value
    wave.length = rangesEl[1].value
    wave.frequency = rangesEl[2].value / 100

    valuesEl[0].innerText = wave.amplitude
    valuesEl[1].innerText = wave.length
    valuesEl[2].innerText = wave.frequency
  }
}

let increment = wave.frequency
function animate() {
  requestAnimationFrame(animate)

  ctx.strokeStyle = `hsl(100, 50%, 50%)`
  ctx.fillStyle = `rgba(0,0,0,0.1)`
  ctx.fillRect(-x / 2, -y / 2, x, y)

  // Axis
  ctx.strokeStyle = `hsl(255, 50%, 50%)`
  ctx.beginPath()
  ctx.moveTo(-x / 2, 0)
  ctx.lineTo(x / 2, 0)

  ctx.moveTo(0, -y / 2)
  ctx.lineTo(0, y / 2)
  ctx.stroke()

  // Wave
  increment += wave.frequency
  ctx.strokeStyle = `hsl(${Math.abs(Math.sin(increment) * 255)}, 50%, 50%)`
  ctx.beginPath()
  ctx.moveTo(-x / 2, 0)
  for (i = -x / 2; i < x / 2; i++) {
    ctx.lineTo(
      i,

      Math.sin(i / wave.length + increment) *
        wave.amplitude *
        Math.sin(increment)
    )
  }
  ctx.stroke()
}

animate()
