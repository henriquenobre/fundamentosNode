import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { buscar } = req.query

      const tasks = database.select('tasks', buscar ? {
        nome: buscar,
        dataInicio,
        dataFim,
        finalizado
      } : null)

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { nome, dataInicio, dataFim, finalizado } = req.body

      const task = {
        id: randomUUID(),
        nome,
        dataInicio,
        dataFim,
        finalizado
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { 
        nome,
        dataInicio,
        dataFim,
        finalizado 
      } = req.body

      database.update('users', id, {
        nome,
        dataInicio,
        dataFim,
        finalizado
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('users', id)

      return res.writeHead(204).end()
    }
  }
]