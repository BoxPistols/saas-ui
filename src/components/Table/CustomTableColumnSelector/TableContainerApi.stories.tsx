// TableContainerApi.stories.tsx
import React, { useState, useEffect } from 'react'
import TableContainerApi from './TableContainerApi'
import { TableColumn } from './Types'

export default {
  title: 'Component/Table/TableContainerApi',
  component: TableContainerApi,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `TableContainerApiは、APIからデータを非同期で取得したテーブル表示に、カラムの表示・非表示を設定する機能を追加したコンポーネントです。`,
      },
    },
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      defaultValue: 1,
    },
  },
}

// 実際のデータに基づいてカラムを動的に生成する関数
const createColumnsFromData = (data: any[]) => {
  if (data.length === 0) return []

  // データの最初の要素からフィールドを抽出してカラムを生成
  const fields = Object.keys(data[0])
  return fields.map(field => ({
    field: field,
    headerName: field.charAt(0).toUpperCase() + field.slice(1),
  }))
}

// @ts-ignore
export const Default = () => {
  const [columns, setColumns] = useState<TableColumn<any>[]>([])

  useEffect(() => {
    // データを取得してカラムを設定
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        const newColumns = createColumnsFromData(data.products)
        setColumns(newColumns)
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <TableContainerApi<any>
      fetchUrl="https://dummyjson.com/products"
      initialColumns={columns}
      // {...args}
    />
  )
}
