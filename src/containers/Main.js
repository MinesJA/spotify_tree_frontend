import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js'
import TreeHome from '../components/TreeHome'
import Search from '../components/Search'
import Node from '../helpers/Node'

const spotifyApi = new SpotifyWebApi();


class App extends Component {
  state = {
    artistNode: {},
    tree: []
  }

  findArtistByTerm = (searchTerm) => {
    let artistObject = {};

    return spotifyApi.searchArtists(searchTerm)
      .then(resp => {
        artistObject['artist'] = resp.artists.items[0];
        artistObject['market'] = resp.artists.href.split("&").find( (string) => (string.includes("market"))).split("=")[1];

        return artistObject
      })
  }


  instantiateRoot = (searchTerm) => {
    let artistNode;

    this.findArtistByTerm(searchTerm)
      .then( artistObject => {

        this.buildArtistNode(artistObject)
        .then( node => {
          artistNode = node

          this.getRelatedArtistNodes(node.intId)
            .then( artistsArray => {
              artistNode.children = artistsArray

              this.setState({
                tree: [artistNode],
                artistNode
              })
            })
        })
      })
    }


  async relatedArtistsToNodes(relatedArtists){

    let promise = new Promise((resolve, reject) => {
      let artistsArray = [];

      relatedArtists.forEach(async (artist) => {

        this.findArtistByTerm(artist.name)
          .then(artistObject => {

            this.buildArtistNode(artistObject)
              .then( node => {
                artistsArray.push(node)
              })
          })
      })
      setTimeout(()=>resolve(artistsArray), 1000)
    })

    let result = await promise;
    return result


  }


  getRelatedArtistNodes = (artistId) => {

    return spotifyApi.getArtistRelatedArtists(artistId)
      .then(resp => {
        let relatedArtists = resp.artists.splice(0,3);

        return this.relatedArtistsToNodes(relatedArtists)
          .then(artistsArray => {
              return artistsArray
          })
      })
  }


  buildArtistNode = (artistObject) => {
    return spotifyApi.getArtistTopTracks(artistObject.artist.id, artistObject.market)
      .then(resp => {
        artistObject['topTracks'] = resp.tracks.splice(0,3);
        return Node.returnNode(artistObject)
      })
  }


  handleClick = (e) => {
    let node = Node.findNode(this.state.tree[0], e.intId)

    if(node.children.length == 0){
      this.getRelatedArtistNodes(e.intId)
        .then( artistsArray => {
          let tree = Node.insertRecsAt(this.state.tree[0], e.intId, artistsArray)

          this.setState({tree: [tree]})
        })
    }
  }


  render() {
    const mainStyle = {
      width: "75%",
      height: "1000px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column",
      border: "2px solid black"
    }

    return (
      <div style={mainStyle}>
        <Search handleSubmit={(searchTerm)=>{this.instantiateRoot(searchTerm)}} />
        {
          Object.keys(this.state.artistNode).length > 0 ?
          <TreeHome tree={this.state.tree} clickedNode={this.handleClick} />
          :
          null
        }
      </div>
    );
  }
}

export default App;
