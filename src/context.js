import React, { createContext, useState, useEffect } from 'react';

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [word, setWord] = useState('');
  const [wordArr, setWordArr] = useState([]);
  const [wordArrTimeOutId, setWordArrTimeOutId] = React.useState(0);
  const [awaiting, setAwaiting] = React.useState(false);
  const [open, setOpen] = useState(false);
  const loading = open && wordArr.length === 0 && awaiting;

  const handleSetWord = word => {
    setWord(word);
  };

  useEffect(() => {
    let active = true;

    if (!loading) {
      setAwaiting(false);
      return undefined;
    }

      (async () => {
        try {
          const response = await fetch(
            `https://api.datamuse.com/words?rel_syn=${word}`,
          );
          const words = await response.json();
          if (active && words.length === 0) {
            setWordArr([]);
            setAwaiting(false);
            return undefined;
          }
          else if (active) {
            setWordArr(
                words.map((el, i) => {
                  return {
                    id: i,
                    word: el.word,
                  };
                }),
              );
              setAwaiting(false);
          }
        }
        catch(e) {
          setAwaiting(false);
        }
      })();


    return () => {
      active = false;
      setAwaiting(false);
    };

  }, [loading]);


  useEffect(() => {
    if (word !== '') {
      setWordArrTimeOutId(
        setTimeout(() => {
          setAwaiting(true);
          setOpen(true);
        }, 0),
      );
      clearTimeout(wordArrTimeOutId);
      setOpen(false);
    }
    setWordArr([]);
  }, [word]);

  const handleReplaceSynonym = (id, name) => {
    const newState = wordArr.slice();
    newState[id].word = name;
    setWordArr(newState);
  };

  return (
    <Context.Provider
      value={{ handleSetWord, wordArr, handleReplaceSynonym, awaiting }}
    >
      {children}
    </Context.Provider>
  );
};
