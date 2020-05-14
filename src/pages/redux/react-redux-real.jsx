import React, { Component } from "react";
import { connect } from "react-redux";


function getPageData() {
	const requestNumber = Math.ceil(Math.random() * 100)
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(requestNumber)
		}, 1000)
	})
}

class TestReactReduxReal extends Component {
	handleClick() {
		getPageData().then((number) => {
			this.props.asyncAdd(number)
		})
	}

	render() {
		return (
			<div>
				{this.props.number}
				<button onClick={() => this.props.add()}>+</button>
				<button onClick={() => this.props.minus()}>-</button>
				<button onClick={() => this.handleClick()}>异步+</button>
			</div>
		);
	}
}
export default connect(
	(store) => ({
		number: store,
	}),
	// {
	//     add: { type: "add" },
	//     minus: {type: "minus"}
	// }
	(dispatch) => ({
		add() {
			dispatch({
				type: "add",
			});
		},
		minus() {
			dispatch({
				type: "minus",
			});
		},
		asyncAdd(number) {
			// dispatch((innerDispatch) => {
			// 	innerDispatch({
			// 		type: "add",
			// 		number,
			// 	});
			// });
			dispatch({
				type: "add",
				number
			})
		},
	})
)(TestReactReduxReal);
