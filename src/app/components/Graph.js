"use client"

import React, { useState, useEffect,  } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

const Graph = dynamic(() => import('react-graph-vis'), { ssr: false });

export default function GraphView( {graphData} ) {
    const [selectedNodeId, setSelectedNodeId] = useState(0);

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
            // console.log(graph);
            setSelectedNodeId(0);
            // console.log(graph);
        },
      };

    const [graph, setGraph] = useState(createGraph());

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
