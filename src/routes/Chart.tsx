import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts"
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface Ihistorical{

    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps{
    coinId: string,
}

function Chart({coinId}: ChartProps){
    //const params = useParams();
    const isDark = useRecoilValue(isDarkAtom);
    const {isLoading, data} = useQuery<Ihistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));

    return <div>{isLoading ? "Loading chart..." : 
    <ApexChart
        type="line"
        series={[
            {
            name: "price",
            data: data?.map(price=>price.close) as number[]
            },
        ]}
        options={{
            theme:{
                mode: "dark"
            },
            chart:{
                toolbar:{
                    show:false
                },
                height: 500,
                width: 500,
                background: "transparent"
            },
            grid: {show:false},
            stroke:{
                curve: "smooth",
                width: 3,
            },
            fill:{
                type:"gradient",
                gradient: {gradientToColors:["blue"]},
                colors:[
                    "red"
                ],
            },
            tooltip:{
                y:{
                    formatter: (value) => `$ ${value.toFixed(2)}`
                }
            },
            yaxis:{
                tickAmount: 4,
                labels:{
                    formatter: (value) => `${value.toFixed(1)}`
                }
            },
            xaxis:{
                type:"datetime",
                labels:{
                    show: false,
                },
                categories: data?.map(price=>price.time_close)
            }
        }}
    />}</div>;
}

export default Chart;