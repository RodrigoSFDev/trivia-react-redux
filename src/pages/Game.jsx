import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    results: '',
    qIndex: 0,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();
      const num = 3;
      if (data.response_code === num) {
        const { history } = this.props;
        localStorage.removeItem('token');
        history.push('/');
      }
      this.setState({
        results: data.results,
      });
      console.log(data.results);
    } catch (err) {
      console.log('Um erro foi capturado.', err);
    }
  }

  render() {
    const { results, qIndex } = this.state;
    return (
      <div>
        <Header />
        { results.length ? (
          <div>
            <h2 data-testid="question-category">{ results[qIndex].category }</h2>
            <h3 data-testid="question-text">{ results[qIndex].question }</h3>
            <div data-testid="answer-options">
              <button
                data-testid="correct-answer"
              >
                { results[qIndex].correct_answer }
              </button>
              { results[qIndex].incorrect_answers.map((a, i) => (
                <button key={ i } data-testid={ `wrong-answer-${i}` }>
                  { a }
                </button>
              )) }
            </div>
          </div>
        ) : null }
      </div>
    );
  }
}

Game.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Game);
