import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Spotify from './Spotify'
import SelectedArtists from './SelectedArtists'
import BuildButton from './BuildButton'
import { connect } from 'react-redux'
// import Logo from './Logo'
// import Playlist from './Playlist'

class Home extends Component {
  render () {
    if (!window.localStorage.getItem('spotify:token')) {
      return <Redirect to='/login' />
    } else {
      if (this.props.artists.length !== 0) {
        return <div className='Home'>
          <Spotify />
          <SelectedArtists />
          <BuildButton />
        </div>
      } else {
        return <div className='Home'>
          <Spotify />
          <div className={this.props.artists.length === 0 ? 'Home__more-info' : 'hidden'}>
            <Link to='/info' title='Instructions for building a playlist' tabIndex='2'>How's it work?</Link>
          </div>
        </div>
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    artists: state.selected.artists,
    inProgress: state.playlist.inProgress,
    built: state.playlist.built,
    tracks: state.playlist.tracks
  }
}

export default connect(mapStateToProps)(Home)
