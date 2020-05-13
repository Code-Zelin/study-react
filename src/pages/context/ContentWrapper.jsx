import React, { useEffect, useState, forwardRef } from "react";
import { ThemeContext, themes } from "./Content";
import ContentItem from "./ContentItem";

let ContentWrapper = ({}) => {
	const [data, setData] = useState("hhha");

	useEffect(() => {
		setTimeout(() => {
			console.log(1);
			setData("hhh啊啊啊啊a");
		}, 2000);
	}, []);

	return (
		<ThemeContext.Provider value={themes.light}>
			<div className="list">
				{console.log(data)}

				{["aaa", "bbb", "ccc"].map((item) => (
					<ContentItem name={item} key={item} />
				))}
			</div>
		</ThemeContext.Provider>
	);
};

export default ContentWrapper;
