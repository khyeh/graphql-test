var GraphQLServer = require("graphql-yoga").GraphQLServer;
var links = [
    {
        id: "link-0",
        url: "www.howtographql.com",
        description: "Fullstack tutorial for GraphQL"
    }
];
var idCount = links.length;
var resolvers = {
    Query: {
        info: function () { return "This is the API of a Hackernews Clone"; },
        feed: function () { return links; },
        link: function (parent, args) { return links.find(function (link) { return link.id === args.id; }); }
    },
    Mutation: {
        post: function (parent, args) {
            var link = {
                id: "link-" + idCount++,
                description: args.description,
                url: args.url
            };
            links.push(link);
            return link;
        },
        updateLink: function (parent, args) {
            var updatedLink = {};
            links.forEach(function (link) {
                if (link.id === args.id) {
                    link.url = args.url;
                    link.description = args.description;
                }
                updatedLink = link;
            });
            return updatedLink;
        },
        deleteLink: function (parent, args) {
            var deletedLink;
            links.forEach(function (link, index) {
                if (link.id === args.id) {
                    deletedLink = links.splice(index, 1)[0];
                }
            });
            return deletedLink;
        }
    }
};
var server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: resolvers
});
server.start(function () { return console.log("Server is running on http://localhost:4000"); });
//# sourceMappingURL=index.js.map