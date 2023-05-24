import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { timeOut } from '../Redux/Actions';
import './Game.css';

class Game extends React.Component {
  state = {
    results: '',
    qIndex: 0,
    answers: '',
    ativar: false,
    timeLeft: 30,

  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const { qIndex } = this.state;

    const oneSecond = 1000;
    this.countdown = setInterval(() => {
      this.setState((prevState) => ({
        timeLeft: prevState.timeLeft - 1,
      }));
    }, oneSecond);

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
      const answersArray = [{ correct: replaced[qIndex].correct_answer },
        ...replaced[qIndex].incorrect_answers];
      const randomizedAnswers = this.shuffleArray(answersArray);
      this.setState({
        results: replaced,
        answers: randomizedAnswers,
      });
      console.log(data.results);
    } catch (err) {
      console.log('Um erro foi capturado.', err);
    }
  }

  componentDidUpdate() {
    const { timeLeft } = this.state;
    const { dispatch } = this.props;

    if (timeLeft === 0) {
      clearInterval(this.countdown);
      console.log('parou');
      dispatch(timeOut(true));
    }
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  clickOn = () => {
    this.setState({
      ativar: true,
    });
  };

  shuffleArray = (array) => { // código do stackoverflow (Knuth Shuffle)
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  updateAnswers = () => {
    const { qIndex, results } = this.state;
    const answersArray = [{ correct: results[qIndex].correct_answer },
      ...results[qIndex].incorrect_answers];
    const randomizedAnswers = this.shuffleArray(answersArray);
    this.setState({
      answers: randomizedAnswers,
    });
  };

  nextBtnClick = () => {
    this.setState((prevState) => ({
      ativar: !prevState.ativar,
      qIndex: prevState.qIndex + 1,
    }), this.updateAnswers);
  };

  render() {
    const { results, qIndex, answers, ativar, timeLeft } = this.state;
    const { timeOut: { disabled } } = this.props;
    return (
      <div className="game-container">
        <Header />
        { results.length ? <h1>{ timeLeft }</h1> : <h3>Loading...</h3> }
        { results.length ? (
          <div>
            <h2
              data-testid="question-category"
              className="game-category"
            >
              { results[qIndex].category }
            </h2>
            <h3
              data-testid="question-text"
              className="game-question"
            >
              { results[qIndex].question }
            </h3>
            <div data-testid="answer-options" className="answers-container">
              { answers.map((a, i) => {
                if (typeof (a) === 'object') {
                  return (
                    <button
                      data-testid="correct-answer"
                      onClick={ this.clickOn }
                      className={ ativar ? 'correto' : '' }
                      key={ i }
                      disabled={ disabled }
                    >
                      {a.correct}
                    </button>
                  );
                }
                return (
                  <button
                    key={ i }
                    onClick={ this.clickOn }
                    className={ ativar ? 'errado' : '' }
                    data-testid={ `wrong-answer-${i}` }
                    disabled={ disabled }
                  >
                    {a}
                  </button>
                );
              }) }
            </div>
            { ativar ? (
              <button
                data-testid="btn-next"
                onClick={ this.nextBtnClick }
                className="next"
              >
                Next
              </button>
            ) : null }
          </div>
        ) : null }
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  timeOut: PropTypes.shape({
    disabled: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Game);
