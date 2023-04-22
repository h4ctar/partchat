import { PrismaClient } from "@prisma/client";
import {
    DIAGRAMS,
    DIAGRAM_TO_PARTS,
    MOTORCYCLES,
    MOTORCYCLE_TO_DIAGRAMS,
    PARTS,
} from "./seed-data";

const prisma = new PrismaClient();

async function main() {
    for (const motorcycle of MOTORCYCLES) {
        await prisma.motorcycle.upsert({
            where: { id: motorcycle.id },
            update: motorcycle,
            create: motorcycle,
        });
    }

    for (const diagram of DIAGRAMS) {
        const motorcycle = MOTORCYCLE_TO_DIAGRAMS.find(
            (motorcycleToDiagram) =>
                motorcycleToDiagram.diagramId === diagram.id,
        );
        const diagramModel = {
            ...diagram,
            ...(motorcycle
                ? {
                      motorcycles: {
                          connect: { id: motorcycle?.motorcycleId },
                      },
                  }
                : {}),
        };
        await prisma.diagram.upsert({
            where: { id: diagram.id },
            update: diagramModel,
            create: diagramModel,
        });
    }

    for (const part of PARTS) {
        await prisma.part.upsert({
            where: { id: part.id },
            update: part,
            create: part,
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
