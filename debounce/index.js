function debounce (func, wait = 500) {
  let timmer = null

  return function (props) {
    if (timmer) {
      clearTimeout(timmer)
    }
    timmer = setTimeout(() => {
      func(props)
      timmer = null
    }, wait)
  }
}

const inputEl = document.querySelector('#testInput')

const logDounce = debounce(value => {
  console.log('log', value)
}, 500)
inputEl.addEventListener('input', function (e) {
  const value = e.target.value

  logDounce(value)
})
