import React, { Component } from 'react';
import ArtistCard from './ArtistCard'
import { Segment } from 'semantic-ui-react'

class ArtistGroup extends Component {

  render() {
    return (
      <Segment basic clearing>
        <ArtistCard floated="left"/>
        <ArtistCard floated="center"/>
        <ArtistCard floated="right"/>
      </Segment>
    );
  }
}

export default ArtistGroup;
