import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { darkTheme } from '../theme';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface IHistoricalData {
	time_open: number;
	time_close: number;
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
	market_cap: number;
}

export interface ChartProps {
	coinId: string;
}

function Chart({ coinId }: ChartProps) {
	const isDark = useRecoilValue(isDarkAtom);
	const { isLoading, data } = useQuery<IHistoricalData[]>(
		['ohlcv', coinId],
		() => fetchCoinHistory(coinId),
		{
			refetchInterval: 10000,
		}
	);

	let validData = data ?? [];

	return (
		<div>
			{isLoading ? (
				'Loading Charts...'
			) : (
				<>
					<ApexChart
						type="line"
						series={[
							{
								name: 'Price',
								data: validData?.map((price) => Number(price.close)),
							},
						]}
						options={{
							theme: {
								mode: isDark ? 'dark' : 'light',
							},
							chart: {
								height: 300,
								width: 500,
								toolbar: {
									show: false,
								},
								background: 'transparent',
								animations: {
									enabled: true,
									easing: 'easeinout',
									animateGradually: {
										enabled: true,
										delay: 150,
									},
									dynamicAnimation: {
										enabled: true,
										speed: 350,
									},
									speed: 800,
								},
							},
							grid: { show: false },
							stroke: {
								curve: 'smooth',
								width: 3,
							},
							yaxis: { labels: { show: false } },
							xaxis: {
								labels: { show: false },
								axisTicks: { show: false },
								axisBorder: { show: false },
								type: 'datetime',
								categories: validData?.map((price) =>
									Number(price.time_close * 1000)
								),
							},
							fill: {
								type: 'gradient',
								gradient: {
									gradientToColors: ['#0be881'],
									stops: [0, 100],
								},
							},
							colors: [darkTheme.accentColor],
							tooltip: {
								y: { formatter: (value) => `$${value.toFixed(2)}` },
							},
						}}
					/>
					<ApexChart
						type="candlestick"
						series={[
							{
								name: 'Rates',
								data: validData.map((price) => ({
									x: price.time_close * 1000,
									y: [price.open, price.high, price.low, price.close],
								})),
							},
						]}
						options={{
							plotOptions: {
								candlestick: {
									colors: {
										upward: darkTheme.upColor,
										downward: darkTheme.downColor,
									},
									wick: {
										useFillColor: true,
									},
								},
							},
							theme: {
								mode: isDark ? 'dark' : 'light',
							},
							chart: {
								toolbar: {
									show: false,
								},
								background: 'transparent',
								fontFamily: 'inherit',
								height: 300,
								width: 500,
								animations: {
									enabled: true,
									easing: 'easeinout',
									animateGradually: {
										enabled: true,
										delay: 150,
									},
									dynamicAnimation: {
										enabled: true,
										speed: 350,
									},
									speed: 800,
								},
							},
							grid: {
								show: false,
							},
							tooltip: {
								y: { formatter: (value) => `$${value.toFixed(2)}` },
							},
							xaxis: {
								labels: {
									show: false,
								},
								type: 'datetime',
								categories: validData.map((price) => price.time_close * 1000),
								axisTicks: {
									show: false,
								},
								axisBorder: {
									show: false,
								},
								tooltip: {
									enabled: false,
								},
							},
							yaxis: {
								labels: {
									show: false,
								},
							},
						}}
					/>
				</>
			)}
		</div>
	);
}

export default Chart;
