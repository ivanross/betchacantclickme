export function fadeIn(target) {
  requestAnimationFrame(() => {
    target.style.transition = 'opacity 330ms ease'
    requestAnimationFrame(() => {
      target.style.opacity = 1
    })
  })
}
