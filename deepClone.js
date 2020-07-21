function cloneDeep (value) {
  let result = {}

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      result[key] = value[key]
    }
  }

  return result
}
