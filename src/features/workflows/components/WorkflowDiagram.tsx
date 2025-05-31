import ReactFlow, { Controls } from 'reactflow';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Start' } },
  { id: '2', position: { x: 200, y: 0 }, data: { label: 'Review' } }
];

export default function WorkflowDiagram() {
  return (
    <div style={{ height: 500, border: '1px solid #ddd', borderRadius: 4 }}>
      <ReactFlow nodes={initialNodes} fitView>
        <Controls />
      </ReactFlow>
    </div>
  );
}