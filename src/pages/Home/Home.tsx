import DefaultLayout from '@/components/layout/DefaultLayout'
import { getOrdersByYear } from '@/services/order.service'
import { OrderDef } from '@/types/order.type'
import { useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import dayjs from 'dayjs'
import { OrderStatusEnums } from '@/constants/order.constants'
import { Box, Typography } from '@mui/material'
import { useStyles } from './Home.style'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Person3Icon from '@mui/icons-material/Person3'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import { getTotalUser } from '@/services/user.service'

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Thống kê doanh thu'
    }
  }
}

const labels = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12'
]

const year = 2023

const Home = () => {
  const [orders, setOrders] = useState<OrderDef[]>([])
  const [totalUser, setTotalUser] = useState(0)
  const classes = useStyles()
  useEffect(() => {
    const startDate = dayjs(`01-01-2023`).format('MM-DD-YYYY')
    const endDate = dayjs(`12-31-2024`).format('MM-DD-YYYY')
    getOrdersByYear({
      from: startDate,
      to: endDate
    })
      .then((data) => {
        setOrders(data.data)
        const month = dayjs(data.data[0].createdAt).format('MM')
      })
      .catch((err) => {
        console.warn(err)
      })
    getTotalUser().then((data) => {
      setTotalUser(data.total)
    })
  }, [])
  const dataSource = useMemo(() => {
    const data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    if(orders && orders.length){
      orders.forEach((order) => {
        if (order.status === OrderStatusEnums.DONE) {
          const month = dayjs(order.createdAt).format('MM')
          const model = order.product.models.find((item) => item._id === order.model)
          data[Number(month) - 1] += order.amount + model!.price
        }
      })
    }
    return {
      labels,
      datasets: [
        {
          label: 'Doanh thu',
          data,
          backgroundColor: '#ee4d2d'
        }
      ]
    }
  }, [orders])
  const totalRevenue = useMemo(() => {
    if(!orders){
      return 0
    }
    return orders.reduce((prev, current) => {
      if (current.status === OrderStatusEnums.DONE) {
        return prev + current.amount * current.product.price
      }
      return prev
    }, 0)
  }, [orders])

  return (
    <DefaultLayout>
      <Box width='100%'>
        <Box display='flex' gap={4}>
          <Box className={classes.cardOrder}>
            <Box
              width={64}
              height={64}
              className={classes.cardIcon}
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <ShoppingCartIcon fontSize='large' />
            </Box>
            <Typography color='rgb(4, 41, 122)' variant='h4' fontWeight='bold' textAlign='center'>
              {orders.length}
            </Typography>
            <Typography color='rgb(4, 41, 122)' variant='h6' fontWeight='bold' textAlign='center'>
              Đơn hàng
            </Typography>
          </Box>
          <Box className={classes.cardOrdered}>
            <Box
              width={64}
              height={64}
              className={classes.cardIcon}
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <LocalMallIcon fontSize='large' />
            </Box>
            <Typography color='rgb(6, 27, 100)' variant='h4' fontWeight='bold' textAlign='center'>
              {orders.filter((item) => item.status === OrderStatusEnums.DONE).length}
            </Typography>
            <Typography color='rgb(6, 27, 100)' variant='h6' fontWeight='bold' textAlign='center'>
              Đơn hàng đã thanh toán
            </Typography>
          </Box>
          <Box className={classes.cardUser}>
            <Box
              width={64}
              height={64}
              className={classes.cardIcon}
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <Person3Icon fontSize='large' />
            </Box>
            <Typography color='rgb(122, 12, 46)' variant='h4' fontWeight='bold' textAlign='center'>
              {totalUser}
            </Typography>
            <Typography color='rgb(122, 12, 46)' variant='h6' fontWeight='bold' textAlign='center'>
              Người dùng
            </Typography>
          </Box>
          <Box className={classes.cardRevenue}>
            <Box
              width={64}
              height={64}
              className={classes.cardIcon}
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <LocalAtmIcon fontSize='large' />
            </Box>
            <Typography color='rgb(122, 79, 1)' variant='h4' fontWeight='bold' textAlign='center'>
              {totalRevenue.toLocaleString()}đ
            </Typography>
            <Typography color='rgb(122, 79, 1)' variant='h6' fontWeight='bold' textAlign='center'>
              Doanh thu
            </Typography>
          </Box>
        </Box>
        <Bar
          options={options}
          data={dataSource}
          style={{
            width: '100%',
            maxHeight: 800
          }}
        />
      </Box>
    </DefaultLayout>
  )
}

export default Home
