import './App.css'
import RootLayout from './Layout/RootLayout'
import { createBrowserRouter, Routes, Route,RouterProvider,createRoutesFromElements } from 'react-router-dom'
import AllExpense from './Pages/AllExpense'
import Home from './Pages/Home'
import New from './Pages/New'
import Categorywise from './Pages/Categorywise'
import  NotFound from './components/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element = {<Home/>}/>
      <Route path='expenses' element={<AllExpense/>} />
      <Route path='new' element={< New/>}/>
      <Route path="/:id/edit" element={<New/>} />
      <Route path="/expenses/category/:category" element={<Categorywise/>} />

       <Route path="*" element={<NotFound />} />
    </Route>
  )
)

function App() {
  
  return(   
    <RouterProvider router = {router}/>
  )
}

export default App
