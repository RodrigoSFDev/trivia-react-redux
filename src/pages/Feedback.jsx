import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

function Feedback({ assertions }) {
  const minimumScore = 3;
  const message = assertions < minimumScore ? 'Could be better...' : 'Well Done!';

  return (
    <div>
      <Header />
      <span data-testid="feedback-text">{message}</span>
    </div>
  );
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
