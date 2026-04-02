import Record from "../models/financialrecord.js";

//SUMMARY
export const getSummary = async (req, res) => {
  const data = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  const income = data.find(d => d._id === "income")?.total || 0;
  const expense = data.find(d => d._id === "expense")?.total || 0;

  res.json({ income, expense, balance: income - expense });
};

// CATEGORY
export const getCategoryBreakdown = async (req, res) => {
  const data = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    }
  ]);

  res.json(
    data.map(d => ({
      category: d._id,
      total: d.total
    }))
  );
};

// RECENT
export const getRecentTransactions = async (req, res) => {
  const data = await Record.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .limit(5);

  res.json(data);
};

// FULL DASHBOARD (COMPANY LEVEL)
export const getDashboardFull = async (req, res) => {
  const records = await Record.find({ isDeleted: false });

  const income = records
    .filter(r => r.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = records
    .filter(r => r.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const categoryMap = {};
  records.forEach(r => {
    categoryMap[r.category] =
      (categoryMap[r.category] || 0) + r.amount;
  });

  const categoryWise = Object.keys(categoryMap).map(key => ({
    category: key,
    total: categoryMap[key]
  }));

  const recent = records
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const monthly = await Record.aggregate([
    {
      $group: {
        _id: { $month: "$date" },
        income: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
          }
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
          }
        }
      }
    },
    { $sort: { _id: 1 } }
  ]);


  const weekly = await Record.aggregate([
    {
      $group: {
        _id: { $week: "$date" },
        income: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
          }
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
          }
        }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const weeklyTrends = weekly.map(w => ({
    week: `Week ${w._id}`,
    income: w.income,
    expense: w.expense
  }));

  res.json({
    summary: { income, expense, balance: income - expense },
    categoryWise,
    recent,
    monthly,
    weeklyTrends
  });
};