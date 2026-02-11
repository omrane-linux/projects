import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { PlusIcon } from "../../icons";
import { popularAssets } from '../../data/popularAssets';

const WatchList = () => {
    const { theme } = useTheme();
    const container = useRef();
    const dropdownRef = useRef();
    // Default symbols cleared as per user request
    const [symbols, setSymbols] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (searchTerm.trim()) {
            const filtered = popularAssets.filter(asset =>
                asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                asset.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setRecommendations(filtered);
            setShowDropdown(true);
        } else {
            setRecommendations([]);
            setShowDropdown(false);
        }
    }, [searchTerm]);

    const addSymbol = (symbol) => {
        if (!symbols.includes(symbol)) {
            setSymbols([...symbols, symbol]);
        }
        setSearchTerm("");
        setShowDropdown(false);
    };

    const removeSymbol = (symbolToRemove) => {
        setSymbols(symbols.filter(s => s !== symbolToRemove));
    };

    useEffect(() => {
        if (container.current) {
            container.current.innerHTML = "";
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
            script.async = true;
            script.innerHTML = JSON.stringify({
                "width": "100%",
                "height": "100%",
                "symbolsGroups": [
                    {
                        "name": "My Watchlist",
                        "originalName": "My Watchlist",
                        "symbols": symbols.length > 0 ? symbols.map(s => ({ "name": s })) : []
                    }
                ],
                "showSymbolLogo": true,
                "isTransparent": true,
                "colorTheme": theme,
                "locale": "en"
            });
            container.current.appendChild(script);
        }
    }, [symbols, theme]);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-full flex flex-col relative w-full">
            <div className="flex flex-col gap-4 mb-4 relative z-50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        My Watchlist
                    </h3>

                    <div className="relative w-full sm:w-64" ref={dropdownRef}>
                        <div className="flex items-center gap-2 w-full">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => { if (searchTerm) setShowDropdown(true) }}
                                placeholder="Search Symbol (e.g. SUZLON)"
                                className="px-4 py-2 text-sm border border-gray-200 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:border-brand-500 w-full"
                            />
                            <button
                                onClick={() => addSymbol(searchTerm.toUpperCase())} // Allow manual add if not in list
                                className="p-2 text-white bg-brand-500 rounded-lg hover:bg-brand-600 focus:outline-none flex-shrink-0"
                            >
                                <PlusIcon className="size-5" />
                            </button>
                        </div>

                        {/* Dropdown Menu */}
                        {showDropdown && recommendations.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto z-[100]">
                                {recommendations.map((asset) => (
                                    <button
                                        key={asset.symbol}
                                        onClick={() => addSymbol(asset.symbol)}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between group"
                                    >
                                        <span className="font-semibold text-gray-800 dark:text-white">
                                            {asset.symbol.split(':')[1] || asset.symbol}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                                            {asset.description}
                                        </span>
                                        <span className="text-[10px] text-gray-400 dark:text-gray-500 ml-2">
                                            {asset.symbol.split(':')[0]}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Active Watchlist Tags */}
                {symbols.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {symbols.map((symbol) => (
                            <div key={symbol} className="group relative px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 border border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-default">
                                {symbol.split(':')[1] || symbol}
                                <button
                                    onClick={() => removeSymbol(symbol)}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                                    title="Remove from watchlist"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-hidden min-h-[400px]" ref={container}>
                <div className="tradingview-widget-container">
                    <div className="tradingview-widget-container__widget"></div>
                </div>
            </div>
        </div>
    );
};

export default WatchList;
