import React, { Component } from 'react'
import TopBar from './TopBar.jsx'
import Footer from './footer.jsx'

export default class App extends Component {
  render() {
    return <div>
      <TopBar />
        {this.props.children}
      <Footer />
    </div>
  }
}