import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timeOut } from '../Redux/Actions';

class Countdown extends React.Component {
  state = { timeLeft: 30 };

  // componentDidMount() {
  //   const oneSecond = 1000;
  //   this.countdown = setInterval(() => {
  //     this.setState((prevState) => ({
  //       timeLeft: prevState.timeLeft - 1,
  //     }));
  //   }, oneSecond);
  // }

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

  render() {
    const { timeLeft } = this.state;
    return (
      <div>
        <h1>{ timeLeft }</h1>
      </div>
    );
  }
}

Countdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Countdown);
