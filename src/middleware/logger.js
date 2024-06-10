import formatDate from "../utils/dateFormatter.js";

const logger = (req, res, next) => {
  const timestamp = formatDate(new Date())
  console.log(`[${timestamp}] ${req.method} ${req.url}`)

  next()
}

export default logger