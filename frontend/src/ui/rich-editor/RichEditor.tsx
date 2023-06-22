import { useState } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, Slate, withReact, ReactEditor } from "slate-react";
import { BoldIcon } from "../../icons/BoldIcon";
import { CodeIcon } from "../../icons/CodeIcon";
import { HeadingIcon } from "../../icons/HeadingIcon";
import { ItalicIcon } from "../../icons/ItalicIcon";
import { QuoteIcon } from "../../icons/QuoteIcon";
import { BlockStyleButton } from "./BlockStyleButton";
import { Element } from "./Element";
import { Leaf } from "./Leaf";
import { LeafStyleButton } from "./LeafStyleButton";

const initialValue: Descendant[] = [
    {
        type: "paragraph",
        children: [{ text: "" }],
    },
];

type Props = {
    placeholder?: string;
    onChange: (value: Descendant[]) => void;
    children?: JSX.Element;
    disabled?: boolean;
};

export const RichEditor = ({
    placeholder,
    onChange,
    children,
    disabled,
}: Props) => {
    const [editor] = useState(() => withReact(createEditor()));

    return (
        <Slate editor={editor} value={initialValue} onChange={onChange}>
            <div className="w-full rounded-lg border border-gray-300 dark:border-slate-50/10 dark:bg-slate-400/10 dark:bg-slate-800">
                <div className="flex flex-row gap-4 border-b border-gray-300 p-4 dark:border-slate-50/10">
                    <LeafStyleButton style="bold">
                        <BoldIcon />
                    </LeafStyleButton>
                    <LeafStyleButton style="italic">
                        <ItalicIcon />
                    </LeafStyleButton>
                    <BlockStyleButton style="heading">
                        <HeadingIcon />
                    </BlockStyleButton>
                    <BlockStyleButton style="code">
                        <CodeIcon />
                    </BlockStyleButton>
                    <BlockStyleButton style="quote">
                        <QuoteIcon />
                    </BlockStyleButton>
                </div>
                <div
                    className="cursor-text p-5"
                    onClick={() => ReactEditor.focus(editor)}
                >
                    <Editable
                        renderElement={Element}
                        renderLeaf={Leaf}
                        placeholder={placeholder}
                        className="prose max-w-none dark:prose-invert"
                        readOnly={disabled}
                        onKeyDown={(event) => {
                            if (event.code === "Enter" && event.shiftKey) {
                                event.preventDefault();
                                editor.insertText("\n");
                            }
                        }}
                    />
                </div>
                <div className="flex flex-row-reverse gap-4 p-4">
                    {children}
                </div>
            </div>
        </Slate>
    );
};
