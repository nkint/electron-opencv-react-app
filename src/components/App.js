import React from 'react'
import fs from 'fs'

const items = fs.readdirSync('.')

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h2>
          Electron App
        </h2>
        {
          items.map(item => <p>{item}</p>)
        }
      </div>
    )
  }
}
