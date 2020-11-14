import styled from 'styled-components/macro'

export const LoaderWithCancelStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  position: relative;
  margin: 40px;

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

#rotating {
  width: 35px;
  height: 35px;
  background-color: transparent;
  border-radius: 50%;
  border-top: 4px solid black;
  border-right: 4px solid #ccc;
  border-bottom: 4px solid #ccc;
  border-left: 4px solid #ccc;
  animation: rotate .8s linear infinite;
}


@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
`
