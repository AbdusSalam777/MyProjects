const http = require("http");
const path = require("path");
const fs = require("fs").promises;

const port = 3002;

const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      try {
        const data = await fs.readFile(
          path.join(__dirname, "public", "index.html"),
          "utf-8"
        );
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      } catch (error) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 page not found");
      }
    }
  } //HTML file served

  if (req.method === "GET") {
    if (req.url === "/style.css") {
      try {
        const data = await fs.readFile(
          path.join(__dirname, "public", "style.css"),
          "utf-8"
        );
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      } catch (error) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 page not found");
      }
    }
  } //CSS file served

  if (req.method === "GET") {
    if (req.url === "/script.js") {
      try {
        const data = await fs.readFile(
        path.join(__dirname, "public", "script.js"),"utf-8");
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.end(data);
      } catch (error) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 page not found");
      }
    }
  } //JS file served

  //code to receive data from frontend

  if (req.method === "POST" && req.url === "/shorten") {
    let body = "";

    req.on("data", (chunk) => { //data a rha hai
      body += chunk;
    });

    req.on("end", async () => { //data send ho rha hai

      const { url, short } = JSON.parse(body);//storing url and shortcode

      const path_ = path.join(__dirname, "public", "data.json"); //path of data.json

      const fileData = await fs.readFile(path_, "utf-8").catch(() => "{}");
      const jsondata = JSON.parse(fileData);

      jsondata[short] = url;

      await fs.writeFile(path_, JSON.stringify(jsondata, null, 2), "utf-8");

      console.log("Data saved successfully to data.json 👍");
    });
  }

    //handling the other route

  else{

    try {

      const shortcode=req.url.slice(1);

      const path_json=path.join(__dirname,"public","data.json");
      const json_data= await fs.readFile(path_json,'utf-8');
      const parsed_data=JSON.parse(json_data);

      if(parsed_data[shortcode]){
        res.writeHead(302,{Location:parsed_data[shortcode]});
        res.end();
      }
      
    } catch (error) {

      console.log(error)
      
    }
  }

}); //end of createserver

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
