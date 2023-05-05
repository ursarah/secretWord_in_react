function StartScream({ startGame, startScream }) {
  startGame();
  return (
    <div className="h-screen">
      <h1 className="text-[3.5em]">Secret Word</h1>
      <p className="my-[2em] text-[#ecfa00]">Clique no botão abaixo para começar a jogar</p>
      {/* 2 - Clicando no botão vai executar a função la no aap.jsx  */}
      <button className="btn" onClick={startScream}>
        Começar o jogo
      </button>
    </div>
  );
}

export default StartScream;
