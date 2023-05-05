import React from 'react';

function GameOver({ retry, score }) {
  return (
    <div className="h-screen">
      <h1 className="text-[3.5em]">Fim de Jogo</h1>
      <p className=" flex flex-col items-center justify-center my-[2em] md:text-[20px]">
        A sua pontuação foi: <span className="text-[#ecfa00] font-bold text-[40px]">{score}</span>
      </p>
      <button className="btn" onClick={retry}>
        Resetar o jogo
      </button>
    </div>
  );
}

export default GameOver;
