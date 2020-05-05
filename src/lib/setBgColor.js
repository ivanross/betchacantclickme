export function setBgColor(target, color) {
  requestAnimationFrame(() => {
    target.style.transition = 'background 500ms ease'
    requestAnimationFrame(() => {
      target.style.background = color
    })
  })
}
