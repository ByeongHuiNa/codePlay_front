import ReactApexChart from 'react-apexcharts';

// ----------------------------------------------------------------------

export default function LeaveDonutChart({ series }) {
  const chartOptions = {
    options: {
      chart: {
        type: 'donut',
      },
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
      }],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: false,
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
              }
            },
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#ffeb9b", "#c5f2ba"],
      labels: ["사용연차", "잔여연차"],
      series: series,
      title: {
        text: '나의 휴가 현황',
        align: 'center'
      },
      tooltip: {
        enabled: true,
        shared: false,
        style: {
          fontSize: '14px', // 툴팁의 글꼴 크기 설정
          color: '#000000', // 글꼴 색상 설정
          background: '#333', // 툴팁의 배경색 설정
          padding: {
            left: 10,
            right: 10,
            top: 5,
            bottom: 5
          }, // 툴팁의 안쪽 여백 설정
          borderRadius: '5px' // 툴팁의 테두리 모서리를 둥글게 만듭니다
        }
      }
    }
  }

return(
  <ReactApexChart
    options = { chartOptions.options }
    series = { series }
    type = "donut"
    width = "400"
        />
)
  }