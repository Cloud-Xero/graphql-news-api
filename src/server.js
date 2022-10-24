const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

// HackerNewsの１つ１つの投稿
let links = [
  {
    id: "link-0",
    description: "GraphQLチュートリアルを学ぶ",
    url: "https://example.com",
  },
];

// リゾルバ関数
const resolvers = {
  Query: {
    info: () => "HackerNews クローン",
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`${url}でサーバーを起動中`));
