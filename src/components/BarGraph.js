import React from 'react';


const Chart = ({ children, width, height }) => (
    <div
        height = {height}
        padding="10"
        margin="20 0">
      <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}>
          {children}
          <text x="0" y="250" transform="rotate(-90,10,240)" fontSize="18px" fontStyle='italic' fill="gray">Setosa</text>
          <text x="50" y="250" transform="rotate(-90,60,240)" fontSize="18px" fontStyle='italic' fill="gray">Versicolor</text>
          <text x="90" y="250" transform="rotate(-90,105,235)" fontSize="18px" fontStyle='italic' fill="gray">Virginica</text>

      </svg>
    </div>
)

const Bar = ({ x, y, width, height }) => (
  <rect
    x={x}
    y={y}
    width={width}
    height={height}
  />
)

const BarGraph = ({ data }) => {
  // Width of each bar
  const itemWidth = 40

  // Distance between each bar
  const itemMargin = 10

  const dataLength = data.length

  // const mostPct = data.reduce((acc, data.cur) => {
  //   const { pct } = cur
  //   return pct > acc ? pct : acc
  // }, 0)

  // const chartHeight = mostPct
  const chartHeight = 250; // constant 1 as the highest val

  return (
    <Chart
      width={dataLength * (itemWidth + itemMargin)}
      height={chartHeight} >
      {data.map((datum, index) => {
          /*
          This step adds a step that makes the chart x-axis up, and does so by
          simply subtracting the itemHeight object (the total for each col) by the
          height of the chart itself, which is declared in the Chart component and
          setting that value to the y component below.
          */
          const itemHeight = datum.pct*chartHeight
          console.log(datum)
          return (
            <Bar
              key={datum.name}
              x={index * (itemWidth + itemMargin)}
              y={chartHeight - itemHeight}
              width={itemWidth}
              height={itemHeight}
            />
          )
        })}
    </Chart>
  )
}

export default BarGraph;
