import styled from 'styled-components';

export default styled.div`
  &::before {
    background: ${p => `url("${p.file}")`} no-repeat center center;
    background-size: cover;
    content: '';
    position: fixed;
    left: 0;
    right: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    display: block;
    filter: blur(100px);
  }
`;
