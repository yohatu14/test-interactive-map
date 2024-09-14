import React, { useMemo, useState } from 'react';
import { entitiesTypes, entityColors } from '../constants/index'

// Custom hook to filter entities by type
export const useFiltersByEntity = () => {
    // Set the selected entity types
    const [selectedEntityTypes, setSelectedEntityTypes] = useState<string[]>(entitiesTypes);
    // Memoize the entity colors
    const entityColorsMemo = useMemo(() => (entityColors), []);

    // Handle filter change
    const handleFilterChange = (type: string) => {
        setSelectedEntityTypes((prev: string[]) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    return { selectedEntityTypes, entityColorsMemo, handleFilterChange }
}


