const mySort = heros => {
  return heros.sort((a, b) => {
    return a.name < b.name ? -1 : 0
  })
}

export default mySort
