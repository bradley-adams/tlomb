import React, { Component } from "react";
import Chart from "react-google-charts";
import { OrgData } from "./StaticOrgData"

const OrgOptions = {
  allowHtml: true,
};
class OrgChart extends Component {
  render() {
    return (
      <div className="container mt-5">
        <h2>React Organization Chart Example</h2>
        <Chart
          width={"100%"}
          height={400}
          chartType="OrgChart"
          loader={<div>Loading Chart</div>}
          data={OrgData}
          options={OrgOptions}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    );
  }
}
export default OrgChart;
