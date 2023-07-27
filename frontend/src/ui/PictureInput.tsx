import { useState } from "react";

type Props = {
    image?: File;
    setImage: (file: File) => void;
    defaultImage?: string;
};

export const PictureInput = ({ setImage, defaultImage }: Props) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(defaultImage);

    return (
        <div className="grid grid-cols-2 gap-4">
            <img className="rounded-xl" src={imageUrl} />
            <input
                onChange={(event) => {
                    const file = event.target.files![0];
                    setImage(file);
                    setImageUrl(URL.createObjectURL(file));
                }}
                className="file:dark:highlight-white/20 place-self-center file:rounded-lg file:border-0 file:bg-slate-900 file:px-6 file:py-2 file:font-semibold file:text-white file:dark:bg-sky-500 file:dark:hover:bg-sky-400"
                type="file"
                id="picture"
            />
        </div>
    );
};