import { css, Global } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Global styles={css`
      * {
        box-sizing: border-box;
      }
      
      html, body, #root {
        width: 100%;
        height: 100%;
      }

      html {
        overflow: hidden;
      }
      body {
        margin: 0px;
        padding: 0px;
      }
    `}/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
