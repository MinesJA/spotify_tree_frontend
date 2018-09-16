import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'


class Search extends Component {
  state = {
      searchTerm: ""
    }

  handleChange = (e, {value}) => {
    this.setState({
      searchTerm: value
    })
  }

  render(){

    return(
      <div style={{margin: "20px"}}>
        <Input type='text' placeholder='Search Artists...' action onChange={this.handleChange}>
          <input />
          <Button type='submit' onClick={()=>{this.props.handleSubmit(this.state.searchTerm)}}>Search for an Artist</Button>
        </Input>
      </div>
    )
  }
}

export default Search
