import React, { Component } from 'react'
import CreateJukebox from './CreateJukebox/Container'
import JukeboxGrid from './JukeboxGrid/Container'

class App extends Component {

  render() {
    return (
      <div>
        <CreateJukebox />
        <JukeboxGrid />
      </div>
    );
  }
}

export default App;
