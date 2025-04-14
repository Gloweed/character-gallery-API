import styled from 'styled-components';
import { Logo } from './Logo';
import { useEffect, useState, useCallback } from 'react';
import { useData } from '../providers';
import { CustomSelect } from './CustomSelect';

export function Header() {
  const { setApiURL, filtersValues, setActivePage } = useData();

  const getFiltersFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);

    return {
      name: urlParams.get('name') || '',
      status: urlParams.get('status') || '',
      species: urlParams.get('species') || '',
      type: urlParams.get('type') || '',
      gender: urlParams.get('gender') || ''
    };
  };

  const [filters, setFilters] = useState(getFiltersFromURL());

  useEffect(() => {
    if (
      filtersValues?.statuses &&
      filtersValues?.species &&
      filtersValues?.genders
    ) {
      setFilters(getFiltersFromURL());
    }
  }, [filtersValues]);

  const updateURL = (params) => {
    const search = params.toString();
    const newURL = search ? `?${search}` : '/';
    window.history.pushState(null, '', newURL);
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(filters);
    updateURL(params);
    setApiURL(
      `https://rickandmortyapi.com/api/character/?${params.toString()}`
    );
    setActivePage(0);
  }, [filters, setApiURL, setActivePage]);

  const resetFilters = useCallback(() => {
    const initial = {
      name: '',
      status: '',
      species: '',
      type: '',
      gender: ''
    };
    setFilters(initial);
    updateURL(new URLSearchParams());
    setApiURL('https://rickandmortyapi.com/api/character');
    setActivePage(0);
  }, [setApiURL, setActivePage]);

  return (
    <HeaderContainer>
      <Logo />
      <Filters>
        <CustomSelect
          name="status"
          value={
            filters.status.charAt(0).toUpperCase() +
            filters.status.slice(1).toLowerCase()
          }
          onChange={handleInputChange}
          options={filtersValues?.statuses || []}
          placeholder="Status"
        />

        <CustomSelect
          name="gender"
          value={
            filters.gender.charAt(0).toUpperCase() +
            filters.gender.slice(1).toLowerCase()
          }
          onChange={handleInputChange}
          options={filtersValues?.genders || []}
          placeholder="Gender"
        />

        <CustomSelect
          name="species"
          value={
            filters.species.charAt(0).toUpperCase() +
            filters.species.slice(1).toLowerCase()
          }
          onChange={handleInputChange}
          options={filtersValues?.species || []}
          placeholder="Species"
        />
        <Input
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleInputChange}
        />
        <Input
          name="type"
          placeholder="Type"
          value={filters.type}
          onChange={handleInputChange}
        />
        <ButtonContainer>
          <Button onClick={applyFilters}>Apply</Button>
          <Button isRed onClick={resetFilters}>
            Reset
          </Button>
        </ButtonContainer>
      </Filters>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 951px) {
    flex-direction: column;
  }
`;

const Filters = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 20px;
  grid-template-columns: repeat(3, 180px);
  justify-content: center;

  @media (max-width: 951px) {
    grid-template-columns: repeat(3, 150px);
  }
  @media (max-width: 531px) {
    grid-template-columns: repeat(1, 240px);
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 7px;
  border: 1px solid #83bf46;
  background-color: #263750;
  font-size: 16px;
  width: 180px;
  transition: all 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;

  @media (max-width: 951px) {
    width: 150px;
  }
  @media (max-width: 531px) {
    width: 240px;
  }

  &:focus {
    background-color: #334466;
    outline: none;
  }

  &:hover {
    background-color: #334466;
  }

  &:placeholder {
    color: #b3b3b3;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 531px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 7px;
  border: 1px solid;
  background-color: transparent;
  width: 85px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  ${({ isRed }) =>
    isRed
      ? 'border-color: #FF5152; color: #FF5152;'
      : 'border-color: #83BF46; color: #83BF46;'}

  @media (max-width: 951px) {
    width: 70px;
    padding: 10px 13px;
  }
  @media (max-width: 531px) {
    width: 240px;
  }

  &:hover {
    color: white;
    ${({ isRed }) =>
      isRed ? 'background-color: #FF5152;' : 'background-color: #83BF46;'}
  }
`;
