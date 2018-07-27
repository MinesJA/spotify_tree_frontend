import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Node from './Node'
import ArtistGroup from './ArtistGroup'
import { Button, Card, Image } from 'semantic-ui-react'
import Tree from 'react-d3-tree'
import IdGenerator from './IdGenerator'

const myTreeData = [
  {
    name: 'Top Level',
    attributes: {
      keyA: 'val A',
      keyB: 'val B',
      keyC: 'val C',
    },
    children: [
      {
        name: 'Level 2: A',
        attributes: {
          keyA: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
      },
      {
        name: 'Level 2: B',
      },
    ],
  },
];

class App extends Component {
  state = {
    tree: [
      {
        name: 'Top Level',
        attributes: {
          keyA: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
        children: [
          {
            name: 'Level 2: A',
            attributes: {
              keyA: 'val A',
              keyB: 'val B',
              keyC: 'val C',
            },
          },
          {
            name: 'Level 2: B',
          },
        ],
      },
    ]
  }

  componentDidMount(){
  const dimensions = this.treeContainer.getBoundingClientRect();
   this.setState({
     translate: {
       x: dimensions.width / 2,
       y: dimensions.height / 2
     }
   });


    let root = Node.genFakeNode()
    root.x = 50
    root.y = 50
    console.log("Root Node created:", root)

    this.setState({
      tree: [root]
    })
  }

  addFakeNode = (e) => {

    // debugger

    console.log("Adding Fakes, root is:", this.state.tree[0])

    let root = Node.insertRecsAt(this.state.tree[0], e.intId, IdGenerator.groupIds('artist'), IdGenerator.groupIds('song') )

    console.log("Root after adding: ", root)

    this.setState({
      tree: [root]
    }, ()=>{"New state:", console.log(this.state.tree)})
  }






  render() {
    return (
      <div className="App">
        <Tree id="tree"
          onClick={this.addFakeNode}
          data={this.state.tree}
          orientation="vertical"
        />
      </div>
    );
  }
}

export default App;
