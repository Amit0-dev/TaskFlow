import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

const Chart = ({ labels, counts }) => {
    const data = {
        labels,
        datasets: [{ label: "Count", data: counts, backgroundColor: ['oklch(70.4% 0.191 22.216)', 'oklch(79.5% 0.184 86.047)'] }],
    };
    const options = {
        responsive: true,
        plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
        scales: { y: { display: false } },
    };

    return <Doughnut data={data} options={options} />;
};

export default Chart;
