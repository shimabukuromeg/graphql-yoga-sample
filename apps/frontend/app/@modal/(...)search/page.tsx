"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/ui/icons"
import { CaretLeftIcon, ArrowLeftIcon } from "@radix-ui/react-icons"
import { SearchContent } from "../components/serach-content"

export default function SearchModal() {
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
		<Dialog open={open}>
			<DialogContent className="w-full h-full">
				<div className="flex">
					<DialogClose asChild>
						<Button
							className="p-0 gap-1"
							type="button"
							variant="ghost"
							onClick={() => {
								setOpen(false)
								router.back()
							}}
						>
							<CaretLeftIcon className="h-8 w-8" />
							<p>もどる</p>
						</Button>
					</DialogClose>
				</div>
				<DialogHeader className="gap-2">
					<div className="flex flex-row items-center justify-center">
						<Icons.logo className="mr-1 h-20 w-20" />
					</div>
					<DialogTitle>検索</DialogTitle>
					<DialogDescription>
						<SearchContent
							onValueChange={async (value) => {
								setOpen(false)
								router.push(`/municipality/${value}`)
							}}
						/>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="sm:justify-start"></DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
