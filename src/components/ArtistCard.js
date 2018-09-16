import React, { Component } from 'react';
import { Segment, Image, Header } from 'semantic-ui-react'

class ArtistCard extends Component {

  render() {
    let style = {width: "100px", overflow: "auto"}
    let header = {margin: "0px", fontFamily: "HelveticaNeue-Light", fontWeight: 300}
    return (
      <Segment textAlign='center' style={style}>
        {/*<iframe src={"https://embed.spotify.com/?uri=" + this.props.nodeData.song} width="80" height="80" frameborder="0" allowtransparency="true"> </iframe>*/}
        <Image src={this.props.nodeData.image.url} circular size="small" />
        <Header style={header} size='medium'>{this.props.nodeData.name}</Header>

      </Segment>

    );
  }
}

export default ArtistCard;
