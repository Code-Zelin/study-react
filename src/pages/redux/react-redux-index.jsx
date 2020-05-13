import React, { Component } from "react";
import { connect } from "./fake/react-redux";

class TestReactRedux extends Component {
	constructor(props) {
        super(props);
	}

	render() {
		return (
			<div>
				{this.props.number}
				<button onClick={() => this.props.add()}>+</button>
				<button onClick={() => this.props.minus()}>-</button>
				<button onClick={() => this.props.asyncAdd()}>异步+</button>
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
		asyncAdd() {
			setTimeout(() => {
				dispatch({
					type: "add",
				});
			}, 1000);
		},
	})
)(TestReactRedux);
