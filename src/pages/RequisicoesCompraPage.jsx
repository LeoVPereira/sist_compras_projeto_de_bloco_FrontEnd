import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../infra/firebase';
import { Box, Button, Typography } from '@mui/material';

const RequisicaoCompraPage = () => {
    const { id } = useParams();
    const [requisicao, setRequisicao] = useState(null);

    useEffect(() => {
        const fetchRequisicao = async () => {
            const docRef = doc(db, "requisicoes", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setRequisicao({ id: docSnap.id, ...docSnap.data() });
            }
        };

        fetchRequisicao();
    }, [id]);

    const handleChangeEstado = async (novoEstado) => {
        const docRef = doc(db, "requisicoes", id);
        await updateDoc(docRef, { estado: novoEstado });
        setRequisicao((prev) => ({ ...prev, estado: novoEstado }));
    };

    if (!requisicao) return <Typography>Carregando...</Typography>;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Detalhes da Requisição #{requisicao.id}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Estado: {requisicao.estado}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Data: {new Date(requisicao.data).toLocaleDateString()}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleChangeEstado('em cotação')}
                disabled={requisicao.estado !== 'aberta'}
            >
                Mover para "Em Cotação"
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleChangeEstado('cotada')}
                disabled={requisicao.estado !== 'em cotação'}
            >
                Mover para "Cotada"
            </Button>
        </Box>
    );
};

export default RequisicaoCompraPage;
