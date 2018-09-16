export default class Adapter{

  static spotifyAuth(){
    let apiKey = process.env.REACT_APP_SPOTIFY_API_KEY
    let redirect_uri = 'http://localhost:3000'

    fetch(`https://accounts.spotify.com/authorize/?client_id=${apiKey}&response_type=code&redirect_uri=${redirect_uri}`)
      .then( resp => resp.json() )
      .then( data => console.log("Spotify Auth: ", data))
  }

  
}
