import { Prisma } from "@prisma/client";

export const MOTORCYCLES = [
    {
        id: "yamaha-xs750-1976-1981",
        make: "Yamaha",
        model: "XS750D",
        yearFrom: 1976,
        yearTo: 1977,
        image: "/assets/motorcycles/xs750d.png",
    },
    {
        id: "yamaha-xj650lj-1982-1984",
        make: "Yamaha",
        model: "XJ650LJ",
        yearFrom: 1982,
        yearTo: 1984,
        image: "/assets/motorcycles/xj650lj.png",
    },
    {
        id: "honda-cb400f-1975-1977",
        make: "Honda",
        model: "CB400F",
        yearFrom: 1975,
        yearTo: 1977,
        image: "/assets/motorcycles/cb400f.png",
    },
];

export const DIAGRAMS = [
    {
        id: "yamaha-cylinder-head-1",
        name: "Cylinder Head",
        image: "/assets/diagrams/cylinder-head-1.png",
        width: 1146,
        height: 1670,
    },
];

export const MOTORCYCLE_TO_DIAGRAMS = [
    {
        motorcycleId: "yamaha-xj650lj-1982-1984",
        diagramId: "yamaha-cylinder-head-1",
    },
];

export const PARTS = [
    {
        id: "16G-11101-00",
        partNumber: "16G-11101-00",
        description: "CYLINDER HEAD ASSY",
    },
    {
        id: "91810-18016",
        partNumber: "91810-18016",
        description: "PIN, dowel",
    },
    {
        id: "93440-12052",
        partNumber: "93440-12052",
        description: "CIRCLIP",
    },
    {
        id: "90105-06153",
        partNumber: "90105-06153",
        description: "BOLT, washer based",
    },
    {
        id: "90153-06029",
        partNumber: "90153-06029",
        description: "SCREW, hexagon",
    },
    {
        id: "90430-G6014",
        partNumber: "90430-G6014",
        description: "GASKET",
    },
    {
        id: "4H7-11133-10",
        partNumber: "4H7-11133-10",
        description: "GUIDE, intake valve (1ST Q/S)",
    },
    { id: "95611-06625", partNumber: "95611-06625", description: "BOLT, stud" },
    { id: "95611-06630", partNumber: "95611-06630", description: "BOLT, stud" },
    { id: "95621-08330", partNumber: "95621-08330", description: "BOLT, stud" },
    {
        id: "434-11161-00",
        partNumber: "434-11161-00",
        description: "ABSORBER 1",
    },
    {
        id: "4H7-11161-00",
        partNumber: "4H7-11161-00",
        description: "ABSORBER 1",
    },
    { id: "95611-06630", partNumber: "95611-06630", description: "BOLT, stud" },
    {
        id: "90201-11597",
        partNumber: "90201-11597",
        description: "WASHER, plate",
    },
    {
        id: "90201-10128",
        partNumber: "90201-10128",
        description: "WASHER, plate",
    },
    { id: "90176-10033", partNumber: "90176-10033", description: "NUT, crown" },
    {
        id: "94701-00209",
        partNumber: "94701-00209",
        description: "PLUG, spark (DN W24EP-U)",
    },
    {
        id: "16G-11181-00",
        partNumber: "16G-11181-00",
        description: "GASKET, cylinder head 1",
    },
    {
        id: "16G\u201411191-01",
        partNumber: "16G\u201411191-01",
        description: "COVER, cylinder head 1",
    },
    {
        id: "11T-11192-00",
        partNumber: "11T-11192-00",
        description: "COVER, cylinder head 2",
    },
    {
        id: "11T-1112E-00",
        partNumber: "11T-1112E-00",
        description: "COVER, cylinder head 3",
    },
    {
        id: "16G\u201411142-00",
        partNumber: "16G\u201411142-00",
        description: "BRACKET, cylinder head cover 2",
    },
    {
        id: "16G-11152-00",
        partNumber: "16G-11152-00",
        description: "BRACKET, cylinder head cover",
    },
    {
        id: "16G-11193-00",
        partNumber: "16G-11193-00",
        description: "GASKET, head cover 1",
    },
    { id: "1J7-11138-00", partNumber: "1J7-11138-00", description: "PLUG" },
    { id: "91316-06035", partNumber: "91316-06035", description: "BOLT" },
    { id: "91316-06055", partNumber: "91316-06055", description: "BOLT" },
    {
        id: "92906-06600",
        partNumber: "92906-06600",
        description: "WASHER, plate",
    },
    { id: "90387-062G5", partNumber: "90387-062G5", description: "COLLAR" },
    { id: "97326-06012", partNumber: "97326-06012", description: "BOLT" },
    {
        id: "92906-06100",
        partNumber: "92906-06100",
        description: "WASHER, spring",
    },
    {
        id: "92906-06600",
        partNumber: "92906-06600",
        description: "WASHER, plate",
    },
];

