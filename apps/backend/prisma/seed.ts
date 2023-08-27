// 1
import { PrismaClient } from '@prisma/client'

// 2
const prisma = new PrismaClient()

// 3
async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Alice',
            email: "alice@gmail.com",
        }
    })

    for (let i = 0; i < 10; i++) {
        await prisma.link.create({
            data: {
                description: `Fullstack tutorial for GraphQL ${i + 1}`,
                url: `www.howtographql.com/${i}`,
                postedBy: {
                    connect: { id: user.id }
                }
            }
        })
    }

    const allLinks = await prisma.link.findMany()

    console.log(allLinks)
}

// 4
main()
    // 5
    .finally(async () => {
        await prisma.$disconnect()
    })
