import React, { PureComponent } from 'react';
import Node from '../helpers/Node'
import Tree from 'react-d3-tree'
import IdGenerator from '../helpers/IdGenerator'
import Adapter from '../helpers/Adapter'
import ArtistCard from './ArtistCard'


class TreeHome extends PureComponent {
  state = {}

  componentDidMount(){
    console.log("Tree Mounted:", this.props.tree)
    const dimensions = this.treeContainer.getBoundingClientRect();
     this.setState({
       translate: {
         x: dimensions.width / 2,
         y: dimensions.height / 7
       }
     });
  }

  addFakeNode = (e) => {
    let root = Node.insertRecsAt(this.state.tree[0], e.intId, IdGenerator.groupIds('artist'), IdGenerator.groupIds('song') )

    this.setState({
      tree: [root]
    }, ()=>{"New state:", console.log(this.state.tree)})
  }

  render() {

    const containerStyles = {
      width: '100%',
      height: '100vh',
      backgroundColor: "Lightgreen",
    }
    return (
      <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
        <Tree id="tree"
          onClick={this.props.clickedNode}
          translate={this.state.translate}
          data={this.props.tree}
          allowForeignObjects nodeLabelComponent={
            {render: <ArtistCard />,
             foreignObjectWrapper:
              {x: -50,
               y: -20}
            }
          }
          orientation="vertical"
        />
      </div>
    );
  }
}

export default TreeHome;
