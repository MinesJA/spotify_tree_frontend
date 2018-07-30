import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'


class Search extends Component {
  state = {
      searchTerm: "",
      spotifyApi: this.props.spotifyApi
    }


  handleChange = (e, {value}) => {
    console.log(this.props.spotifyApi)
    this.setState({
      searchTerm: value
    }, ()=>{console.log(this.state.searchTerm)} )
  }

  handleSubmit = () => {
    this.state.spotifyApi.search(this.state.searchTerm, ['artist'])
      .then(resp=>resp.json())
      .then(response=>{console.log(response)})
  }



  render(){
    const style = {
      width: "50%",
      margin: "0 auto"
    }
    return(
      <div style={style}>
        <Input type='text' placeholder='Search Artists...' action onChange={this.handleChange}>
          <input />
          <Button type='submit' onClick={this.handleSubmit}>Search</Button>
        </Input>
      </div>
    )
  }
}

export default Search
