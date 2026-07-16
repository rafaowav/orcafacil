"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

type PDFViewerProps = ComponentProps<NonNullable<typeof PDFViewer>>;

export default function PdfPreview(props: PDFViewerProps) {
  return <PDFViewer {...props} />;
}
