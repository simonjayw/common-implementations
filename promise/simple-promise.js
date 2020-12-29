function Promise (fn) {
  this.callbacks = []

  const resolve = (value) => {
    setTimeout(() => {
      this.data = value
      this.callbacks.forEach(cb => {
        cb(value)
      });
    })
  }

  fn(resolve)
}

Promise.prototype.then = function (onResolve) {
  return new Promise((resolve) => {
    this.callbacks.push(() => {
      const res = onResolve(this.data)

      if (res instanceof Promise) {
        res.then(resolve)
      } else {
        resolve(res)
      }
    })
  })
}

new Promise(resolve => {
  setTimeout(() => {
    console.log(111)
    resolve(111111)
  }, 3000)
}).then(res => {
  console.log('then res: ', res)
  console.log(2222)
})
