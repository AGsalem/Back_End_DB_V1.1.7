// الاستعادات
import fp from "fastify-plugin";
// استخراج الدالة ليقرأها السيرفر بي الكامل
export default fp(async(fastify)=>{
    // تعريف jwt للسيرفر بي الكامل 
    fastify.register(import ('@fastify/jwt'),{
        //جعل التشفير قوي
        secret: 'supersecret'
    })
})


// 
