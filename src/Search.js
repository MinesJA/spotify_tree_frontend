import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'


class Search extends Component {
  state = {
      searchTerm: ""
    }


  handleChange = (e, {value}) => {
    console.log(this.props.spotifyApi)
    this.setState({
      searchTerm: value
    }, ()=>{console.log(this.state.searchTerm)} )
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
          <Button type='submit' onClick={()=>{this.props.handleSubmit(this.state.searchTerm)}}>Search</Button>
        </Input>
      </div>
    )
  }
}

export default Search
