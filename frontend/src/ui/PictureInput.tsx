import { useState } from "react";

type Props = {
    image?: File;
    setImage: (file: File) => void;
    defaultImage?: string;
};

export const PictureInput = ({ setImage, defaultImage }: Props) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(defaultImage);

    return (
        <div className="flex flex-col gap-4">
            {imageUrl ? (
                <img
                    className="aspect-video w-full rounded-xl"
                    src={imageUrl}
                />
            ) : (
                <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800">
                    <span>No image</span>
                </div>
            )}
            <input
                onChange={(event) => {
                    const file = event.target.files![0];
                    setImage(file);
                    setImageUrl(URL.createObjectURL(file));
                }}
                className="file:dark:highlight-white/20 file:rounded-lg file:border-0 file:bg-slate-900 file:px-6 file:py-2 file:font-semibold file:text-white file:dark:bg-sky-500 file:dark:hover:bg-sky-400"
                type="file"
                id="picture"
            />
        </div>
    );
};
