import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import UseChart from './useChart';
import Chart from './chart';

// ----------------------------------------------------------------------

export default function AttendChart({ chart, ...other }) {
  const { labels, colors, series, options } = chart;

  const chartOptions = UseChart({
    colors,
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: false,
        columnWidth: '45%'
      }
    },
    fill: {
      type: series.map((i) => i.fill)
    },
    stroke: {
      width: 1
    },
    labels,
    xaxis: {
      type: 'string'
    },
    yaxis: {
      min: 0,
      max: 12,
      tickAmount: 12
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} hours`;
          }
          return value;
        }
      }
    },
    chart: {
      type: 'bar',
      stacked: true
    },
    ...options
  });

  return (
    <Card {...other} sx={{ boxShadow: 0 }}>
      <Box sx={{ p: 0 }}>
        <Chart series={series} options={chartOptions} width="95%" height={260} />
      </Box>
    </Card>
  );
}

AttendChart.propTypes = {
  chart: PropTypes.object
};
