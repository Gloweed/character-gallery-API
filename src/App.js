import styled, { createGlobalStyle } from 'styled-components';
import { Pagination, ItemsGrid, useData, Header, AppState } from './components';

export function App() {
  const { isFetching, isError } = useData();

  return (
    <Main>
      <GlobalStyle />

      <Header />

      <AppState />

      {!isFetching && !isError && (
        <>
          <ItemsGrid />

          <Pagination />
        </>
      )}
    </Main>
  );
}

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;
  max-width: 80%;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 95%;
  }

  @media (max-width: 930px) {
    max-width: 85%;
  }

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;

const GlobalStyle = createGlobalStyle`
 * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto';
  background-color: #001832;
}

html, body, #root {
  height: 100%;
}
`;
