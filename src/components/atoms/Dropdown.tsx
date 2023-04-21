import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import React, { FC, useState } from 'react'

type DropdownProps = {
  defaultValue: string
  dataSource: {
    text: string
    value: string
  }[]
  width: number
  onChange: (value: string) => void
}

const Dropdown: FC<DropdownProps> = ({ defaultValue, dataSource, onChange, width }) => {
  const [value, setValue] = useState(defaultValue)
  const handleChange = (e: SelectChangeEvent<string>) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }
  return (
    <Select
      labelId='demo-select-small'
      id='demo-select-small'
      value={value}
      onChange={(e) => handleChange(e)}
      size='small'
      style={{
        width
      }}
    >
      {dataSource.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          <Typography>{item.text}</Typography>
        </MenuItem>
      ))}
    </Select>
  )
}

export default Dropdown
