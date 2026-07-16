"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false },
);

type PDFDownloadLinkProps = ComponentProps<NonNullable<typeof PDFDownloadLink>>;

export default function PdfDownloadButton(props: PDFDownloadLinkProps) {
  return <PDFDownloadLink {...props} />;
}
