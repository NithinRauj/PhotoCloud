import styled from "styled-components";

export const Loader = styled.div`
    width: 150px;
    height: 150px;
    color:#9C927D;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background:
      linear-gradient(currentColor 0 0),
      linear-gradient(currentColor 0 0),
      linear-gradient(currentColor 0 0),
      linear-gradient(currentColor 0 0);
    background-size: 40px 40px;
    background-repeat:no-repeat;
    animation: sh5 1.5s infinite cubic-bezier(0.3,1,0,1);
    @keyframes sh5 {
    0%   {background-position: 0    0,100% 0   ,100% 100%,0 100%}
    33%  {background-position: 0    0,100% 0   ,100% 100%,0 100%;width:60px;height: 60px}
    66%  {background-position: 100% 0,100% 100%,0    100%,0 0   ;width:60px;height: 60px}
    100% {background-position: 100% 0,100% 100%,0    100%,0 0   }
    }
`;