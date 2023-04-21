import React, { FC, ReactNode } from 'react'
import SideBar from './SideBar'
import { Box } from '@mui/material'

type DefaultLayoutProps = {
  children: ReactNode
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div>
      <SideBar>
        <Box mt={10}>{children}</Box>
      </SideBar>
    </div>
  )
}

export default DefaultLayout
