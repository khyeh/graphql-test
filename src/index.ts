const { GraphQLServer } = require("graphql-yoga");

const links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => links.find((link) => link.id === args.id),
  },
  Mutation: {
    // 2
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      let updatedLink = {};
      links.forEach((link) => {
        if (link.id === args.id) {
          link.url = args.url;
          link.description = args.description;
        }
        updatedLink = link;
      });
      return updatedLink;
    },
    deleteLink: (parent, args) => {
      let deletedLink;
      links.forEach((link, index) => {
        if (link.id === args.id) {
          [deletedLink] = links.splice(index, 1);
        }
      });
      return deletedLink;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
