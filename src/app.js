import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import Fawn from 'fawn'
import helmet from 'helmet'
import mongoose from 'mongoose'

import routes from './routes'

class App {
  constructor() {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'
    process.env.TZ = 'America/Sao_Paulo'

    this.middlewares()
    this.database()
    this.routes()
  }

  middlewares() {
    this.express.use(express.json())
    this.express.use(helmet())
    this.express.use(cors())
    this.express.use(express())
  }

  database() {
    mongoose.connect(process.env.APP_API_DB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    Fawn.init(mongoose)
  }

  routes() {
    this.express.use(routes)
  }
}

export default new App().express
