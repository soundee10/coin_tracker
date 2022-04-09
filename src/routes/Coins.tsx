import { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
 padding: 0px 20px;
 max-width: 480px;
 margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    margin-top: 20px;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props)=>props.theme.textColor};
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 10px;
    a{
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
    }
    &:hover{
        a{
            color: ${(props)=> props.theme.accentColor}
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;

const Loader = styled.div`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 5px;
`;

interface CoinInterface{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}


function Coins(){
    const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins)
    
    return (
        <Container>
            <Helmet>
                <title> Coin </title>
            </Helmet>
            <Header>
                <Title> Coin </Title>
            </Header>
            {isLoading ? (<Loader>"Loading..."</Loader>) : <CoinsList>
                {data?.slice(0,50).map((coin) => (
                    <Coin key={coin.id}>
                    <Link to={{
                        pathname:`/${coin.id}`,
                        state: {name: coin.name}}
                        }>
                        <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
                        {coin.name} &rarr;</Link>
                    </Coin>))}
            </CoinsList>}
        </Container>
    );
}

export default Coins;