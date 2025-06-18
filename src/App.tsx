import React from 'react';
import { useCounterStore } from './store/useStore';

function App() {
  /*
  const count = useCounterStore((state) => state.count);
  const setCount = useCounterStore((state) => state.setCount);
  */
  const {count, setCount}= useCounterStore();

  return (
    <div>
      <h3>Click Here 👇</h3>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <h4>버튼 클릭 횟수: {count}</h4>
    </div>
  );
}

export default App;
