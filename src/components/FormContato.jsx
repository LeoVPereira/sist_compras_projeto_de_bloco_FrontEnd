import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { collection, doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from '../infra/firebase';

const FormContato = ({ idEmEdicao, setIdEmEdicao }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    useEffect(() => {
        if (idEmEdicao) {
            const fetchData = async () => {
                const docRef = doc(db, "contatos", idEmEdicao);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setValue("nome", data.nome);
                    setValue("email", data.email);
                    setValue("telefone", data.telefone);
                    setValue("cargo", data.cargo);
                }
            };
            fetchData();
        } else {
            reset();
        }
    }, [idEmEdicao, reset, setValue]);

    const submeterDados = async (dados) => {
        if (idEmEdicao) {
            await setDoc(doc(db, "contatos", idEmEdicao), dados);
        } else {
            await setDoc(doc(collection(db, "contatos")), dados);
        }
        reset();
        setIdEmEdicao(null);
    };

    const handleExcluir = async () => {
        if (idEmEdicao) {
            await deleteDoc(doc(db, "contatos", idEmEdicao));
        }
        setIdEmEdicao(null);
        reset();
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Cadastro de Contato</Typography>
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
                    label="Email"
                    fullWidth
                    margin="normal"
                    {...register("email", { required: "Email é obrigatório" })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
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
                    label="Cargo"
                    fullWidth
                    margin="normal"
                    {...register("cargo", { required: "Cargo é obrigatório" })}
                    error={!!errors.cargo}
                    helperText={errors.cargo?.message}
                />
                <Button variant="contained" color="primary" type="submit">Salvar</Button>
                <Button variant="contained" color="secondary" onClick={handleExcluir} sx={{ ml: 2 }}>Excluir</Button>
            </Box>
        </Container>
    );
};

export default FormContato;
