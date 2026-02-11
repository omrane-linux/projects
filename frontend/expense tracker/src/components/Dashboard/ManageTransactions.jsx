import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";
import toast from "react-hot-toast";
import { TrashBinIcon } from "../../icons";

const ManageTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filterDate, setFilterDate] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const [incomeRes, expenseRes] = await Promise.all([
                axiosInstance.get(API_PATHS.INCOME.GET_INCOMES),
                axiosInstance.get(API_PATHS.EXPENSE.GET_EXPENSES),
            ]);

            const incomes = incomeRes.data.map((item) => ({ ...item, type: "income" }));
            const expenses = expenseRes.data.map((item) => ({ ...item, type: "expense" }));

            const combined = [...incomes, ...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
            setTransactions(combined);
            setFilteredTransactions(combined);
        } catch (error) {
            console.error("Error fetching transactions:", error);
            toast.error("Failed to load transactions.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    useEffect(() => {
        if (!filterDate) {
            setFilteredTransactions(transactions);
        } else {
            const filtered = transactions.filter((txn) => {
                const txnDate = new Date(txn.date).toISOString().split("T")[0];
                return txnDate === filterDate;
            });
            setFilteredTransactions(filtered);
        }
    }, [filterDate, transactions]);

    const handleDelete = async (id, type) => {
        // if (!window.confirm("Are you sure you want to delete this transaction?")) return;

        try {
            if (type === "income") {
                await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
            } else {
                await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
            }
            toast.success("Transaction deleted successfully");
            fetchTransactions();
        } catch (error) {
            console.error("Error deleting transaction:", error);
            toast.error("Failed to delete transaction");
        }
    };

    return (
        <div className="space-y-4">
            {/* Filter Section */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Filter by Date
                </label>
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white py-2 px-4 text-gray-700 outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white"
                />
            </div>

            {/* Transactions List */}
            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
                {loading ? (
                    <p className="text-center text-gray-500">Loading transactions...</p>
                ) : filteredTransactions.length === 0 ? (
                    <p className="text-center text-gray-500">No transactions found.</p>
                ) : (
                    filteredTransactions.map((txn) => (
                        <div
                            key={txn._id}
                            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full ${txn.type === "income"
                                        ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                                        : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                                        }`}
                                >
                                    <span className="text-xl">{txn.icon || (txn.type === "income" ? "💰" : "💸")}</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-white/90">
                                        {txn.source || txn.category}
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(txn.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span
                                    className={`font-semibold ${txn.type === "income"
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                        }`}
                                >
                                    {txn.type === "income" ? "+" : "-"}₹{txn.amount}
                                </span>
                                <button
                                    onClick={() => handleDelete(txn._id, txn.type)}
                                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-red-400"
                                    title="Delete"
                                >
                                    <TrashBinIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageTransactions;
