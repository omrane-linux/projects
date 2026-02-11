import React, { useState } from 'react';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AiRecommendation = () => {
    const [formData, setFormData] = useState({
        age: '',
        employmentStatus: 'Employed',
        annualIncome: '',
        monthlySavings: '',
        investmentGoal: 'Retirement',
        timeHorizon: 'Short Term (1-3 years)',
        riskTolerance: 'Medium',
    });

    const [recommendation, setRecommendation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setRecommendation('');

        try {
            const response = await axiosInstance.post(API_PATHS.AI.RECOMMEND, formData);
            setRecommendation(response.data.recommendation);
        } catch (err) {
            console.error(err);
            const detailedError = err.response?.data?.message || err.response?.data?.error || 'Failed to get recommendation';
            setError(detailedError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">AI Investment Advisor</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1 rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
                    <div className="border-b border-gray-200 py-4 mb-4 dark:border-gray-800">
                        <h3 className="font-medium text-lg text-gray-800 dark:text-white/90">
                            Your Profile
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* Age */}
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Age
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Enter your age"
                                required
                                className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
                            />
                        </div>

                        {/* Employment Status */}
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Employment Status
                            </label>
                            <div className="relative z-20">
                                <select
                                    name="employmentStatus"
                                    value={formData.employmentStatus}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
                                >
                                    <option value="Employed">Employed</option>
                                    <option value="Self-Employed">Self-Employed</option>
                                    <option value="Student">Student</option>
                                    <option value="Retired">Retired</option>
                                    <option value="Unemployed">Unemployed</option>
                                </select>
                                <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-gray-400">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="currentColor"></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Annual Income */}
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Annual Income (₹)
                            </label>
                            <input
                                type="number"
                                name="annualIncome"
                                value={formData.annualIncome}
                                onChange={handleChange}
                                placeholder="e.g. 500000"
                                required
                                className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
                            />
                        </div>

                        {/* Monthly Savings */}
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Monthly Investment Capacity (₹)
                            </label>
                            <input
                                type="number"
                                name="monthlySavings"
                                value={formData.monthlySavings}
                                onChange={handleChange}
                                placeholder="e.g. 5000"
                                required
                                className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
                            />
                        </div>

                        {/* Goal */}
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Investment Goal
                            </label>
                            <div className="relative z-20">
                                <select
                                    name="investmentGoal"
                                    value={formData.investmentGoal}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
                                >
                                    <option value="Retirement">Retirement</option>
                                    <option value="Buying a House">Buying a House</option>
                                    <option value="Education">Education</option>
                                    <option value="Wealth Creation">Wealth Creation</option>
                                    <option value="Emergency Fund">Emergency Fund</option>
                                </select>
                                <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-gray-400">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="currentColor"></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Time Horizon */}
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Time Horizon
                            </label>
                            <div className="relative z-20">
                                <select
                                    name="timeHorizon"
                                    value={formData.timeHorizon}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
                                >
                                    <option value="Short Term (1-3 years)">Short Term (1-3 years)</option>
                                    <option value="Medium Term (3-7 years)">Medium Term (3-7 years)</option>
                                    <option value="Long Term (7+ years)">Long Term (7+ years)</option>
                                </select>
                                <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-gray-400">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="currentColor"></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Risk Tolerance */}
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Risk Tolerance
                            </label>
                            <div className="relative z-20">
                                <select
                                    name="riskTolerance"
                                    value={formData.riskTolerance}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
                                >
                                    <option value="Low">Low (Conservative)</option>
                                    <option value="Medium">Medium (Balanced)</option>
                                    <option value="High">High (Aggressive)</option>
                                </select>
                                <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-gray-400">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="currentColor"></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <button className="flex w-full justify-center rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700 transition">
                            {loading ? 'Analyzing...' : 'Get Recommendation'}
                        </button>

                        {error && (
                            <div className="mt-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/10 dark:text-red-400 border border-red-100 dark:border-red-900/20" role="alert">
                                {error}
                            </div>
                        )}
                    </form>
                </div>

                {/* Result Section */}
                <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
                    <div className="border-b border-gray-200 py-4 mb-4 dark:border-gray-800">
                        <h3 className="font-medium text-lg text-gray-800 dark:text-white/90">
                            AI Recommendation
                        </h3>
                    </div>
                    <div className="min-h-[400px]">
                        {loading ? (
                            <div className="flex h-full flex-col items-center justify-center space-y-4">
                                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>
                                <p className="text-lg text-gray-500 dark:text-gray-400">Analyzing your profile...</p>
                            </div>
                        ) : recommendation ? (
                            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        table: ({ node, ...props }) => <table className="w-full text-left border-collapse my-4" {...props} />,
                                        thead: ({ node, ...props }) => <thead className="bg-gray-100 dark:bg-gray-800" {...props} />,
                                        th: ({ node, ...props }) => <th className="border border-gray-200 dark:border-gray-700 p-2 font-semibold" {...props} />,
                                        td: ({ node, ...props }) => <td className="border border-gray-200 dark:border-gray-700 p-2" {...props} />,
                                        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold my-4" {...props} />,
                                        h2: ({ node, ...props }) => <h2 className="text-xl font-bold my-3" {...props} />,
                                        h3: ({ node, ...props }) => <h3 className="text-lg font-bold my-2" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
                                        ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />,
                                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                        p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="font-bold text-blue-600 dark:text-blue-400" {...props} />,
                                    }}
                                >
                                    {recommendation}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
                                <p>Fill out the form and click "Get Recommendation" to see AI insights.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiRecommendation;
