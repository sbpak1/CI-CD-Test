import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // 1. 처음 로딩되면 DB에서 값 가져오기
  useEffect(() => {
    console.log('화면 켜짐');
    fetch('/api/count')
      .then(res => res.json())
      .then(data => {
        console.log('DB에서 받은 값:', data);
        setCount(data.count);
      });
  }, []);

  // 2. 증가 버튼 함수
  const clickPlus = () => {
    fetch('/api/count', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'INC' })
    })
    .then(res => res.json())
    .then(data => {
      setCount(data.count);
    });
  };

  // 3. 감소 버튼 함수
  const clickMinus = () => {
    fetch('/api/count', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'DEC' })
    })
    .then(res => res.json())
    .then(data => {
      setCount(data.count);
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>DB Counter</h1>
      
      {/* 숫자 나오는 곳 */}
      <h1>{count}</h1>

      {/* 버튼들 */}
      <div>
        <button onClick={clickPlus} style={{ marginRight: '10px' }}>
          증가 (+)
        </button>
        
        <button onClick={clickMinus}>
          감소 (-)
        </button>
      </div>
    </div>
  );
}

export default App;