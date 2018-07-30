import React, { PureComponent } from 'react';
import './App.css';
import Node from './Node'
import Tree from 'react-d3-tree'
import IdGenerator from './IdGenerator'
import Adapter from './Adapter'


class TreeHome extends PureComponent {
  state = {}

  componentDidMount(){
    const dimensions = this.treeContainer.getBoundingClientRect();
     this.setState({
       translate: {
         x: dimensions.width / 2,
         y: dimensions.height / 5
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
      borderStyle: "solid"
    }
    return (
      <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
        <Tree id="tree"
          onClick={this.props.clickedNode}
          translate={this.state.translate}
          data={this.props.tree}
          orientation="vertical"
        />
      </div>
    );
  }
}

export default TreeHome;
