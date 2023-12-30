// TableContainerApi.tsx
import React, { useState, useEffect } from 'react'
import GenericTable from './GenericTable'
import ColumnSelector from './ColumnSelector'
import { TableColumn } from './Types'

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(fetchUrl)
        const json = await response.json()
        setData(json.products) // APIのレスポンス形式に応じて変更が必要
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
      setLoading(false)
    }

    fetchData()
  }, [fetchUrl])

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ColumnSelector
            columns={initialColumns}
            hiddenColumns={hiddenColumns}
            setHiddenColumns={setHiddenColumns}
          />
          <GenericTable
            data={data}
            columns={initialColumns}
            hiddenColumns={hiddenColumns}
          />
        </>
      )}
    </div>
  )
}

export default TableContainerApi
