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
      const entities = {
        '&#039;': '\'',
        '&quot;': '"',
        '&ntilde;': 'ñ',
        '&eacute;': 'é',
        '&amp;': '&',
        '&uuml;': 'ü',
      };
      const replaced = data.results.map((element) => {
        const question = element.question.replace(/&#?\w+;/g, (match) => entities[match] || match);
        const correct = element.correct_answer.replace(/&#?\w+;/g, (match) => entities[match] || match);
        const incorrect = element.incorrect_answers.map((elementTwo) => elementTwo.replace(/&#?\w+;/g, (match) => entities[match] || match));
        return { ...element, question, correct, incorrect };
      });
      this.setState({
        results: replaced,
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
            <ul
              data-testid="answer-options"
              style={ { listStyleType: 'none', display: 'flex' } }
            >
              <li>
                <button
                  data-testid="correct-answer"
                >
                  { results[qIndex].correct_answer }
                </button>
              </li>
              { results[qIndex].incorrect_answers.map((a, i) => (
                <li key={ i }>
                  <button data-testid={ `wrong-answer-${i}` }>
                    { a }
                  </button>
                </li>
              )) }
            </ul>
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
