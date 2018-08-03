import React, { Component } from 'react';
import { Segment, Image, Header } from 'semantic-ui-react'

class ArtistCard extends Component {



  render() {
    let { imageUrl, name, songs, id, url, genres } = this.props.artist
    let style = {width: "50%", margin: "0 auto"}
    let header = {margin: "0px", fontFamily: "HelveticaNeue-Light", fontWeight: 300}
    return (
      <Segment textAlign='center' circular>
        <iframe src={"https://embed.spotify.com/?uri=" + songs[0]} width="80" height="80" frameborder="0" allowtransparency="true"></iframe>
        <Header style={header} size='medium'>{name}</Header>
      </Segment>

    );
  }
}

export default ArtistCard;
