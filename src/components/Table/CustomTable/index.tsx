import { Table } from '@mui/material'
import { SxProps } from '@mui/system'
import { ReactNode, TableHTMLAttributes } from 'react'
/* Omitが無いとchildren内のTableCell要素の警告が出る */

type ElementProps = Omit<TableHTMLAttributes<HTMLTableElement>, keyof Props>

/**
 * @caption: テーブルフッター（左下）に付与する説明文のオプション
 */
type Props = {
  children?: ReactNode
  caption?: string
  sx?: SxProps
}

export const CustomTable: React.FC<Props & ElementProps> = ({
  children,
  caption,
  sx,
  ...props
}: Props & ElementProps) => {
  return (
    <Table stickyHeader {...props} sx={sx}>
      {caption && <caption>{caption}</caption>}
      {children}
    </Table>
  )
}
