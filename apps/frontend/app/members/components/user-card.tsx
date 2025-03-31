import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { FragmentType, graphql, useFragment } from '@/src/gql'
import { Icons } from '@/components/ui/icons'
import Link from 'next/link'

export const UserCardFragment = graphql(`
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
  user: FragmentType<typeof UserCardFragment>
}

export const UserCard = (props: Props) => {
  const user = useFragment(UserCardFragment, props.user)
  return (
    <Card className={cn('w-[325px]')}>
      <CardHeader>
        <div className="flex flex-row gap-3 items-center pb-2">
          <Avatar className="h-14 w-14">
            <AvatarImage className="" src={user.iconImageURL ?? ''} />
            <AvatarFallback>{user.displayName.split('')[0]}</AvatarFallback>
          </Avatar>
          <CardTitle>{user.displayName}</CardTitle>
        </div>
        <CardDescription className="line-clamp-3 h-[40px]">
          {user.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex-row justify-end gap-4">
        <Link href={`/members/${user.id}`}>
          <Button>View Profile</Button>
        </Link>
        {user.twitterProfileUrl && (
          <Link href={user.twitterProfileUrl} target="_blank">
            <Icons.twitter className="h-5 w-5" />
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
