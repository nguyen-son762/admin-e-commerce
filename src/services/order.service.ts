import { api } from '@/api/api'
import { OrderStatusEnums } from '@/constants/order.constants'

type GetOrderParams = {
  from: string
  to: string
  status?: OrderStatusEnums
  page?: number
}

type UpdateOrderStatus = {
  status: OrderStatusEnums
  order_id: string
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

export const updateStatus = async (params: UpdateOrderStatus) => {
  const result = await api.post(`order/status`, {
    status: params.status,
    order_id: params.order_id
  })
  return result.data
}
