import fp from "fastify-plugin";
export default fp(async (fastify) => {
    fastify.addSchema({
        $id: "userSchema",
        type: "object",
        // require:[هنا هنحط اسماء الاعمدة الي جاية من db],
        required: ["name", "pass"],
        properties: {
            //الاسم العمود:{نوعة واقل عدد لية minlength},
            name: {
                type: "string",
                minLength: 5,
            },
            pass: {
                type: "string",
                minLength: 8,
                // pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).+$",
            },
            settings: {
                type: "object",
                additionalProperties: false,
            },
            //الاسم العمود:{نوعة واقل عدد لية minlength}
        },})
        

    // fastify.addSchema({
    //     $id: "pass_admin",
    //     type: "object",
    //     // require:[هنا هنحط اسماء الاعمدة الي جاية من db],
    //     required: ["pass_admin"],
    //     properties: {
    //         //الاسم العمود:{نوعة واقل عدد لية minlength},

    //         pass_admin: {
    //             type: "string",
    //             minLength: 178,
    //         },
    //         settings: {
    //             type: "object",
    //             additionalProperties: false,
    //         },
    //         //الاسم العمود:{نوعة واقل عدد لية minlength}
    //     },
    // });
});
// });
