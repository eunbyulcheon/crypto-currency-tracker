import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoinTickers } from '../api';
import { ChartProps } from './Chart';
import { PriceData } from './Coin';

function Price({ coinId }: ChartProps) {
	const { isLoading: quotesLoading, data: quotesData } = useQuery<PriceData>(
		['quotes', coinId],
		() => fetchCoinTickers(coinId),
		{
			refetchInterval: 10000,
		}
	);

	const quotes = quotesData?.quotes.USD;

	return (
		<>
			{quotesLoading ? (
				'Loading quotes...'
			) : (
				<Wrapper>
					<QuoteItem>
						<Title>ATH DATE</Title>
						<Data>{quotes?.ath_date}</Data>
					</QuoteItem>
					<QuoteItem>
						<Title>ATH PRICE</Title>
						<Data>${quotes?.ath_price.toFixed(3)}</Data>
					</QuoteItem>
					<QuoteItem>
						<Title>30m%</Title>
						<Data>{quotes?.percent_change_30m}%</Data>
					</QuoteItem>
					<QuoteItem>
						<Title>1h%</Title>
						<Data>{quotes?.percent_change_1h}%</Data>
					</QuoteItem>
					<QuoteItem>
						<Title>6h%</Title>
						<Data>{quotes?.percent_change_6h}%</Data>
					</QuoteItem>
					<QuoteItem>
						<Title>12h%</Title>
						<Data>{quotes?.percent_change_12h}%</Data>
					</QuoteItem>
					<QuoteItem>
						<Title>24h%</Title>
						<Data>{quotes?.percent_change_24h}%</Data>
					</QuoteItem>
					<QuoteItem>
						<Title>7d%</Title>
						<Data>{quotes?.percent_change_7d}%</Data>
					</QuoteItem>
					<QuoteItem>
						<Title>30d%</Title>
						<Data>{quotes?.percent_change_30d}%</Data>
					</QuoteItem>
					<QuoteItem>
						<Title>1y%</Title>
						<Data>{quotes?.percent_change_1y}%</Data>
					</QuoteItem>
				</Wrapper>
			)}
		</>
	);
}

const Wrapper = styled.div`
	margin: 50px 0;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: 10px;
	grid-row-gap: 15px;
`;

const QuoteItem = styled.div`
	width: 100px;
	height: 100px;
	padding: 22px 0;
	border: 2px solid ${(props) => props.theme.textColor};
	border-radius: 15px;
	background-color: ${(props) => props.theme.textColor};
	text-align: center;

	&:hover {
		border: 2px solid #7b6fc5;
		background-color: rgba(156, 136, 254, 0.7);
	}

	&:nth-child(1) {
		grid-column: 1 / span 2;
		width: auto;
		padding: 15px 0;
	}

	&:nth-child(2) {
		grid-column: 3 / span 2;
		width: auto;
	}
`;

const Title = styled.h3`
	margin-bottom: 8px;
	font-size: 16px;
	font-family: inherit;
	color: ${(props) => props.theme.bgColor};
`;

const Data = styled.h2`
	font-size: 22px;
	font-weight: 800;
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
		'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
	color: ${(props) => props.theme.downColor};
`;

export default Price;
