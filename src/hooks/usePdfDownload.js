import { codehexLogoDataURL } from "../utils/codehex-logo-DATAURL";
import jsPDF from "jspdf";

const usePdfDownload = ({ userCode, codeOutput, codeExpl, fileName }) => {
  const handleDownloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.setFontSize(18);
    pdf.setFont("Courier", "normal", "Bold");
    pdf.text("Code", 10, 10);

    pdf.setFontSize(10);
    pdf.setFont("Helvetica", "normal");
    pdf.text(userCode, 30, 10);

    pdf.setFontSize(18);
    pdf.setFont("Courier", "normal", "Bold");
    pdf.text("Output", 10, 140);

    pdf.setFontSize(10);
    pdf.setFont("Helvetica", "normal");
    pdf.text(codeOutput, 10, 150);

    pdf.setFontSize(18);
    pdf.setFont("Courier", "normal", "bolder");
    pdf.text("Code Explanation", 10, 170);

    pdf.setFontSize(10);
    pdf.setFont("Courier", "normal", "bolder");
    pdf.text(codeExpl, 10, 180, { maxWidth: 180 });

    pdf.addImage(codehexLogoDataURL, "JPEG", 90, 260);

    pdf.save(fileName + ".pdf");
  };
  return { handleDownloadPDF };
};

export default usePdfDownload;
