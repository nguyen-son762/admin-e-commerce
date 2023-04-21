import { api } from "@/api/api"

type GetProductsParams = {
    page?: number
    keyword?: number
    from: string
    to: string
}

export const getProducts =async (params:GetProductsParams)=>{
    const result =await api.get('product',{
        params
    })
    return result.data
}