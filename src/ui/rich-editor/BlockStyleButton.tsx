import { BaseSyntheticEvent } from "react";
import { Editor, Element, Transforms } from "slate";
import { useSlate } from "slate-react";

type Props = {
    style: "paragraph" | "code" | "heading" | "quote";
    children: JSX.Element;
};

export const BlockStyleButton = ({ style, children }: Props) => {
    const editor = useSlate();

    const [match] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && n.type === style,
    });
    const active = !!match;

    const toggleStyle = (event: BaseSyntheticEvent) => {
        event.preventDefault();
        Transforms.setNodes(
            editor,
            { type: active ? undefined : style },
            {
                match: (n) => Element.isElement(n),
            },
        );
    };

    return (
        <button
            onMouseDown={toggleStyle}
            className={active ? "fill-sky-400" : "fill-slate-500 dark:fill-slate-400"}
        >
            {children}
        </button>
    );
};
