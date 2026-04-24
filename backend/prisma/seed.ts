import {
    DIAGRAMS,
    DIAGRAM_TO_PARTS,
    MOTORCYCLES,
    PARTS,
} from "./seed-data";
import { prisma } from "../src/prisma";

async function main() {
    for (const part of PARTS) {
        await prisma.part.upsert({
            where: { id: part.id },
            update: {},
            create: part,
        });
    }

    for (const diagram of DIAGRAMS) {
        await prisma.diagram.upsert({
            where: { id: diagram.id },
            update: {},
            create: diagram,
        });
    }

    for (const motorcycle of MOTORCYCLES) {
        await prisma.motorcycle.upsert({
            where: { id: motorcycle.id },
            update: {},
            create: motorcycle,
        });
    }

    for (const diagramToPart of DIAGRAM_TO_PARTS) {
        await prisma.partToDiagram.upsert({
            where: {
                partId_diagramId: {
                    diagramId: diagramToPart.diagramId,
                    partId: diagramToPart.partId,
                },
            },
            update: diagramToPart,
            create: diagramToPart,
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
