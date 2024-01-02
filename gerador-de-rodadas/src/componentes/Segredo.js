import React, { useState } from 'react';

const PaginaSenha = () => {
  const [senha, setSenha] = useState('');
  const segredoCorreto = 'batatinhafrita'; //  segredo que definido

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha === segredoCorreto) {
      //Se a senha estiver correta, sera redirecionado para proxima pag
      
      window.location.href = 'http://localhost:3000/dashboard';
    } else {
      alert('Senha incorreta! Tente novamente.');
      //Se a senha estiver incorreta, você pode exibir uma mensagem de erro ou limpar o campo de senha
      setSenha('');
    }
  };

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
