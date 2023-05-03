import { useRef, useState } from 'react';

function Game({
  verifyLetters,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) {
  const [letter, setLetter] = useState('');
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetters(letter);

    setLetter('');

    // O imput continua focado
    letterInputRef.current.focus();
  };

  return (
    <div>
      <p className="m-[20px]">
        <span className="font-bold">Pontuação: {score}</span>
      </p>
      <h1 className="text-[2.5rem]">Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra:{' '}
        <span className="text-[#ecfa00] text-bold">{pickedCategory.toUpperCase()}</span>
      </h3>
      <div className="flex m-[1.5em] p-[1.5em] border-[20px] border-solid border-[#ecfa00]">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="space">
              {letter}
            </span>
          ) : (
            <span key={i} className="space"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Faltam {guesses} tentativas</p>
        <p className="mb-[1.2em]">Tente adivinhar uma letra da palavra:</p>
        <form className="flex items-center justify-center mb-[10px]" onSubmit={handleSubmit}>
          <input
            className="h-[50px] w-[50px] text-[2em] text-center mr-[1em] text-black"
            type="text"
            name="letter"
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            // como se desse um query select
            ref={letterInputRef}
            required
          />
          <button className="btn" onClick={handleSubmit}>
            Jogar
          </button>
        </form>
      </div>
      <div className="wrongLetterContainer">
        <p>Letras ja utilizadas</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter} - </span>
        ))}
      </div>
    </div>
  );
}

export default Game;
