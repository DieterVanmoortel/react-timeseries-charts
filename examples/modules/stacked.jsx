import React from "react/addons";
import _ from "underscore";
import {TimeSeries} from "pond";

//Imports from the charts library
import Legend from "../../lib/components/legend";
import ChartContainer from "../../lib/components/chartcontainer";
import ChartRow from "../../lib/components/chartrow";
import Charts from "../../lib/components/charts";
import YAxis from "../../lib/components/yaxis";
import AreaChart from "../../lib/components/areachart";
import Baseline from "../../lib/components/baseline";
import Resizable from "../../lib/components/resizable";

import Markdown from "react-markdown-el";
const exampleText = `

This example shows a stacked area chart. Area charts can be stacked both above and below the axis. This
example also shows basic styling using an array of colors:

    const style = {up: ["#1f77b4", "#aec7e8", "#ff7f0e", ... ]}

Area charts default to a step style interpolation. This example also shows how to set the interpolation
to any of d3's interpolate functions, in this case 'linear'.

    <ChartContainer timeRange={range}>
        <ChartRow height="350">
            <Charts>
                <AreaChart axis="value" style={style} series={[series,[]]} interpolate="linear"/>
            </Charts>
            <YAxis id="value" label="" labelOffset={0} max={max} width="60" type="linear"/>
        </ChartRow>
    </ChartContainer>
`;

//Data
var rawData = require("../data/stacked.json");

var seriesList = _.map(rawData, d => {
    return new TimeSeries({
        "name": `${d.key}`,
        "columns": ["time", "value"],
        "points": d.values
    });
});

var countriesList = _.map(rawData, d => {
    return d.key;
});

var colorsList = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c",
                  "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5",
                  "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
                  "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"]

var legendCategories = _.map(countriesList, (d, i) => ({
        "key": d,
        "label": d,
        "style": {"backgroundColor": colorsList[i]}
    })
);

console.log(seriesList)

export default React.createClass({

    render: function() {
        const dateRangeStyle = {fontSize: 12, color: "#AAA",
                              borderBottomStyle: "solid", borderWidth: "1", borderColor: "#F4F4F4"};
        const style = {up: colorsList}
        const max = 130;
        const axistype = "linear"

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Stacked area chart example</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Legend categories={legendCategories} type="swatch"/>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-md-12">
                        <Resizable>

                            <ChartContainer timeRange={seriesList[0].range()} padding="0" transition="300">
                                <ChartRow height="350" debug={false}>
                                    <Charts>
                                        <AreaChart axis="value" style={style} series={[seriesList,[]]} interpolate="linear"/>
                                    </Charts>
                                    <YAxis id="value" label="" labelOffset={0} max={max} width="60" type={axistype}/>
                                </ChartRow>
                            </ChartContainer>

                        </Resizable>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-md-12">
                        <Markdown text={exampleText} />
                    </div>
                </div>

            </div>
        );
    }
});