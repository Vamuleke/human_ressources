import express from 'express'

const app = express ()
const PORT = process.env.PORT || 5000

app.get ('/', (request, response) => {
    response.send ("Hello, server working perfectly !")
})

app.listen (PORT, () => console.log (`Server running on port : ${PORT}`))