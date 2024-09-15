import {
  IconAlertTriangle,
  IconCheck,
  IconInfoCircle,
  IconX,
} from '@tabler/icons-react';
import { defaultErrorMessage } from './errorMessages';
import { showNotification } from '@mantine/notifications';

export const sendNotification = ({
  title,
  message,
  status,
}: {
  title?: string;
  message?: string;
  status: 'success' | 'failed' | 'info' | 'warning';
}) => {
  let color = 'green';
  let icon = <IconCheck />;
  switch (status) {
    case 'failed':
      color = 'red';
      icon = <IconX />;
      break;
    case 'info':
      color = 'blue';
      icon = <IconInfoCircle />;
      break;
    case 'warning':
      color = 'yellow';
      icon = <IconAlertTriangle />;
      break;

    default:
      break;
  }
  showNotification({
    id: `reg-err-${Math.random()}`,
    autoClose: 5000,
    title:
      title ??
      (() => {
        switch (status) {
          case 'failed':
            return 'Error!';
          case 'info':
            return 'Note!';
          case 'success':
            return 'Success!';
          case 'warning':
            return 'Warning!';
          default:
            return 'information';
        }
      })(),
    message: message ?? defaultErrorMessage,
    color,
    icon,
    loading: false,
  });
};
