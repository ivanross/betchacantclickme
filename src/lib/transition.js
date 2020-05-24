export function fadeIn(target) {
  if (!target) return
  target.style.transition = 'opacity 330ms ease'
  requestAnimationFrame(() => {
    target.style.opacity = 1
  })
}

export function fadeOut(target) {
  if (!target) return
  target.style.transition = 'opacity 330ms ease'
  requestAnimationFrame(() => {
    target.style.opacity = 0
  })
}

export function filterBlur(target) {
  if (!target) return
  target.style.transition = 'filter 200ms ease'
  target.style.filter = 'blur(0)'
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.style.filter = 'blur(5px)'
    })
  })
}

export function setBgColor(target, color) {
  if (!target) return
  target.style.transition = 'background 500ms ease'
  requestAnimationFrame(() => {
    target.style.background = color
  })
}

export function setText(target, text) {
  if (!target) return
  target.textContent = text
}

export function set(target, prop, value, time) {
  if (!target) return
  target.style.transition = `${prop} ${time}ms ease`
  requestAnimationFrame(() => {
    target.style[prop] = value
  })
}

export function hide(target) {
  if (!target) return
  target.style.display = 'none'
}

export function fadeOutAndHide(target) {
  if (!target) return
  fadeOut(target)
  target.style.pointerEvents = 'none'
  setTimeout(() => hide(target), 500)
}
