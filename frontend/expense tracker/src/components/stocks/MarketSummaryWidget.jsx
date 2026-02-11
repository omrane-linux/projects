import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from '../../context/ThemeContext';

function MarketSummaryWidget() {
    const container = useRef();
    const { theme } = useTheme();

    useEffect(() => {
        const scriptId = 'tradingview-market-summary-script';

        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://widgets.tradingview-widget.com/w/en/tv-market-summary.js";
            script.type = "module";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6" ref={container}>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Market Summary
                </h3>
            </div>
            <div className="w-full h-[200px] overflow-hidden">
                <tv-market-summary
                    exchange="BSE"
                    direction="horizontal"
                    color-theme={theme}
                    style={{ width: '100%', height: '100%' }}
                    transparent
                ></tv-market-summary>
            </div>
        </div>
    );
}

export default memo(MarketSummaryWidget);
