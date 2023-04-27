import { api } from '@/api/api'
import { UserDef } from '@/types/user.type'

export const getTotalUser = async () => {
  const result = await api.get('auth/total')
  return result.data
}

export const getListUser = async (page = 1) => {
  const result = await api.get('auth/list', {
    params: {
      page
    }
  })
  return result.data
}

export const updateUser = async(params: Partial<UserDef>)=>{
  const result = await api.patch('auth/update',params)
  return result.data
}

type LoginByAdminParams = {
  username: string
  password: string
}

export const loginByAmin = async (params: LoginByAdminParams)=>{
  const result = await api.post('auth/admin/login',params)
  return result.data
}