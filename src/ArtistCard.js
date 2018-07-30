import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

class ArtistCard extends Component {

  render() {
    return (
      <Card floated={this.props.floated}>
        <Card.Content>
          <Card.Header>Artist Name</Card.Header>
          <Card.Meta>Artist description</Card.Meta>
          <Card.Description>
            <ul>
              <li>Song 1</li>
              <li>Song 2</li>
              <li>Song 3</li>
            </ul>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default ArtistCard;
