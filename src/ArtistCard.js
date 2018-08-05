import React, { Component } from 'react';
import { Segment, Image, Header } from 'semantic-ui-react'

class ArtistCard extends Component {

  componentDidMount(){
    console.log("Artist Card Mounted")
    //
  }

  render() {
    console.log("ArtistCard Rendered", this.props)
    // let { imageUrl, name, songs, id, url, genres } = this.props.artist
    let style = {width: "50px", height: "50px"}
    let header = {margin: "0px", fontFamily: "HelveticaNeue-Light", fontWeight: 300}
    return (
      <Segment textAlign='center' style=>
        {/*<iframe src={"https://embed.spotify.com/?uri=" + this.props.nodeData.song} width="80" height="80" frameborder="0" allowtransparency="true"> </iframe>*/}
        <Image src={this.props.nodeData.image.url} circular size="small" />
        <Header style={header} size='medium'>{this.props.nodeData.name}</Header>

      </Segment>

    );
  }
}

export default ArtistCard;
