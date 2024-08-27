import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { collection, doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from '../infra/firebase';

const FormCotacao = ({ idEmEdicao, setIdEmEdicao }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    useEffect(() => {
        if (idEmEdicao) {
            const fetchData = async () => {
                const docRef = doc(db, "cotacoes", idEmEdicao);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setValue("produto", data.produto);
                    setValue("fornecedor", data.fornecedor);
                    setValue("dataCotacao", data.dataCotacao);
                    setValue("preco", data.preco);
                }
            };
            fetchData();
        } else {
            reset();
        }
    }, [idEmEdicao, reset, setValue]);

    const submeterDados = async (dados) => {
        if (idEmEdicao) {
            await setDoc(doc(db, "cotacoes", idEmEdicao), dados);
        } else {
            await setDoc(doc(collection(db, "cotacoes")), dados);
        }
        reset();
        setIdEmEdicao(null);
    };

    const handleExcluir = async () => {
        if (idEmEdicao) {
            await deleteDoc(doc(db, "cotacoes", idEmEdicao));
        }
        setIdEmEdicao(null);
        reset();
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Cadastro de Cotação</Typography>
            <Box component="form" onSubmit={handleSubmit(submeterDados)} noValidate>
                <TextField
                    label="Produto"
                    fullWidth
                    margin="normal"
                    {...register("produto", { required: "Produto é obrigatório" })}
                    error={!!errors.produto}
                    helperText={errors.produto?.message}
                />
                <TextField
                    label="Fornecedor"
                    fullWidth
                    margin="normal"
                    {...register("fornecedor", { required: "Fornecedor é obrigatório" })}
                    error={!!errors.fornecedor}
                    helperText={errors.fornecedor?.message}
                />
                <TextField
                    label="Data da Cotação"
                    fullWidth
                    margin="normal"
                    type="date"
                    {...register("dataCotacao", { required: "Data da cotação é obrigatória" })}
                    error={!!errors.dataCotacao}
                    helperText={errors.dataCotacao?.message}
                />
                <TextField
                    label="Preço"
                    fullWidth
                    margin="normal"
                    type="number"
                    {...register("preco", { required: "Preço é obrigatório" })}
                    error={!!errors.preco}
                    helperText={errors.preco?.message}
                />
                <Button variant="contained" color="primary" type="submit">Salvar</Button>
                <Button variant="contained" color="secondary" onClick={handleExcluir} sx={{ ml: 2 }}>Excluir</Button>
            </Box>
        </Container>
    );
};

export default FormCotacao;
