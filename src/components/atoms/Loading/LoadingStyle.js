import styled from 'styled-components/macro'

export const LoadingStyle = styled.div`
  width: 40px;
  margin: 15px;

  .dot-flashing {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-left: 15px;
    background-color: #a0a0a0;
    color: #a0a0a0;
    animation: dotFlashing 0.4s infinite linear alternate;
    animation-delay: .2s;
  }

  .dot-flashing::before, .dot-flashing::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }

  .dot-flashing::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #a0a0a0;
    color: #a0a0a0;
    animation: dotFlashing 0.4s infinite alternate;
    animation-delay: 0s;
  }

  .dot-flashing::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #a0a0a0;
    color: #a0a0a0;
    animation: dotFlashing 0.4s infinite alternate;
    animation-delay: 0.4s;
  }

  @keyframes dotFlashing {
    0% {
      background-color: #a0a0a0;
    }
    50%,
    100% {
      background-color: #e0e0e0;
    }
  }
`
