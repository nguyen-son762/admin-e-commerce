import { api } from '@/api/api'
import { OrderStatusEnums } from '@/constants/order.constants'

type GetOrderParams = {
  from: string
  to: string
  status?: OrderStatusEnums
  page?: number
}

export const getOrdersByYear = async (params: GetOrderParams) => {
  const { from, to, status, page } = params
  const result = await api.get('order', {
    params: {
      from,
      to,
      status,
      page
    }
  })
  return result.data
}
