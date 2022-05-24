
# Projeto Paleteria Backend V1

O projeto presente é a versão 1 do Backend de uma Paleteria que possibilita realizar o CRUD de paletas de sorvetes em um banco de dados não-relacional.
Para esta versão, foi utilizado a arquitetura MVC; 


## Stack utilizada

**Back-end:** Node, Express, MongoAtlas


# Início

*Configuração Base*
- Instalação do git-commit-msg-linter para padronizar os registros do hitórico de desenvolvimento;
- Instalação do eslint definindo o padrão de formatação como sendo o Prettier;
- Criação dos arquivos 'eslintrc.json e prettierrc.json' e os arquivos 'gitignore e eslintignore';
```
{
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "prettier"
    ],
    "plugins": [
        "prettier"
    ],
    "parser": "",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "prettier/prettier": "error"
    }
}
```
```
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "endOfLine": "auto"
}
```
- Instalação do lint-staged e criação do arquivo 'lintstagedrc.json' configurado para rodar o eslint em todos os arquivos 'js' na staged area e corrigir com o Prettier;
```
{
  "*.js": [
    "eslint --fix"
  ]
}
```
- Instalação do Husky e criação do arquivo 'huskyrc.json' configurando o hooks para rodar o eslint antes do git commit;
```
{
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```
# Desenvolvimento
- Criação do arquivo index.js e do diretório 'src' no root;
- Criação de sub-diretórios dentro do 'src': routes, controllers, services, middlewares e db;

## index
- Aqui definiremos a interface do servidor;
- Instalação do express;
- Criação da instancia express e definir padrões de configuração para o express;
```
app.use(express.json())
app.use(cors())
``` 
- Para o uso do Cors, é necessário sua instalação;
- Uso do método 'listen' para iniciar o servidor;
```
const port = 3000
app.listen(port, () => {
    console.log(`Serever running at port ${port}`)})
```
## DB
- Aqui definiremos toda a configuração para conectar e criar um modelo para interagir com o banco de dados;
- Instalação do mongoose e dotenv;
- Criação do arquivo 'connection.js' e definir as configurações de conexão com o banco de dados;
```
const mongoose = require('mongoose')

require('dotenv').config()
const uri = process.env.URI

function conectarBancoDeDados() {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = conectarBancoDeDados
```
- Criação do arquivo '.env' e definir o 'PORT' e 'URI';
- Alterar o arquivo index.js;
```
const express = require('express')
const cors = require('cors')
const conectarBancoDeDados = require('./src/db/connection')

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000

try {
  conectarBancoDeDados()
  console.log('Conectado ao bd')
  app.listen(port, () => {
    console.log(`Serever running at port ${port}`)
  })
} catch (e) {
  console.error(e)
  console.log('Não conectado ao bd')
}

```
- Criação do arquivo schema.js e definir os dados que o bd irá receber e enviar. Feito isso, exportar o 'Model' para o uso do bd no app;
```
const mongoose = require('mongoose')

const PaletasSchema = new mongoose.Schema({
  sabor: { type: String, required: true },
  descricao: { type: String, required: true },
  foto: { type: String, required: true },
  preco: { type: Number, required: true },
})

const paletas = mongoose.model('Paletas', PaletasSchema)
module.exports = paletas
```

## Middlewares
- Criação do arquivo validations.js contendo as funções para validar o ID e as informações enviadas para o bd;
```
const mongoose = require('mongoose')

const validId = (req, res, next) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID inválido')
  }
  next()
}

const validObjectBody = (req, res, next) => {
  const info = req.body
  if (!info || !info.sabor || !info.descricao || !info.foto || !info.preco) {
    throw new Error('Erro na informação passada')
  }
  next()
}

module.exports = { validId, validObjectBody }
```
- Essas funções serão chamadas para cada request que o client fizer, sendo rodadas antes do 'controller';
## Routes
- Aqui são definidas todas as rotas;
- Criação do arquivo routes.js;
- Uso do método Router() do express para exportar as rotas para o index.js;
```
const router = require('express').Router()
const { validId, validObjectBody } = require('../middlewares/paletas')
const PaletasController = require('../controllers/paletas-controller')

router
  .route('/paletas')
  .get(PaletasController.findAll)
  .post(validObjectBody, PaletasController.create)

router
  .route('/paletas/:id')
  .get(validId, PaletasController.findOne)
  .patch(validId, validObjectBody, PaletasController.update)
  .delete(validId, PaletasController.remove)

module.exports = router
```
- O route() define o caminho que será linkado com os métodos http;
- O Controller será criado em seguida;
- Agora atualizamos novamente o index.js para receber as rotas;
```
const express = require('express')
const cors = require('cors')
const route = require('./src/routes/paletas-routes')
const conectarBancoDeDados = require('./src/db/connection')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/v1', route)//aqui definimos o caminho que será associado ao route

const port = process.env.PORT || 3000

try {
  conectarBancoDeDados()
  console.log('Conectado ao bd')
  app.listen(port, () => {
    console.log(`Serever running at port ${port}`)
  })
} catch (e) {
  console.error(e)
  console.log('Não conectado ao bd')
}
```
## Controller
- Somente os métodos getOne() e create() serão mostrados, pois suas estruturas são iguais em outros métodos;
- O Controller é responsável por cuidar das requisições e respostas, assim, ao chamar uma função do controller, ele repassa as requisições para o Service. Já as respostas do banco são repassadas do service para o controller;
 ```
 const findOne = async (req, res) => {
  const id = req.params.id
  try {
    const result = await PaletasService.findOne(id)
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(403).send({ message: err })
  }
}

const create = async (req, res) => {
  const info = req.body
  try {
    const result = await PaletasService.create(info)
    res.status(201).send(result)
  } catch (err) {
    console.error(err)
    res.status(403).send({ message: err })
  }
}
 ``` 
 
## Service
- No services, é onde acontece de fato o CRUD;
- As requisições vindas do controller são executadas no service através do uso de Model;
- O êxito ou não da execução são retornados para o controller;
```
const paletas = require('../db/schema')
const findOne = async (id) => {
  try {
    const res = await paletas.findById(id)
    return res
  } catch (e) {
    return { message: 'Paleta não encontrada' }
  }
}

const create = async (info) => {
  try {
    await paletas.create(info)
    return info
  } catch (e) {
    throw new Error({ message: 'Paleta não criado' })
  }
}
```
- Com isso todo o fluxo do CRUD pode ser manipulado;
## Autores

- [@nikolasfuruta](https://github.com/nikolasfuruta)

