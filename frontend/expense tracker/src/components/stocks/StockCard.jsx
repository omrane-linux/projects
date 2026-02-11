import React from 'react';
import Badge from '../ui/badge/Badge';
import { ArrowUpIcon, ArrowDownIcon } from "../../icons";

const StockCard = ({ icon, name, companyName, price, change, isPositive }) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    {icon}
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
                        {name}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {companyName}
                    </span>
                </div>
            </div>

            <div className="flex items-end justify-between mt-2">
                <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {price}
                </h4>
                <Badge color={isPositive ? "success" : "error"}>
                    {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    {change}
                </Badge>
            </div>
        </div>
    );
};

export default StockCard;
