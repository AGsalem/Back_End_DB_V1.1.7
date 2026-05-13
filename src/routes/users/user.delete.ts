// استعادات
import { type FastifyPluginAsync } from "fastify";
import "@fastify/jwt";
import "@fastify/postgres";
// تعريف الدالة الاساسية
const delet: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // fastify.get("/api_crud", async (request, reply) => {
  //   return { message: "connect delete" };
  // });
  fastify.delete("/api_crud", async (request, reply) => {
    let use;
    try {
      use = await fastify.pg.connect();
      const { name, pass } = request.body as any;
      const delelt = await use.query(
        "DELETE FROM user_post WHERE name = $1 AND pass = $2;",
        [name, pass],
      );
      if (delelt.rowCount === 0) {
        return reply.code(401).send({ message: "error user undfind" });
      }
      return reply
        .code(200)
        .send({ message: "delete finsh", name: name, pass: pass });
    } catch (err) {
      console.error(err);
        return reply.code(500).send({"Error":"Internal Server Error"});
    } finally {
      use.release();
    }
  });
};
export default delet;
