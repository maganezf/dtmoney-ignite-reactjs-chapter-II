import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useTransactionsContext } from '../../contexts/TransactionsContext';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { NewTransactionInputType } from '../../types/transaction';
import { Container, RadioxBox, TransactionTypeContainer } from './styles';

Modal.setAppElement('#root');

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestCloseModal: () => void;
}

export const NewTransactionModal = ({
  isOpen,
  onRequestCloseModal,
}: NewTransactionModalProps) => {
  const { createTransaction } = useTransactionsContext();

  const [newTransaction, setNewTransaction] = useState<NewTransactionInputType>(
    {
      title: '',
      amount: 0,
      category: '',
      type: 'deposit',
    }
  );

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setNewTransaction({
      ...newTransaction,
      [event.target.name]: event.target.value,
    });
  }

  async function handleCreateNewTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await createTransaction({
      title: newTransaction.title,
      amount: newTransaction.amount,
      category: newTransaction.category,
      type: newTransaction.type,
    });

    setNewTransaction({
      title: '',
      amount: 0,
      category: '',
      type: 'deposit',
    });

    onRequestCloseModal();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestCloseModal}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Título"
          name="title"
          value={newTransaction.title}
          onChange={handleChangeInput}
        />

        <input
          type="number"
          min={0}
          placeholder="Valor"
          name="amount"
          value={newTransaction.amount}
          onChange={handleChangeInput}
        />

        <TransactionTypeContainer>
          <RadioxBox
            type="button"
            isActive={newTransaction.type === 'deposit'}
            activeColor="green"
            onClick={() =>
              setNewTransaction({ ...newTransaction, type: 'deposit' })
            }
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioxBox>

          <RadioxBox
            type="button"
            isActive={newTransaction.type === 'withdraw'}
            activeColor="red"
            onClick={() =>
              setNewTransaction({ ...newTransaction, type: 'withdraw' })
            }
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioxBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          name="category"
          value={newTransaction.category}
          onChange={handleChangeInput}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
};
