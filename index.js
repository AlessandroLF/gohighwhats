const path = require("path");
const fs = require("fs");

module.exports= (res)=>{
    fs.readFile(path.join("public", "build", "index.html"), (err, content) => {
        res.end(content);
    });
}