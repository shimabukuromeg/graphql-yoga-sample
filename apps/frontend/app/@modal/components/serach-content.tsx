"use client"

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

type Props = {
    onValueChange: (value: string) => void
}

export const SearchContent = (props: Props) => {

    return (
        <Select onValueChange={props.onValueChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="市町村を選択" />
            </SelectTrigger>
            {/* TODO: 雑に高さ調整したけど検索UIいい感じにしたいね */}
            <SelectContent className="h-[300px]">
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
        </Select>)
}