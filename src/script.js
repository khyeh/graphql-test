System.register(["@prisma/client"], function (exports_1, context_1) {
    "use strict";
    var client_1, prisma;
    var __moduleName = context_1 && context_1.id;
    async function main() {
        const newLink = await prisma.link.create({
            data: {
                description: 'Fullstack tutorial for GraphQL',
                url: 'www.howtographql.com',
            },
        });
        const allLinks = await prisma.link.findMany();
        console.log(allLinks);
    }
    return {
        setters: [
            function (client_1_1) {
                client_1 = client_1_1;
            }
        ],
        execute: function () {
            prisma = new client_1.PrismaClient();
            main()
                .catch(e => {
                throw e;
            })
                .finally(async () => {
                await prisma.disconnect();
            });
        }
    };
});
//# sourceMappingURL=script.js.map