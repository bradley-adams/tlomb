import React, { Component } from 'react'
import Chart from 'react-google-charts'
const OrgData = [
  ['Name', 'Manager', 'ToolTip'],
  [
    {
      v: 'Stuart Wilson',
      f: 'Lisa<div style="color:red; font-style:italic">CEO</div>',
    },
    '',
    'The President',
  ],
  [
    {
      v: 'Eva',
      f: 'Eva<div style="color:red; font-style:italic">Vice President</div>',
    },
    'Lisa',
    'VP',
  ],
  ['Alice', 'Lisa', ''],
  ['Bob', 'Eva', 'Bob Sponge'],
  ['Carol', 'Bob', ''],
]
const OrgOptions = {
  allowHtml: true,
}
class OrgChart extends Component {
  render() {
    return (
      <div className="container mt-5">
        <h2>React Organization Chart Example</h2>
        <Chart
          width={'100%'}
          height={400}
          chartType="OrgChart"
          loader={<div>Loading Chart</div>}
          data={OrgData}
          options={OrgOptions}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    )
  }
}
export default OrgChart