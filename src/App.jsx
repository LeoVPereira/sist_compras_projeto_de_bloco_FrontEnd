import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, Menu, MenuItem } from '@mui/material';
import FornecedorPage from './pages/FornecedorPage';
import ContatoPage from './pages/ContatoPage';
import ProdutoPage from './pages/ProdutoPage';
import CotacaoPage from './pages/CotacaoPage';
import ConsultaCotacoesPage from './pages/ConsultaCotacoesPage';

const App = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menu, setMenu] = useState('');

    const handleMenuClick = (event, menuType) => {
        setAnchorEl(event.currentTarget);
        setMenu(menuType);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setMenu('');
    };

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Sistema de Compras
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={(event) => handleMenuClick(event, 'cadastrar')}
                    >
                        Cadastrar
                    </Button>
                    <Button
                        color="inherit"
                        onClick={(event) => handleMenuClick(event, 'consultar')}
                    >
                        Consultar
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && menu === 'cadastrar'}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} component={Link} to="/">Fornecedores</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/contatos">Contatos</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/produtos">Produtos</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/cotacoes">Cotações</MenuItem>
                    </Menu>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && menu === 'consultar'}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} component={Link} to="/consulta-cotacoes">Consulta Cotações</MenuItem>
                    </Menu>
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
