// src/components/FormProduto.js

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { collection, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../infra/firebase'; // Importando o Firestore

const FormProduto = ({ idEmEdicao, setIdEmEdicao }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    useEffect(() => {
        if (idEmEdicao) {
            // Lógica para obter produto existente e preencher o formulário
            const fetchProduto = async () => {
                const produtoRef = doc(db, "produtos", idEmEdicao);
                const produtoSnap = await getDoc(produtoRef);
                if (produtoSnap.exists()) {
                    const data = produtoSnap.data();
                    setValue("nome", data.nome);
                    setValue("descricao", data.descricao);
                    setValue("codigo", data.codigo);
                    setValue("categoria", data.categoria);
                    setValue("preco", data.preco);
                }
            };
            fetchProduto();
        } else {
            reset();
        }
    }, [idEmEdicao, reset, setValue]);

    const submeterDados = async (dados) => {
        if (idEmEdicao) {
            // Atualizar produto existente
            const produtoRef = doc(db, "produtos", idEmEdicao);
            await updateDoc(produtoRef, dados);
        } else {
            // Adicionar novo produto
            await addDoc(collection(db, "produtos"), dados);
        }
        reset();
        setIdEmEdicao(null);
    };

    const handleExcluir = async () => {
        if (idEmEdicao) {
            const produtoRef = doc(db, "produtos", idEmEdicao);
            await deleteDoc(produtoRef);
            setIdEmEdicao(null);
        }
        reset();
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Cadastro de Produto</Typography>
            <Box component="form" onSubmit={handleSubmit(submeterDados)} noValidate>
                <TextField
                    label="Nome"
                    fullWidth
                    margin="normal"
                    {...register("nome", { required: "Nome é obrigatório" })}
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                />
                <TextField
                    label="Descrição"
                    fullWidth
                    margin="normal"
                    {...register("descricao", { required: "Descrição é obrigatória" })}
                    error={!!errors.descricao}
                    helperText={errors.descricao?.message}
                />
                <TextField
                    label="Código"
                    fullWidth
                    margin="normal"
                    {...register("codigo", { required: "Código é obrigatório" })}
                    error={!!errors.codigo}
                    helperText={errors.codigo?.message}
                />
                <TextField
                    label="Categoria"
                    fullWidth
                    margin="normal"
                    {...register("categoria", { required: "Categoria é obrigatória" })}
                    error={!!errors.categoria}
                    helperText={errors.categoria?.message}
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

export default FormProduto;
