const fs = require("fs");
const http = require("http");
const url = require("url");
// const textIn = fs.readFileSync("./starter/txt/input.txt", "utf-8");
// const textOut = `this is all we know about avacadio : ${textIn} on\n${Date.now()}.`;
// fs.writeFileSync("./starter/txt/output.txt", textOut);
const users = [
  { username: "sms", password: "123" },
  { username: "user2", password: "password2" },
  { username: "sajjad", password: "sms" },
  // Add more users as needed
];
function register(username, password) {
  users.push({ username, password });
}
//
function login(username, password) {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  return user ? true : false;
}

const templogin = fs.readFileSync(`${__dirname}/templates/login.html`, "utf-8");
const tempto_cart = fs.readFileSync(`${__dirname}/templates/cart-shop.html`, "utf-8");

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
const tempRegister = fs.readFileSync(
  `${__dirname}/templates/Register.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

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
  if (pathname === "/") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = templogin.replace("{%PRODUCT-CARDS}", cardsHtml);
    res.end(output);

    //product
  }
  else if (pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT-CARDS}", cardsHtml);
    res.end(output);

    //product
  }

  else if (pathname === "/tocart") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempto_cart.replace("{%PRODUCT-CARDS}", cardsHtml);
    res.end(output);

    //product
  }
  
  else if (pathname === "/register") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    //

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempRegister.replace("{%PRODUCT-CARDS}", cardsHtml);
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
  } else if (pathname === "/css/style.css") {
    return "";
  }

  //http://127.0.0.1:3000/main.js

  //http://127.0.0.1:3000/main.js
  else if (req.url === "/main.js") {
    fs.readFile(`${__dirname}/templates/js/main.js`, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/js" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "text/js" });
        res.end(data);
      }
    });
  } 
  else if (req.url === "/to-cart.js") {
    fs.readFile(`${__dirname}/templates/js/to-cart.js`, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/js" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "text/js" });
        res.end(data);
      }
    });
  }
  
  else if (req.url === "/login2.css") {
    fs.readFile(
      `${__dirname}/templates/css/style.css`,
      "utf-8",
      (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/css" });
          res.end("404 Not Found");
        } else {
          res.writeHead(200, { "Content-Type": "text/css" });
          res.end(data);
        }
      }
    );
  }

  //http://127.0.0.1:3000/img/wave.png

  //http://127.0.0.1:3000/img/avatar.svg
  else if (req.url === "/img/wave.png") {
    fs.readFile(`${__dirname}/templates/img/wave.png`, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "image/png" });
        res.end(data);
      }
    });
  }
  //http://127.0.0.1:3000/img/bg.svg
  else if (req.url === "/img/bg.svg") {
    fs.readFile(`${__dirname}/templates/img/bg.svg`, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "image/svg+xml" });
        res.end(data);
      }
    });
  } else if (req.url === "/img/avatar.svg") {
    fs.readFile(`${__dirname}/templates/img/avatar.svg`, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "image/svg+xml" });
        res.end(data);
      }
    });
  } else if (req.method === "POST" && req.url === "/overview2") {
     let body = ""; 
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const formData = new URLSearchParams(body);
      const username = formData.get("name");
      const password = formData.get("password");
 if(username+password!==0){
   
 console.log(username+password)
      if (login(username, password)) {
        

        const cardsHtml = dataObj
        .map((el) => replaceTemplate(tempCard, el))
        .join("");
      const output = tempOverview.replace("{%PRODUCT-CARDS}", cardsHtml);
      res.end(output);
        
      } 
      
      else {
        res.end("Invalid username or password");
      } 

   }
   else{
   const newusername = formData.get("newName");
   const newpassword = formData.get("newPassword");
   const password2 = formData.get("confirmPassword");
   console.log(newusername+newpassword+password2)

  if(newpassword!==password2) res.end("confirm password rong")
  else{    register(newusername,newpassword)
    const cardsHtml2 = dataObj
    .map((el2) => replaceTemplate(tempCard, el2))
    .join("");
  const output2 = templogin.replace("{%PRODUCT-CARDS}", cardsHtml2);
  res.end(output2);
  }
}
    });
  }
  /// imge
  else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>page not found!!</h1>");
  }
});
server.listen(3000, "127.0.0.1", () => {
  console.log("Locallhost:http://127.0.0.1:3000");
});
