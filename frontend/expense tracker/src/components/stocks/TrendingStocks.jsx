import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, BoxIcon } from "../../icons";
// Removed invalid imports

const trendingStocks = [
    {
        ticker: "TSLA",
        name: "Tesla, Inc",
        price: "₹192.53",
        change: "1.01%",
        isPositive: true,
        icon: <BoxIcon className="size-6 text-white" />,
        iconBg: "bg-[#D92D20]" // Tesla Red
    },
    {
        ticker: "AAPL",
        name: "Apple, Inc",
        price: "₹192.53",
        change: "3.59%",
        isPositive: true,
        icon: <BoxIcon className="size-6 text-white" />,
        iconBg: "bg-gray-900" // Apple black
    },
    {
        ticker: "SPOT",
        name: "Spotify.com",
        price: "₹192.53",
        change: "1.01%",
        isPositive: false,
        icon: <BoxIcon className="size-6 text-white" />,
        iconBg: "bg-[#1ED760]" // Spotify Green
    },
];

const TrendingStocks = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Trending Stocks
                </h3>
                <div className="flex gap-2">
                    <button className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {trendingStocks.map((stock) => (
                    <div key={stock.ticker} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${stock.iconBg}`}>
                                    {stock.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
                                        {stock.ticker}
                                    </h4>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {stock.name}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
                                    {stock.price}
                                </h4>
                                <p className={`text-xs font-medium flex items-center justify-end gap-0.5 ${stock.isPositive ? 'text-success-600' : 'text-error-600'}`}>
                                    {stock.isPositive ? <ArrowUpIcon className="size-3" /> : <ArrowDownIcon className="size-3" />}
                                    {stock.change}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-white/5 dark:text-gray-300 dark:border-white/10 dark:hover:bg-white/10 transition-colors">
                                Short Stock
                            </button>
                            <button className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#465fff] rounded-lg hover:bg-[#3b50db] transition-colors">
                                Buy Stock
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingStocks;
