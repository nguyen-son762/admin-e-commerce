import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import Order from './pages/Order/Order'
import User from './pages/User/User'
import { pathsEnum } from './constants/path.constant'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import Login from './pages/Login/Login'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path={pathsEnum.ORDER} element={<Order />} />
            <Route path={pathsEnum.USER} element={<User />} />
            <Route path={pathsEnum.LOGIN} element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
