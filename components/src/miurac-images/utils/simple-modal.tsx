import { Modal } from '@mantine/core';
import { IconClearAll } from '@tabler/icons';
import React from 'react';


type modalProps = {
  open: boolean,
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void | undefined,
  children?: React.ReactNode,
  style?: React.CSSProperties,
  className?: string,
}

const SimpleModal = ({ open, onClose, children, style}: modalProps) => {
  return (
    <Modal
      opened={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      centered
      size="xl"
      
    >
      <div 
      style={{minHeight:500}}
      >  
        {children}

      </div>
    </Modal>
  );
}

export default SimpleModal