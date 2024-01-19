
import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

// Custom node component for a square
export const SquareNode: React.FC<NodeProps> = ({ id, data }) => {
    return (
        <div className="custom-node square-node" style={{ background: data.background }}>
            <Handle type="target" position={Position.Top} />
            <div className="shape">Square: {data.label}</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

// Custom node component for a rectangle
export const RectangleNode: React.FC<NodeProps> = ({ id, data }) => {
    return (
        <div className="custom-node rectangle-node" style={{ background: data.background }}>
            <Handle type="target" position={Position.Top} />
            <div className="shape">Rectangle: {data.label}</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

// Add more custom shapes here as needed