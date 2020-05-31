import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Popup.css';
import ControlPanel from '../../control-panel/ControlPanel';
import { Context } from '../../context';
import SynonymsList from './synonymsList/synonymsList';

const Popup = ({ el, styling, closePopup, handleChooseSynonym }) => {
  const { name, id } = el;

  const { handleSetWord, wordArr = [], awaiting } = useContext(Context);

  useEffect(() => {
    handleSetWord(name);
  }, [id]);

  useEffect(() => {
    return () => {
      handleSetWord('');
    };
  }, []);

  return (
    <div onClick={closePopup} className="popupWrapper">
      <div className="popupBody">
        <p style={{
                fontWeight: `${el.bold ? 'bold' : 'unset'}`,
                fontStyle: `${el.italic ? 'italic' : 'unset'}`,
                textDecoration: `${el.underline ? 'underline' : 'unset'}`,
                color: `${el.color}`,
              }}
              className="textItem">{name}</p>
        <ControlPanel styling={styling} />
        {awaiting ? (
          <p className="loading">Synonyms are loading</p>
        ) : wordArr.length > 0 ? (
          <SynonymsList
            handleChooseSynonym={handleChooseSynonym}
            synonymsList={wordArr}
            name={name}
          />
        ) : (
          <p className="noResults">No results</p>
        )}
      </div>
    </div>
  );
};

Popup.propTypes = {
  el: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    bold: PropTypes.bool.isRequired,
    italic: PropTypes.bool.isRequired,
    underline: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  styling: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
  handleChooseSynonym: PropTypes.func.isRequired,
};

export default Popup;
