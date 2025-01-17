import type { VNode } from "preact";
import "./Hero.css";

export default (props: {
	title: string;
	paragraph?: string;
	links?: VNode[];
	waves?: "header" | "footer";
}) => {
	return (
		<>
			<section class="hero">
				<div class="content">
					<h2>{props.title}</h2>
					{props.paragraph && <p>{props.paragraph}</p>}
					{props.links && <p>{...props.links}</p>}
				</div>
				{props.waves && <div class={`waves-${props.waves}`} />}
			</section>
		</>
	);
};
