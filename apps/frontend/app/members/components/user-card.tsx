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
                <div className='flex flex-row gap-3 items-center pb-1'>
                    <Avatar>
                        <AvatarImage />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <CardTitle>{user.name}</CardTitle>
                </div>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    Check Details
                </Button>
            </CardFooter>
        </Card>
    )
}