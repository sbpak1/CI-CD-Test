import React, { useState, useEffect } from 'react';
import './index.css';
import characterImg from './assets/character.png';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('반가워요! 무엇을 도와드릴까요?');

  useEffect(() => {
    fetch('/api/count')
      .then(res => res.json())
      .then(data => {
        setCount(data.count);
      });
  }, []);

  const clickPlus = () => {
    fetch('/api/count', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'INC' })
    })
    .then(res => res.json())
    .then(data => {
      setCount(data.count);
      setMessage(getRandomMessage('INC'));
    });
  };

  const clickMinus = () => {
    fetch('/api/count', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'DEC' })
    })
    .then(res => res.json())
    .then(data => {
      setCount(data.count);
      setMessage(getRandomMessage('DEC'));
    });
  };

  const getRandomMessage = (type) => {
    const incMessages = [
      '나이스! 숫자가 올라갔어요!',
      '오오, 대단한데요?',
      '더 높이 올라가 볼까요?',
      '좋은 페이스예요!',
      '숫자가 늘어나니 기분이 좋네요!'
    ];
    const decMessages = [
      '어라? 줄어들고 있어요...',
      '조금 아쉽네요 ㅠㅠ',
      '다시 올릴 수 있을 거예요!',
      '숫자가 작아지는 중...',
      '괜찮아요, 다시 시작해봐요!'
    ];
    const list = type === 'INC' ? incMessages : decMessages;
    return list[Math.floor(Math.random() * list.length)];
  };

  return (
    <div className="app-container">
      <div className="character-section">
        <div className="speech-bubble">{message}</div>
        <img src={characterImg} alt="AI Assistant" className="character-image" />
      </div>
      
      <div className="counter-section">
        <h1 className="title">AI Smart Counter</h1>
        <div className="count-display">{count}</div>
        
        <div className="button-group">
          <button onClick={clickPlus}>증가 (+)</button>
          <button onClick={clickMinus}>감소 (-)</button>
        </div>
        
        <p className="footer">Sungbin Project v2.0 - Powered by AI</p>
      </div>
    </div>
  );
}

export default App;