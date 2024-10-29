const express = require("express")
const users = require("./MOCK_DATA.json")

const app = express()
const PORT = 8000
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
    //TOOD: Create new users
    return res.json({ status: "pending" })
}).patch((req, res) => {
    //TOOD: Edit the user with id
    return res.send({ status: "pending" })
}).delete((req, res) => {
    //TOOD: Delete the user with id
    return res.send({ status: "pending" })
})
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))