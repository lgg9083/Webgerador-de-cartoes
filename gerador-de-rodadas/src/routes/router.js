import React, { useState } from 'react';
import PaginaSenha from '../componentes/Segredo';
import CollectionPanel from '../componentes/Dashboard';

const App = () => {
  const [autenticado, setAutenticado] = useState(false);

  const handleLogin = () => {
    //se inserir a senha certa ira autenticar
    setAutenticado(true);
  };

  return (
    <div>
      {!autenticado ? (
        <PaginaSenha onLogin={handleLogin} />
      ) : (
        <CollectionPanel />
      )}
    </div>
  );
};

export default App;
