function throttle (func, wait = 500) {
  let timmer = null

  return function (params) {
    if (timmer) {
      return
    }
    timmer = setTimeout(() => {
      func(params)
      timmer = null
    }, wait)
  }
}

const element = document.querySelector('.background')

const logThrottle = throttle(value => { console.log(value) }, 1000)
element.addEventListener('mousemove', (event) => {
  logThrottle(`x: ${event.pageX}, y: ${event.pageY}`)
})
