const IdGenerator = (function(){
  let lastArtistId = 0;
  let lastSongId = 0;

  function genId(type){
    let id;

    type == "artist" ? id = ++lastArtistId : id = ++lastSongId
    return id
  }

  function groupIds(type){
    let recs = [];
    for(let i = 3; i > 0; i--){
      recs.push(genId(type))
    }
    return recs
  }

  return {
    genId: function(type){
      return genId(type)
    },
    groupIds: function(type){
      return groupIds(type)
    }
  }
})()

export default IdGenerator
