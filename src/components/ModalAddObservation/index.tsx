import React, { useRef, useCallback } from 'react';
import { Add } from '@material-ui/icons';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface Product {
  id: number;
  observacao: string;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  addingObservation: Product;
  handleAddObservation: (product: Omit<Product, 'id'>) => void;
}

interface AddObservationData {
  observacao: string;
}

const ModalAddObservation: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  addingObservation,
  handleAddObservation,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: AddObservationData) => {
      const { observacao } = data;

      handleAddObservation({
        observacao,
      });

      setIsOpen();
    },
    [handleAddObservation, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={addingObservation}
      >
        <h1>Adicionar observação</h1>

        <Input name="observacao" placeholder="Observação" />

        <button type="submit">
          <div className="text">Adicionar observação</div>
          <div className="icon">
            <Add />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddObservation;
