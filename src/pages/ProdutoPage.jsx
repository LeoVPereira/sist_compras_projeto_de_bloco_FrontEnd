import React, { useState } from 'react';
import FormProduto from '../components/FormProduto';

const ProdutoPage = () => {
    const [idEmEdicao, setIdEmEdicao] = useState(null);

    return (
        <div>
            <FormProduto idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
        </div>
    );
};

export default ProdutoPage;
