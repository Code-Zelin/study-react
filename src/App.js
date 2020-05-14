import React, { useRef } from "react";

// 16.3之后的新版生命周期
import LifeCompoent from "./pages/new-life/life";
import CForm from "./pages/form/index";

// 用于测试state的异步和同步问题
import StateTest from "./pages/state";

// 用于测试context
import ContentWrapper from "./pages/context/ContentWrapper";

// TestRedux和store可以调试自己做的redux
import TestReactReduxReal from "./pages/redux/react-redux-real";
import TestRedux from "./pages/redux";
import store from "./pages/redux/store";

// 自己动手做的react-redux
import ReduxOut from "./pages/redux/out";
import { Provider } from "react-redux";

function App() {
	// const fatherRef = useRef();

	// function handleClickChild() {
	// 	console.log(fatherRef);
	// 	if(fatherRef.current) {
	// 		fatherRef.current.click();
	// 	}
	// }

	return (
		// {/*
		// 	<ContentWrapper />
		// 	<button onClick={handleClickChild}>点我更新子孙组件</button>
		//  	<LifeCompoent title="小bug" />
	 	// 	<CForm />
		// 	 <StateTest />
		// */}
		// <Provider store={store}>
		// 	<TestReactReduxReal />
		// </Provider>
		<ReduxOut />
	);
}
export default App;
