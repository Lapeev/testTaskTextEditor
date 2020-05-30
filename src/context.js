import React, { createContext, useState, useEffect } from 'react';

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState('');
  const [wordArr, setWordArr] = useState([]);

  const handleSetWord = word => {
    setWord(word);
  };

  useEffect(() => {
    if (word !== '') {
      (async () => {
        setLoading(true);
        const response = await fetch(
          `https://api.datamuse.com/words?rel_syn=${word}`,
        );
        const words = await response.json();
        setWordArr(
          words.map((el, i) => {
            return {
              id: i,
              word: el.word,
            };
          }),
        );
        setLoading(false);
      })();
    } else {
      setWordArr([]);
    }
  }, [word]);

  const handleReplaceSynonym = (id, name) => {
    const newState = wordArr.slice();
    newState[id].word = name;
    setWordArr(newState);
  };

  return (
    <Context.Provider
      value={{ loading, handleSetWord, wordArr, handleReplaceSynonym }}
    >
      {children}
    </Context.Provider>
  );
};
