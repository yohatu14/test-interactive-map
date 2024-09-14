// Custom hook to get entities from a JSON file
import { useCallback, useEffect, useState } from "react";
import dataEntities from "../mocks/data.json";
import { EntityInterface } from "../types/entities.interface";

export function useEntities() {
  // Check if data exists
  const hasData = dataEntities?.length > 0;
  // Set loading state
  const [loading, setLoading] = useState<boolean>(true);
  // Set entities state
  const [entities, setEntities] = useState<EntityInterface[]>([]);

  // Get entities from JSON file
  const getEntities = useCallback(() => {
    setLoading(true);
    hasData
      ?  setEntities(dataEntities)
      : [];
    setLoading(false);

  }, [hasData]);

  // Get entities on component mount
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      getEntities();
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getEntities, 500]);
  
  return { entities, getEntities, loading };
}
