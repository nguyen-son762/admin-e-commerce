import { OrderStatusEnums, statusOptions } from '@/constants/order.constants'
import { OrderDef } from '@/types/order.type'
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { FC, useState } from 'react'

type StatusSelectProps = {
  value: OrderStatusEnums
  onChangeStatus: (event: SelectChangeEvent<OrderStatusEnums>, item: OrderDef) => void
  order: OrderDef
}

const StatusSelect: FC<StatusSelectProps> = ({ value, onChangeStatus, order }) => {
  const [valInput, setValInput] = useState<OrderStatusEnums>(value)
  const handleChangeStatus = (event: SelectChangeEvent<OrderStatusEnums>) => {
    onChangeStatus(event, order)
    setValInput(event.target.value as OrderStatusEnums)
  }
  return (
    <FormControl fullWidth>
      <Select labelId='demo-simple-select-label' id='demo-simple-select' value={valInput} onChange={handleChangeStatus}>
        {statusOptions.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default StatusSelect
