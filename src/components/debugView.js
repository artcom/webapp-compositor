import { useEffect, useRef } from "react"

export default function DebugView({ connected, bootstrapData }) {
  const { device } = bootstrapData || {}
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const colors = ["white", "yellow", "cyan", "green", "magenta", "red", "blue", "black"]
    const barWidth = width / colors.length
    colors.forEach((color, i) => {
      ctx.fillStyle = color
      ctx.fillRect(i * barWidth, 0, barWidth, height / 2)
    })

    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 4
    ctx.strokeStyle = "white"
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.stroke()

    ctx.strokeStyle = "gray"
    ctx.lineWidth = 1
    for (let i = 0; i < width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, height / 2)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
    for (let i = height / 2; i < height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    const screenDiagonal = Math.sqrt(width ** 2 + height ** 2)
    const fontSize = screenDiagonal * 0.02
    ctx.fillStyle = "white"
    ctx.font = `${fontSize}px Arial`

    const textLines = [
      `${device || "Unknown"}`,
      `Device:${screen.width}x${screen.height}`,
      `Window: ${width}x${height}`,

      `Broker: ${connected || "Unknown"}`,
    ]
    textLines.forEach((text, index) => {
      const x = 10
      const y = height / 2 + 100 + index * (fontSize + 5)

      // Measure text width
      const textWidth = ctx.measureText(text).width

      // Draw black background rectangle
      ctx.fillStyle = "black"
      ctx.fillRect(x - 5, y - fontSize, textWidth + 10, fontSize + 5)

      // Draw white text
      ctx.fillStyle = "white"
      ctx.fillText(text, x, y)
    })
  }, [connected, device])

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  )
}
