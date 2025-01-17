import type { VNode } from "preact";

import "./IconAnchor.css";

export default (props: {icon: VNode; link: string; title: string;}) => {
    return (
        <a class="IconAnchor" href={props.link} title={props.title} rel="noreferrer noopener">{props.icon}</a>
    );
}