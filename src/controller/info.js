import db from "../database/database.js";

const getCompanyInfo = async () => {
    try {
        console.log("Trying to get company info")
        const companyInfo = await db["company"].find({})
        console.log("GOT company info")
        return companyInfo
    } catch (error) {
        console.error(error)
    }
}

export { getCompanyInfo }