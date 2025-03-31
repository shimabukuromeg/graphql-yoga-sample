// 1
import { PrismaClient } from '@prisma/client';

// 2
const prisma = new PrismaClient();

// 3
async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'シマブクロメグミ',
        displayName: 'Megumi Shimabukuro',
        email: 'shimabukuromeg@example.com',
        iconImageURL:
          'https://vnbnghhfpjhiwnipemcz.supabase.co/storage/v1/object/public/graphql-yoga-sample/profile2.jpg',
        description: '1991年うまれ。ソフトウェアエンジニア🧑‍💻',
        twitterProfileUrl: 'https://twitter.com/20092014',
      },
      {
        name: 'シマブクロメグミ2',
        displayName: 'Megumi Shimabukuro 2',
        email: 'shimabukuromeg2@example.com',
        iconImageURL:
          'https://vnbnghhfpjhiwnipemcz.supabase.co/storage/v1/object/public/graphql-yoga-sample/profile2.jpg',
        description: '1992年うまれ。ソフトウェアエンジニア🧑‍💻',
        twitterProfileUrl: 'https://twitter.com/20092014',
      },
      {
        name: 'シマブクロメグミ3',
        displayName: 'Megumi Shimabukuro 3',
        email: 'shimabukuromeg3@example.com',
        iconImageURL:
          'https://vnbnghhfpjhiwnipemcz.supabase.co/storage/v1/object/public/graphql-yoga-sample/profile2.jpg',
        description: '1993年うまれ。ソフトウェアエンジニア🧑‍💻',
        twitterProfileUrl: 'https://twitter.com/20092014',
      },
    ],
  });
}

// 4
main()
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
