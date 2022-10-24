// データベースにアクセスするためのクライアントライブラリ
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main(params) {
  const newLink = await prisma.link.create({
    data: {
      description: "GraphQLチュートリアルを学ぶ",
      url: "https://example.com",
    },
  });
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // データベースを閉じる
    prisma.$disconnect;
  });
