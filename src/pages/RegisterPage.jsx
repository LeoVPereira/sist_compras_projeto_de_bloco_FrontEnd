import React, { useState } from 'react';
import { createUserWithRole } from '../infra/firebase';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('colaborador');

  const handleRegister = async () => {
    try {
      await createUserWithRole(email, password, role);
      alert('Usuário registrado com sucesso!');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div>
      <h2>Registrar</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="colaborador">Colaborador</option>
        <option value="admin">Administrador</option>
      </select>
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default RegisterPage;