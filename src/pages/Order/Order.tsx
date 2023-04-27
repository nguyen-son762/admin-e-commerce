import { useEffect, useState } from 'react'
import CustomTable from '@/components/atoms/CustomTable'
import DefaultLayout from '@/components/layout/DefaultLayout'
import { getOrdersByYear, updateStatus } from '@/services/order.service'
import { OrderDef } from '@/types/order.type'
import { Column } from '@/types/table.typ'
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TableCell,
  TableRow,
  TextField
} from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { DateRange } from '@mui/x-date-pickers-pro'
import { OrderStatusEnums, statusOptions } from '@/constants/order.constants'
import { useSnackbar } from 'notistack'
import StatusSelect from './components/StatusSelect'

type OrderRowDef = {
  _id: string
  name: string
  image: string
  price: number
  amount: number
  user: string
  phonenumber: string
  created_at: string
  status: string
}

const columns: Column<keyof OrderRowDef>[] = [
  { id: 'name', label: 'Tên sản phẩm' },
  { id: 'image', label: 'Hình ảnh' },
  { id: 'price', label: 'Giá' },
  { id: 'amount', label: 'Số lượng' },
  { id: 'user', label: 'Người đặt' },
  { id: 'phonenumber', label: 'Số điện thoại' },
  { id: 'created_at', label: 'Ngày đặt' },
  { id: 'status', label: 'Trạng thái' }
]

const Order = () => {
  const [orders, setOrders] = useState<OrderDef[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<DateRange<Dayjs>>([dayjs(new Date('2020-01-01')), dayjs(new Date())])
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    getData(1)
  }, [])
  const getData = (page: number, from = date[0], to = date[1]) => {
    setLoading(true)
    if (!from || !to) {
      return
    }
    console.warn(from.format('YYYY-MM-DD'))
    getOrdersByYear({ page: 1, from: from.format('YYYY-MM-DD'), to: to.format('YYYY-MM-DD') })
      .then((data) => {
        setOrders(data.data)
        setTotal(data.total)
      })
      .finally(() => setLoading(false))
  }
  const onChangePage = (page: number) => {
    getData(page)
  }
  const filterOrders = () => {
    getData(1, date[0], date[1])
  }
  const onChangeStatus = (event: SelectChangeEvent<OrderStatusEnums>, item: OrderDef) => {
    updateStatus({
      status: event.target.value as OrderStatusEnums,
      order_id: item._id
    })
      .then(() => {
        enqueueSnackbar('Cập nhật thành công', {
          variant: 'success'
        })
      })
      .catch(() => {
        enqueueSnackbar('Cập nhật thất bại', {
          variant: 'error'
        })
      })
  }

  return (
    <DefaultLayout>
      <Box display='flex' alignItems='end' gap={5} mb={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
            <DemoItem label='Ngày bắt đầu - Ngày kết thúc' component='DateRangePicker'>
              <DateRangePicker value={date} onChange={(newValue) => setDate(newValue)} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          label='Từ khóa'
          sx={{
            width: 400
          }}
          variant='standard'
        />
        <Button
          variant='contained'
          sx={{
            height: 40,
            whiteSpace: 'nowrap'
          }}
          onClick={filterOrders}
        >
          Tìm kiếm
        </Button>
      </Box>
      <CustomTable columns={columns} total={total} loading={loading} onChangePage={onChangePage}>
        {orders.map((item, index) => {
          return (
            <TableRow hover role='checkbox' tabIndex={-1} key={item._id}>
              <TableCell align='left'>{item.product.models.find((p) => p._id === item.model)?.name}</TableCell>
              <TableCell align='left'>
                <img
                  src={`https://down-vn.img.susercontent.com/file/${
                    item.product.models.find((p) => p._id === item.model)?.images
                  }`}
                  style={{
                    width: 150,
                    height: 100,
                    objectFit: 'cover'
                  }}
                  alt=''
                />
              </TableCell>
              <TableCell align='left'>{item.address}</TableCell>
              <TableCell align='left'>{item.amount}</TableCell>
              <TableCell align='left'>
                {item.user?.first_name} {item.user?.last_name}
              </TableCell>
              <TableCell align='left'>{item.user?.phone_number || 'Chưa có số điện thoại'}</TableCell>
              <TableCell align='left'>
                <p
                  style={{
                    whiteSpace: 'nowrap'
                  }}
                >
                  {dayjs(item.createdAt).format('MM-DD-YYYY')}
                </p>
              </TableCell>
              <TableCell align='left'>
                <StatusSelect value={item.status} order={item} onChangeStatus={onChangeStatus} />
              </TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
    </DefaultLayout>
  )
}

export default Order
