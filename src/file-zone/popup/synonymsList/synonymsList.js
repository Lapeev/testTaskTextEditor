import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './synonymsList.css';
import { Context } from '../../../context';

const SynonymsList = ({ synonymsList = [], handleChooseSynonym, name }) => {
  const { handleReplaceSynonym } = useContext(Context);
  return (
    <div className="synonymsListWrapper">
      <p className="synonymsListTitle">
        If needed, choose synonym from list below:
      </p>
      <ul className="synonymsList">
        {synonymsList.map(el => (
          <li key={el.id} className="synonymsItem">
            <span
              onClick={() => {
                handleChooseSynonym(el.word);
                handleReplaceSynonym(el.id, name);
              }}
              className="synonymsItemText"
            >
              {el.word}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

SynonymsList.defaultProps = {
  synonymsList: [],
};

SynonymsList.propTypes = {
  synonymsList: PropTypes.array,
  handleChooseSynonym: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default SynonymsList;
