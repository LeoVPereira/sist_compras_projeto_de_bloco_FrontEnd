import React, { useState } from 'react';
import FormFornecedor from '../components/FormFornecedor';

const FornecedorPage = () => {
    const [idEmEdicao, setIdEmEdicao] = useState(null);

    return (
        <div>
            <FormFornecedor idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
        </div>
    );
};

export default FornecedorPage;
