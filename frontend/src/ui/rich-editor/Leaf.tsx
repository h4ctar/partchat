import { RenderLeafProps } from "slate-react";

export const Leaf = ({ leaf, attributes, children }: RenderLeafProps) => {
    return (
        <span
            {...attributes}
            className={`${leaf.bold ? "font-bold" : ""} ${
                leaf.italic ? "italic" : ""
            }`}
        >
            {children}
        </span>
    );
};
