import { fetchMeshiData } from '@/lib/fetch-meshi-data'
import { PAGE_SIZE, TRADING_PAGE_SIZE } from '@/src/constants/common'
// import { useSearch } from "../queries/use-search-query";
import type { SearchItem } from '@/types/global-search'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGlobalSearchStore } from '../store/global-search-store'

/**
 * Custom hook for managing global search functionality
 * @returns An object containing search-related state and functions
 */
const useGlobalSearch = () => {
  // Reference to the search results container
  const resultsRef = useRef<HTMLDivElement>(null)

  // Destructure values and functions from the global search store
  const { searchQuery, searchFilter, setSearchQuery, setSearchFilter } =
    useGlobalSearchStore()

  // TODO: Implement recent searches functionality
  const recentSearches: SearchItem[] = []

  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  // GraphQLのレスポンスにはページネーション情報が含まれるため、それを利用する
  // ただし、fetchMeshiData が現状 SearchItem[] しか返さないため、
  // fetchMeshiData を修正するか、このフックでより詳細なレスポンスを扱う必要がある
  const [hasNextPage, setHasNextPage] = useState<boolean>(false) // 仮
  const [totalCount, setTotalCount] = useState<number>(0) // 仮
  // const [nextCursor, setNextCursor] = useState<string | null>(null); // 必要に応じて

  // Determine if we should fetch trending items
  const fetchTrending = useMemo(() => !searchQuery, [searchQuery])

  // biome-ignore lint/correctness/useExhaustiveDependencies: PAGE_SIZE and TRADING_PAGE_SIZE are constants but included for clarity
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setIsError(false)
      setError(null)
      try {
        const limit = fetchTrending ? TRADING_PAGE_SIZE : PAGE_SIZE
        // fetchMeshiData を呼び出し
        // 注意: 現状の fetchMeshiData は SearchItem[] のみを返す。
        // ページネーション情報 (hasNextPage, totalCount, endCursor) を取得するには
        // fetchMeshiData の戻り値を変更するか、ここでレスポンス全体を扱う必要がある。
        // ここでは、SearchItem[] を受け取る前提で進める。
        const data = await fetchMeshiData(limit, searchQuery) // searchQueryが空文字の場合undefinedを渡す
        setSearchResults(data)

        // --- ページネーション情報の仮対応 ---
        // 本来は fetchMeshiData が返すレスポンスから取得する
        setTotalCount(data.length) // 今は取得した件数をtotalCountとする
        // hasNextPage の判断もレスポンスに基づく必要がある
        setHasNextPage(data.length === limit) // もし取得件数がlimitと同じなら次があるかもしれない、という仮定
        // setNextCursor(null); // レスポンスから取得
        // --- ここまでページネーション情報の仮対応 ---
      } catch (err) {
        setIsError(true)
        if (err instanceof Error) {
          setError(err)
        } else {
          setError(new Error('An unknown error occurred while fetching data.'))
        }
        setSearchResults([])
        setTotalCount(0)
        setHasNextPage(false)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [searchQuery, fetchTrending, TRADING_PAGE_SIZE, PAGE_SIZE]) // searchFilterも依存配列に追加

  // Extract trending items from the search results
  // biome-ignore lint/correctness/useExhaustiveDependencies: TRADING_PAGE_SIZE is a constant but included for clarity
  const trendingItems = useMemo(() => {
    if (fetchTrending) {
      return searchResults.slice(0, TRADING_PAGE_SIZE)
    }
    return []
  }, [searchResults, fetchTrending, TRADING_PAGE_SIZE])

  // Scroll to top when search filter changes
  useEffect(() => {
    if (searchFilter || searchQuery) {
      resultsRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [searchFilter, searchQuery])

  const fetchNextPage = async () => {
    // TODO: ページネーション処理を実装
    // searchQuery, nextCursor を使って fetchMeshiData を呼び出し、
    // searchResults に結果を追加 (concat) する
    // hasNextPage, nextCursor を更新する
    console.log('fetchNextPage called, but not implemented yet.')
  }

  // Return an object with all necessary state and functions
  return {
    searchQuery,
    setSearchQuery,
    searchFilter,
    setSearchFilter,
    searchResults,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    recentSearches,
    trendingItems,
    isFetchingNextPage: false, // TODO: isFetchingNextPage の実装
    resultsRef,
    totalCount,
  }
}

export default useGlobalSearch
