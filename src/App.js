import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Node from './Node'
import ArtistGroup from './ArtistGroup'
import { Button, Card, Image } from 'semantic-ui-react'
import Tree from 'react-d3-tree'

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






  render() {
    return (
      <div className="App">
        <Tree id="tree" onClick={(event)=>{console.log(event)}} data={this.state.tree} orientation="vertical"/>
      </div>
    );
  }
}

export default App;
