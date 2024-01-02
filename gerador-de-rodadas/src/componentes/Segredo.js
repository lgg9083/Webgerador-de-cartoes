import React, { useState } from 'react';
import PaginaDados from './Dashboard'; // Importe o componente que deseja renderizar

const PaginaSenha = () => {
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const segredoCorreto = 'batatinhafrita'; // segredo definido

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha === segredoCorreto) {
      //se a senha estiver correta, atualize o estado para autenticado
      setAutenticado(true);
      
      setSenha('');
    } else {
      alert('Senha incorreta! Tente novamente.');
      //se a senha não estiver correta exibira essa 
      setSenha('');
    }
  };

  // Renderize o componente PaginaDados se estiver autenticado
  if (autenticado) {
    return <PaginaDados />;
  }

  return (
    <div>
      <h1>Bem-vindo!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Insira a senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default PaginaSenha;
