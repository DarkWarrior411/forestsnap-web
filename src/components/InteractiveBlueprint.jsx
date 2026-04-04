import React, { useState } from 'react';

// Nodes mapped logically to your Proposed System Architecture slide
const nodesData = [
    { id: 'edge', label: 'Edge App', sub: 'Capture & Encrypt', x: 8, y: 50, type: 'edge', icon: '📱' },
    { id: 'gw', label: 'API Gateway', sub: 'Cloud Ingestion', x: 25, y: 50, type: 'cloud', icon: '🌐' },
    { id: 'blob', label: 'Blob Storage', sub: 'Image Payloads', x: 42, y: 25, type: 'cloud', icon: '🪣' },
    { id: 'db', label: 'Metadata DB', sub: 'Event Logging', x: 42, y: 75, type: 'cloud', icon: '📊' },
    { id: 'unet', label: 'U-Net Model', sub: 'Segmentation', x: 60, y: 12, type: 'ml', icon: '🧠' },
    { id: 'resnet', label: 'ResNet-50', sub: 'Classification', x: 60, y: 38, type: 'ml', icon: '🤖' },
    { id: 'geo_api', label: 'External APIs', sub: 'Weather/Topo', x: 60, y: 88, type: 'output', icon: '☁️' },
    { id: 'fusion', label: 'Risk Engine', sub: 'Geospatial Fusion', x: 78, y: 50, type: 'output', icon: '⚙️' },
    { id: 'map', label: 'Live Map Dash', sub: 'Synchronization', x: 92, y: 30, type: 'alert', icon: '🗺️' },
    { id: 'alert', label: 'Push Alerts', sub: 'Notification Sync', x: 92, y: 70, type: 'alert', icon: '🔔' },
];

// Logical data flow matching the architecture stages
const connections = [
    { from: 'edge', to: 'gw' },
    { from: 'gw', to: 'blob' },
    { from: 'gw', to: 'db' },
    { from: 'blob', to: 'unet' },
    { from: 'blob', to: 'resnet' },
    { from: 'unet', to: 'fusion' },
    { from: 'resnet', to: 'fusion' },
    { from: 'db', to: 'fusion' },
    { from: 'geo_api', to: 'fusion' },
    { from: 'fusion', to: 'map' },
    { from: 'fusion', to: 'alert' },
];

const typeColors = {
    edge: '#4CAF50',  // Green
    cloud: '#1976D2', // Blue
    ml: '#FF9800',    // Orange
    output: '#9C27B0',// Purple
    alert: '#03A9F4'  // Light Blue
};

