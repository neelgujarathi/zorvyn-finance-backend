import Record from "../models/financialrecord.js";

// Create
export const createRecord = async (req, res) => {
  try {
    const record = await Record.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Get All
export const getRecords = async (req, res) => {
  const { page = 1, category, date } = req.query;

  const query = { isDeleted: false };

  if (category) query.category = category;

  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    query.date = { $gte: start, $lt: end };
  }

  const records = await Record.find(query)
    .skip((page - 1) * 10)
    .limit(10)
    .sort({ createdAt: -1 });

  res.json(records);
};

// Get Single
export const getSingleRecord = async (req, res) => {
  const record = await Record.findById(req.params.id);
  if (!record) return res.status(404).json({ msg: "Not found" });
  res.json(record);
};

// Update
export const updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ msg: "Record not found" });
    }

    res.json(record);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete
export const deleteRecord = async (req, res) => {
  await Record.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ msg: "Deleted" });
};