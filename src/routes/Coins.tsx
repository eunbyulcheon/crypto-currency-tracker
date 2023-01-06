import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { BsMoonFill } from 'react-icons/bs';
import { FaSun } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

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
	const isDark = useRecoilValue(isDarkAtom);
	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

	const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);

	return (
		<Container>
			<Helmet>
				<title>Crypto Currency</title>
			</Helmet>
			<Header>
				<Title>CRYPTO CURRENCY</Title>
				<ToggleBtn onClick={toggleDarkAtom}>
					{isDark ? <FaSun style={{ color: '#fff' }} /> : <BsMoonFill />}
				</ToggleBtn>
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

const ToggleBtn = styled.button`
	position: fixed;
	top: 30px;
	left: 30px;
	padding: 10px 11px;
	border: none;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.4);
	font-size: 25px;
	line-height: 18px;
	color: #000;
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
	background-color: ${(props) => props.theme.cardBgColor};
	color: ${(props) => props.theme.textColor};
	margin-bottom: 10px;
	border: 1px solid #fff;
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
