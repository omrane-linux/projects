import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from '../../context/ThemeContext';

function TimelineWidget() {
    const container = useRef();
    const { theme } = useTheme();

    useEffect(
        () => {
            // Clear previous content
            container.current.innerHTML = "";

            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "displayMode": "adaptive",
          "feedMode": "all_symbols",
          "colorTheme": "${theme}",
          "isTransparent": true,
          "locale": "en",
          "width": "100%",
          "height": "100%"
        }`;
            container.current.appendChild(script);
        },
        [theme] // Re-render on theme change
    );

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-[500px] flex flex-col">
            <div className="mb-4 flex-shrink-0">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Market News
                </h3>
            </div>
            <div className="tradingview-widget-container w-full flex-1 overflow-hidden" ref={container}>
                <div className="tradingview-widget-container__widget"></div>
            </div>
        </div>
    );
}

export default memo(TimelineWidget);
