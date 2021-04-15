import * as pdfMake from 'pdfmake/build/pdfmake.js';
import { Column } from './table-options';

export const generatePDF = (columns: Column[], data: any[], name?: string) => {
  const headers: any[] = [];
  const dataRows: any[] = [];

  const date = new Date();

  columns.forEach((col) => {
    if (!col.hidden) {
      const header: any = {};
      header.text = col.title;
      header.style = 'tableHeader';
      headers.push(header);
    }
  });

  dataRows.push(headers);
  data.forEach((item) => {
    const currentRow: any[] = [];
    headers.forEach((column) => {
      currentRow.push(item[column.text]);
    });
    dataRows.push(currentRow);
  });

  const docDefinition: any = {
    pageOrientation: 'landscape',
    header: {
      columns: [
        { text: 'ProCompliance', margin: [20, 20], style: 'header' },
        {
          text: `Reporte de ${name}`,
          margin: [20, 20],
          style: 'header',
          alignment: 'center',
        },
        {
          text: `Fecha de impresión: ${date.toLocaleString()}`,
          margin: [20, 20],
          alignment: 'right',
        },
      ],
    },
    pageMargins: [40, 60, 40, 60],
    content: [{ table: { headerRows: 1, body: dataRows } }],
    styles: {
      header: { fontSize: 18, bold: true },
      tableHeader: { bold: true, fillColor: '#287FB9', color: '#fff' },
      anotherStyle: { fontSize: 13, italics: true, alignment: 'right' },
    },
    footer: (currentPage, pageCount) => ({
      text: `Pág. ${currentPage.toString()} de ${pageCount}`,
      alignment: 'right',
      margin: [20, 20],
    }),
  };

  pdfMake.createPdf(docDefinition).open();
};
