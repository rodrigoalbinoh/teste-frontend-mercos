import React, { useRef, useEffect, useCallback, useState } from 'react';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';
import { useField } from '@unform/core';
import { Container, Field } from './styles';

interface Props extends InputProps {
  name: string;
  label: string;
}
const InputMask: React.FC<Props> = ({ name, label, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <label htmlFor={fieldName} data-testid="input-label">
        {label}
      </label>
      <Field
        isFocused={isFocused}
        isErrored={!!error}
        data-testid="input-container"
      >
        <ReactInputMask
          ref={inputRef}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          data-testid="input"
          {...rest}
        />
      </Field>
      {error && <span>{error}</span>}
    </Container>
  );
};
export default InputMask;
