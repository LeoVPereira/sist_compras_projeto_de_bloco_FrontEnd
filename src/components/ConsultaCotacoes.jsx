import React, { useState, useEffect } from 'react';
import { TextField, Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery } from '@mui/material';
import { db } from '../infra/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ConsultaCotacoes = () => {
    const [produto, setProduto] = useState('');
    const [cotacoes, setCotacoes] = useState([]);
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchCotacoes = async () => {
            if (produto) {
                const q = query(collection(db, 'cotacoes'), where('produto', '==', produto));
                const querySnapshot = await getDocs(q);
                const cotacoesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCotacoes(cotacoesData);
            } else {
                setCotacoes([]);
            }
        };

        fetchCotacoes();
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
                <Table size={isMobile ? 'small' : 'medium'}>
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
