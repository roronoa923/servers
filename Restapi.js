const express = require("express")
const fs = require("fs")
const users = require("./MOCK_DATA.json")

const app = express()
const PORT = 8000
//Middleware
app.use(express.urlencoded({extended: false}))
// Getting request data in txt file using a middleware
app.use((req, res, next)=>{
    fs.appendFile("Log.txt", `\n${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`, (err, data)=>{
        next()
    })
})
//Routes
app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li> ${user.first_name} </li>`).join("")}
    </ul>`
    res.send(html)
})
// Rest API
app.get("/api/users", (req, res) => {
    return res.json(users)
})

app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    return res.json(user)
}).post((req, res) => {
    const body = req.body
    users.push({...body, id: users.length + 1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "Success", id: users.length  })
    })  
}).patch((req, res) => {
    //TOOD: Edit the user with id
    return res.send({ status: "pending" })
}).delete((req, res) => {
    //TOOD: Delete the user with id
    return res.send({ status: "pending" })
})
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))