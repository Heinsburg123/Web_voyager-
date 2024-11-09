"use client"

import React from 'react';
import dynamic from 'next/dynamic';
import { fetchGraphData } from '../lib/actions';

const Graph = dynamic(() => import('react-graph-vis'), { ssr: false });

export default function GraphView(graphData) {
    const graph = {
        nodes: [
            { id: 1, label: "node 1", level: 0 },  // Root node on the left
            { id: 2, label: "node 2", level: 1 },
            { id: 3, label: "node 3", level: 2 },
            { id: 4, label: "node 4", level: 1 },
            { id: 5, label: "node 5", level: 1 },
            { id: 6, label: "node 6", level: 3 },
            { id: 7, label: "node 7", level: 4 },
            { id: 8, label: "node 8", level: 5 },
            { id: 9, label: "node 9", level: 6 },
            { id: 10, label: "node 10", level: 7 },
            { id: 11, label: "node 11", level: 8 },
        
        ],
        edges: [
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 1, to: 4 },
            { from: 1, to: 5 },
            { from: 3, to: 6 },
            { from: 6, to: 7 },
            { from: 7, to: 8 },
            { from: 8, to: 9 },
            { from: 9, to: 10 },
            { from: 10, to: 11 },
        ],
    };
    const data = graphData
    const options = {
        layout: {
            hierarchical: {
                direction: "LR",   // Left-to-right layout
                nodeSpacing: 220,  // Adjust spacing between nodes
                levelSeparation: 150,  // Adjust separation between levels
            },
        },
        interaction: {
            navigationButtons: true,
            zoomSpeed: 0.2,
        },
        edges: {
            color: "#ed8772",
            width: 3,
        },
        height: "100%",
        nodes: {
            shape: "circle",
            color: {
                background: "#23596d",
                border: "#87bcc7",
            },
            font: {
                color: "white",
            },
        },
    };

    return (
        <div className = "h-screen">
            <Graph
                graph={graph}
                options={options}
            />
        </div>
    );
}
