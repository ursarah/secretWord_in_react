import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

// Data
import { wordsList } from './data/word.js';

// Components
import Game from './components/Game';
import GameOver from './components/GameOver';
import StartScream from './components/StartScream';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
];

// 1 - Estagios do jogo
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  // 3.2 - A palavra secreta e a dica
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setCategory] = useState('');
  const [letters, setLetters] = useState([]);

  // 4 - Letras tentadas
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScores] = useState(0);

  // 3.1 - Pegar palavras e categoria
  const wordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    // Não precisa colocar só numero
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);

  // 3 - Executando o click la na start scream
  const startGame = useCallback(() => {
    clearLetterStates();
    const { word, category } = wordAndCategory();

    // Separando a word em array
    let wordLetters = word.split('');
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setCategory(category);
    setLetters(wordLetters);
  }, [wordAndCategory]);

  const startScream = () => {
    setGameStage(stages[1].name);
    setScores(0);
    startGame();
  };

  // 4.3 - a função que vai ser executada quando der submit
  const verifyLetters = (letter) => {
    // padronizando a letra que recebe do usuario
    const padrLetter = letter.toLowerCase();

    // checando se a letra ja foi utilizada
    if (guessedLetters.includes(padrLetter) || wrongLetters.includes(padrLetter)) {
      // com return não quero que o usuario perca uma chance
      return;
    }

    // incluir a chance na tela ou remover uma tentativa
    // aqui a letra ta certa
    if (letters.includes(padrLetter)) {
      setGuessedLetters((actualGuessed) => [
        // operador SPREAD pega todos os elementos atuais da array e adiciona novos
        // Sintaxe:...<Array>, <o que adiciono nela>
        ...actualGuessed,
        padrLetter,
      ]);
    }
    // aqui ela ta errada
    else {
      setWrongLetters((actualWrongGuessed) => [...actualWrongGuessed, padrLetter]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  // 5.2 - limpando as palavras tentadas e as erradas
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // 5.1 - Fazendo com que o jogo acabe quando aparece essas condições
  // useEffect monitora um dado toda vez que é mudado
  useEffect(() => {
    if (guesses <= 0) {
      // Resetar os state
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // 5 - condições de derrota, nessa função limpa tudo e reseta o jogo
  const retry = () => {
    setScores(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  // 6 - condições de vitoria
  // Com esse useEffect to monitorando o que escrevo
  useEffect(() => {
    // 6.1 - Pegando as letras e transformando em uma array de letras unicas
    const uniLetters = [...new Set(letters)];

    if (uniLetters.length === guessedLetters.length) {
      setScores((actuaScore) => (actuaScore += 100));
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  return (
    <div className="flex justify-center items-center text-center">
      {gameStage === 'start' && <StartScream startScream={startScream} />}
      {gameStage === 'game' && (
        <Game
          verifyLetters={verifyLetters}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
