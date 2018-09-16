import IdGenerator from './IdGenerator'


export default class Node{

  static returnNode(artistObject){
    // incoming artist object is {artist: {}, topTracks: {}}

    let artistNode = {
      name: "",
      intId: "",
      id: null,
      attributes: {},
      children: []
    }

    artistNode.name = artistObject.artist.name
    artistNode.intId = artistObject.artist.id

    let [songOne, songTwo, songThree] = artistObject.topTracks

    // artistNode.attributes['songOne'] = songOne.uri
    artistNode.song = songOne.uri
    artistNode.image = artistObject.artist.images[2]

    return artistNode
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

  static insertRecsAt = (nodeTree, nodeId, children) => {
    let node = Node.findNode(nodeTree, nodeId)

    node.children = children

    return nodeTree
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
