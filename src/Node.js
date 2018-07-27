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

  // static createSong(name, id){
  //   return {
  //     id: id,
  //     name: name
  //   }
  // }

  static findNode = (rootObject, id) => {
    let result = null;

    if(rootObject){
      if(rootObject.intId == id){
        result = rootObject
      } else {
        // nextThree.push(rootObject.recOne, rootObject.recTwo, rootObject.recThree)
        // debugger
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

    if(node.children.length == 0){
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

  static genFakeNode = () => {
    let id = IdGenerator.genId('artist')
    console.log("Id generated:", id)

    return Node.createArtist("Fake", id, IdGenerator.groupIds("song"))
  }

  static genBranches(node){
    for(let i = 3; i > 0; i--){
      node.children.push(this.genFakeNode())
    }
  }


}
