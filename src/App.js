import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Category from './Pages/Category'
import SubCategory from './Pages/SubCategory'
import QA from './Pages/QA'
import './App.css';
import Home from './Pages/Home'
import UseContextEx from './Component/UseContextEx'
import FormikAPiCrud from './Component/FormikAPiCrud'
const App = () => {
  return (
    <Routes>
      <Route path='/'> 
     
        <Route index element={<Home />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='category' element={<Category />} />
        <Route path='subcategory' element={<SubCategory />} />
        <Route path='Question' element={<QA />} />
      </Route>
    </Routes>
  //  <FormikAPiCrud/>
  // <UseContextEx></UseContextEx>
  )
}

export default App