import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { collection, doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from '../infra/firebase';

const FormFornecedor = ({ idEmEdicao, setIdEmEdicao }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    useEffect(() => {
        if (idEmEdicao) {
            const fetchData = async () => {
                const docRef = doc(db, "fornecedores", idEmEdicao);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setValue("nome", data.nome);
                    setValue("cnpj", data.cnpj);
                    setValue("endereco", data.endereco);
                    setValue("telefone", data.telefone);
                    setValue("email", data.email);
                }
            };
            fetchData();
        } else {
            reset();
        }
    }, [idEmEdicao, reset, setValue]);

    const submeterDados = async (dados) => {
        if (idEmEdicao) {
            await setDoc(doc(db, "fornecedores", idEmEdicao), dados);
        } else {
            await setDoc(doc(collection(db, "fornecedores")), dados);
        }
        reset();
        setIdEmEdicao(null);
    };

    const handleExcluir = async () => {
        if (idEmEdicao) {
            await deleteDoc(doc(db, "fornecedores", idEmEdicao));
        }
        setIdEmEdicao(null);
        reset();
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
    