import React, { Component } from 'react'
import CreateJukebox from './CreateJukebox/Container'
import JukeboxGrid from './JukeboxGrid/Container'

class Home extends Component {

  render() {
    return (
      <div>
        <CreateJukebox />
        <JukeboxGrid />
      </div>
    );
  }
}

export default Home;
