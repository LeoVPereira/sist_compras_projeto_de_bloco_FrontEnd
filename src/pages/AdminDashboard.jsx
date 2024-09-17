import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../infra/firebase';

const AdminDashboard = () => {
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    const fetchColaboradores = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setColaboradores(usersData);
    };

    fetchColaboradores();
  }, []);

  const handleBlockUser = async (id, blocked) => {
    await updateDoc(doc(db, 'users', id), {
      blocked: !blocked
    });

    setColaboradores((prev) =>
      prev.map((colab) => (colab.id === id ? { ...colab, blocked: !blocked } : colab))
    );
  };

  return (
    <div>
      <h2>Painel do Administrador</h2>
      <ul>
        {colaboradores.map((colab) => (
          <li key={colab.id}>
            {colab.email} - {colab.role} - {colab.blocked ? 'Bloqueado' : 'Ativo'}
            <button onClick={() => handleBlockUser(colab.id, colab.blocked)}>
              {colab.blocked ? 'Desbloquear' : 'Bloquear'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;