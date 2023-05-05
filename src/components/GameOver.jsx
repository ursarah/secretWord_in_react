import React from 'react';

function GameOver({ retry }) {
  return (
    <div>
      <button className="btn" onClick={retry}>
        Resetar o jogo
      </button>
    </div>
  );
}

export default GameOver;
