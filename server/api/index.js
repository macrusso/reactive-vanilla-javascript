const express = require("express");
const path = require("path");
const router = express.Router();
const { sortData } = require('./sorting');
const { readFile } = require('../helpers/filesHandling');

const DATA_DIR = path.join(__dirname, "..", "data");

router.get("/users", async (req, res, next) => {
  try {
    const { orderBy, orderType } = req.query;
    const data = await readFile(DATA_DIR + `/${process.env.FILE_NAME}.json`);

    const sortedData = sortData({
      data: JSON.parse(data),
      orderBy,
      orderType
    });

    res.send(sortedData);
  } catch (error) {
    res.status(500).send({
      message: 'Unable to fetch data'
    });
  }
});

module.exports = router;
