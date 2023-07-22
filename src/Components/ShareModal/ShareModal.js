import React, { useState } from "react";
import { Modal, Space, Dropdown, Divider } from "antd";
import {
  DownOutlined,
  WhatsAppOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import styles from "../../Pages/Playground/Compiler.module.css";
const items = [
  {
    label: "Share on Whatsapp",
    key: "1",
    icon: <WhatsAppOutlined />,
  },
  {
    label: "Save as PDF",
    key: "2",
    icon: <FileAddOutlined />,
  },
];
const ShareModal = ({ onModalOpen, onModalClose }) => {
  return (
    <Modal
      title="Share your code with your fellow mate!!"
      centered
      open={onModalOpen}
      onCancel={onModalClose}
      maskStyle={{ backgroundColor: "#74747486" }}
      footer={
        <Space align="end">
          <Dropdown.Button
            icon={<DownOutlined />}
            menu={{
              items,
            }}
          >
            Share
          </Dropdown.Button>
        </Space>
      }
    >
      <Divider className={styles.modalDivider} />
      <p className={styles.modalP}>
        You can choose what all you want to share with your friend from this
        page.
      </p>
      <div className={styles.shareContentDiv}></div>
    </Modal>
  );
};

export default ShareModal;
