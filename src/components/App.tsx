import Hero from "./Hero";
//import IconAnchor from "./IconAnchor";
import Countdown from "react-countdown";

//import { /*Music,*/ Globe } from "lucide-preact";
//import { SiGithub, SiForgejo, SiInstagram } from "react-icons/si";

import "./App.css";

export default () => {
	return (
		<div class="container">
			<Hero
				waves="header"
				title="This is not a CDN."
				paragraph={`Coming ${new Date().getFullYear() + 1}`}
				links={[<Countdown key="countdown"
					date={Date.now() + 2000}
					intervalDelay={0}
					precision={1000}
					zeroPadTime={2}
					renderer={props => <span>{props.total.toString().padStart(10, "0")} ms..</span>}
					onComplete={() => {
						window.location.replace("https://ipv4.army");
					}}
					/>]}
			/>
			{/*
			<hr />
			<Hero
				title="This, is Audiophile, Basshead and Techie."
				paragraph="One who develops for both frontends and backends."
			/>
			<hr />
			<Hero
				title="S€th."
				links={[
					<IconAnchor
						icon={<SiForgejo size={"2rem"} />}
						link="https://git.creations.works/seth"
						title="Forgejo"
						key="forgejoLink"
					/>,
					<IconAnchor
						icon={<SiGithub size={"2rem"} />}
						link="https://github.com/wont-stream"
						title="GitHub"
						key="githubLink"
					/>,
					<IconAnchor
						icon={<Music size={"2rem"} />}
						link="https://artist.link/echoed_away"
						title="Echoed Away Music"
						key="artistLink"
					/>,
					<IconAnchor
						icon={<SiInstagram size={"2rem"} />}
						link="https://instagram.com/s_euro_th"
						title="Instagram"
						key="instagramLink"
					/>,
				]}
				waves="footer"
			/>
			*/}
		</div>
	);
};
