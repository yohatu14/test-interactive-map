// entities.interface.ts
export interface Connection {
    id: string;
    relationship: string;
    strength: number;
  }
  
  export interface Position {
    distance: number;
    angle: number;
  }
  
  export interface Details {
    species?: string;
    affiliation?: string;
    type?: string;
    status?: string;
    planet?: string;
    color?: string;
  }
  
  export interface EntityInterface {
    id: string;
    type: string;
    name: string;
    description: string;
    position: Position;
    details: Details;
    connections: Connection[];
  }
  