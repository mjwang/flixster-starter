import { useCallback, useState } from "react";

export default function useModal() {
  const [modalProps, setModalProps] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(
    (props) => {
      setIsModalVisible(true);
      setModalProps(props);
    },
    [setIsModalVisible, setModalProps],
  );

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, [setIsModalVisible]);

  return {
    isModalVisible: isModalVisible,
    modalProps: modalProps,
    showModal: showModal,
    closeModal: closeModal,
  };
}
