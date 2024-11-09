"use client"

import React from 'react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import clsx from 'clsx';

const Graph = dynamic(() => import('react-graph-vis'), { ssr: false });

export default function GraphView({graphData}) {
    var graph = {
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

    var data = graphData;
    var rAdj = [], Level = [];

    function dfs(u) {
        if (Level[u] != -1) return;
        for(var i = 0; i < rAdj[u].length; ++i) {
            var v = rAdj[u][i]; 
            dfs(v);
            Level[u] = Math.max(Level[u], Level[v]); 
        }
        Level[u] ++;
    }

    function createGraph() {
        var graph = {};
        graph.nodes = [];
        graph.edges = [];

        for(var i = 0; i < data.header.length; ++i) {
            rAdj[i] = []; 
            Level[i] = -1; 
        }

        for(var i = 0; i < data.adj.length; ++i) {
            for(var j = 0; j < data.adj[i].length; ++j) {
                graph.edges.push({from: i, to: data.adj[i][j], smooth: { type: 'curvedCW', roundness: 0.9 }}); 
                rAdj[data.adj[i][j]].push(i); 
            }
        }

        Level[0] = 0; 
        for(var i = 1; i < data.header.length; ++i) {
            dfs(i);  
        }

        for(var i = 0; i < data.header.length; ++i) {
            graph.nodes.push({id: i, label: data.header[i], level: Level[i]}); 
        }
        
        return graph;        
    }
    //const data2 = createGraph();
    //console.log( data2 ); 
    graph = createGraph();
    console.log(Level);

    const options = {
        layout: {
            hierarchical: {
                direction: "LR",   // Left-to-right layout
                nodeSpacing: 220,  // Adjust spacing between nodes
                levelSeparation: 120,  // Adjust separation between levels
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

    const events = {
        select: ({ nodes }) => {
            //lam trong day
            setBoxState(() => "on")
        },
      };

    const [boxState, setBoxState] = useState("off")

    return (
        <div className = "h-screen relative">
            <Graph
                graph={graph}
                options={options}
                events = {events}
            />
            <div 
                className={clsx(
                    'absolute top-0 right-0 h-screen bg-slate-900 w-1/4',
                    {
                        'hidden': boxState === "off",
                        'block': boxState === "on"
                    }
                )}
            >
            
            </div>
        </div>
    );
}
