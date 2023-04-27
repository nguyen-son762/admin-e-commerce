export enum OrderStatusEnums {
  CANCEL = 'CANCEL',
  INCART = 'INCART',
  ORDERING = 'ORDERING',
  PICKING = 'PICKING',
  ORDERED = 'ORDERED',
  DELIVERING = 'DELIVERING',
  DONE = 'DONE'
}

export const statusOptions = [ {
  label: 'Đang trong giỏ hàng',
  value: OrderStatusEnums.INCART
},
{
  label: 'Đang chờ lấy hàng',
  value: OrderStatusEnums.ORDERING
},
{
  label: 'Đã đặt hàng',
  value: OrderStatusEnums.ORDERED
},
{
  label: 'Đang giao hàng',
  value: OrderStatusEnums.DELIVERING
},
{
  label: 'Đã giao',
  value: OrderStatusEnums.DONE
},
{
  label: 'Đã hủy',
  value: OrderStatusEnums.CANCEL
},
]