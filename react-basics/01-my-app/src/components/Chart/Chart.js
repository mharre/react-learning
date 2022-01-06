import React from 'react';

import ChartBar from './ChartBar';
import './Chart.css';

const Chart = (props) => {
    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
    // transforming datapoint object into datapoint value only
    // so we can use it with max
    const totalMaximum = Math.max(...dataPointValues);
    // spread operator pulls out all array elements and adds
    // them as standalone arguments to max method

    return (
        <div className='chart'>
            {props.dataPoints.map((dataPoint) => (
                <ChartBar
                key={dataPoint.label}
                value={dataPoint.value}
                maxValue={totalMaximum}
                label={dataPoint.label}
                />
            ))}
        </div>
    )
};

export default Chart;