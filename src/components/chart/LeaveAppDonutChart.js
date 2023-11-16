import ReactApexChart from 'react-apexcharts';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function LeaveAppDonutChart({ series }) {
  const chartOptions = {
    options: {
      chart: {
        type: 'donut'
      },
      legend: {
        position: 'bottom'
      },
      plotOptions: {
        pie: {
          donut: {
            size: '0%'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return `${opts.w.config.series[opts.seriesIndex]}일(${(
            (opts.w.config.series[opts.seriesIndex] * 100) /
            (opts.w.config.series[0] + opts.w.config.series[1])
          ).toFixed(0)}%)`;
        },
        dropShadow: {
          enabled: false
        },
        style: {
          colors: ['#525252'],
          fontSize: '13px',
          fontWeight: '20px'
        }
      },
      colors: ['rgb(144, 202, 249)', 'rgb(205, 229, 247)'],
      labels: ['사용연차', '잔여연차'],
      series: series
    }
  };

  return <ReactApexChart options={chartOptions.options} series={series} type="donut" width="100%" />;
}
