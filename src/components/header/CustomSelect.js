import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { ChevronUp } from '../../assets/filters/chevron-up';
import { ChevronDown } from '../../assets/filters/chevron-down';
import { CrossIcon } from '../../assets/filters/cross-icon';

export function CustomSelect({ name, value, options, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleSelect = useCallback(
    (val) => {
      onChange({ target: { name, value: val } });
      setOpen(false);
    },
    [name, onChange]
  );

  const handleClickOutside = useCallback((e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setOpen(false);
    }
  }, []);

  const handleToggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      handleSelect('');
    },
    [handleSelect]
  );

  const handleOptionClick = useCallback(
    (opt) => () => {
      handleSelect(opt);
    },
    [handleSelect]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <SelectWrapper ref={wrapperRef}>
      <Selected tabIndex={0} onClick={handleToggleOpen}>
        {value ? (
          <span>{value}</span>
        ) : (
          <PlaceholderText>{placeholder}</PlaceholderText>
        )}
        <IconWrapper
          onClick={value && !open ? handleClear : undefined}
          isClear={!!value}
        >
          {value && !open ? (
            <StyledCrossIcon>
              <CrossIcon
                width={16}
                height={16}
                title="CrossIcon"
                isClear={!!value}
              />
            </StyledCrossIcon>
          ) : open ? (
            <ChevronUp width={16} height={16} title="ChevronUp" />
          ) : (
            <ChevronDown width={16} height={16} title="ChevronDown" />
          )}
        </IconWrapper>
      </Selected>
      {open && (
        <OptionsList>
          <OptionItem onClick={handleOptionClick('')}>{placeholder}</OptionItem>
          {options.map((opt) => (
            <OptionItem
              key={opt}
              isSelected={value === opt}
              onClick={handleOptionClick(opt)}
            >
              {opt}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </SelectWrapper>
  );
}

const SelectWrapper = styled.div`
  position: relative;
  width: 180px;
  margin-right: 10px;

  @media (max-width: 951px) {
    width: 150px;
  }
  @media (max-width: 531px) {
    width: 240px;
  }
`;

const Selected = styled.div`
  padding: 8px 12px;
  background-color: #263750;
  border: 1px solid #83bf46;
  border-radius: 7px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 35px;
  color: white;
  transition: all 0.3s;

  &:focus {
    background-color: #334466;
    outline: none;
  }

  &:hover {
    background-color: #334466;
  }
`;

const PlaceholderText = styled.span`
  color: #b3b3b3;
`;

const IconWrapper = styled.span`
  position: absolute;
  right: 10px;
  top: 9.2px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ isClear }) => (isClear ? '#ffffff' : '#B3B3B3')};
`;

const StyledCrossIcon = styled.span`
  &:hover {
    color: #83bf46;
  }
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 115%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 7px;
  max-height: 178px;
  overflow-y: auto;
  z-index: 1000;
  color: #1e1e1e;

  &::-webkit-scrollbar {
    width: 6px;
  }

  scrollbar-width: thin;
  scrollbar-color: #aaa transparent;
`;

const OptionItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};

  &:hover {
    background-color: #83bf4633;
  }
`;
