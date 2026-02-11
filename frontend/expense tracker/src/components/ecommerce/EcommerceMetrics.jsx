import {
    ArrowDownIcon,
    ArrowUpIcon,
    BoxIconLine,
    GroupIcon,
    DollarLineIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

export default function EcommerceMetrics({ totalIncome, totalExpense }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {/* <!-- Metric Item Start --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <DollarLineIcon className="text-gray-800 size-6 dark:text-white/90" />
                </div>

                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Total Income
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            ₹{totalIncome?.toLocaleString() || "0"}
                        </h4>
                    </div>
                </div>
            </div>
            {/* <!-- Metric Item End --> */}

            {/* <!-- Metric Item Start --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Total Expenses
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            ₹{totalExpense?.toLocaleString() || "0"}
                        </h4>
                    </div>
                </div>
            </div>
            {/* <!-- Metric Item End --> */}
        </div>
    );
}
