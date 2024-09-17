import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, Menu, MenuItem } from '@mui/material';
import FornecedorPage from './pages/FornecedorPage';
import ContatoPage from './pages/ContatoPage';
import ProdutoPage from './pages/ProdutoPage';
import CotacaoPage from './pages/CotacaoPage';
import ConsultaCotacoesPage from './pages/ConsultaCotacoesPage';
import RequisicoesPage from './pages/RequisicoesPage';
import LoginPage from './pages/LoginPage';
import CriarContaPage from './pages/CriarContaPage';
import { auth } from './infra/firebase'; // Importa o Firebase para autenticação

const App = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menu, setMenu] = useState('');
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Verifica se o usuário é um Administrador
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                // Aqui deve-se verificar no banco se o usuário é Admin, simplificado para fins de exemplo
                setIsAdmin(user.email === 'admin@sistema.com'); // Exemplo de validação de Admin
            } else {
                setUser(null);
                setIsAdmin(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleMenuClick = (event, menuType) => {
        setAnchorEl(event.currentTarget);
        setMenu(menuType);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setMenu('');
    };

    const handleLogout = () => {
        auth.signOut();
        setUser(null);
    };

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Sistema de Compras
                    </Typography>
                    {user ? (
                        <>
                            {isAdmin && (
                                <Button
                                    color="inherit"
                                    onClick={(event) => handleMenuClick(event, 'cadastrar')}
                                >
                                    Cadastrar
                                </Button>
                            )}
                            <Button
                                color="inherit"
                                onClick={(event) => handleMenuClick(event, 'consultar')}
                            >
                                Consultar
                            </Button>
                            {isAdmin && (
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
                            )}
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl) && menu === 'consultar'}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose} component={Link} to="/consulta-cotacoes">Consulta Cotações</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to="/requisicoes">Requisições de Compras</MenuItem>
                            </Menu>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/criar-conta">Criar Conta</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Container>
                <Box my={4}>
                    <Routes>
                        <Route path="/" element={isAdmin ? <FornecedorPage /> : <Navigate to="/login" />} />
                        <Route path="/contatos" element={isAdmin ? <ContatoPage /> : <Navigate to="/login" />} />
                        <Route path="/produtos" element={isAdmin ? <ProdutoPage /> : <Navigate to="/login" />} />
                        <Route path="/cotacoes" element={isAdmin ? <CotacaoPage /> : <Navigate to="/login" />} />
                        <Route path="/consulta-cotacoes" element={user ? <ConsultaCotacoesPage /> : <Navigate to="/login" />} />
                        <Route path="/requisicoes" element={user ? <RequisicoesPage /> : <Navigate to="/login" />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/criar-conta" element={<CriarContaPage />} />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );
};

export default App;
