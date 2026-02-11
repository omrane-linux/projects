import React, { useState } from 'react';
import IncomeForm from '../../components/Dashboard/IncomeForm';
import ExpenseForm from '../../components/Dashboard/ExpenseForm';
import ManageTransactions from '../../components/Dashboard/ManageTransactions';

const ExpenseTracker = () => {
    const [openSection, setOpenSection] = useState(null); // 'income' or 'expense' or null

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Expense Tracker</h1>

            <div className="flex flex-col gap-4">
                {/* Income Section */}
                <div className="rounded-2xl border border-gray-200 bg-white shadow-default dark:border-gray-800 dark:bg-white/[0.03]">
                    <div
                        className="flex items-center justify-between p-5 md:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors rounded-2xl"
                        onClick={() => toggleSection('income')}
                    >
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">Income</h2>
                        <svg
                            className={`w-6 h-6 transform transition-transform duration-200 text-gray-500 dark:text-gray-400 ${openSection === 'income' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {openSection === 'income' && (
                        <div className="p-5 md:p-6 border-t border-gray-200 dark:border-gray-800">
                            <IncomeForm />
                        </div>
                    )}
                </div>

                {/* Expense Section */}
                <div className="rounded-2xl border border-gray-200 bg-white shadow-default dark:border-gray-800 dark:bg-white/[0.03]">
                    <div
                        className="flex items-center justify-between p-5 md:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors rounded-2xl"
                        onClick={() => toggleSection('expense')}
                    >
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">Expense</h2>
                        <svg
                            className={`w-6 h-6 transform transition-transform duration-200 text-gray-500 dark:text-gray-400 ${openSection === 'expense' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {openSection === 'expense' && (
                        <div className="p-5 md:p-6 border-t border-gray-200 dark:border-gray-800">
                            <ExpenseForm />
                        </div>
                    )}
                </div>

                {/* Manage Transactions Section */}
                <div className="rounded-2xl border border-gray-200 bg-white shadow-default dark:border-gray-800 dark:bg-white/[0.03]">
                    <div
                        className="flex items-center justify-between p-5 md:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors rounded-2xl"
                        onClick={() => toggleSection('manage')}
                    >
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">Manage Transactions</h2>
                        <svg
                            className={`w-6 h-6 transform transition-transform duration-200 text-gray-500 dark:text-gray-400 ${openSection === 'manage' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {openSection === 'manage' && (
                        <div className="p-5 md:p-6 border-t border-gray-200 dark:border-gray-800">
                            <ManageTransactions />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExpenseTracker;

