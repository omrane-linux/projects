import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";

export default function Home() {
    const [dashboardData, setDashboardData] = useState({
        totalIncome: 0,
        totalExpense: 0,
        totalBalance: 0,
        monthlyIncome: [],
        monthlyExpense: [],
        recentTransactions: []
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
                setDashboardData(response.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <>
            <PageMeta
                title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
                description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-7">
                    <MonthlySalesChart
                        totalBalance={dashboardData.totalBalance}
                        monthlyBalance={dashboardData.monthlyBalance}
                    />

                    <EcommerceMetrics
                        totalIncome={dashboardData.totalIncome}
                        totalExpense={dashboardData.totalExpense}
                    />
                </div>

                <div className="col-span-12 xl:col-span-5">
                    <MonthlyTarget
                        monthlyIncome={dashboardData.monthlyIncome}
                        monthlyExpense={dashboardData.monthlyExpense}
                        target={dashboardData.monthlyTarget}
                        setDashboardData={setDashboardData}
                    />
                </div>

                <div className="col-span-12">
                    <StatisticsChart
                        monthlyIncome={dashboardData.monthlyIncome}
                        monthlyExpense={dashboardData.monthlyExpense}
                    />
                </div>

                <div className="col-span-12 xl:col-span-7">
                    <RecentOrders transactions={dashboardData.recentTransactions} />
                </div>
            </div>
        </>
    );
}
