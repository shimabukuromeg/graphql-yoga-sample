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


export const UserDetailFragment = graphql(`
  fragment User on User {
    id
    name
    iconImageURL
    description
    twitterProfileUrl
    displayName
  }
`)

type Props = {
    user: FragmentType<typeof UserDetailFragment>
}

export const UserDetail = (props: Props) => {
    const user = useFragment(UserDetailFragment, props.user)
    return (<div className='flex flex-col gap-8 flex-wrap justify-center md:justify-start'>
        <div className='flex flex-row gap-3 items-center pb-2'>
            <Avatar className="h-14 w-14">
                <AvatarImage
                    className=""
                    src={user.iconImageURL ?? ""}
                />
                <AvatarFallback>{user.displayName.split('')[0]}</AvatarFallback>
            </Avatar>
            <CardTitle>{user.displayName}</CardTitle>
        </div>
        <CardDescription className="line-clamp-3 h-[40px]">
            {user.description}
        </CardDescription>
    </div>)
}