export const DIAGRAM_TO_PARTS = [
    {
        diagramId: "yamaha-cylinder-head-1",
        partId: "91316-06035",
        refNo: 26,
        hotspot: [182, 38, 46, 30] as Prisma.JsonArray,
        qty: 12,
    },
    {
        diagramId: "yamaha-cylinder-head-1",
        partId: "97326-06012",
        refNo: 30,
        hotspot: [786, 26, 42, 32] as Prisma.JsonArray,
        qty: 4,
    },
    {
        diagramId: "yamaha-cylinder-head-1",
        partId: "92906-06100",
        refNo: 31,
        hotspot: [792, 68, 32, 26] as Prisma.JsonArray,
        qty: 4,
    },
    {
        diagramId: "yamaha-cylinder-head-1",
        partId: "92906-06600",
        refNo: 32,
        hotspot: [804, 116, 40, 30] as Prisma.JsonArray,
        qty: 4,
    },
    {
        diagramId: "yamaha-cylinder-head-1",
        partId: "11T-11192-00",
        refNo: 20,
        hotspot: [1032, 238, 46, 30] as Prisma.JsonArray,
        qty: 1,
    },
    {
        diagramId: "yamaha-cylinder-head-1",
        partId: "91316-06055",
        refNo: 27,
        hotspot: [688, 252, 44, 30] as Prisma.JsonArray,
        qty: 8,
    },
    {
        diagramId: "yamaha-cylinder-head-1",
        partId: "92906-06600",
        refNo: 28,
        hotspot: [698, 290, 46, 32] as Prisma.JsonArray,
        qty: 8,
    },
    {
        diagramId: "yamaha-cylinder-head-1",
        partId: "16G\u201411142-00",
        refNo: 22,
        hotspot: [858, 348, 42, 32] as Prisma.JsonArray,
        qty: 2,
    },
    {
        diagramId: "yamaha-cylinder-head-1",
        partId: "16G-11152-00",
        refNo: 23,
        hotspot: [576, 448, 44, 32] as Prisma.JsonArray,
        qty: 2,
    },
    {
        diagramId: "yamaha-cylinder-head-1",
        partId: "90387-062G5",
        refNo: 29,
        hotspot: [578, 484, 42, 32] as Prisma.JsonArray,
        qty: 4,
    },
    {
        diagramId: "yamaha-cylinder-head-1",
        partId: "90153-06029",
        refNo: 5,
        hotspot: [167, 1009, 20, 26] as Prisma.JsonArray,
        qty: 1,
    },
    {
        diagramId: "yamaha-cylinder-head-1",
        partId: "90176-10033",
        refNo: 16,
        hotspot: [878, 1058, 32, 28] as Prisma.JsonArray,
        qty: 12,
    },
    {
        diagramId: "yamaha-cylinder-head-1",
        partId: "1J7-11138-00",
        refNo: 25,
        hotspot: [97, 1083, 46, 36] as Prisma.JsonArray,
        qty: 2,
    },
];

export const COMMENTS = [
    {
        id: "comment-1",
        username: "Ben",
        postedDate: "2023-03-27T07:57:11.331Z",
        diagramId: "yamaha-cylinder-head-1",
        text: "First!",
    },
    {
        id: "comment-2",
        username: "Ben",
        postedDate: "2023-03-27T07:57:11.331Z",
        diagramId: "yamaha-cylinder-head-1",
        text: "Second",
    },
    {
        id: "comment-3",
        username: "Ben",
        postedDate: "2023-03-27T07:57:11.331Z",
        diagramId: "yamaha-cylinder-head-1",
        text: "Third :(",
    },
    {
        id: "comment-4",
        username: "Ben",
        postedDate: "2023-03-27T07:57:11.331Z",
        commentId: "comment-1",
        text: "First Reply :)",
    },
];