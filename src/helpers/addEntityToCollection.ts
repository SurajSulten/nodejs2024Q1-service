import { v4 as uuidv4 } from 'uuid';

export const addEntityToCollection = <T extends { id: string }> (
    entityDto: Record<string, unknown>,
    collection: T[],
): T => {
    const newEntity = {
        id: uuidv4(),
        ...entityDto,
    } as T;
    collection.push(newEntity);
    return newEntity;
} 