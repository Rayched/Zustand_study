import React, { useEffect } from 'react';
import { useCountStore } from './store/useStore';
import { TestFetch } from './store/outlines';

function App() {
  const {count, addCount, resetCount} = useCountStore();

  const Tests = TestFetch();

  useEffect(() => console.log(Tests));

  return (
    <div>
      <h3>Click Here 👇</h3>
      <button onClick={() => addCount(count + 1)}>Click me</button>
      <button onClick={resetCount}>Reset</button>
      <h4>버튼 클릭 횟수: {count}</h4>
    </div>
  );
}

export default App;
