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
import { CaretLeftIcon, ArrowLeftIcon } from '@radix-ui/react-icons'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

export default function SearchModal() {
  const [open, setOpen] = useState(true)
  const router = useRouter()

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
              }}>
              <CaretLeftIcon className="h-8 w-8" />
              <p>もどる</p>
            </Button>
          </DialogClose>
        </div>
        <DialogHeader className="gap-2">
          <div className='flex flex-row items-center justify-center'>
            <Icons.logo className="mr-1 h-20 w-20" />
          </div>
          <DialogTitle>検索</DialogTitle>
          <DialogDescription>
            <Select onValueChange={async (value) => {
              router.push(`/municipality/${value}`)
              setOpen(false)
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="市町村を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>南部</SelectLabel>
                  <SelectItem value="3">那覇市</SelectItem>
                  <SelectItem value="2">糸満市</SelectItem>
                  <SelectItem value="67">南城市</SelectItem>
                  <SelectItem value="27">浦添市</SelectItem>
                  <SelectItem value="4">豊見城市</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>中部</SelectLabel>
                  <SelectItem value="1">北谷町</SelectItem>
                  <SelectItem value="22">沖縄市</SelectItem>
                  <SelectItem value="7">うるま市</SelectItem>
                  <SelectItem value="5">北中城村</SelectItem>
                  <SelectItem value="110">恩納村</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>北部</SelectLabel>
                  <SelectItem value="84">名護市</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}