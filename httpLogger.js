const { createLogger, transports, format } = require('winston');

const httpLogger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: './logs/app.log',
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    })
  ]
});
module.exports=httpLogger;