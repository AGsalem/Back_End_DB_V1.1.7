import { FastifyPluginAsync } from "fastify";
import bcrypt from "bcryptjs";

//تعريفات
const login: FastifyPluginAsync = async (fastify): Promise<void> => {

    // get 
    fastify.get('/login', (request, reply) => {
        return reply.code(200).send({ "message": "login page " })
    })
    // انشاء تسجيل الدخول
    fastify.post('/login', { schema: { body: { $ref: "userSchema" } } }, async (request, reply) => {
        let use;
        try {
            //تعريف الربط بي postgres
            use = await fastify.pg.connect()
            // تعريف الاسم وكلمة المرور الي جايين من المستخدم
            const { name, pass } = request.body as any
            // ايجاد المستخدم
            const findeuser = await use.query('SELECT name FROM user_post WHERE name=$1', [name])
            // لو ملقاش المستخدم ارمي في وش امة خطأ
            if (findeuser.rows.length === 0) {
                return reply.code(401).send({ "err": "User undfind" })
            }
            // لو لقينا المستخدم تعريف الي هيجي على هيئة مصفوفة عشان نقارن التشفير
            const comusr = findeuser.rows[0]
            // تعريف اعادة المعالجة والمقارنة بالتشفير
            const comperhash = comusr.pass
            // تعريف مقارنة المشفر بي الي هيحطة المستخدم
            const com = await bcrypt.compare(pass, comperhash)
            // لو متقارنة  فشلت ارمي خطأ في وش ام المستخدم
            if (!com) { return reply.code(401).send({ "err": "user undfind" }) }
            //    تعريف التوكن 
            const token = await fastify.jwt.sign({ data: { name: name } })
            //  لو عدى كل الي فات الي هو مستحيل اديلة ان تم تسجيل الدخول بس
            return reply.code(201).send({ "message": "successfull create", name: name, token: token })
        } catch (err) {
            return reply.code(500).send({ "Error": "Internal Server Error" });
        }
        finally { use.release() }
    })
}


export default login;
// // ,{schema:{
//     body:{$ref:"userSchema#"}
