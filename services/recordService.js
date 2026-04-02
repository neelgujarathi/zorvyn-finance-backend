import Record from "../models/financialrecord.js";

// Create record
export const createRecordService = async (data, userId) => {
  return await Record.create({
    ...data,
    createdBy: userId
  });
};

// Get records with filter
export const getRecordsService = async (query) => {
  return await Record.find(query)
    .sort({ createdAt: -1 });
};