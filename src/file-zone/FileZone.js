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
}) => (
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
              className="textItem"
              style={{
                fontWeight: `${el.bold ? 'bold' : 'unset'}`,
                fontStyle: `${el.italic ? 'italic' : 'unset'}`,
                textDecoration: `${el.underline ? 'underline' : 'unset'}`,
                color: `${el.color}`,
                cursor: 'pointer',
              }}
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
            handleChooseSynonym={handleChooseSynonym}
          />
        )}
      </div>
    </div>
);

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
