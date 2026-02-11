import React from 'react';
import Chart from "react-apexcharts";
import { MoreDotIcon } from "../../icons";

const DividendChart = () => {
    const options = {
        colors: ["#465fff"],
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "bar",
            height: 250,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "30%",
                borderRadius: 4,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#9ca3af",
                    fontSize: "12px",
                    fontFamily: "Outfit, sans-serif",
                },
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#9ca3af",
                    fontSize: "12px",
                    fontFamily: "Outfit, sans-serif",
                },
            }
        },
        grid: {
            borderColor: '#e5e7eb', // gray-200
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true,
                },
            },
            xaxis: {
                lines: {
                    show: false
                }
            }
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => `₹${val}`,
            },
        },
    };

    const series = [
        {
            name: "Dividend",
            data: [150, 380, 190, 290, 170, 185],
        },
    ];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Dividend
                </h3>
                <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    <MoreDotIcon className="size-6" />
                </button>
            </div>

            <div className="-ml-2">
                <Chart options={options} series={series} type="bar" height={250} />
            </div>
        </div>
    );
};

export default DividendChart;
