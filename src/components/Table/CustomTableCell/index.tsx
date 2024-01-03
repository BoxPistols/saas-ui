import {
  styled,
  TableCell,
  tableCellClasses,
  TableCellProps,
  Tooltip,
  TooltipProps,
} from '@mui/material'
import { SxProps } from '@mui/system'
import { memo, ReactNode, useMemo } from 'react'

type ElementProps = TableCellProps

type Props = ElementProps & {
  children?: ReactNode
  minWidthValue?: number
  maxWidthValue?: number
  ellipsis?: boolean
  noWrap?: boolean
  colSpan?: number
  lineClamp?: number
  showTooltip?: boolean
  cellSx?: SxProps
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit'
  // Tooltip
  tooltipPlacement?: TooltipProps['placement']
  tooltipEnterDelay?: number
  tooltipRadius?: string
  arrow?: boolean
}

// ----- Cell BasicStyle -----
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    "> span:not([class*='MuiIconButton-root'])": {
      whiteSpace: 'nowrap',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    // borderColor: theme.colors.alpha.black[5],
  },
}))

// デフォルトの幅
const defaultMinWidth = 60
const defaultMaxWidth = 240

// テキストを省略するスタイル (lineClamp: 行数)
const ellipsisStyle = ({ lineClamp = 2 }) => ({
  '&.MuiTableCell-root > span': {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lineClamp, // 表示行数
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    cursor: 'pointer',
  },
})

// デフォルトのTableCell
const CustomTableCellComponent = ({
  children,
  minWidthValue = defaultMinWidth,
  maxWidthValue = defaultMaxWidth,
  noWrap,
  colSpan,
  ellipsis = true,
  lineClamp,
  showTooltip = true,
  cellSx,
  tooltipPlacement = 'bottom-start',
  tooltipEnterDelay = 2000,
  tooltipRadius = '4px',
  arrow = true,
  align = 'left',
  ...props
}: Props) => {
  // CellのUIをメモ化
  const cellStyle: SxProps = useMemo(
    () => ({
      whiteSpace: 'normal',
      top: 0,
      wordBreak: noWrap ? 'keep-all' : 'break-word',
      minWidth: minWidthValue,
      maxWidth: maxWidthValue,
      ...(ellipsis && ellipsisStyle({ lineClamp })),
      ...cellSx,
    }),
    [minWidthValue, maxWidthValue, noWrap, ellipsis, lineClamp, cellSx],
  )

  // Tooltipの条件分岐を更新
  const content =
    showTooltip && children ? (
      <Tooltip
        title={children}
        placement={tooltipPlacement}
        enterDelay={tooltipEnterDelay}
        componentsProps={{ tooltip: { sx: { borderRadius: tooltipRadius } } }}
        arrow={arrow}
      >
        <span>{children}</span>
      </Tooltip>
    ) : (
      <span>{children}</span>
    )

  return (
    <StyledTableCell {...props} colSpan={colSpan} sx={cellStyle} align={align}>
      <span>{content}</span>
    </StyledTableCell>
  )
}

export const CustomTableCell = memo(CustomTableCellComponent)

// 編集機能がある時のTableCell
const StyledTableCellAction = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    position: `sticky`,
    top: 0,
    right: 0,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    position: `sticky`,
    top: 0,
    right: 0,
    // borderColor: theme.colors.alpha.black[5],
  },
}))

// アクションがある場合のTableCell
export const CustomTableCellAction = ({ children, ...props }: Props) => {
  return (
    <StyledTableCellAction align="center" sx={{ top: 0 }} {...props}>
      {children}
    </StyledTableCellAction>
  )
}
