import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement = {
    type: "paragraph" | "code" | "heading" | "quote";
    children: CustomText[];
};

export type FormattedText = { text: string; bold?: true; italic?: true };
type CustomText = FormattedText;

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}
