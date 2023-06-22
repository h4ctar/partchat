import { Descendant, Text } from "slate";
import { Element } from "./Element";
import { Leaf } from "./Leaf";

type Props = {
    node: Descendant;
};

export const RichHtml = ({ node }: Props) => {
    if (Text.isText(node)) {
        return (
            <Leaf
                leaf={node}
                attributes={{ "data-slate-leaf": true }}
                text={node}
            >
                {node.text}
            </Leaf>
        );
    }

    return (
        <Element
            element={node}
            attributes={{ "data-slate-node": "element", ref: undefined }}
        >
            {node.children.map((node, index) => (
                <RichHtml key={index} node={node} />
            ))}
        </Element>
    );
};
