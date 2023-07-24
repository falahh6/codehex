import React, { useRef, useState } from "react";
import {
  Modal,
  Space,
  Dropdown,
  Divider,
  Empty,
  Typography,
  Checkbox,
  Input,
} from "antd";
import {
  DownOutlined,
  WhatsAppOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import styles from "./ShareModal.module.css";
import { useSelector } from "react-redux";
import usePdfDownload from "../../hooks/usePdfDownload";
const ShareModal = ({ onModalOpen, onModalClose, userCode, codeOutput }) => {
  const codeExplanation = useSelector(
    (state) => state.openai.codeExplanationIni.response
  );
  const contentSharingRef = useRef();

  const { Title, Text } = Typography;
  const [shouldShareExplanation, setShouldShareExplanation] = useState(false);
  const [fileName, setFileName] = useState("");

  const shareSelectionHandler = {
    userCode,
    codeOutput,
    codeExpl: shouldShareExplanation ? codeExplanation : null,
    fileName,
  };

  const fileNameSetHandler = (e) => {
    setFileName(e.target.value);
  };

  const { handleDownloadPDF } = usePdfDownload(shareSelectionHandler);

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
      onClick: handleDownloadPDF,
    },
  ];

  const checkCodeExplanatioHandler = () => {
    setShouldShareExplanation((prevState) => !prevState);
  };

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

      <Input
        placeholder="Enter your file name. Eg. Lab Program 1"
        suffix=".pdf"
        value={fileName}
        onChange={fileNameSetHandler}
      />
      <p className={styles.modalP}>
        You can choose what all you want to share with your friend from this
        page.
      </p>
      <div className={styles.shareContentDiv} ref={contentSharingRef}>
        {userCode.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <>
            <div>
              <Title className={styles.firstTitle} level={5}>
                {" "}
                <Checkbox checked disabled className={styles.checkbox} /> Code
              </Title>
              <pre>
                <code>{userCode}</code>
              </pre>
            </div>
            <div>
              <Title level={5}>
                {" "}
                <Checkbox checked disabled className={styles.checkbox} /> Output
              </Title>
              <Text>{codeOutput}</Text>
            </div>
            <div>
              <Title level={5}>
                {" "}
                <Checkbox
                  checked={shouldShareExplanation}
                  onChange={checkCodeExplanatioHandler}
                  className={styles.checkbox}
                />
                Code Explanation
              </Title>
              <Text>{codeExplanation}</Text>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ShareModal;
