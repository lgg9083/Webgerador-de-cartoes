export const gerarMesas = (qtdMesas) => {
    const mesas = [];
    for (let i = 1; i <= qtdMesas; i++) {
      if (qtdMesas > 0) {
        mesas.push(`Mesa ${i}`);
      }
    }
    return mesas;
  };