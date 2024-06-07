import db from "../database/database.js";

const getCompanyInfo = async (req, res) => {
  try {
    const companyInfo = await db["company"].find({})
    res.json({ Info: companyInfo[0].info })
  } catch (error) {
    res.status(500).send({ error: 'Could find company info' });
  }
}

export { getCompanyInfo }