import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Popup.css';
import ControlPanel from '../../control-panel/ControlPanel';
import { Context } from '../../context';
import SynonymsList from './synonymsList/synonymsList';

const Popup = ({ el, styling, closePopup, style, handleChooseSynonym }) => {
  const { name, id } = el;

  const { loading, handleSetWord, wordArr = [] } = useContext(Context);

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
        <p className={style(el)}>{name}</p>
        <ControlPanel styling={styling} />
        {loading ? (
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
  }).isRequired,
  styling: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
  style: PropTypes.func.isRequired,
  handleChooseSynonym: PropTypes.func.isRequired,
};

export default Popup;
