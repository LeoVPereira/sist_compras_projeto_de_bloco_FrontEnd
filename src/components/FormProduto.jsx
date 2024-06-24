// src/components/FormProduto.js

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const FormProduto = ({ idEmEdicao, setIdEmEdicao }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    useEffect(() => {
        if (idEmEdicao) {
            // Lógica para obter produto existente e preencher o formulário
        } else {
            reset();
        }
    }, [idEmEdicao, reset, setValue]);

    const submeterDados = async (dados) => {
        // Lógica para inserir ou atualizar produto
        reset();
    };

    const handleExcluir = async () => {
        // Lógica para excluir produto
        setIdEmEdicao(null);
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
