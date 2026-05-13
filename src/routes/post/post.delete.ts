import { type FastifyPluginAsync } from "fastify";
const post_delete: FastifyPluginAsync = async (fastify) => {
    const use = await fastify.pg.connect();
    fastify.delete("/crud", async (request, reply) => {
        const { post, com } = request.body as any;
        try {
            const find_post = await use.query(
                "SELECT post,com FROM post_c WHERE post= $1 AND com =$2;",
                [post, com],
            );
            if (find_post.lentgh == 0) {
                return ({ "err": "post undfind" });
            }
            if (find_post.lentgh > 0) {
                reply.code(200).send("errr")
             }
            const delpost = await use.query(
                "DELETE FROM post_c WHERE post=$1 AND com=$2",
                [post, com],
            );
            if (delpost) {
                return reply.code(200).send({
                    "delete post finch": "err",
                    post: post,
                    com: com,
                });
            }
        } catch (err) {
            return ({ "err": "Internal Server Error" });
        } finally {
            use.release();
        }
    });
};
export default post_delete;
