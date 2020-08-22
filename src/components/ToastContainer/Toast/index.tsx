import React, { useEffect } from 'react';

import { Error, Info, Close, CheckCircle } from '@material-ui/icons';

import { Container } from './styles';

import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <Info />,
  success: <CheckCircle />,
  error: <Error />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container
      type={message.type}
      hasDescription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button
        type="button"
        onClick={() => {
          removeToast(message.id);
        }}
      >
        <Close />
      </button>
    </Container>
  );
};

export default Toast;
