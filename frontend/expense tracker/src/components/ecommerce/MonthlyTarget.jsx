import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";

export default function MonthlyTarget({ monthlyIncome = [], monthlyExpense = [], target = 0, setDashboardData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [isEditing, setIsEditing] = useState(false);
    const [tempTarget, setTempTarget] = useState(target);

    useEffect(() => {
        setTempTarget(target);
    }, [target]);

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const currentIncome = monthlyIncome[selectedMonth] || 0;
    const currentExpense = monthlyExpense[selectedMonth] || 0;
    const totalBalance = currentIncome - currentExpense;

    // Calculate percentage (capped at 100 for visual sanity, or showing overachievement)
    const percentage = target > 0 ? Math.min(Math.round((totalBalance / target) * 100), 100) : 0;
    const displayPercentage = target > 0 ? ((totalBalance / target) * 100).toFixed(2) : 0;

    const series = [percentage];

    const handleTargetUpdate = async () => {
        try {
            await axiosInstance.post(API_PATHS.DASHBOARD.UPDATE_TARGET, { target: Number(tempTarget) });
            setDashboardData(prev => ({ ...prev, monthlyTarget: Number(tempTarget) }));
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update target", error);
        }
    };

    const options = {
        colors: ["#465FFF"],
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "radialBar",
            height: 330,
            sparkline: {
                enabled: true,
            },
        },
        plotOptions: {
            radialBar: {
                startAngle: -85,
                endAngle: 85,
                hollow: {
                    size: "80%",
                },
                track: {
                    background: "#E4E7EC",
                    strokeWidth: "100%",
                    margin: 5,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        fontSize: "36px",
                        fontWeight: "600",
                        offsetY: -40,
                        color: "#1D2939",
                        formatter: function () {
                            return displayPercentage + "%";
                        },
                    },
                },
            },
        },
        fill: {
            type: "solid",
            colors: ["#465FFF"],
        },
        stroke: {
            lineCap: "round",
        },
        labels: ["Progress"],
    };

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function closeDropdown() {
        setIsOpen(false);
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Monthly Target ({months[selectedMonth]})
                        </h3>
                        <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                            Target you’ve set for each month
                        </p>
                    </div>
                    <div className="relative inline-block">
                        <button className="dropdown-toggle" onClick={toggleDropdown}>
                            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                        </button>
                        <Dropdown
                            isOpen={isOpen}
                            onClose={closeDropdown}
                            className="w-40 p-2 max-h-60 overflow-y-auto custom-scrollbar"
                        >
                            {months.map((month, index) => (
                                <DropdownItem
                                    key={month}
                                    onItemClick={() => {
                                        setSelectedMonth(index);
                                        closeDropdown();
                                    }}
                                    className={`flex w-full font-normal text-left rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 ${selectedMonth === index ? 'text-blue-600 font-semibold bg-gray-50 dark:bg-white/5' : 'text-gray-500 dark:text-gray-400'}`}
                                >
                                    {month}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    </div>
                </div>
                <div className="relative ">
                    <div className="max-h-[330px]" id="chartDarkStyle">
                        <Chart
                            options={options}
                            series={series}
                            type="radialBar"
                            height={330}
                        />
                    </div>

                    <span className={`absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full px-3 py-1 text-xs font-medium ${totalBalance >= 0 ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' : 'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500'}`}>
                        {totalBalance >= 0 ? '+' : '-'}₹{Math.abs(totalBalance)}
                    </span>
                </div>
                <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
                    You have saved ₹{totalBalance} in {months[selectedMonth]}. Keep up the good work!
                </p>
            </div>

            <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
                <div className="text-center">
                    <p className="mb-1 text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
                        Total Balance
                    </p>
                    <p className={`text-base font-semibold sm:text-lg ${totalBalance >= 0 ? 'text-gray-800 dark:text-white/90' : 'text-red-500'}`}>
                        ₹{totalBalance}
                    </p>
                </div>

                <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

                <div className="text-center group relative">
                    <p className="mb-1 text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
                        Target
                    </p>
                    {isEditing ? (
                        <div className="flex items-center gap-2 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white dark:bg-gray-800 p-2 rounded shadow-lg border border-gray-200 dark:border-gray-700 z-10 w-48">
                            <input
                                type="number"
                                value={tempTarget}
                                onChange={(e) => setTempTarget(e.target.value)}
                                className="w-full text-sm p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                autoFocus
                            />
                            <button onClick={handleTargetUpdate} className="text-green-500 hover:text-green-600">✓</button>
                            <button onClick={() => setIsEditing(false)} className="text-red-500 hover:text-red-600">✕</button>
                        </div>
                    ) : null}
                    <p
                        className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg cursor-pointer hover:text-blue-600"
                        onClick={() => setIsEditing(true)}
                        title="Click to edit target"
                    >
                        ₹{target}
                        <span className="text-xs text-gray-400">✎</span>
                    </p>
                </div>

                <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

                <div className="text-center">
                    <p className="mb-1 text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
                        Expense
                    </p>
                    <p className="text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg text-red-500">
                        ₹{currentExpense}
                    </p>
                </div>

                <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

                <div className="text-center">
                    <p className="mb-1 text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
                        Income
                    </p>
                    <p className="text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg text-green-500">
                        ₹{currentIncome}
                    </p>
                </div>
            </div>
        </div>
    );
}
