const path = require("path");
const fs = require("fs");

module.exports= (res)=>{
    fs.readFile(path.join("public", "index.html"), (err, content) => {
        res.write(content);
    }
}