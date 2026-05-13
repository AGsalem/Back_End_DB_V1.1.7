import { type FastifyPluginAsync } from "fastify";

const post_create: FastifyPluginAsync = async (fastify): Promise<void> => {
    //   تعريف الاتصال
    const Post_api = await fastify.pg.connect();
    fastify.get("/crud", async (request, replay) => {
        return ({ "welcom to api_post": "CRUD posts and DashBoard" });
    });
    fastify.post("/crud", async (request, replay) => {
        try {
            const { post, com } = request.body as any;
            const create_post = await Post_api.query(
                "INSERT INTO post_c (post,com) VALUES($1,$2)",
                [post, com],
            );
            if (create_post) {
                return replay.code(200).send({
                    "message": "create post successfull",
                    post: post,
                    com: com,
                });
            }
        } catch (err) {
            // console.error(err);
            // console.clear()
            return({"Error":"Internal Server Error"})
        } finally {
            Post_api.release();
        }
    });
    // fastify.delete("/api_post", async (request, replay) => {
    //     return ({"shs":"sLJs"})
    // });
    // fastify.put("/api_post", async (request, replay) => {
    //     return ({"ss":"sLs"})
    // });
};
export default post_create;
