import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        marginTop: '20px',
        marginBottom: '20px',
        background: '#f9f9f9',
      }}
    >
      <h3>React Counter</h3>
      <p>
        Current count: <strong>{count}</strong>
      </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#4f6df5',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          marginRight: '8px',
          cursor: 'pointer',
        }}
      >
        Increment
      </button>
      <button
        onClick={() => setCount(0)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#f54f4f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Reset
      </button>
    </div>
  );
}
