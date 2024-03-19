const fs = require('fs');
const express = require('express')


const srv = express()

const jsonBodyParser = express.json()

srv.use(jsonBodyParser)


srv.listen(3000, () => console.log('espress server is running [3000]'))

srv.get('/', (req, res) => {
    res.send('Start nodeJs SSR service!')
})
