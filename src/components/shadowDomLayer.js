export function ShadowDomLayer({ src, className }) {
  return (
    <div
      className={className}
      style={{ pointerEvents: "none" }}
      ref={async (ref) => {
        if (ref && !ref.shadowRoot) {
          let shadowDomContent
          try {
            const response = await fetch(src)
            if (response.ok) {
              const html = await response.text()
              shadowDomContent = html
            } else {
              console.error("Failed to fetch website content:", response.status)
            }
          } catch (error) {
            console.error("Error fetching website content:", error)
          }
          const shadowRoot = ref.attachShadow({ mode: "open" })
          shadowRoot.innerHTML = shadowDomContent
          const style = document.createElement("style")
          style.textContent = "* {pointer-events:all}"
          shadowRoot.appendChild(style)
        }
      }}
    />
  )
}
