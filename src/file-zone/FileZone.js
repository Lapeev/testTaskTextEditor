import React from 'react';
import PropTypes from 'prop-types';
import './FileZone.css';
import Popup from './popup/Popup';

const FileZone = ({
  handleClick,
  styling,
  textStateArr = [],
  openPopup,
  closePopup,
  nTab,
  handleChooseSynonym,
}) => {
  const style = el => {
    const { bold, italic, underline } = el;
    return `textItem ${bold && 'bold'} ${italic && 'italic'} ${
      underline && 'underline'
    }`.replace(/false/g, '');
  };

  return (
    <div id="file-zone">
      <div id="file">
        <div
          style={{
            padding: `15px 15px 15px ${15 * nTab}px`,
          }}
          className="text"
        >
          {textStateArr.map((el, i) => (
            <span
              key={el.id}
              onClick={() => handleClick(el.id)}
              className={style(el)}
            >
              {el.name}
              {i !== textStateArr.length - 1 && ' '}
            </span>
          ))}
        </div>
        {openPopup !== null && (
          <Popup
            el={textStateArr[openPopup]}
            styling={styling}
            closePopup={closePopup}
            style={style}
            handleChooseSynonym={handleChooseSynonym}
          />
        )}
      </div>
    </div>
  );
};

FileZone.defaultProps = {
  openPopup: null,
};

FileZone.propTypes = {
  handleClick: PropTypes.func.isRequired,
  styling: PropTypes.func.isRequired,
  textStateArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      bold: PropTypes.bool.isRequired,
      italic: PropTypes.bool.isRequired,
      underline: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  openPopup: PropTypes.number,
  closePopup: PropTypes.func.isRequired,
  nTab: PropTypes.number.isRequired,
  handleChooseSynonym: PropTypes.func.isRequired,
};

export default FileZone;
