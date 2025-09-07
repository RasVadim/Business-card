import { useCallback } from 'react';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { useDevice } from './useDevice';

export const useExportPDF = () => {
  const { isMedium } = useDevice();

  const exportToPDF = useCallback(
    async (elementId: string, filename: string = 'CV.pdf') => {
      try {
        const element = document.getElementById(elementId);
        if (!element) {
          console.error('Element not found');
          return;
        }

        // Find the CV wrapper element
        const cvWrapper = element.closest('[class*="wrapper"]') as HTMLElement;
        if (!cvWrapper) {
          console.error('CV wrapper not found');
          return;
        }

        // Store original styles
        const originalTransform = cvWrapper.style.transform;
        const originalWidth = cvWrapper.style.width;
        const originalHeight = cvWrapper.style.height;

        // Temporarily reset scaling for export only on mobile devices
        if (isMedium) {
          cvWrapper.style.transform = 'none';
          cvWrapper.style.width = '880px';
          cvWrapper.style.height = 'auto';

          // Wait for styles to apply
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Convert HTML element to canvas
        const canvas = await html2canvas(element, {
          scale: 4, // Increase quality
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: element.scrollWidth,
          height: element.scrollHeight,
          logging: false,
          removeContainer: true,
        });

        // Restore original styles only if they were changed
        if (isMedium) {
          cvWrapper.style.transform = originalTransform;
          cvWrapper.style.width = originalWidth;
          cvWrapper.style.height = originalHeight;
        }

        // Create PDF
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true,
        });

        // Get page sizes
        const pageWidth = pdf.internal.pageSize.getWidth();

        // Calculate image sizes to fit page
        const imgWidth = pageWidth; // 10mm margin on each side
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add image to PDF
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // Save PDF
        pdf.save(filename);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    },
    [isMedium],
  );

  return { exportToPDF };
};
