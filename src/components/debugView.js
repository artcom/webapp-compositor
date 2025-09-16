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

    const screenDiagonal = Math.sqrt(width ** 2 + height ** 2)
    const fontSize = screenDiagonal * 0.02

    drawColorBars(ctx, width, height)
    drawCircle(ctx, width, height)
    drawGrid(ctx, width, height)
    drawInfoText(ctx, width, height, fontSize, device)
    drawPositionText(ctx, height, fontSize)
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
    ctx.strokeStyle = "gray"
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
  }

  function drawInfoText(ctx, width, height, fontSize, device) {
    ctx.fillStyle = "white"
    ctx.font = `${fontSize}px Arial`

    const textLines = [
      `DeviceId: ${device || "Unknown"}`,
      `Display Resolution: ${screen.width * window.devicePixelRatio}x${
        screen.height * window.devicePixelRatio
      }`,
      `Screen Resolution: ${screen.width}x${screen.height}`,
      `Viewport: ${width}x${height}`,
    ]

    textLines.forEach((text, index) => {
      const x = 10
      const y = height / 2 + 100 + index * (fontSize + 5)

      const textWidth = ctx.measureText(text).width

      ctx.fillStyle = "black"
      ctx.fillRect(x - 5, y - fontSize, textWidth + 10, fontSize + 5)

      ctx.fillStyle = "white"
      ctx.fillText(text, x, y)
    })
  }

  function drawPositionText(ctx, height, fontSize) {
    const leftMiddleX = 5
    const leftMiddleY = height / 2
    const smallFontSize = fontSize * 0.5

    ctx.fillStyle = "black"
    ctx.font = `${smallFontSize}px Arial`
    ctx.fillText(
      `x: ${leftMiddleX}, y: ${Math.floor(leftMiddleY)}`,
      leftMiddleX + 5,
      leftMiddleY - 5
    )
  }

  return <canvas ref={canvasRef} />
}
