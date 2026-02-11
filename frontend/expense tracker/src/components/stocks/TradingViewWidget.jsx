import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from '../../context/ThemeContext';

function TradingViewWidget() {
    const container = useRef();
    const { theme } = useTheme();

    useEffect(
        () => {
            // Clear previous widget
            container.current.innerHTML = "";

            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "allow_symbol_change": true,
          "calendar": false,
          "details": false,
          "hide_side_toolbar": true,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "D",
          "locale": "en",
          "save_image": true,
          "style": "1",
          "symbol": "NASDAQ:AAPL",
          "theme": "${theme}",
          "timezone": "Etc/UTC",
          "backgroundColor": "rgba(0, 0, 0, 0)",
          "gridColor": "rgba(242, 242, 242, 0.06)",
          "watchlist": [],
          "withdateranges": false,
          "compareSymbols": [],
          "studies": [],
          "autosize": true
        }`;
            container.current.appendChild(script);
        },
        [theme] // Re-run when theme changes
    );

    return (
        <div className="h-full w-full" ref={container}>
            <div className="tradingview-widget-container" style={{ height: "100%", width: "100%" }}>
                <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
                <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener nofollow" target="_blank"><span className="blue-text">AAPL stock chart</span></a><span className="trademark"> by TradingView</span></div>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);
