import styled from "styled-components";

const Container = styled.div``;

const Header = styled.header``;

const CoinsList = styled.ul``;

const Coin = styled.li``;

const Title = styled.h1`
    color: ${props => props.theme.accentColor};
`;

function Coins(){
    return <Title>Coins123</Title>;
}

export default Coins;