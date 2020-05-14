import React, { Component } from "react";
import { connect } from "./fake/react-redux";

function getPageData(dispatch, getState) {
	const requestNumber = Math.ceil(Math.random() * 10);
	return new Promise(() => {
		setTimeout(() => {
			dispatch({
				type: "add",
				number: requestNumber,
			});
		}, 1000);
	});
}

class TestReactReduxReal extends Component {
	render() {
		return (
			<div>
				{this.props.number}
				<button onClick={() => this.props.asyncAdd()}>异步+</button>
			</div>
		);
	}
}
export default connect(
	(store) => ({
		number: store,
	}),
	(dispatch) => ({
		// asyncAdd(number) {
		// 	// 第一版，直接dispatch，把所有的工作都在组件中进行
		// 	// dispatch({
		// 	// 	type: "add",
		// 	// 	number
		// 	// })

		// 	// 第二版，把接口调用部分，挪到connect中来做，减少组件对数据的操作
		// 	// getPageData().then((number) => {
		// 	// 	dispatch({
		// 	// 		type: "add",
		// 	// 		number,
		// 	// 	});
		// 	// });
		// },
		// 第三版，把接口调用部分在接口声明的时候处理掉，利用中间件的特性，把dispatch传给方法
		// 使得接口方法在获取到数据的时候可以直接进行dispatch,减少了回调函数的使用
		// 也减少了connect中的代码量
		asyncAdd() {
			dispatch(getPageData);
		},
	})
)(TestReactReduxReal);
