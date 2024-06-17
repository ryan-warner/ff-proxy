import { serve } from '@hono/node-server'
import { Hono } from 'hono'

// ENV Config
import { env } from 'hono/adapter'
import dotenv from 'dotenv'
dotenv.config()

const app = new Hono()

// Fetch Weather Reports
app.get('/weather/report/:airportCode', async (c) => {
  const airportCode = c.req.param('airportCode')
  const { FF_API_URL } = env<{ FF_API_URL: string }>(c)
  // Fetch weather data from FF API
  let response
  try {
    response = await fetch(`${FF_API_URL}/weather/report/${airportCode}`,
      {
        headers: {
          'ff-coding-exercise': '1'
        }
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Airport code could not be found' }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 404
    })
  }
  const data = await response.json()
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
})

// Fetch Airport Data
app.get('/airports/:airportCode', async (c) => {
  const airportCode = c.req.param('airportCode')
  const { FF_API_URL } = env<{ FF_API_URL: string }>(c)
  const { FF_BASIC_AUTH_CREDENTIALS } = env<{ FF_BASIC_AUTH_CREDENTIALS: string }>(c)
  let response
  // Fetch airport data from FF API
  try {
    response = await fetch(`${FF_API_URL}/airports/${airportCode}`,
      {
        headers: {
          'ff-coding-exercise': '1',
          'Authorization': `Basic ${btoa(FF_BASIC_AUTH_CREDENTIALS)}`
        }
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Airport code could not be found' }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 404
    })
  }
  const data = await response.json()
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
})

const port = 3000
console.log(`Server is running on port ${port}`)

// Would write middleware to handle response headers for a production implementation
serve({
  fetch: app.fetch,
  port
})
