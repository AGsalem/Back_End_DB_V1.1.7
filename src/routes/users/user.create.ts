// استعادات
import { type FastifyPluginAsync } from "fastify";
import bcrypt from "bcryptjs";
import "dotenv/config";
import "@fastify/jwt";
import "@fastify/postgres";
// تعريف الدالة الاساسية
const create: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    // متغير مؤقت

    //تعريفات crud
    //  const { name, pass } = request.body as any;}
    // للمتصفح
    fastify.get("/api_crud", async (request, reply) => {
        // const secret ="1234"
        // const hasw= await bcrypt.hash(secret,15)
        // reply.send(hasw)
        return reply.send({ " message": "connected api_create" });
    });

    fastify.post(
        "/api_crud",
        {
            schema: {
                body: { $ref: "userSchema#" },
            },
        },
        async (request, reply) => {
            let use;
            try {
                use = await fastify.pg.connect();

                // fastify.decorate('db',use)
                // تعريفات

                const { name, pass } = request.body as any;
                const hash = await bcrypt.hash(pass, 10);
                const data_user = {
                    name: name,
                };
                // التأكد ان المستخدم الي بيشئ الحساب مش موجود

                const token = fastify.jwt.sign({ data_user });
                //تعريف الsqlالي هيعمل انشاء مع تأمينة
                const creat = await use.query(
                    "INSERT INTO user_post(name,pass) VALUES ($1,$2) RETURNING id, name;;",
                    [name, hash],
                );

                if (creat) {
                    return ({
                        "message": "create account successfull",
                        name: name,
                        pass: hash,
                        token: token,
                    });
                }
                // console.log("BODY:", request.body);
                // return request.body;
                //الرجوع بي الخطأ
            } catch (err) {
                // console.log("err in :\n");
                return reply.code(500).send({ "Error": "Internal Server Error" });

                // console.error("err");
                // // if err 
                // return (
                //     err
                //     // "err": "please try again and input anuther name or pass",
                // );
            }
        },
    );
    // حذف حساب

};
export default create;

// curl --location 'http://localhost:3000/api-crud' --header 'Content-Type: application/json' --data '{"name":"ahmed","pass":"12345"}'

//     response: {
//         200: {
//             type: "object",
//             properties: {
//                 name: { type: "string" },
//                  token:{type: "string" }
//             },
//         },
//     },