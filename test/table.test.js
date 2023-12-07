const expect = require("chai").expect;
const puppeteer = require("puppeteer");
const PNG = require("pngjs").PNG;
const pixelmatch = require("pixelmatch");
const { readFile, deleteFile } = require("../server/helpers/filesHandling");
const { testsDesc, testsAsc, data } = require("./mockData");

describe("Table Test", function () {
  this.timeout(0);
  let browser;
  let page;
  const url = "http://localhost:4000";

  const elementClick = async (page, { clickCount = 1, waitFor, target }) => {
    while (clickCount > 0) {
      await page.click(target);
      await page.waitForSelector(waitFor);
      clickCount -= 1;
    }
  };

  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(".table");
  });

  after(async () => {
    browser.close();
  });

  it("should display table header elements in correct order", async () => {
    const headerCells = await page.$$eval(".header > div", (cells) => {
      return cells.map((cell) => cell.innerHTML);
    });

    const headers = ["Full Name", "Email", "Date", "City", "Country"];

    expect(headerCells).to.deep.equal(headers);
  });

  it(`should return ${data.length} rows`, async () => {
    const rowCount = await page.$$eval(".table > .row", (rows) => rows.length);
    expect(rowCount).to.equal(data.length);
  });

  testsAsc.forEach(({ orderBy, expectations }) => {
    it(`should display users ordered by ${orderBy} ascending when clicked once`, async () => {
      await elementClick(page, {
        clickCount: 1,
        waitFor: ".table",
        target: `#${orderBy}`,
      });

      const firstRow = await page.$$eval("#row-0 > div", (e) =>
        e.map((cell) => cell.innerHTML)
      );
      const secondRow = await page.$$eval("#row-1 > div", (e) =>
        e.map((cell) => cell.innerHTML)
      );
      const thirdRow = await page.$$eval("#row-2 > div", (e) =>
        e.map((cell) => cell.innerHTML)
      );

      expect(firstRow).to.deep.equal(expectations[0]);
      expect(secondRow).to.deep.equal(expectations[1]);
      expect(thirdRow).to.deep.equal(expectations[2]);
    });
  });

  testsDesc.forEach(({ orderBy, expectations }) => {
    it(`should display users ordered by ${orderBy} descending when clicked twice`, async () => {
      await elementClick(page, {
        clickCount: 2,
        waitFor: ".table",
        target: `#${orderBy}`,
      });

      const firstRow = await page.$$eval("#row-0 > div", (e) =>
        e.map((cell) => cell.innerHTML)
      );
      const secondRow = await page.$$eval("#row-1 > div", (e) =>
        e.map((cell) => cell.innerHTML)
      );
      const thirdRow = await page.$$eval("#row-2 > div", (e) =>
        e.map((cell) => cell.innerHTML)
      );

      expect(firstRow).to.deep.equal(expectations[0]);
      expect(secondRow).to.deep.equal(expectations[1]);
      expect(thirdRow).to.deep.equal(expectations[2]);
    });
  });
});
