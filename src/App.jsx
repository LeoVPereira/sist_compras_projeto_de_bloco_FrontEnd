// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import FornecedorPage from './pages/FornecedorPage';
import ContatoPage from './pages/ContatoPage';
import ProdutoPage from './pages/ProdutoPage';
import CotacaoPage from './pages/CotacaoPage';
import ConsultaCotacoesPage from './pages/ConsultaCotacoesPage';

const App = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Sistema de Compras
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Fornecedores</Button>
                    <Button color="inherit" component={Link} to="/contatos">Contatos</Button>
                    <Button color="inherit" component={Link} to="/produtos">Produtos</Button>
                    <Button color="inherit" component={Link} to="/cotacoes">Cotações</Button>
                    <Button color="inherit" component={Link} to="/consulta-cotacoes">Consulta Cotações</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Box my={4}>
                    <Routes>
                        <Route path="/" element={<FornecedorPage />} />
                        <Route path="/contatos" element={<ContatoPage />} />
                        <Route path="/produtos" element={<ProdutoPage />} />
                        <Route path="/cotacoes" element={<CotacaoPage />} />
                        <Route path="/consulta-cotacoes" element={<ConsultaCotacoesPage />} />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );
};

export default App;
