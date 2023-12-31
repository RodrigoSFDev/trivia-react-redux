import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './Feedback.css';

class Feedback extends Component {
  reset = () => {
    const { history, dispatch } = this.props;
    history.push('/ranking');
    dispatch(getScore(0));
  };

  render() {
    const { history, assertions, score } = this.props;
    const minimumScore = 3;
    const message = assertions < minimumScore ? 'Could be better...' : 'Well Done!';
    return (
      <div className="feed-container">
        <Header />
        <span data-testid="feedback-text">{message}</span>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.reset }
        >
          Play again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
