// TableContainerApi.tsx
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import GenericTable from './GenericTable'
import { ColumnSelector } from './ColumnSelector'
import { TableColumn } from './Types'
import { Pagination } from '@mui/material'

type TableContainerApiProps<T> = {
  fetchUrl: string // APIのURL
  initialColumns: TableColumn<T>[] // ユーザーが定義するカラム
}

function TableContainerApi<T>({
  fetchUrl,
  initialColumns,
}: TableContainerApiProps<T>) {
  const [hiddenColumns, setHiddenColumns] = useState<(keyof T)[]>([])
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const itemsPerPage = 10 // 1ページあたりのアイテム数

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${fetchUrl}?skip=${
            (currentPage - 1) * itemsPerPage
          }&limit=${itemsPerPage}`,
        )
        const json = await response.json()
        setData(json.products)
        setTotalPages(Math.ceil(json.total / itemsPerPage)) // 合計ページ数を計算
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [fetchUrl, currentPage])

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ColumnSelector
            columns={initialColumns}
            hiddenColumns={hiddenColumns.map(String)}
            setHiddenColumns={
              setHiddenColumns as Dispatch<SetStateAction<string[]>>
            }
          />
          <GenericTable
            data={data}
            columns={initialColumns}
            hiddenColumns={hiddenColumns}
          />
          <Pagination
            count={totalPages} // 合計ページ数を使用
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  )
}

export default TableContainerApi
