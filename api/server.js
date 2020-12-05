const express = require('express')
const cors = require('cors')
const faker = require('faker')

const port = 3000
const hostname = 'localhost'

const app = express()

app.use(cors())

const gerarPessoaAleatória = () => {
    return {
        nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        position: {
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude()
        }
    }
}

app.get('/', (req, res) => {

    res.setHeader('Content-Type', 'application/json')

    let vetorPessoa = []
    for (let i = 0; i < 10; i++) {
        vetorPessoa.push(gerarPessoaAleatória())
    }
    res.end(JSON.stringify(vetorPessoa))
})

app.listen(port, hostname, () => {
    console.log(`Servidor rodando no endereço http://${hostname}:${port}`)
})