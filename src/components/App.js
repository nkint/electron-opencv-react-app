import React from 'react'
import fs from 'fs'
import path from 'path'
var cv = require('electron').remote.require('opencv4nodejs')

const items = fs.readdirSync('.')

export default class App extends React.Component {
  state = {
    image: null,
  }

  componentDidMount() {
    var selectedImgBGR = cv.imread(path.resolve('./public', 'Lenna.png')).resizeToMax(500)
    this.setState({ image: selectedImgBGR }, this.drawImage)
  }

  canvas = null

  drawImage = () => {
    console.log(this.canvas)
    const img = this.state.image
    const canvas = this.canvas

    var matRGBA = img.channels === 1 ? img.cvtColor(cv.COLOR_GRAY2RGBA) : img.cvtColor(cv.COLOR_BGR2RGBA)

    canvas.height = img.rows
    canvas.width = img.cols
    var imgData = new window.ImageData(
      new Uint8ClampedArray(matRGBA.getData()),
      img.cols,
      img.rows
    )
    var ctx = canvas.getContext('2d')
    ctx.putImageData(imgData, 0, 0)
  }

  render() {
    console.log('image:', this.state.image);
    return (
      <div className="code pa2 ma2">
        <h2>
          Electron Opencv React App
        </h2>
        {
          items.map((item, i) => <p className="pa0 ma0" key={i}>{item}</p>)
        }
        <div className="pv2 mv2">
          <canvas ref={(canvas) => { this.canvas = canvas }}></canvas>
        </div>
      </div>
    )
  }
}
