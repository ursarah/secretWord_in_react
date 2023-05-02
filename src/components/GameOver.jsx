import React from 'react';

function GameOver({ screenEnd }) {
  return (
    <div>
      <button className="btn" onClick={screenEnd}>
        Resetar o jogo
      </button>
    </div>
  );
}

export default GameOver;
