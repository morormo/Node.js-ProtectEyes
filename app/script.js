import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			status: 'off',
			time: 60,
			timer: null
		};
	}

	step = () => {
		this.setState({
			time: this.state.time - 1
		});

		const changeStatus = status => {
			if (status === 'work') {
				return this.setState({
					status: 'rest',
					time: 20
				});
			} else if (status === 'rest') {
				return this.setState({
					status: 'work',
					time: 1200
				});
			}
		};

		if (this.state.time === 0) {
			return changeStatus(this.state.status);
		}
	};

	startTimer = () => {
		this.setState({
			timer: setInterval(this.step, 1000),
			time: 1200,
			status: 'work'
		});
	};

	formatTime = time => {
		const addZero = value => {
			if (value < 10) {
				return '0' + value;
			} else {
				return value;
			}
		};

		const min = addZero(Math.floor(time / 60));
		const sec = addZero(time % 60);

		return `${min}:${sec}`;
	};

	render() {
		const { status, time } = this.state;

		return (
			<div>
				<h1>Protect your eyes</h1>
				{status === 'off' && (
					<div>
						<p>
							According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet
							away.
						</p>
						<p>This app will help you track your time and inform you when it's time to rest.</p>
					</div>
				)}
				{status === 'work' && <img src='./images/work.png' />}
				{status === 'rest' && <img src='./images/rest.png' />}
				{status !== 'off' && <div className='timer'>{this.formatTime(time)}</div>}
				{status === 'off' && (
					<button className='btn' onClick={this.startTimer}>
						Start
					</button>
				)}
				{status !== 'off' && <button className='btn'>Stop</button>}
				<button className='btn btn-close'>X</button>
			</div>
		);
	}
}

render(<App />, document.querySelector('#app'));