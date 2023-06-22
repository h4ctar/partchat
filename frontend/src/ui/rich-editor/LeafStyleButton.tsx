import { BaseSyntheticEvent } from "react";
import { Editor, Transforms, Text } from "slate";
import { useSlate } from "slate-react";

type Props = {
    style: "bold" | "italic";
    children: JSX.Element;
};

export const LeafStyleButton = ({ style, children }: Props) => {
    const editor = useSlate();

    const [match] = Editor.nodes(editor, {
        match: (n) => Text.isText(n) && !!n[style],
    });
    const active = !!match;

    const toggleStyle = (event: BaseSyntheticEvent) => {
        event.preventDefault();
        Transforms.setNodes(
            editor,
            { [style]: active ? undefined : true },
            { match: (n) => Text.isText(n), split: true },
        );
    };

    return (
        <button
            onMouseDown={toggleStyle}
            className={
                active ? "fill-sky-400" : "fill-slate-500 dark:fill-slate-400"
            }
        >
            {children}
        </button>
    );
};
