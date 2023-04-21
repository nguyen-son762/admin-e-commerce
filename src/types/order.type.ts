import { OrderStatusEnums } from '@/constants/order.constants'
import { UserDef } from './user.type'

export type Category = {
  _id: string
  name: string
}

export type ModelDef = {
  _id: string
  name: string
  price: number
  promotion: number
  images: string
}

export type TierVariation = {
  name: string
  options: string[]
  images: string[] | null
}

export type ItemRating = {
  rating_count: number[]
  rating_star: number
}
export type ProductDef = {
  _id: string
  category: Category
  name: string
  price: number
  images: string[]
  description: string
  thumb_url: string
  models: ModelDef[]
  price_before_discount: number
  price_max: number
  price_max_before_discount: number
  price_min: number
  price_min_before_discount: number
  raw_discount: number
  tier_variations: TierVariation[]
  item_rating: ItemRating
}

export type OrderDef = {
  _id: string
  user?: UserDef
  product: ProductDef
  model: string
  phonenumber: string
  address: string
  promotion_code?: string
  note?: string
  status: OrderStatusEnums
  amount: number
  createdAt: string
  updatedAt: string
}
