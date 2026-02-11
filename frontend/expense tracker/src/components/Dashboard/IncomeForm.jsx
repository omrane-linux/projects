import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";
import toast from "react-hot-toast";

const IncomeForm = ({ onIncomeAdded }) => {
    const [data, setData] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "💵", // Default icon
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!data.source || !data.amount || !data.date) {
            toast.error("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                source: data.source,
                amount: data.amount,
                date: data.date,
                icon: data.icon,
            });
            toast.success("Income added successfully!");
            setData({ source: "", amount: "", date: "", icon: "💵" });
            if (onIncomeAdded) onIncomeAdded();
        } catch (error) {
            console.error(error);
            toast.error("Failed to add income. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="mb-2.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Source of Income
                </label>
                <input
                    type="text"
                    name="source"
                    placeholder="e.g. Salary, Freelancing"
                    value={data.source}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white py-3 px-4 text-gray-700 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default disabled:bg-gray-200 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white dark:focus:border-brand-500"
                />
            </div>

            <div>
                <label className="mb-2.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Amount
                </label>
                <input
                    type="number"
                    name="amount"
                    placeholder="e.g. 5000"
                    value={data.amount}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white py-3 px-4 text-gray-700 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default disabled:bg-gray-200 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white dark:focus:border-brand-500"
                />
            </div>

            <div>
                <label className="mb-2.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Date
                </label>
                <input
                    type="date"
                    name="date"
                    value={data.date}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white py-3 px-4 text-gray-700 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default disabled:bg-gray-200 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white dark:focus:border-brand-500 [&::-webkit-calendar-picker-indicator]:!block [&::-webkit-calendar-picker-indicator]:!opacity-100 dark:[color-scheme:dark]"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-lg bg-brand-500 p-3 font-medium text-white hover:bg-opacity-90 transition-colors"
            >
                {loading ? "Adding..." : "Add Income"}
            </button>
        </form>
    );
};

export default IncomeForm;
