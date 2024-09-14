// components/Navbar.tsx
import React from 'react';
import styles from '../styles/filters.module.css';

interface NavbarProps {
  selectedEntityTypes: string[];
  entityColors: Record<string, string>;
  onFilterChange: (type: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ selectedEntityTypes, entityColors, onFilterChange }) => {
  // Render the navbar with the filters
  return (
    <nav className={styles.navbar}>
      <div className={styles.filters}>
      <h5>Filter by entity:</h5>
        {Object.keys(entityColors).map(type => (
          <label key={type} className={styles.filterItem}>
            <input
              type="checkbox"
              checked={selectedEntityTypes.includes(type)}
              onChange={() => onFilterChange(type)}
            />
            <span style={{ backgroundColor: entityColors[type] }} className={styles.filterLabel}>
              {type}
            </span>
          </label>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
