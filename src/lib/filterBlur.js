export function filterBlur(target) {
  target.style.transition = 'filter 200ms ease'
  target.style.filter = 'blur(0)'
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.style.filter = 'blur(5px)'
    })
  })
}
