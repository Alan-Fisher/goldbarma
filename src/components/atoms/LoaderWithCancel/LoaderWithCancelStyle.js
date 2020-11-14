import styled from 'styled-components/macro'

export const LoaderWithCancelStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  position: relative;
  margin: 40px;


.loading-2 {
  background: black;
  .spinner {
    box-sizing: border-box;
  }
  .spinner {
    display: inline-block;
    animation-name: anim-spinner;
    animation-duration: .7s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    .circle {
      width: 2em;
      height: (2em/2);
      overflow: hidden;
    }
    .circle-inner {
      transform: rotate(45deg);
      border-radius: 50%;
      border: (2em/8) solid black;
      border-right: (2em/8) solid transparent;
      border-bottom: (2em/8) solid transparent;
      width: 100%;
      height: 200%;
      animation-name: anim-circle-1;
      animation-duration: .7s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-timing-function: cubic-bezier(.25, .1, .5, 1);
    }
    .circle-2 {
      transform: rotate(180deg);
      & .circle-inner {
        animation-name: anim-circle-2;
      }
    }
    @keyframes anim-circle-1 {
      from {
        transform: rotate(60deg);
      }
      to {
        transform: rotate(205deg);
      }
    }
    @keyframes anim-circle-2 {
      from {
        transform: rotate(30deg);
      }
      to {
        transform: rotate(-115deg);
      }
    }
    @keyframes anim-spinner {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}



#cross {
  position: absolute;
  top: 0;
  }

#cross:before, #cross:after {
  position: absolute;
  content: ' ';
  top: 14px;
  left: -1px;
  height: 15px;
  width: 2px;
  background-color: #333;
}
#cross:before {
  transform: rotate(45deg);
}
#cross:after {
  transform: rotate(-45deg);
}


`
