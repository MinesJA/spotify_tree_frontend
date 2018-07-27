
export default class Node{

  static create(name, id, songsObject){
    return {
      name: name,
      id: id,
      attributes: songsObject,
      children: []
    }
  }

  static findNode(rootObject, id){
    let result = null;

    if(rootObject){
      if(rootObject.id == id){
        result = rootObject
      } else {
        nextThree.push(rootObject.recOne, rootObject.recTwo, rootObject.recThree)

        children.forEach( (nodeObject) => {
          if(!result){
            result = this.findNode(val, id);
          }
        })
      }
    }

    return result;
  }

  static insertRecsAt(nodeTree, nodeId, recsIdsArray, songsIdsArray){
    let node = Node.findNode(nodeTree, nodeId)

    if(!node.recOne && !node.recTwo && !node.recThree){

      let [recIdOne, recIdTwo, recIdThree] = recsIdsArray

      node.recOne = this.createNode(recIdOne, songsIdsArray)
      node.recTwo = this.createNode(recIdTwo, songsIdsArray)
      node.recThree = this.createNode(recIdThree, songsIdsArray)

      return node

    } else {
      console.log("Recs are occupied")
    }
  }


}
