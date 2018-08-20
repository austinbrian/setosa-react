import React from 'react';


const Chart = ({ children, width, height }) => (
  <svg
    viewBox={`0 0 ${width} ${height}`}
    width={width}
    height={height}
  >
    {children}
  </svg>
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
  const itemWidth = 20

  // Distance between each bar
  const itemMargin = 5

  const dataLength = data.length


  // const mostPct = data.reduce((acc, data.cur) => {
  //   const { pct } = cur
  //   return pct > acc ? pct : acc
  // }, 0)

  // const chartHeight = mostPct
  const chartHeight = 6;

  return (
    <Chart
      width={dataLength * (itemWidth + itemMargin)}
      height={chartHeight}
    >
      {data.map((datum, index) => {
          /*
          This step adds a step that makes the chart x-axis up, and does so by
          simply subtracting the itemHeight object (the total for each col) by the
          height of the chart itself, which is declared in the Chart component and
          setting that value to the y component below.
          */
          const itemHeight = datum.pct
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
