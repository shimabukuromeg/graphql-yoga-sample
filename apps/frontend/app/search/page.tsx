"use client"

import { SearchContent } from "../@modal/components/serach-content"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SearchPage() {
	const [open, setOpen] = useState(true)
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		if ("/search" !== pathname) {
			setOpen(false)
		} else {
			setOpen(true)
		}
	}, [pathname])

	return (
		<div className="flex flex-col md:gap-8 gap-2 md:p-20 p-2">
			<h1 className="text-2xl md:text-3xl font-bold text-textBlack">検索</h1>
			<div className="md:px-4 px-1">
				<SearchContent
					onValueChange={async (value) => {
						setOpen(false)
						router.push(`/municipality/${value}`)
					}}
				/>
			</div>
		</div>
	)
}
