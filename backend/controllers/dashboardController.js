const Income = require("../models/Income");
const Expense = require("../models/Expense");
const User = require("../models/User");
const { Types } = require("mongoose");

// Get dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = new Types.ObjectId(req.user.id);

    // Total income
    const totalIncome = await Income.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Total expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Income last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Expense last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );



    // Monthly data aggregation for the current year
    const currentYear = new Date().getFullYear();

    const monthlyIncomeAgg = await Income.aggregate([
      {
        $match: {
          userId,
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
    ]);

    const monthlyExpenseAgg = await Expense.aggregate([
      {
        $match: {
          userId,
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Initialize arrays for 12 months with 0
    const monthlyIncome = Array(12).fill(0);
    const monthlyExpense = Array(12).fill(0);

    // Fill income
    monthlyIncomeAgg.forEach((item) => {
      monthlyIncome[item._id - 1] = item.total;
    });

    // Fill expense
    monthlyExpenseAgg.forEach((item) => {
      monthlyExpense[item._id - 1] = item.total;
    });

    // Calculate monthly balance
    const monthlyBalance = monthlyIncome.map(
      (income, index) => income - monthlyExpense[index]
    );

    // Recent Transactions (Last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Fetch all income in last 30 days
    const recentIncome = await Income.find({
      userId,
      date: { $gte: thirtyDaysAgo }
    }).lean();

    // Fetch all expense in last 30 days
    const recentExpense = await Expense.find({
      userId,
      date: { $gte: thirtyDaysAgo }
    }).lean();

    // Combine and sort
    const recentTransactions = [
      ...recentIncome.map(t => ({ ...t, type: 'income' })),
      ...recentExpense.map(t => ({ ...t, type: 'expense' }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));


    // Final response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      monthlyTarget: req.user.monthlyTarget || 0,
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      monthlyBalance,
      monthlyIncome,
      monthlyExpense,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update monthly target
exports.updateTarget = async (req, res) => {
  try {
    const { target } = req.body;

    if (!target && target !== 0) {
      return res.status(400).json({ message: "Target amount is required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.monthlyTarget = target;
    await user.save();

    res.json({ message: "Target updated successfully", target: user.monthlyTarget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
