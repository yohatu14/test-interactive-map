"use client";

import DrawMap from "../components/DrawMap";
import Navbar from "../components/Navbar";
import { useEntities } from '../hooks/useEntitiesJSON';
import { useFiltersByEntity } from "../hooks/useFiltersByEntity";
import styles from '../styles/map.module.css'

// Map page
export default function Map() {
  // Get entities from JSON file
  const { entities, loading } = useEntities();
  // Get selected entity types and colors
  const { selectedEntityTypes, entityColorsMemo, handleFilterChange } = useFiltersByEntity();

  return (
    <>
      <header>
        <h1>Galactic Intelligence Network:</h1>
        <div>
          <Navbar
            selectedEntityTypes={selectedEntityTypes}
            entityColors={entityColorsMemo}
            onFilterChange={handleFilterChange}
          />
        </div>
      </header>
      <>
        <div className="flex justify-center items-center h-screen bg-white">
          {loading ? (
            <div className={styles.spinner}></div>
          ) : (
            <DrawMap data={entities} selectedEntityTypes={selectedEntityTypes} />
          )}
        </div>

      </>
    </>

  );
}