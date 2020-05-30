import React, { useEffect, useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import './App.css';
import FileZone from './file-zone/FileZone';
import InitialTextEdit from './initialTextEdit/InitialTextEdit';
import getMockText from './text.service';
import { AppContext } from './context';

const App = () => {
  const [text, setText] = useState('');
  const [init, setInit] = useState(true);
  const [loading, setLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(null);
  const [textStateArr, setTextArr] = useState([]);
  const [nTab, setnTab] = useState(1);

  const confirmInitFunc = newText => {
    setInit(false);
    setText(newText);
    setTextArr(
      newText.split(' ').map((el, i) => {
        return {
          id: i,
          name: el,
          bold: false,
          italic: false,
          underline: false,
        };
      }),
    );
  };

  const handleClick = id => {
    setOpenPopup(id);
  };

  const closePopup = ({ target }) => {
    target.className === 'popupWrapper' && setOpenPopup(null);
  };

  useEffect(() => {
    const handleEsc = event => {
      if (event.keyCode === 27) {
        setOpenPopup(null);
      }
    };

    window.addEventListener('keydown', handleEsc);

    getMockText().then(function (result) {
      setText(result);
      setLoading(false);
    });

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const styling = type => {
    const newState = textStateArr.slice();

    switch (type) {
      case 'b':
        newState[openPopup].bold = !textStateArr[openPopup].bold;
        setTextArr(newState);
        break;

      case 'u':
        newState[openPopup].underline = !textStateArr[openPopup].underline;
        setTextArr(newState);
        break;

      case 'i':
        newState[openPopup].italic = !textStateArr[openPopup].italic;
        setTextArr(newState);
        break;

      case 'left':
        nTab > 1 && setnTab(nTab - 1);
        break;

      case 'right':
        nTab < 11 && setnTab(nTab + 1);
        break;

      case 'leftMax':
        setnTab(1);
        break;

      case 'rightMax':
        setnTab(11);
        break;

      default:
        break;
    }
  };

  const handleTabNext = () => {
    if (openPopup !== null) {
      if (openPopup < textStateArr.length - 1) {
        setOpenPopup(openPopup + 1);
      } else {
        setOpenPopup(0);
      }
    }
  };

  const handleTabPrev = () => {
    if (openPopup !== null) {
      if (openPopup > 0) {
        setOpenPopup(openPopup - 1);
      } else {
        setOpenPopup(textStateArr.length - 1);
      }
    }
  };

  const handleChooseSynonym = word => {
    const newState = textStateArr.slice();
    newState[openPopup].name = word;
    setTextArr(newState);
  };

  return (
    <AppContext>
      <KeyboardEventHandler handleKeys={['s']} onKeyEvent={handleTabNext} />
      <KeyboardEventHandler handleKeys={['a']} onKeyEvent={handleTabPrev} />
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        {!loading ? (
          <main>
            {init ? (
              <InitialTextEdit text={text} confirmInitFunc={confirmInitFunc} />
            ) : (
              <FileZone
                handleClick={handleClick}
                styling={styling}
                textStateArr={textStateArr}
                openPopup={openPopup}
                closePopup={closePopup}
                nTab={nTab}
                handleChooseSynonym={handleChooseSynonym}
              />
            )}
          </main>
        ) : (
          <p className="loadingText">loading</p>
        )}
      </div>
    </AppContext>
  );
};

export default App;
