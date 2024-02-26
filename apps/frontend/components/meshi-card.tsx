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
import Image from 'next/image'

export const MeshiCardFragment = graphql(`
  fragment MeshiCard on Meshi {
    id
    imageUrl
    siteUrl
    title
    storeName
    publishedDate
    createdAt
  }
`)

type Props = {
    meshi: FragmentType<typeof MeshiCardFragment>
    isEager?: boolean
}

export const MeshiCard = (props: Props) => {
    const meshi = useFragment(MeshiCardFragment, props.meshi)

    return (
        <>
            <Link id="meshi" target='_blank' href={meshi.siteUrl} key={meshi.id}>
                <Image className="h-auto max-w-full rounded-lg"
                    width={300}
                    height={300}
                    src={meshi.imageUrl}
                    alt=""
                    loading={props.isEager ? 'eager' : 'lazy'}
                />
            </Link>
        </>
    )
}