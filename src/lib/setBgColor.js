export function setBgColor(target, color) {
  target.style.transition = 'background 500ms ease'
  requestAnimationFrame(() => {
    target.style.background = color
  })
}
