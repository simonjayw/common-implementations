// 自然数中小于10000的
// 是乘方数、奇数
// 算出他们的总和

// Haskell的写法
// sum(takeWhile (<10000) (filter add (map (^2) [1..])))

// javascript的实现
const numbers = function* () {
  let i = 1;
  while (true) {
    yield i++;
  }
};

class Lazy {
  constructor(iterable, callback) {
    this.iterable = iterable;
    this.callback = callback;
  }

  filter(predicate) {
    return new LazyFilter(this, predicate);
  }

  map(mapper) {
    return new LazyMap(this, mapper);
  }

  next() {
    return this.iterable.next();
  }

  takeWhile(predicate) {
    const result = [];
    let value = this.next().value;

    while (predicate(value)) {
      result.push(value);
      value = this.next().value;
    }
    return result;
  }
}

class LazyMap extends Lazy {
  next() {
    const item = this.iterable.next();
    const mappedValue = this.callback(item.value);

    return {
      value: mappedValue,
      done: item.done,
    };
  }
}

class LazyFilter extends Lazy {
  next() {
    while (true) {
      const item = this.iterable.next();

      if (this.callback(item.value)) {
        return item;
      }
    }
  }
}

new Lazy(numbers())
  .map((x) => x ** 2)
  .filter((x) => x % 2 === 1)
  .takeWhile((x) => x < 10000)
  .reduce((x, y) => x + y, 0);

// ==> 166650

// https://lambda.academy/javascript-lazy-evaluation/
