import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../infra/firebase';
import { Link } from 'react-router-dom';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const RequisicoesListPage = () => {
    const [requisicoes, setRequisicoes] = useState([]);

    useEffect(() => {
        const fetchRequisicoes = async () => {
            const querySnapshot = await getDocs(collection(db, "requisicoes"));
            const requisicoesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRequisicoes(requisicoesData.sort((a, b) => new Date(a.data) - new Date(b.data)));
        };

        fetchRequisicoes();
    }, []);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Minhas Requisições de Compras
            </Typography>
            <List>
                {requisicoes.map(requisicao => (
                    <ListItem key={requisicao.id}>
                        <ListItemText
                            primary={`Requisição #${requisicao.id} - Estado: ${requisicao.estado}`}
                            secondary={`Data: ${new Date(requisicao.data).toLocaleDateString()}`}
                        />
                        <Button
                            component={Link}
                            to={`/requisicoes/${requisicao.id}`}
                            variant="contained"
                            color="primary"
                        >
                            Ver Detalhes
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default RequisicoesListPage;
