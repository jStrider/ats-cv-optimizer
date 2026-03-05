"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function PDFDownloadButton({ cvText }: { cvText: string }) {
  const handleDownload = async () => {
    const { pdf, Document, Page, Text, View, StyleSheet, Font } = await import(
      "@react-pdf/renderer"
    );

    Font.register({
      family: "Helvetica",
      src: undefined as unknown as string,
    });

    const styles = StyleSheet.create({
      page: {
        padding: 40,
        fontSize: 11,
        fontFamily: "Helvetica",
        lineHeight: 1.5,
      },
      section: {
        marginBottom: 8,
      },
      heading: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 4,
        marginTop: 10,
        textTransform: "uppercase" as const,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        paddingBottom: 2,
      },
      text: {
        fontSize: 11,
        marginBottom: 2,
      },
    });

    const lines = cvText.split("\n");

    const MyDocument = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          {lines.map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return <View key={i} style={{ height: 6 }} />;

            const isHeading =
              trimmed === trimmed.toUpperCase() &&
              trimmed.length > 2 &&
              trimmed.length < 60 &&
              !trimmed.match(/^\d/);

            return (
              <View key={i} style={styles.section}>
                <Text style={isHeading ? styles.heading : styles.text}>
                  {trimmed}
                </Text>
              </View>
            );
          })}
        </Page>
      </Document>
    );

    const blob = await pdf(<MyDocument />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cv-optimise.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleDownload} className="gap-2">
      <Download className="h-4 w-4" />
      Telecharger en PDF
    </Button>
  );
}
