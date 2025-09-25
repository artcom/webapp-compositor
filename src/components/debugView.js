import { useEffect, useRef, useState } from "react"
import "../../css/debugView.css" // Import external CSS file

export default function DebugView({ connected, bootstrapData }) {
  const { device } = bootstrapData || {}
  const canvasRef = useRef(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const screenDiagonal = Math.sqrt(width ** 2 + height ** 2)
    const fontSize = screenDiagonal * 0.02

    drawColorBars(ctx, width, height)
    drawCircle(ctx, width, height)
    drawGrid(ctx, width, height)
    drawInfoText(ctx, width, height, fontSize, device, connected)

    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY })
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [connected, bootstrapData])

  function drawColorBars(ctx, width, height) {
    const colors = ["white", "yellow", "cyan", "green", "magenta", "red", "blue", "black"]
    const barWidth = width / colors.length
    colors.forEach((color, i) => {
      ctx.fillStyle = color
      ctx.fillRect(i * barWidth, 0, barWidth, height / 2)
    })
  }

  function drawCircle(ctx, width, height) {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 4
    ctx.strokeStyle = "white"
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.stroke()
  }

  function drawGrid(ctx, width, height) {
    ctx.strokeStyle = "rgba(128, 128, 128, 0.5)"
    ctx.lineWidth = 1
    for (let i = 0; i < width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
    for (let i = 0; i < height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // finer grid lines
    ctx.strokeStyle = "rgba(128, 128, 128, 0.5)"
    ctx.lineWidth = 0.5
    for (let i = 0; i < width; i += 10) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
    for (let i = 0; i < height; i += 10) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }
  }

  function drawInfoText(ctx, width, height, device, connected) {
    ctx.fillStyle = "white"

    const responsiveFontSize = Math.max(Math.min(screen.width, screen.height) * 0.04, 30)
    const lineSpacing = responsiveFontSize + 10

    ctx.font = `${responsiveFontSize}px Arial`

    const textLines = [
      `DeviceId: ${device || "Unknown"}`,
      `Display Resolution: ${screen.width * window.devicePixelRatio}x${
        screen.height * window.devicePixelRatio
      }`,
      `Screen Resolution: ${screen.width}x${screen.height}`,
      `Viewport: ${width}x${height}`,
      `Window Position: ${window.screenX}, ${window.screenY}`,
      `Broker Connected: ${connected ? "Yes" : "No"}`,
    ]

    const maxLineWidth = window.innerHeight < window.innerWidth ? 500 : 1000
    let currentY = window.innerHeight / 2
    let currentX = 10

    textLines.forEach((text) => {
      const words = text.split(" ")
      let line = ""
      let lines = []

      // Wrap text to fit within maxLineWidth
      words.forEach((word) => {
        const testLine = line + word + " "
        const testWidth = ctx.measureText(testLine).width
        if (testWidth > maxLineWidth) {
          lines.push(line.trim())
          line = word + " "
        } else {
          line = testLine
        }
      })
      lines.push(line.trim())

      lines.forEach((line) => {
        if (currentY + responsiveFontSize > height) {
          currentY = window.innerHeight / 2
          currentX += maxLineWidth + 10
        }

        const textWidth = ctx.measureText(line).width

        ctx.fillStyle = "black"
        ctx.fillRect(
          currentX - 5,
          currentY - responsiveFontSize,
          textWidth + 10,
          responsiveFontSize + 5
        )

        ctx.fillStyle = "white"
        ctx.fillText(line, currentX, currentY)
        currentY += lineSpacing
      })
    })
  }

  return (
    <div className="debug-container">
      <div className="green-border" />
      <canvas ref={canvasRef} className="debug-canvas" />
      <div
        className="cursor-position"
        style={{
          top: cursorPosition.y + 10,
          left: cursorPosition.x + 10,
        }}
      >
        x: {cursorPosition.x}, y: {cursorPosition.y}
      </div>
    </div>
  )
}
