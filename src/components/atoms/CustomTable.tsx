import { Column } from '@/types/table.typ'
import { LinearProgress, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Children, FC, ReactNode, memo, useState } from 'react'

const Slot: FC<{
  name: string
  children: ReactNode
}> = () => null

type CustomTableProps = {
  columns: Column[]
  loading?: boolean
  children?: ReactNode
  total: number
  onChangePage:(page:number)=>void
}

const CustomTable = ({ columns, loading, children, total,onChangePage }: CustomTableProps) => {
  const [page, setPage] = useState(0)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    onChangePage(newPage)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        {loading && <LinearProgress color='primary' />}
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  <Typography fontSize={18}>{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        rowsPerPageOptions={[]}
        count={total}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  )
}

export default CustomTable
