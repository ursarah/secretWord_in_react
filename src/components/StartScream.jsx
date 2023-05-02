function StartScream({ startGame }) {
  return (
    <div>
      <h1 className="text-[3.5em]">Secret Word</h1>
      <p className="my-[2em] text-[#ecfa00]">Clique no botão abaixo para começar a jogar</p>
      <button className="btn" onClick={startGame}>
        Começar o jogo
      </button>
    </div>
  );
}

export default StartScream;
