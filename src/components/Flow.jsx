import React, { useState, useCallback } from 'react';
import ReactFlow, { addEdge, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { DestinationNode, SourceNode } from './NodeType';

const initialNodes = [];
const initialEdges = [];

const nodeTypes = {
    source: SourceNode,
    destination: DestinationNode,
};

const Flow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeId, setNodeId] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [nodeType, setNodeType] = useState('source');

    const addNode = () => {
        const id = `node-${nodeId}`;
        const newNode = {
            id,
            type: nodeType,
            position: { x: nodeType === 'source' ? 100 : 400, y: nodeId * 60 },
            data: { label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} ${nodeId}` },
            draggable: true,
        };
        setNodeId(nodeId + 1);
        setNodes((nds) => [...nds, newNode]);
        closeModal();
    };

    const onConnect = useCallback((params) => {
        const sourceNode = nodes.find(node => node.id === params.source);
        const targetNode = nodes.find(node => node.id === params.target);

        if ((sourceNode.type === 'source' && targetNode.type === 'source') ||
            (sourceNode.type === 'destination' && targetNode.type === 'destination')) {
            alert('Invalid connection');
            return;
        }

        if (edges.find(edge => (edge.source === params.source && edge.target === params.target))) {
            alert('Connection already exists');
            return;
        }

        setEdges((eds) => addEdge(params, eds));
    }, [nodes, edges]);

    const onElementClick = useCallback((event, element) => {
        if (element.type === 'edge') {
            setEdges((eds) => eds.filter(edge => edge.id !== element.id));
        }
    }, []);


    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative">
            <h1 className="text-3xl font-bold mb-8">Pipeline builder</h1>
            <button
                onClick={openModal}
                className="px-4 py-2 bg-blue-500 text-white rounded shadow mb-4"
            >
                Add Node
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 space-y-4 w-96">
                        <h3 className="text-lg font-medium text-gray-900">Select Node Type</h3>
                        <div className="flex flex-col space-y-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="nodeType"
                                    value="source"
                                    checked={nodeType === 'source'}
                                    onChange={() => setNodeType('source')}
                                    className="form-radio"
                                />
                                <span className="ml-2">Add Source Node</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="nodeType"
                                    value="destination"
                                    checked={nodeType === 'destination'}
                                    onChange={() => setNodeType('destination')}
                                    className="form-radio"
                                />
                                <span className="ml-2">Add Destination Node</span>
                            </label>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={addNode}
                            >
                                Add Node
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full h-full" style={{ height: '500px' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onConnect={onConnect}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onElementClick={onElementClick}
                    fitView
                    nodeTypes={nodeTypes} // Register custom node types
                >
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
        </div>
    );
};

export default Flow;
