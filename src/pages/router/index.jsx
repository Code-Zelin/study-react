/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

const Home = () => {
	return <div>我是主页啊</div>;
};
const List = () => {
	const [list, setList] = useState([
		{
			id: 1,
			title: "啦啦啦",
		},
		{
			id: 2,
			title: "呜呜呜呜",
		},
		{
			id: 3,
			title: "滚滚滚",
		},
		{
			id: 4,
			title: "嘎嘎嘎",
		},
		{
			id: 5,
			title: "嘿嘿嘿",
		},
	]);
	return (
		<div>
			<p>我是列表啊</p>
			<ul>
				{list.map((item) => (
					<li key={item.id}>
						<Link
							to={{
								pathname: `/detail/${item.id}`,
								search: `?id_2=${item.id}`,
								state: item,
							}}
						>
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
const Msg = () => {
	return <div>我是信息啊</div>;
};
const Detail = ({ history, localtion, match }) => {
	console.log(history, localtion, match);
	const { id } = match.params;
	const { title } = history.location.state || {};
	return (
		<div>
			<p>
				我是详情{id}: {title}呀
			</p>
			<button onClick={history.goBack}>点我返回</button>
		</div>
	);
};

const IndexRouter = () => {
	const history = createBrowserHistory();
	return (
		<BrowserRouter history={history}>
			<div>
				<Link to="/">主页</Link>
				<Link to="/list">列表</Link>
				<Link to="/msg">信息</Link>
			</div>
			<Route exact path="/" component={Home} />
			<Route path="/list" component={List} />
			<Route path="/msg" component={Msg} />
			<Route path="/detail/:id" component={Detail} />
		</BrowserRouter>
	);
};
export default IndexRouter;
