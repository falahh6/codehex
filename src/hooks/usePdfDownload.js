import { codehexLogoDataURL } from "../utils/codehex-logo-DATAURL";
import jsPDF from "jspdf";

const usePdfDownload = ({
  userCode,
  codeOutput,
  codeExplanation,
  fileName,
}) => {
  const handleDownloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.setFontSize(18);
    pdf.setFont("Courier", "normal", "Bold");
    pdf.text("Code", 10, 10);

    pdf.setFontSize(8);
    pdf.setFont("Helvetica", "normal");
    pdf.text(userCode, 30, 10);

    const userCodeLines = pdf.splitTextToSize(userCode, 180);
    const userCodeHeight = userCodeLines.length * 3.2;

    pdf.setFontSize(18);
    pdf.setFont("Courier", "normal", "Bold");
    pdf.text("Output", 10, 20 + userCodeHeight);

    pdf.setFontSize(8);
    pdf.setFont("Helvetica", "normal");
    pdf.text(codeOutput, 30, 20 + userCodeHeight);

    pdf.setFontSize(18);
    pdf.setFont("Courier", "normal", "bolder");
    pdf.text("Code Explanation", 10, 60 + userCodeHeight);

    pdf.setFontSize(8);
    pdf.setFont("Courier", "normal", "bolder");
    pdf.text(codeExplanation, 30, 70 + userCodeHeight, { maxWidth: 150 });

    pdf.addImage(codehexLogoDataURL, "JPEG", 90, 260);

    pdf.save(fileName + ".pdf");
  };
  return { handleDownloadPDF };
};

export default usePdfDownload;
