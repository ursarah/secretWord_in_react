import './App.css';

// React
import { useState } from 'react';

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

function App() {
  // Estagios do jogo
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  // A palavra secreta e a dica
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setCategory] = useState('');
  const [letters, setLetters] = useState([]);

  // Letras tentadas
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScores] = useState(0);

  // Pegar palavras e categoria
  const wordAndCategory = () => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    // Não precisa colocar só numero
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  };

  // Ir para a segunda tela
  const startGame = () => {
    const { word, category } = wordAndCategory();

    // Separando a word em array
    let wordLetters = word.split('');
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  // Finalizar o jogo
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
    }
  };
  console.log(pickedWord);
  console.log(guessedLetters);
  console.log(wrongLetters);

  // Voltar pra primeira tela
  const screenEnd = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className="flex justify-center items-center text-center">
      {gameStage === 'start' && <StartScream startGame={startGame} />}
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
      {gameStage === 'end' && <GameOver screenEnd={screenEnd} />}
    </div>
  );
}

export default App;
