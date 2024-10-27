const http = require("http")
const fs = require("fs")
const url = require("url")
const myserver = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end()
    const log = `${Date.now()}: ${req.method} ${req.url} New Request Received\n`
    const myUrl = url.parse(req.url, true)
    console.log(url)
    fs.appendFile("Log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case "/":
                if (req.method === "GET") 
                    res.end("Home Page")
                break
            case "/About":
                const username = myUrl.query.myname
                res.end(`Hi , ${username}`)
                break
            case "/search":
                const search = myUrl.query.search_query
                res.end("Here is your results for " + search)
                break
            case "/signup":
                if (req.method === "GET") {
                    res.end("This is a sign-up form")
                }
                else if (req.method === "POST") {
                    //db query
                    res.end("Success")
                }
            default:
                res.end("404 NOT FOUND")

        }
    })
})
myserver.listen(8000, () => console.log("Server Started!"))