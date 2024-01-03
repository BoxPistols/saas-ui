// src/components/chart/Graph.tsx
import { Bar } from 'react-chartjs-2'

// エラー回避対応
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  BarController,
  BarElement,
} from 'chart.js'

// import styles from './styles/Home.module.css'
import styles from '../../../styles/Home.module.css'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  BarController,
  BarElement,
)

const ChartBar = () => {
  const data = {
    // x 軸のラベル
    labels: ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8月'],
    datasets: [
      {
        label: 'Dataset',
        // データの値
        data: [25, 59, 80, 60, 96, 55, 40, 90],
        // グラフの背景色
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        // グラフの枠線の色
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
          'rgb(255, 99, 132)',
        ],
        // グラフの枠線の太さ
        borderWidth: 2,
      },
    ],
  }

  // const options = {
  //   scales: {},
  // }
  const options = {
    responsive: true,
    plugins: {
      tooltip: {},
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
      hover: {
        mode: 'index',
        intersec: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
        min: 0,
        max: 100,
        ticks: {
          // forces step size to be 50 units
          stepSize: 10,
        },
      },
    },
  }

  return (
    <div className={styles.topChart}>
      <div>
        <Bar data={data} width={100} height={50} options={options} />
      </div>
      <div>
        <Bar data={data} width={100} height={50} options={options} />
      </div>
      <div>
        <Bar data={data} width={100} height={50} options={options} />
      </div>
    </div>
  )
}

export default ChartBar
