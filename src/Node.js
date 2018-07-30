import IdGenerator from './IdGenerator'


export default class Node{



  static createArtist(name, id, songsObject){
    return {
      name: name,
      intId: id,
      id: null,
      attributes: songsObject,
      children: []
    }
  }

  static returnNodeWith(artistObject, topTracks){
    let { name, id } = artistObject
    let [songOne, songTwo, songThree ] = topTracks
    let songsObject = {
        'SongOne': `${songOne}`,
        'SongTwo': `${songTwo}`,
        'SongThree': `${songThree}`
      }

    return Node.createArtist(name, id, songsObject)
  }

  static addChildren(node, relatedArtists){

    relatedArtists.forEach( (artist)=>{
      node.children.push(Node.createArtist(artist.name, artist.id, artist.songsObject))
    })

    return node
  }

  static findNode = (rootObject, id) => {
    let result = null;

    if(rootObject){
      if(rootObject.intId === id){
        result = rootObject
      } else {
        rootObject.children.forEach( (nodeObject) => {
          if(!result){
            result = Node.findNode(nodeObject, id);
          }
        })
      }
    }

    return result
  }

  static insertRecsAt = (nodeTree, nodeId, recsIdsArray, songsIdsArray) => {
    let node = Node.findNode(nodeTree, nodeId)

    if(node.children.length === 0){
      let songsObject = {}

      songsIdsArray.forEach( (id) => {
        songsObject[`${id}`] = id
      })

      recsIdsArray.forEach( (id)=>{
        node.children.push(Node.createArtist("FakeArtist", id, songsObject))
      })

      return nodeTree

    } else {
      console.log("Recs are occupied")
    }
  }

  static genFakeNode = () => (
    Node.createArtist("Fake", IdGenerator.genId('artist'), IdGenerator.groupIds("song"))
  )

  static genBranches(node){
    for(let i = 3; i > 0; i--){
      node.children.push(this.genFakeNode())
    }
  }


}
