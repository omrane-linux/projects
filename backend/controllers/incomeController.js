const xlsx = require("xlsx");
const Income = require("../models/Income");

//add income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    
    try {
        const { icon, source, amount, date } = req.body;

        //Validation checks
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        }); 

        await newIncome.save();
        res.status(201).json({ message: "Income added successfully", income: newIncome });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

//Get all income sources
exports.getAllincomes = async (req, res) => {
    const userId = req.user.id;
    
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.json(incomes);
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
};

//Delete income sources
exports.deleteIncome = async (req, res) => {
    
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

//Download income sources as excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        //prepare data for excel export
        const data = income.map((item) => ({  
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download("income_details.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
