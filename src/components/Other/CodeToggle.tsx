import React,  { useState } from 'react';
import "./style.css";

const CodeToggle = ({ children }) => {
  const [showCode, setShowCode] = useState(false);

 return (
    <div>
      <button onClick={() => setShowCode(!showCode)} className={"toggleButton"}>
        {showCode ? 'Hide Code' : 'Show Code'}
      </button>
      {showCode && <div className={"codeBlock"}>{children}</div>}
    </div>
  );
};

export default CodeToggle