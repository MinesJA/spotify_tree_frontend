import React, { PureComponent } from 'react';
import './App.css';
import Node from './Node'
import Tree from 'react-d3-tree'
import IdGenerator from './IdGenerator'
import Adapter from './Adapter'


const shopify_api_key = process.env.REACT_APP_SPOTIFY_API_KEY
const shopify_secrete_key = process.env.REACT_APP_SPOTIFY_SECRET


class TreeHome extends PureComponent {
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
         y: dimensions.height / 5
       }
     });


    let root = Node.genFakeNode()
    let artistName = this.props.rootArtist.name
    let artistImage = this.props.rootArtist.images[1].url
    let artistId = this.props.rootArtist.id

    // let root = Node.createArtist(artistName, artistId, )
    root.x = 50

    console.log("Root Node created:", root)

    this.setState({
      tree: [root]
    })
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
          onClick={this.addFakeNode}
          translate={this.state.translate}
          data={this.state.tree}
          orientation="vertical"
        />
      </div>
    );
  }
}

export default TreeHome;
