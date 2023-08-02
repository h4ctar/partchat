import { useEffect, useRef, useState } from "react";
import ReactCrop, {
    defaultCrop,
    type Crop,
    makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type Props = {
    setImageFile: (imageFile: Blob | null) => void;
    defaultImageUrl?: string;
};

export const PictureInput = ({ setImageFile, defaultImageUrl }: Props) => {
    const [rawFile, setRawFile] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string | undefined>(
        defaultImageUrl,
    );
    const [crop, setCrop] = useState<Crop>(defaultCrop);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (rawFile) {
            const url = URL.createObjectURL(rawFile);
            setImageUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [rawFile]);

    return (
        <div className="flex flex-col gap-4">
            {imageUrl ? (
                <ReactCrop
                    crop={crop}
                    onChange={(crop) => setCrop(crop)}
                    onComplete={async (crop) => {
                        const img = imgRef.current;
                        const canvas = document.createElement("canvas");
                        canvas.width = crop.width;
                        canvas.height = crop.height;
                        canvas
                            .getContext("2d")
                            ?.drawImage(
                                img!,
                                crop.x,
                                crop.y,
                                crop.width,
                                crop.height,
                                0,
                                0,
                                crop.width,
                                crop.height,
                            );
                        canvas.toBlob(setImageFile);
                    }}
                    aspect={3 / 2}
                >
                    <img
                        ref={imgRef}
                        // className="w-full rounded-xl"
                        src={imageUrl}
                    />
                </ReactCrop>
            ) : (
                <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800">
                    <span>No image</span>
                </div>
            )}
            <input
                onChange={(event) => setRawFile(event.target.files![0])}
                className="file:dark:highlight-white/20 file:rounded-lg file:border-0 file:bg-slate-900 file:px-6 file:py-2 file:font-semibold file:text-white file:dark:bg-sky-500 file:dark:hover:bg-sky-400"
                type="file"
                id="picture"
            />
        </div>
    );
};
