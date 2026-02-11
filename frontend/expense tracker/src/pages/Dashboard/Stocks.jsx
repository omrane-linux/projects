import React from 'react';
import PageMeta from "../../components/common/PageMeta";
import StockCard from '../../components/stocks/StockCard';
import PortfolioChart from '../../components/stocks/PortfolioChart';
// import TradingViewWidget from '../../components/stocks/TradingViewWidget'; // No longer needed directly
// import DividendChart from '../../components/stocks/DividendChart';
import TimelineWidget from '../../components/stocks/TimelineWidget';
import WatchList from '../../components/stocks/WatchList';
// import TrendingStocks from '../../components/stocks/TrendingStocks';
import MarketSummaryWidget from '../../components/stocks/MarketSummaryWidget';
import { BoxIcon } from '../../icons'; // Import valid icon

export default function Stocks() {
    return (
        <>
            <PageMeta
                title="Stocks Dashboard | TailAdmin - React.js Admin Dashboard Template"
                description="This is React.js Stocks Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />

            <div className="space-y-6">
                {/* Top Section: Market Summary (Replaces static cards) */}
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                    <MarketSummaryWidget />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-12 gap-4 md:gap-6">
                    {/* Portfolio Performance Chart (Contains TradingView Widget) */}
                    <div className="col-span-12 xl:col-span-8">
                        <PortfolioChart />
                    </div>

                    {/* Timeline Widget (Replaces Dividend Chart) */}
                    <div className="col-span-12 xl:col-span-4">
                        <TimelineWidget />
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-12 gap-4 md:gap-6">
                    {/* Watchlist */}
                    <div className="col-span-12">
                        <WatchList />
                    </div>
                </div>
            </div>
        </>
    );
}
