import { RenderLeafProps } from "slate-react";
import clsx from "clsx";

export const Leaf = ({ leaf, attributes, children }: RenderLeafProps) => {
    return (
        <span
            {...attributes}
            className={clsx({ "font-bold": leaf.bold, italic: leaf.italic })}
        >
            {children}
        </span>
    );
};
