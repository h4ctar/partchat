import { RenderElementProps } from "slate-react";

export const Element = ({
    element,
    attributes,
    children,
}: RenderElementProps) => {
    switch (element.type) {
        case "code":
            return (
                <pre {...attributes}>
                    <code>{children}</code>
                </pre>
            );

        case "heading":
            return <h1 {...attributes}>{children}</h1>;

        case "quote":
            return <blockquote {...attributes}>{children}</blockquote>;

        default:
            return <p {...attributes}>{children}</p>;
    }
};
