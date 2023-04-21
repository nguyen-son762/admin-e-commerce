import CustomTable from '@/components/atoms/CustomTable'
import Dropdown from '@/components/atoms/Dropdown'
import DefaultLayout from '@/components/layout/DefaultLayout'
import { getListUser, updateUser } from '@/services/user.service'
import { Column } from '@/types/table.typ'
import { UserDef } from '@/types/user.type'
import { TableCell, TableRow } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

type UserRowDef = {
  _id: string
  name: string
  address: string
  email: string
  phonenumber: string
  status: 'active' | 'inactive'
}

const columns: Column<keyof UserRowDef>[] = [
  { id: 'name', label: 'Tên người dùng', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'address', label: 'Địa chỉ', minWidth: 170 },
  { id: 'phonenumber', label: 'Tên người dùng', minWidth: 170 },
  { id: 'status', label: 'Trạng thái', minWidth: 170 }
]

const User = () => {
  const [listUser, setListUser] = useState<UserDef[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const dataRow = useMemo(() => {
    return listUser.map((user) => {
      return {
        _id: user._id,
        name: user.first_name + ' ' + user.last_name,
        address: user?.address?.length ? user?.address?.[0].city || '' + user?.address?.[0].street : '',
        email: user.email,
        phonenumber: user.phone_number,
        status: user.active ? 'active' : 'inactive'
      }
    })
  }, [listUser])
  useEffect(() => {
    getData()
  }, [])
  const getData = async (page = 1) => {
    setLoading(true)
    getListUser(page)
      .then((data) => {
        setTotal(data.total)
        setListUser(data.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const handleChangeStatus = (value: string, user_id: string) => {
    if (!user_id) {
      return
    }
    updateUser({
      active: value === 'active',
      _id: user_id
    }).catch((err) => {
      console.log(err)
    })
  }
  const onChangePage = (page: number) => {
    getData(page + 1)
  }
  return (
    <DefaultLayout>
      <CustomTable columns={columns} total={total} loading={loading} onChangePage={onChangePage}>
        {dataRow.map((item, index) => {
          return (
            <TableRow hover role='checkbox' tabIndex={-1} key={item.phonenumber || '' + index}>
              <TableCell align='left'>{item.name}</TableCell>
              <TableCell align='left'>{item.email || 'Chưa có email'}</TableCell>
              <TableCell align='left'>{item.address || 'Chưa có địa chỉ'}</TableCell>
              <TableCell align='left'>{item.phonenumber || 'Chưa có số điện thoại'}</TableCell>
              <TableCell align='left'>
                <Dropdown
                  defaultValue={item.status}
                  width={200}
                  dataSource={[
                    {
                      value: 'active',
                      text: 'Đang hoạt động'
                    },
                    {
                      value: 'inactive',
                      text: 'Vô hiệu hóa'
                    }
                  ]}
                  onChange={(e) => handleChangeStatus(e, item._id || '')}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
    </DefaultLayout>
  )
}

export default User
