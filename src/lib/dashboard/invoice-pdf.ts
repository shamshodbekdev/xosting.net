import type { Invoice } from "./types";

/*
 * Brauzerda oddiy PDF hisob-faktura yaratadi (tashqi kutubxonasiz).
 * PDF ning standart shriftlari faqat lotin belgilarini qo'llab-quvvatlagani
 * uchun hujjat ingliz tilida tuziladi. Backend tayyor bo'lgach, bu funksiya
 * serverdan tayyor PDF yuklab olish bilan almashtiriladi.
 */

interface TextLine {
  text: string;
  x: number;
  y: number;
  size: number;
  bold?: boolean;
}

const ascii = (value: string) => value.replace(/[^\x20-\x7E]/g, "");
const escapePdf = (value: string) => ascii(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
const money = (amount: number) => `${amount.toLocaleString("en-US").replace(/,/g, " ")} UZS`;

function describe(invoice: Invoice) {
  return invoice.item.kind === "service"
    ? `${invoice.item.name} - hosting service`
    : `Domain renewal: ${invoice.item.domain}`;
}

function buildPdf(lines: TextLine[], rules: number[]): Blob {
  const content = [
    ...rules.map((y) => `0.85 G 0.8 w 50 ${y} m 545 ${y} l S`),
    ...lines.map(
      (l) => `BT /${l.bold ? "F2" : "F1"} ${l.size} Tf ${l.x} ${l.y} Td (${escapePdf(l.text)}) Tj ET`
    ),
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ];

  // Hujjat to'liq ASCII, shuning uchun satr uzunligi baytlar soniga teng
  let pdf = "%PDF-1.4\n";
  const offsets = objects.map((body, i) => {
    const offset = pdf.length;
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
    return offset;
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  pdf += offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("");
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

export function downloadInvoicePdf(invoice: Invoice, customer: { fullName: string; email: string }) {
  const status = invoice.status === "paid" ? "PAID" : "PENDING";

  const lines: TextLine[] = [
    { text: "xosting.net", x: 50, y: 780, size: 22, bold: true },
    { text: "Professional hosting solutions", x: 50, y: 762, size: 10 },
    { text: "INVOICE", x: 430, y: 780, size: 20, bold: true },
    { text: invoice.number, x: 430, y: 762, size: 10 },

    { text: "Billed to", x: 50, y: 715, size: 10, bold: true },
    { text: customer.fullName, x: 50, y: 699, size: 11 },
    { text: customer.email, x: 50, y: 684, size: 11 },

    { text: "Issue date", x: 330, y: 715, size: 10, bold: true },
    { text: invoice.issuedAt, x: 430, y: 715, size: 10 },
    { text: "Due date", x: 330, y: 699, size: 10, bold: true },
    { text: invoice.dueAt, x: 430, y: 699, size: 10 },
    { text: "Status", x: 330, y: 684, size: 10, bold: true },
    { text: status, x: 430, y: 684, size: 10, bold: true },

    { text: "Description", x: 50, y: 630, size: 10, bold: true },
    { text: "Amount", x: 470, y: 630, size: 10, bold: true },
    { text: describe(invoice), x: 50, y: 600, size: 11 },
    { text: money(invoice.amount), x: 470, y: 600, size: 11 },

    { text: "Total", x: 380, y: 555, size: 12, bold: true },
    { text: money(invoice.amount), x: 470, y: 555, size: 12, bold: true },

    { text: "Thank you for choosing xosting.net", x: 50, y: 120, size: 10 },
    { text: "info@xosting.net  |  +998 94 509 49 09  |  t.me/xosting_support", x: 50, y: 104, size: 9 },
  ];

  const blob = buildPdf(lines, [742, 645, 620, 575]);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${invoice.number}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
