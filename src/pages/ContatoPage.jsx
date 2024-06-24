import React, { useState } from 'react';
import FormContato from '../components/FormContato';

const ContatoPage = () => {
    const [idEmEdicao, setIdEmEdicao] = useState(null);

    return (
        <div>
            <FormContato idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
        </div>
    );
};

export default ContatoPage;
