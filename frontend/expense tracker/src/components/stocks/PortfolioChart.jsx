import React, { useState } from 'react';
import TradingViewWidget from './TradingViewWidget';

const PortfolioChart = () => {
    const [timeRange, setTimeRange] = useState('Monthly');

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-[500px] flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Portfolio Performance
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Here is your performance stats of each month
                    </p>
                </div>
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    {['Monthly', 'Quarterly', 'Annually'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${timeRange === range
                                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            <div className="-ml-2 flex-1 overflow-hidden">
                <TradingViewWidget />
            </div>
        </div>
    );
};

export default PortfolioChart;
