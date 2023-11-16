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
            size: '45%',
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
                color: 'black',
                offsetY: 0.3
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '13px', // 글씨 크기 설정
          colors: ['black'],
          fontWeight: '10px',
          textShadow: 'none'
        },
        dropShadow: {
          enabled: false
        },
        formatter: function (val, opts) {
          return `${opts.w.config.series[opts.seriesIndex]}일`;
        },
        dropShadow: {
          enabled: false
        }
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
      },
      colors: ['rgb(144, 202, 249)', 'rgb(205, 229, 247)']
    }
  };

  return <ReactApexChart options={chartOptions.options} series={series} type="donut" width="370" />;
}
