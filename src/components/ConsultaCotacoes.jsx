// src/components/ConsultaCotacoes.js

import React, { useState, useEffect } from 'react';
import { TextField, Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const ConsultaCotacoes = () => {
    const [produto, setProduto] = useState('');
    const [cotacoes, setCotacoes] = useState([]);

    useEffect(() => {
        if (produto) {
            // Lógica para obter cotações do produto
            setCotacoes([
                // Exemplo de cotações
                { id: 1, fornecedor: 'Fornecedor 1', data: '2023-06-15', preco: 100 },
                { id: 2, fornecedor: 'Fornecedor 2', data: '2023-06-20', preco: 110 },
            ]);
        } else {
            setCotacoes([]);
        }
    }, [produto]);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Consulta de Cotações</Typography>
            <Box component="form" noValidate>
                <TextField
                    label="Produto"
                    fullWidth
                    margin="normal"
                    value={produto}
                    onChange={(e) => setProduto(e.target.value)}
                />
            </Box>
            {cotacoes.length > 0 && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Fornecedor</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Preço</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cotacoes.map((cotacao) => (
                            <TableRow key={cotacao.id}>
                                <TableCell>{cotacao.fornecedor}</TableCell>
                                <TableCell>{cotacao.data}</TableCell>
                                <TableCell>{cotacao.preco}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Container>
    );
};

export default ConsultaCotacoes;
