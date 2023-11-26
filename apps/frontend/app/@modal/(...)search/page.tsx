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
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="市町村を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>南部</SelectLabel>
                  <SelectItem value="est">那覇市</SelectItem>
                  <SelectItem value="cst">糸満市</SelectItem>
                  <SelectItem value="mst">南城市</SelectItem>
                  <SelectItem value="pst">浦添市</SelectItem>
                  <SelectItem value="ad">豊見城市</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>中部</SelectLabel>
                  <SelectItem value="gmt">北谷町</SelectItem>
                  <SelectItem value="cet">沖縄市</SelectItem>
                  <SelectItem value="eet">うるま市</SelectItem>
                  <SelectItem value="west">北中城村</SelectItem>
                  <SelectItem value="dd">恩納村</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>北部</SelectLabel>
                  <SelectItem value="msk">名護市</SelectItem>
                  <SelectItem value="ist">今帰仁村</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}