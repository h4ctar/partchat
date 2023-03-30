import { useEffect, useRef, useState } from "react";
import { DiagramResource } from "../../types/motorcycles";
import { useParts } from "../parts/part.hook";

type Props = {
    diagram: DiagramResource;
    selectedRefNo?: number;
};

const NORMAL_COLOR = "bg-blue-600/40";
const HIGHLIGHTED_COLOR = "bg-pink-600/40";

export const PartHotspots = ({ diagram, selectedRefNo }: Props) => {
    const { query } = useParts(diagram.id);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => resizeDiagram(), [diagram]);

    useEffect(() => {
        const listener = () => {
            resizeDiagram();
        };
        window.addEventListener("resize", listener);
        return () => {
            window.removeEventListener("resize", listener);
        };
    }, []);

    const resizeDiagram = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            // If the large breakpoint is used the height will be set, otherwise the width will be set
            if (container.clientWidth) {
                setScale(containerRef.current.clientWidth / diagram.width);
            } else if (container.clientHeight) {
                setScale(containerRef.current.clientHeight / diagram.height);
            }
        }
    };

    return (
        <div ref={containerRef} className="absolute top-0 w-full h-full">
            {query.data?.map((part) =>
                part.hotspots?.map((hotspot) => (
                    <div
                        key={part.refNo}
                        style={{
                            left: hotspot[0] * scale,
                            top: hotspot[1] * scale,
                            width: hotspot[2] * scale,
                            height: hotspot[3] * scale,
                        }}
                        className={`absolute ${
                            part.refNo === selectedRefNo
                                ? HIGHLIGHTED_COLOR
                                : NORMAL_COLOR
                        }`}
                    ></div>
                )),
            )}
        </div>
    );
};
