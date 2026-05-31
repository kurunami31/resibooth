import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './components/PublicLayout'
import AdminLayout from './components/AdminLayout'
import Welcome from './pages/public/Welcome'
import Landing from './pages/public/Landing'
import Packages from './pages/public/Packages'
import Copies from './pages/public/Copies'
import Payment from './pages/public/Payment'
import Confirm from './pages/public/Confirm'
import Camera from './pages/public/Camera'
import LayoutPage from './pages/public/LayoutPage'
import Printing from './pages/public/Printing'
import Done from './pages/public/Done'
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import AdminPackages from './pages/admin/AdminPackages'
import Transactions from './pages/admin/Transactions'
import Printer from './pages/admin/Printer'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/copies" element={<Copies />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/layout" element={<LayoutPage />} />
          <Route path="/printing" element={<Printing />} />
          <Route path="/done" element={<Done />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminLogin />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="packages" element={<AdminPackages />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="printer" element={<Printer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
