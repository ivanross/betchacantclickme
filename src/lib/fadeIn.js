export function fadeIn(target) {
  target.style.transition = 'opacity 330ms ease'
  requestAnimationFrame(() => {
    target.style.opacity = 1
  })
}
