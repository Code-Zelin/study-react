import React, { useRef } from "react";
import ContentWrapper from "./pages/ContentWrapper";
import LifeCompoent from "./pages/life";
import CForm from "./pages/form/index";
import StateTest from "./pages/state";
import TestRedux from "./pages/redux";

import { Provider } from "react-redux"
import store from "./pages/redux/store"

function App() {
	// const [data, setData] = useState({ hits: [] });
	// useEffect(() => {
	// 	async function getData1() {
	// 	const result = await axios("https://hn.algolia.com/api/v1/search?query=redux");
	// 	setData(result.data);
	// 	}
	// 	getData1();
	// }, []);

	// const fatherRef = useRef();

	// function handleClickChild() {
	// 	console.log(fatherRef);
	// 	if(fatherRef.current) {
	// 		fatherRef.current.click();
	// 	}
	// }

	return (
		// <ul>
		// 	{data.hits.map(item => (
		// 		<li key={item.objectID}>
		// 			<a href={item.url}>{item.title}</a>
		// 		</li>
		// 	))}
		// </ul>
		<Provider store={store}>
			{/* <ContentWrapper ref={fatherRef} />

			<button onClick={handleClickChild}>点我更新子孙组件</button> */}

			{/* <LifeCompoent title="小bug" /> */}

			{/* <CForm /> */}
			{/* <StateTest /> */}
			<TestRedux />
		</Provider>
	);
}
export default App;
