import ReactApexChart from 'react-apexcharts';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function LeaveDonutChart({ series }) {
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
            size: '50%',
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                label: '총 연차',
                fontSize: '12px',
                color: 'black'
              },
              value: {
                fontSize: '22px',
                show: true,
                color: 'black'
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return `${opts.w.config.series[opts.seriesIndex]}일`;
        }
        // formatter: function (val, opts) {
        //   const originalData = opts.originalData;
        //   const originalValue = originalData[opts.seriesIndex][opts.dataPointIndex];
        //   return `${originalValue} (${val}%)`;
        // },
      },
      // colors: ["#ffeb9b", "#c5f2ba"],
      labels: ['사용연차', '잔여연차'],
      series: series,
      title: {
        text: '나의 휴가 현황',
        align: 'center',
        style: {
          fontSize: '16px'
        }
      }
    }
  };

  return <ReactApexChart options={chartOptions.options} series={series} type="donut" width="370" />;
}
