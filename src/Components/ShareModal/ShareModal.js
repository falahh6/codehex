import React from "react";
import { Modal, Space, Dropdown, Divider, Empty, Typography } from "antd";
import {
  DownOutlined,
  WhatsAppOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import styles from "./ShareModal.module.css";
import { useSelector } from "react-redux";
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
const ShareModal = ({ onModalOpen, onModalClose, userCode, codeOutput }) => {
  const codeExplanation = useSelector(
    (state) => state.openai.codeExplanationIni.response
  );

  const { Paragraph, Title, Text } = Typography;
  console.log(codeExplanation);
  console.log(userCode, codeOutput);
  return (
    <Modal
      title="Share your code with your fellow mate!!"
      centered
      bodyStyle={{
        height: "fit-content",
        maxHeight: "70vh",
      }}
      open={onModalOpen}
      onCancel={onModalClose}
      maskStyle={{ backgroundColor: "#74747486" }}
      className={styles.modalMain}
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
      <div className={styles.shareContentDiv}>
        {userCode.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <>
            <div>
              <Title level={5}>Code</Title>
              <pre>
                <code>{userCode}</code>
              </pre>
            </div>
            <div>
              <Title level={5}>Output</Title>
              <Text>{codeOutput}</Text>
            </div>
            <div>
              <Title level={5}>Code Explanation</Title>
              <Text>{codeExplanation}</Text>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ShareModal;
