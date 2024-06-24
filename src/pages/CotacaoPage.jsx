import React, { useState } from 'react';
import FormCotacao from '../components/FormCotacao';

const CotacaoPage = () => {
    const [idEmEdicao, setIdEmEdicao] = useState(null);

    return (
        <div>
            <FormCotacao idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
        </div>
    );
};

export default CotacaoPage;
