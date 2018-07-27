export genId = (type) => {
  let id = Math.floor(Math.random() * 1000) + 1
  type == "artist" ? this.state.artistIds.push(id) : null
  return id
}


export groupIds = () => {
  // returns array of 3 numbers
  let recs = [];
  for(let i = 3; i > 0; i--){
    recs.push(this.genId())
  }
  return recs
}
