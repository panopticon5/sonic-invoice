import { Notification } from '@mantine/core';
import { IconCheck, IconAlertCircle } from '@tabler/icons-react';

type NotificationVariant = 'success' | 'error';

interface NotificationBannerProps {
  message: string | null;
  onClose: () => void;
  variant?: NotificationVariant;
}

export const NotificationBanner = ({ 
  message, 
  onClose, 
  variant = 'success' 
}: NotificationBannerProps) => {
  if (!message) return null;

  const notificationProps = {
    success: {
      icon: <IconCheck size={18} />,
      color: 'teal',
      title: 'Success',
    },
    error: {
      icon: <IconAlertCircle size={18} />,
      color: 'red',
      title: 'Error',
    },
  };

  const { icon, color, title } = notificationProps[variant];

  return (
    <Notification
      icon={icon}
      color={color}
      title={title}
      onClose={onClose}
      mb="lg"
    >
      {message}
    </Notification>
  );
};
