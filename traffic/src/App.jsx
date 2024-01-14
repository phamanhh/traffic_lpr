import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import MainLayout from './layouts/MainLayout'
import Admin from './pages/Admin'
import UserInfo from './pages/UserInfo'
import SearchInfomation from './pages/SearchInfomation'
import TrafficTracking from './pages/TrafficTracking'
import ViolationInfo from './pages/ViolationInfo'
import ViolationStatistic from './pages/ViolationStatistic'
import UsersManager from './pages/UsersManager'
import Welcome from './pages/Welcome'

function App() {


  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Login />} />
          <Route path='/admin' element={<Admin />}>
            <Route index element={<Welcome />} />
            <Route path='user-info' element={<UserInfo />} />
            <Route path='search-information' element={<SearchInfomation />} />
            <Route path='traffic-tracking' element={<TrafficTracking />} />
            <Route path='violation-info' element={<ViolationInfo />} />
            <Route path='violation-statistics' element={<ViolationStatistic />} />
            <Route path='users-manage' element={<UsersManager />} />
          </Route>
        </Route>
      </Routes>

    </>
  )
}

export default App
