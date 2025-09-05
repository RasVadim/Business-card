import { useCallback } from 'react';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const useExportPDF = () => {
  const exportToPDF = useCallback(async (elementId: string, filename: string = 'CV.pdf') => {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        console.error('Element not found');
        return;
      }

      // Convert HTML element to canvas
      const canvas = await html2canvas(element, {
        scale: 4, // Increase quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Get page sizes
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate image sizes
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      // If image is bigger than page, scale it
      if (imgHeight > pageHeight) {
        const scaledHeight = pageHeight;
        const scaledWidth = (canvas.width * pageHeight) / canvas.height;
        pdf.addImage(imgData, 'PNG', (pageWidth - scaledWidth) / 2, 0, scaledWidth, scaledHeight);
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }

      // Save PDF
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }, []);

  return { exportToPDF };
};
