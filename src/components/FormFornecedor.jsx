// src/components/FormFornecedor.js

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const FormFornecedor = ({ idEmEdicao, setIdEmEdicao }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    useEffect(() => {
        if (idEmEdicao) {
            // Lógica para obter fornecedor existente e preencher o formulário
        } else {
            reset();
        }
    }, [idEmEdicao, reset, setValue]);

    const submeterDados = async (dados) => {
        // Lógica para inserir ou atualizar fornecedor
        reset();
    };

    const handleExcluir = async () => {
        // Lógica para excluir fornecedor
        setIdEmEdicao(null);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Cadastro de Fornecedor</Typography>
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
                    label="CNPJ"
                    fullWidth
                    margin="normal"
                    {...register("cnpj", { required: "CNPJ é obrigatório" })}
                    error={!!errors.cnpj}
                    helperText={errors.cnpj?.message}
                />
                <TextField
                    label="Endereço"
                    fullWidth
                    margin="normal"
                    {...register("endereco", { required: "Endereço é obrigatório" })}
                    error={!!errors.endereco}
                    helperText={errors.endereco?.message}
                />
                <TextField
                    label="Telefone"
                    fullWidth
                    margin="normal"
                    {...register("telefone", { required: "Telefone é obrigatório" })}
                    error={!!errors.telefone}
                    helperText={errors.telefone?.message}
                />
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    {...register("email", { required: "Email é obrigatório" })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <Button variant="contained" color="primary" type="submit">Salvar</Button>
                <Button variant="contained" color="secondary" onClick={handleExcluir} sx={{ ml: 2 }}>Excluir</Button>
            </Box>
        </Container>
    );
};

export default FormFornecedor;
