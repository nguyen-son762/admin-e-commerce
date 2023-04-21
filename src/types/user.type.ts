interface AddressDef {
  name: string
  phone_number: string
  city: string
  street: string
  default: boolean
}

export interface UserDef {
  _id?: string
  platform_id?: string
  username?: string
  first_name?: string
  last_name?: string
  email?: string
  password: string
  avatar_url?: string
  phone_number?: string
  refresh_token?: string
  address?: AddressDef[]
  active?: boolean
  otp?: string
  liked?: {
    model_id: string
    product: string
  }[]
}

export type GetListUserResponse = {
  data: UserDef[]
  page: number
  limit: number
  totalPage: number
  total: number
}
