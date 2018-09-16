import React from 'react';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';

const LoginPage = () => {

  const divStyle = {
    position: "absolute",
    top: "0px",
    width: '100%',
    height: '100%',
    backgroundImage: `url(http://foothillertech.com/student/webdesign/2017/02_20/Assets/Images/Bg.gif)`,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }

  const segmentStyle = {
    width: "40%",
    height: "30%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "stretch"
  }

  const headerStyle = {
    marginBottom: "40px"
  }

  return (
    <div style={divStyle}>
      <Segment style={segmentStyle}>
        <Header as='h2' icon style={headerStyle} size="huge">
          <Icon name='spotify' />
          Spotify Recommendation Tree
          <Header.Subheader>See Spotifys Artist recommendations in a tree.</Header.Subheader>
        </Header>
        <Button fluid color='green' href='http://localhost:8888/login' size="huge">
          Log in with Spotify
        </Button>
      </Segment>
    </div>
  )
}

export default LoginPage
