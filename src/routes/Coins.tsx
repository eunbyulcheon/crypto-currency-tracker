import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);

	return (
		<Container>
			<Helmet>
				<title>Crypto Coins</title>
			</Helmet>
			<Header>
				<Title>CRYPTO COINS</Title>
			</Header>

			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinsList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Link
								to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}
							>
								<Img
									src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
								/>
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 18vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1`
	color: ${(props) => props.theme.accentColor};
	font-size: 48px;
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const CoinsList = styled.ul``;

const Img = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
`;

const Coin = styled.li`
	background-color: #fff;
	color: ${(props) => props.theme.bgColor};
	margin-bottom: 10px;
	border-radius: 15px;

	a {
		display: flex;
		align-items: center;
		padding: 20px;
		transition: color 0.2s ease-in;
	}

	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;

export default Coins;
