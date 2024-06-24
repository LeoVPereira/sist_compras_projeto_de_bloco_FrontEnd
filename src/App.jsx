import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cotacoes from './pages/Cotacoes'
import Home from './pages/Home'
import Contatos from './pages/Contatos'
import Produtos from './pages/Produtos'
import Fornecedores from './pages/Fornecedores'
import Layout from './pages/Layout'
function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path='fornecedores' element={<Fornecedores/>} />
            <Route path='contatos' element={<Contatos/>} />
            <Route path='produtos' element={<Produtos/>} />
            <Route path='Cotacoes' element={<Cotacoes/>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
