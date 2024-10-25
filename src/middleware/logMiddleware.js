import logger from '../utils/log.js'

const log = (req, res, next) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const duration = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3);
    logger.info({
      message: `${req.method} ${req.originalUrl}`,
      status: `Status: ${res.statusCode}`,
      duration: `${duration} ms`
    });
  });

  next();
}

export default log