export default function InteractiveBlueprint({ theme }) {
    const [activeNode, setActiveNode] = useState(null);

    // Traverse graph to find all nodes connected to the clicked node (Lineage logic)
    const getLineage = (startNodeId) => {
        if (!startNodeId) return new Set();
        const connected = new Set([startNodeId]);
        let changed = true;
        while (changed) {
            changed = false;
            connections.forEach(c => {
                if (connected.has(c.from) && !connected.has(c.to)) {
                    connected.add(c.to); changed = true;
                }
                if (connected.has(c.to) && !connected.has(c.from)) {
                    connected.add(c.from); changed = true;
                }
            });
        }
        return connected;
    };

    const activeLineage = getLineage(activeNode);

    const isLineActive = (from, to) => {
        if (!activeNode) return true; // Show all by default
        return activeLineage.has(from) && activeLineage.has(to);
    };

    const isNodeActive = (id) => {
        if (!activeNode) return true;
        return activeLineage.has(id);
    };

    return (
        <div className={`w-full rounded-[2rem] p-4 md:p-8 overflow-hidden relative border transition-colors shadow-2xl ${theme === 'dark' ? 'bg-[#050507] border-gray-800' : 'bg-gray-100 border-gray-200'}`}>

            {/* Header & Legend */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 z-20 relative gap-4">
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]"></div> <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Edge</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#1976D2]"></div> <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Ingestion</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#FF9800]"></div> <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>AI/ML</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#9C27B0]"></div> <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Fusion</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#03A9F4]"></div> <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Alerting</span></div>
                </div>

                <button
                    onClick={() => setActiveNode(null)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono transition-colors border flex items-center gap-2 shadow-sm ${theme === 'dark' ? 'bg-[#111115] border-gray-700 text-gray-300 hover:text-white hover:border-[#FF4500]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#FF4500]'}`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Reset View
                </button>
            </div>

            <div className="text-center mb-4 z-20 relative">
                <p className={`text-sm font-mono opacity-60 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Tip: Click any node to explore the data lineage path.</p>
            </div>

            {/* Overflow container ensures it doesn't get squished on mobile */}
            <div className="w-full overflow-x-auto pb-8 custom-scrollbar">
                {/* Interactive Map Area */}
                <div className="relative min-w-[1000px] h-[500px] mt-4">

                    {/* Subtle Canvas Grid */}
                    <div className={`absolute inset-0 bg-[length:30px_30px] opacity-20 pointer-events-none ${theme === 'dark' ? 'bg-[radial-gradient(#ffffff_1px,transparent_1px)]' : 'bg-[radial-gradient(#000000_1px,transparent_1px)]'}`}></div>

                    {/* SVG Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill={theme === 'dark' ? '#374151' : '#D1D5DB'} />
                            </marker>
                            <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#FF4500" />
                            </marker>
                        </defs>

                        {connections.map((conn, idx) => {
                            const fromNode = nodesData.find(n => n.id === conn.from);
                            const toNode = nodesData.find(n => n.id === conn.to);
                            const active = isLineActive(conn.from, conn.to);
                            const isSelectedPath = activeNode && active;

                            // Smooth bezier curve calculating points
                            const d = `M ${fromNode.x}% ${fromNode.y}% C ${(fromNode.x + toNode.x) / 2}% ${fromNode.y}%, ${(fromNode.x + toNode.x) / 2}% ${toNode.y}%, ${toNode.x}% ${toNode.y}%`;

                            return (
                                <g key={idx}>
                                    {/* Thick background line for contrast */}
                                    <path d={d} fill="none" stroke={theme === 'dark' ? '#111116' : '#F3F4F6'} strokeWidth="8" />
                                    {/* Actual colored/animated line */}
                                    <path
                                        d={d}
                                        fill="none"
                                        stroke={isSelectedPath ? '#FF4500' : (theme === 'dark' ? '#374151' : '#D1D5DB')}
                                        strokeWidth={isSelectedPath ? "3" : "2"}
                                        strokeDasharray={isSelectedPath ? "8 8" : "none"}
                                        className={isSelectedPath ? "animate-[flow_1s_linear_infinite]" : ""}
                                        markerEnd={`url(#${isSelectedPath ? 'arrowhead-active' : 'arrowhead'})`}
                                        style={{ transition: 'all 0.4s ease' }}
                                    />
                                </g>
                            );
                        })}
                    </svg>

                    {/* HTML Nodes */}
                    {nodesData.map((node) => {
                        const active = isNodeActive(node.id);
                        const isSelected = activeNode === node.id;
                        const nodeColor = typeColors[node.type];

                        return (
                            <div
                                key={node.id}
                                onClick={() => setActiveNode(isSelected ? null : node.id)}
                                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 z-10 w-[150px]`}
                                style={{
                                    left: `${node.x}%`,
                                    top: `${node.y}%`,
                                    opacity: active ? 1 : 0.2,
                                    transform: `translate(-50%, -50%) ${isSelected ? 'scale(1.1)' : 'scale(1)'}`
                                }}
                            >
                                <div className={`rounded-xl border-[1.5px] p-2.5 shadow-xl flex items-center gap-3 transition-colors ${theme === 'dark' ? 'bg-[#111115] hover:bg-[#1a1a20]' : 'bg-white hover:bg-gray-50'}`}
                                    style={{ borderColor: isSelected ? '#FF4500' : (theme === 'dark' ? '#2A2B32' : '#E5E7EB') }}>

                                    {/* Left Icon Block */}
                                    <div className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-lg`}
                                        style={{ backgroundColor: `${nodeColor}20`, color: nodeColor }}>
                                        {node.icon}
                                    </div>

                                    {/* Text Block */}
                                    <div className="flex-grow min-w-0 text-left">
                                        <h4 className={`text-xs font-bold truncate ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                                            {node.label}
                                        </h4>
                                        <p className={`text-[9px] font-mono truncate mt-0.5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {node.sub}
                                        </p>
                                    </div>

                                    {/* Status Indicator Dot */}
                                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full border-2"
                                        style={{ backgroundColor: nodeColor, borderColor: theme === 'dark' ? '#111115' : '#ffffff' }}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <p className={`text-center font-mono text-xs mt-4 pt-4 border-t ${theme === 'dark' ? 'text-gray-600 border-gray-800/50' : 'text-gray-400 border-gray-200'}`}>
                *Architecture mapped directly from CIP67 Phase 1 Proposal
            </p>
        </div>
    );
}