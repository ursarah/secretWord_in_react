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
    // 4.2 - O valor que foi digitado vem para ca, e essa função é executada la no app
    verifyLetters(letter);
    setLetter('');

    // O imput continua focado
    letterInputRef.current.focus();
  };

  return (
    <div className="h-full">
      <p className="my-[3px]">
        <span className="font-bold">Pontuação: {score}</span>
      </p>
      <h1 className="text-[2.5rem]">Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra:
        <span className="text-[#ecfa00] font-bold"> {pickedCategory.toUpperCase()}</span>
      </h3>
      <p className="m-[10px] text-[#ecfa00] font-bold">Usem espaços e acentos</p>
      {letters.length >= 6 ? (
        <div className="flex flex-wrap justify-center m-[1em] p-[.6em] border-[20px] border-solid border-[#ecfa00]">
          {letters.map((letter, i) =>
            guessedLetters.includes(letter) ? (
              <span key={i} className="space md:h-[100px] md:w-[100px] md:text-[70px]">
                {letter}
              </span>
            ) : (
              <span key={i} className="space md:h-[100px] md:w-[100px] md:text-[70px]"></span>
            )
          )}
        </div>
      ) : (
        <div className="flex justify-center m-[1em] p-[.6em] border-[20px] border-solid border-[#ecfa00]">
          {letters.map((letter, i) =>
            guessedLetters.includes(letter) ? (
              <span key={i} className="space md:h-[100px] md:w-[100px] md:text-[70px]">
                {letter}
              </span>
            ) : (
              <span key={i} className="space md:h-[100px] md:w-[100px] md:text-[70px]"></span>
            )
          )}
        </div>
      )}
      <div className="letterContainer">
        <p>Faltam {guesses} tentativas</p>
        <p className="mb-[1.2em]">Tente adivinhar uma letra da palavra:</p>
        <form
          className="flex flex-col items-center justify-between mb-[20px] md:flex-row md:justify-center"
          onSubmit={handleSubmit}
        >
          <input
            className="mb-[1em] h-[50px] w-[50px] text-[2em] text-center text-black md:mt-[20px] md:mr-[1em]"
            type="text"
            name="letter"
            maxLength="1"
            // 4.1 - pego o valor que foi digitado
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
