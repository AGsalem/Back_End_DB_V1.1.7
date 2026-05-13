// استدعائات 
import fp from 'fastify-plugin'
import Postgres from '@fastify/postgres'
import 'dotenv/config'
// استخراج الدالة بدون اعطائها اسم
export default fp(async (fastify) => {
  fastify.register(Postgres, {
    connectionString: process.env.LOCAL, 
    ssl:false,
    // ssl: {
    //   rejectUnauthorized: false}
  })
})
