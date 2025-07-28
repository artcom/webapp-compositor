import { useEffect, useRef } from "react"

export default function DebugView({ connected, hostname, resolution, brokerState }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas dimensions
    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width
    canvas.height = height

    // Draw color bars
    const colors = ["white", "yellow", "cyan", "green", "magenta", "red", "blue", "black"]
    const barWidth = width / colors.length
    colors.forEach((color, i) => {
      ctx.fillStyle = color
      ctx.fillRect(i * barWidth, 0, barWidth, height / 2)
    })

    // Draw a circle in the center
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 4
    ctx.strokeStyle = "white"
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.stroke()

    // Draw grid lines
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

    // Draw text overlay
    ctx.fillStyle = "white"
    ctx.font = "16px Arial"
    const textLines = [
      `Hostname: ${hostname || "Unknown"}`,
      `Resolution: ${resolution || "Unknown"}`,
      `Broker State: ${brokerState || "Unknown"}`,
      `Connected: ${connected ? "Yes" : "No"}`,
    ]
    textLines.forEach((text, index) => {
      ctx.fillText(text, 10, height - 100 + index * 20)
    })
  }, [connected, hostname, resolution, brokerState])

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  )
}
