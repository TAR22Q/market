const fs = require("fs");
const http = require("http");
const slugify = require("slugify");
const url = require("url");
// const textIn = fs.readFileSync("./starter/txt/input.txt", "utf-8");
// const textOut = `this is all we know about avacadio : ${textIn} on\n${Date.now()}.`;
// fs.writeFileSync("./starter/txt/output.txt", textOut);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slug = dataObj.map((el) => slugify(el.productName, { lower: true }));

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME}/g, product.productName);
  output = output.replace(/{%IMAGE}/g, product.image);
  output = output.replace(/{%PRICE}/g, product.price);
  output = output.replace(/{%FROM}/g, product.from);
  output = output.replace(/{%NUTRIENTS}/g, product.nutrients);
  output = output.replace(/{%QUANTITY}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION}/g, product.description);
  output = output.replace(/{%ID}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC}/g, "not-organic");
  return output;
};

//server
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  //overview
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT-CARDS}", cardsHtml);
    res.end(output);

    //product
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
    //api
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);

    //error
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>page not found!!</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("listen on 127.0.0.1");
});
