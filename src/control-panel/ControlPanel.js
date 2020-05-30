import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ControlPanel.css';

class ControlPanel extends Component {
  render() {
    const { styling } = this.props;

    return (
      <div id="control-panel">
        <div className="format-actions">
          <span className="actionsType">Word format:</span>
          <button
            onClick={() => styling('b')}
            className="format-action"
            type="button"
          >
            <b>B</b>
          </button>
          <button
            onClick={() => styling('i')}
            className="format-action"
            type="button"
          >
            <i>I</i>
          </button>
          <button
            onClick={() => styling('u')}
            className="format-action"
            type="button"
          >
            <u>U</u>
          </button>
        </div>
        <div className="format-actions">
          <span className="actionsType">Text indentation:</span>
          <button
            onClick={() => styling('left')}
            className="format-action"
            type="button"
          >
            <span>&lt;</span>
          </button>
          <button
            onClick={() => styling('right')}
            className="format-action"
            type="button"
          >
            <span>&gt;</span>
          </button>
          <button
            onClick={() => styling('leftMax')}
            className="format-action"
            type="button"
          >
            <span>&lt;&lt;</span>
          </button>
          <button
            onClick={() => styling('rightMax')}
            className="format-action"
            type="button"
          >
            <span>&gt;&gt;</span>
          </button>
        </div>
        <div className="format-actions">
          <span className="actionsType">Choose color:</span>
          <button
            onClick={() => styling('green')}
            className="format-action buttonColor green"
            type="button"
          />
          <button
            onClick={() => styling('red')}
            className="format-action buttonColor red"
            type="button"
          />
          <button
            onClick={() => styling('blue')}
            className="format-action buttonColor blue"
            type="button"
          />
        </div>
      </div>
    );
  }
}

ControlPanel.propTypes = {
  styling: PropTypes.func.isRequired,
};

export default ControlPanel;
