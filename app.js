const http = require("http");
const path = require("path");
const fs = require("fs");
const index = require("./index");
const login = require("./login")

const server = http.createServer((req, res) => {
  console.log("Request: " + req.url);
  let contentType = "text/html";
  switch(req.url){
    case "/": {
      res.writeHead(200, { "Content-Type": contentType });
      index(res);
      break;
    }

    case "/login": {
      login(res);
      break;
    }

    default:{
      let filePath = path.join( __dirname, "public", req.url);
      let extname = path.extname(filePath);
      switch (extname) {
        case ".js":
          contentType = "text/javascript";
          break;
        case ".css":
          contentType = "text/css";
          break;
        case ".json":
          contentType = "application/json";
          break;
        case ".png":
          contentType = "image/png";
          break;
        case ".jpg":
          contentType = "image/jpg";
          break;
      }

      if (contentType == "text/html" && extname == "") filePath += ".html";

      fs.readFile(filePath, (err, content) => {
        if (err) {
          if (err.code == "ENOENT") {
            fs.readFile(path.join(__dirname, "public", "404.html"), (err, content) => {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end(content, "utf8");
              }
            );
          }
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(content, "utf8");
        }
      });
    }
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));