"use client"

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { graphql } from "@/src/gql"
import { GraphQLClient } from "graphql-request"
import { cache, use, useEffect, useState } from "react"

type Props = {
	onValueChange: (value: string) => void
}

export const SearchContent = (props: Props) => {
	const [municipalities, setMunicipalities] =
		useState<{ id: string; name: string }[]>()
	useEffect(() => {
		fetchMunicipalities().then((data) => {
			setMunicipalities(data.municipalities)
		})
	}, [])

	return (
		<Select onValueChange={props.onValueChange}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="市町村を選択" />
			</SelectTrigger>
			{/* TODO: 雑に高さ調整したけど検索UIいい感じにしたいね */}
			<SelectContent className="h-[300px]">
				<SelectGroup>
					<SelectLabel>市町村</SelectLabel>
					{municipalities?.map((municipality) => {
						return (
							<SelectItem key={municipality.id} value={municipality.id}>
								{municipality.name}
							</SelectItem>
						)
					})}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

const MunicipalitiesQuery = graphql(/* GraphQL */ `
    query Municipalities {
      municipalities {
      name
      id
    }
    }
  `)

const fetchMunicipalities = async () => {
	const backendEndpoint =
		process.env.BACKEND_ENDPOINT ?? "http://localhost:4000/graphql"

	const client = new GraphQLClient(backendEndpoint, {
		fetch: cache(async (url: any, params: any) =>
			fetch(url, { ...params, next: { revalidate: 60 } }),
		),
	})
	const data = await client.request(MunicipalitiesQuery, {})
	return data
}
