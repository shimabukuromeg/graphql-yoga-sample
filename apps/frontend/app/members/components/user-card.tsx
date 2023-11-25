import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { FragmentType, graphql, useFragment } from '@/src/gql'
import { Icons } from "@/components/ui/icons"
import Link from "next/link"

export const UserCardFragment = graphql(`
  fragment User on User {
    id
    name
  }
`)

type Props = {
    user: FragmentType<typeof UserCardFragment>
}

export const UserCard = (props: Props) => {
    const user = useFragment(UserCardFragment, props.user)
    return (
        <Card className={cn("w-[325px]")} key={user.id}>
            <CardHeader>
                <div className='flex flex-row gap-3 items-center pb-2'>
                    <Avatar className="h-14 w-14">
                        <AvatarImage
                            className=""
                            src="https://vnbnghhfpjhiwnipemcz.supabase.co/storage/v1/object/public/graphql-yoga-sample/profile2.jpg"
                        />
                        <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{user.name}</CardTitle>
                </div>
                <CardDescription className="line-clamp-3 h-[40px]">
                    1991年うまれ。ソフトウェアエンジニア🧑‍💻
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex-row justify-end gap-4">
                <Link href={`https://twitter.com/20092014`} target="_blank">
                    <Icons.twitter className="h-5 w-5" />
                </Link>
            </CardFooter>
        </Card>
    )
}