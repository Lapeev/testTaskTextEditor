import React, { useState } from 'react';
import './initialTextEdit.css';

const InitialTextEdit = ({ text, confirmInitFunc }) => {
  const [textState, setTextState] = useState(text);

  const handleChange = ({ target }) => {
    setTextState(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    confirmInitFunc(textState);
  };

  return (
    <div className="initialTextEditWrapper">
      <div className="initialTextEdit">
        <h2 className="initialTextEditTitle">Edit text before styling</h2>
        <form onSubmit={handleSubmit} className="initialTextEditForm">
          <textarea
            className="initialTextTextarea"
            autoFocus
            value={textState}
            onChange={handleChange}
          />
          <button type="submit" className="initialTextEditButton">
            confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default InitialTextEdit;
