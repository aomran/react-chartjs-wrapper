var _chart = require('chart.js');
function getTopRoundedRectangles(datasets, currentIndex) {
  const chartData = datasets.map(({data}) => data)
  const barRectangleValues = [[], [], [], [], [], [], []]
  for (let labelIndex = 0; labelIndex < chartData.length; labelIndex++) {
    const labelElements = chartData[labelIndex]
    for (let barIndex = 0; barIndex < labelElements.length; barIndex++) {
      const barElement = labelElements[barIndex]
      barRectangleValues[barIndex].push(barElement)
    }
  }
  const rounded = {
    '0': 3,
    '1': 3,
    '2': 3,
    '3': 3,
    '4': 3,
    '5': 3,
    '6': 3
  }
  for (let index = barRectangleValues[currentIndex].length - 2; index >= 0; index--) {
    const element = barRectangleValues[currentIndex][index]
    if (element > 0) {
      rounded[currentIndex] = index
      break
    }
  }
  return rounded
}

// draws a rectangle with a rounded top
_chart.helpers.drawRoundedTopRectangle = function(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  // top right corner
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  // bottom right corner
  ctx.lineTo(x + width, y + height)
  // bottom left corner
  ctx.lineTo(x, y + height)
  // top left
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

_chart.helpers.drawRoundedBottomRectangle = function(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  // top right corner
  ctx.lineTo(x + width, y)
  // bottom right corner
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  // bottom left corner
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  // top left
  ctx.lineTo(x, y)
  ctx.closePath()
}

_chart.helpers.drawRectangle = function(ctx, x, y, width, height) {
  ctx.beginPath()
  ctx.moveTo(x, y)
  // top right corner
  ctx.lineTo(x + width, y)
  // bottom right corner
  ctx.lineTo(x + width, y + height)
  // bottom left corner
  ctx.lineTo(x, y + height)
  // top left
  ctx.lineTo(x, y)
  ctx.closePath()
}

_chart.elements.RoundedTopRectangle = _chart.elements.Rectangle.extend({
  draw: function() {
    let ctx = this._chart.ctx
    let vm = this._view
    let left, right, top, bottom, signX, signY, borderSkipped
    let borderWidth = vm.borderWidth

    if (!vm.horizontal) {
      // bar
      left = vm.x - vm.width / 2
      right = vm.x + vm.width / 2
      top = vm.y
      bottom = vm.base
      signX = 1
      signY = bottom > top ? 1 : -1
      borderSkipped = vm.borderSkipped || 'bottom'
    } else {
      // horizontal bar
      left = vm.base
      right = vm.x
      top = vm.y - vm.height / 2
      bottom = vm.y + vm.height / 2
      signX = right > left ? 1 : -1
      signY = 1
      borderSkipped = vm.borderSkipped || 'left'
    }

    // Canvas doesn't allow us to stroke inside the width so we can
    // adjust the sizes to fit if we're setting a stroke on the line
    if (borderWidth) {
      // borderWidth shold be less than bar width and bar height.
      let barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom))
      borderWidth = borderWidth > barSize ? barSize : borderWidth
      let halfStroke = borderWidth / 2
      // Adjust borderWidth when bar top position is near vm.base(zero).
      let borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0)
      let borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0)
      let borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0)
      let borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0)
      // not become a vertical line?
      if (borderLeft !== borderRight) {
        top = borderTop
        bottom = borderBottom
      }
      // not become a horizontal line?
      if (borderTop !== borderBottom) {
        left = borderLeft
        right = borderRight
      }
    }

    // calculate the bar width and roundess
    let barWidth = Math.abs(left - right)
    let roundness = this._chart.config.options.barRoundness || 0.5
    let radius = barWidth * roundness * 0.5

    // keep track of the original top of the bar
    let prevTop = top

    // move the top down so there is room to draw the rounded top
    top = prevTop + radius
    let barRadius = top - prevTop

    ctx.beginPath()
    ctx.fillStyle = vm.backgroundColor
    ctx.strokeStyle = vm.borderColor
    ctx.lineWidth = borderWidth

    // draw the rounded top rectangle
    const rounded = getTopRoundedRectangles(this._chart.data.datasets, this._index)
    const barsNumber = this._chart.options.barsNumber
    if (this._datasetIndex === barsNumber) {
      _chart.helpers.drawRoundedTopRectangle(ctx, left, (top - barRadius + 1), barWidth, bottom - prevTop, barRadius)
    } else if (rounded[this._index] === this._datasetIndex) {
      _chart.helpers.drawRoundedTopRectangle(ctx, left, (top - barRadius + 1), barWidth, bottom - prevTop, barRadius)
    } else {
      _chart.helpers.drawRectangle(ctx, left, (top - barRadius + 1), barWidth, bottom - prevTop)
    }

    ctx.fill()
    if (borderWidth) {
      ctx.stroke()
    }

    // restore the original top value so tooltips and scales still work
    top = prevTop
  }
})

_chart.defaults.roundedBar = _chart.helpers.clone(_chart.defaults.bar)

_chart.controllers.roundedBar = _chart.controllers.bar.extend({
  dataElementType: _chart.elements.RoundedTopRectangle
})

