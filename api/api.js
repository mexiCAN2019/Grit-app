const express = require('express');
const apiRouter = express.Router();

const yearsMonthsRouter = require('./yearsMonths');
apiRouter.use('/years', yearsMonthsRouter);

module.exports = apiRouter;