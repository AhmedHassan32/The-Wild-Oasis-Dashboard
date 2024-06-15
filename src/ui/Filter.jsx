import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          $active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;

// I found a problem with page query. If we're in bookings with status unconfirmed and there is for e.g. 30 results, and we go to the third page (with pagination) on the unconfirmed bookings page and go to checked-in page (we filter it) our page will break because page query is 3 and in checked-in page there are only 12 result that mean that we pass the range for checked-in page.
// http://localhost:5173/bookings?page=3&status=unconfirmed

// http://localhost:5173/bookings?page=3&status=checked-in

// To fix that we need to reset the page query every time we change the status

// In the Filter.jsx in the handleClick function we add this line of code searchParams.set('page', 1);  before useSearchParams function.

// http://localhost:5173/bookings?page=3&status=unconfirmed

// http://localhost:5173/bookings?page=1&status=checked-in
