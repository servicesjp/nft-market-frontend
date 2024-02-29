import { AreaData, CandlestickData, createChart, HistogramData } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { fetchCoinData, PeriodType } from "@/modules/market/cryptocurrency-info-service";

export interface Data {
  volume?: any;
  open?: number;
  high?: number;
  low?: number;
  time: number;
  close: number;
}

interface Chart {
  chartType?: "candlestick" | "line" | "histogram";
  symbol?: string;
  interval?: PeriodType;
  height?: string;
}


const chartTheme = {

  crosshair: {
      // Change mode from default 'magnet' to 'normal'.
      // Allows the crosshair to move freely without snapping to datapoints
      // mode: 'normal',

      // Vertical crosshair line (showing Date in Label)
      vertLine: {
          width: 4,
          color: '#0047bb10',
          style: 0,
          labelBackgroundColor: '#f2f6fc',
      },

      // Horizontal crosshair line (showing Price in Label)
      horzLine: {
          color: '#0047bb',
          labelBackgroundColor: '#0047bb',
      },
  },
  layout: {
      background: {
        color: '#FFFFFF',
      },
      textColor: '#191919',
  },
  rightPriceScale: {
    borderColor: 'transparent', // Color del borde del eje de precio derecho
    scaleMargins: {
      top: 0.2,
      bottom: 0.2,
    },
  },
  timeScale: {
    borderColor: 'transparent', // Color del borde del eje de tiempo
  },

  watermark: {
    color: 'rgba(0, 0, 0, 0)',
  },
  grid: {
    vertLines: {
      visible: false,
    },
    horzLines: {
      visible: true,
      color: '#D3D3D3', // You can set a color if you want
      style: 3, // This makes the line dashed
    },
  },
  autoSize: true,
}

const LineChartLite = ({ chartType="line", symbol, interval="1d", height="200px"}: Chart) => {
  const [data, setData] = useState<Data[]>([]);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const isLineChart = (chartType === 'line');
  const isCandlestickChart = (chartType === 'candlestick');
  const isHistogram = (chartType === 'histogram');

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 2);

    fetchCoinData({
      symbol: symbol, 
      time_start: startDate.toISOString(), 
      time_end: endDate.toISOString(),
      interval
    }).then(fetchedData => {
      setData(fetchedData);
    }).catch((error: any) => {
      console.log(error);
      
      // showErrorToast(error?.message)
    })
  }, [interval, symbol]);
  
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, {
      ...chartTheme,
      timeScale: {
        ...chartTheme.timeScale,
        barSpacing: 25// Ajusta este valor según tus preferencias
      }
    } as any);

    const series = isLineChart ? chart.addAreaSeries({
      topColor: 'rgba(33, 150, 243, 0.56)',
      bottomColor: 'rgba(33, 150, 243, 0.04)',
      lineColor: 'rgba(33, 150, 243, 1)',
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 6,
    }) : isCandlestickChart ? chart.addCandlestickSeries() : chart.addHistogramSeries();

    let chartData: AreaData[] | CandlestickData[] | HistogramData[] = [];

    if (isLineChart) {
      chartData = data.map(item => ({
        time: new Date(item.time).getTime(),
        value: item.close,
      })) as unknown as AreaData[];
    } else if (isCandlestickChart) {
      chartData = data.map(item => ({
        time: new Date(item.time).getTime(),
        open: item.open!,
        high: item.high!,
        low: item.low!,
        close: item.close
      })) as CandlestickData[];
    } else if (isHistogram) {
      chartData = data.map(item => ({
        time: new Date(item.time).getTime(),
        value: item.volume
      })) as unknown as HistogramData[];
    }
    series.setData(chartData);

    if(isCandlestickChart) {
      series.applyOptions({
        upColor: '#6BC77C',   
        downColor: '#f3696b', 
        borderVisible: false, 
        wickUpColor: '#6BC77C', 
        wickDownColor: '#f3696b'
      });
    }

    chart.applyOptions({
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          const day = date.getUTCDate();
          const month = date.getUTCMonth() + 1;
          const dayOfWeek = date.getUTCDay(); // 0 (Sunday) to 6 (Saturday)
          const hours = date.getUTCHours();
          const minutes = date.getUTCMinutes();
      
          if (interval.includes("h")) {
            // Si es exactamente la medianoche (0 horas), muestra el día
            if (hours === 0) {
              return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}`;
            }
            // De lo contrario, muestra la hora y los minutos
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          }

          // Si es el primer día del mes
          if (day === 1) {
            const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
            return monthNames[date.getUTCMonth()];
          }
      
          // Si es el primer día de la semana (Domingo)
          if (dayOfWeek === 0) {
            return `${day.toString().padStart(2, '0')}`;
          }
      
          return `${day.toString().padStart(2, '0')}`;
        },
      },
    });

    return () => {
      chart.remove();
    };
  }, [data, chartType, isLineChart, isCandlestickChart, isHistogram]);

  return (
      <div style={{ width: '100%', height: height }} ref={chartContainerRef} className="chart-container" />
  );
};

export default LineChartLite;