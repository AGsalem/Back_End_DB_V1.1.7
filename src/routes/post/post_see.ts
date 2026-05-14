// استدعائئات
import { type FastifyPluginAsync } from "fastify";
// استخراج الدالة 
const posts: FastifyPluginAsync = async (fastify): Promise<void> => {
   // عمل الصفحة وانشائها  
   fastify.get('/data', async (request, reply) => {
      // تعريف use الي هنحطة في الاستعلام
      let use;
      try {
         use = await fastify.pg.connect()
         const posts = await use.query('SELECT post FROM post_c ORDER BY RANDOM()')
         const com = await use.query('SELECT com FROM post_c ORDER BY  RANDOM()')
         console.log("com.post")
         return reply.code(201).send({ post: posts.rows, comment: com.rows })
         // 
      } catch (err) {
         console.error(err)
         return reply.code(500).send({ "Error": "Internal Server Error" });

      }
      // finally { use.release() }
   })
}
export default posts