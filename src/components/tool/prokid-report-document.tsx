import {
  Circle,
  Document,
  Image,
  Page,
  Path,
  Svg,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

type ReportResponseRow = {
  id: string;
  question: string;
  frequency: string;
  impact: string;
};

export type ProKidReportDocumentProps = {
  generatedDate: string;
  language: string;
  ageVersion: string;
  frequencyScore: number;
  impactScore: number;
  responses: ReportResponseRow[];
  umLogoSrc: string;
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    color: "#111111",
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    paddingTop: 30,
    paddingBottom: 32,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    paddingBottom: 16,
  },
  brandBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  facesBlock: {
    position: "relative",
    width: 42,
    height: 34,
  },
  brandTextBlock: {
    maxWidth: 230,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0.6,
  },
  brandTagline: {
    fontSize: 8,
    marginTop: 2,
    color: "#4B5563",
  },
  logoImage: {
    width: 126,
    height: 38,
    objectFit: "contain",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 20,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 700,
  },
  reportSubtitle: {
    marginTop: 4,
    fontSize: 10,
    color: "#4B5563",
  },
  metadataGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  metadataCard: {
    flexGrow: 1,
    flexBasis: 0,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  metadataLabel: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: "#6B7280",
  },
  metadataValue: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: 600,
  },
  scoreSection: {
    marginTop: 22,
    flexDirection: "row",
    gap: 16,
  },
  scoreCard: {
    flexGrow: 1,
    flexBasis: 0,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 14,
  },
  scoreLabel: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    color: "#374151",
    marginBottom: 10,
  },
  scoreWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  scoreRing: {
    width: 70,
    height: 70,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreValueBlock: {
    justifyContent: "center",
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 700,
  },
  scoreOutOf: {
    fontSize: 9,
    color: "#6B7280",
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: 700,
  },
  table: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tableRowLast: {
    borderBottomWidth: 0,
  },
  questionColumn: {
    width: "50%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  valueColumn: {
    width: "25%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  lastValueColumn: {
    width: "25%",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  tableHeaderText: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    color: "#374151",
  },
  tableText: {
    fontSize: 9,
    color: "#111827",
  },
  disclaimer: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 9,
    color: "#374151",
  },
  footer: {
    position: "absolute",
    left: 30,
    right: 30,
    bottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  footerText: {
    fontSize: 8,
    color: "#4B5563",
  },
});

function BrandFaces() {
  return (
    <View style={styles.facesBlock}>
      <Svg width={42} height={34}>
        <Circle cx={12} cy={12} r={9} stroke="#111111" strokeWidth={1.2} fill="#FFFFFF" />
        <Circle cx={28} cy={12} r={9} stroke="#111111" strokeWidth={1.2} fill="#FFFFFF" />
        <Circle cx={20} cy={24} r={9} stroke="#111111" strokeWidth={1.2} fill="#FFFFFF" />
        <Circle cx={9} cy={10} r={0.8} fill="#111111" />
        <Circle cx={15} cy={10} r={0.8} fill="#111111" />
        <Path d="M8 14 C10 16, 14 16, 16 14" stroke="#111111" strokeWidth={1} fill="none" />
        <Circle cx={25} cy={10} r={0.8} fill="#111111" />
        <Circle cx={31} cy={10} r={0.8} fill="#111111" />
        <Path d="M24 14 C26 16, 30 16, 32 14" stroke="#111111" strokeWidth={1} fill="none" />
        <Circle cx={17} cy={22} r={0.8} fill="#111111" />
        <Circle cx={23} cy={22} r={0.8} fill="#111111" />
        <Path d="M16 27 C18 29, 22 29, 24 27" stroke="#111111" strokeWidth={1} fill="none" />
      </Svg>
    </View>
  );
}

function ScoreRing({ score }: { score: number }) {
  return (
    <View style={styles.scoreRing}>
      <Text style={styles.scoreValue}>{score.toFixed(1)}</Text>
      <Text style={styles.scoreOutOf}>/100</Text>
    </View>
  );
}

export function ProKidReportDocument({
  generatedDate,
  language,
  ageVersion,
  frequencyScore,
  impactScore,
  responses,
  umLogoSrc,
}: ProKidReportDocumentProps) {
  return (
    <Document title="PRO-KID Report" author="PRO-KID">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandBlock}>
            <BrandFaces />
            <View style={styles.brandTextBlock}>
              <Text style={styles.brandName}>PRO-KID</Text>
              <Text style={styles.brandTagline}>Patient Reported Outcomes in Kidney Disease</Text>
            </View>
          </View>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={umLogoSrc} style={styles.logoImage} />
        </View>

        <View style={styles.titleRow}>
          <View>
            <Text style={styles.reportTitle}>Questionnaire Report</Text>
            <Text style={styles.reportSubtitle}>Professional summary for clinic conversations</Text>
          </View>
        </View>

        <View style={styles.metadataGrid}>
          <View style={styles.metadataCard}>
            <Text style={styles.metadataLabel}>Date</Text>
            <Text style={styles.metadataValue}>{generatedDate}</Text>
          </View>
          <View style={styles.metadataCard}>
            <Text style={styles.metadataLabel}>Language</Text>
            <Text style={styles.metadataValue}>{language}</Text>
          </View>
          <View style={styles.metadataCard}>
            <Text style={styles.metadataLabel}>Age Version</Text>
            <Text style={styles.metadataValue}>{ageVersion}</Text>
          </View>
        </View>

        <View style={styles.scoreSection}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Frequency Score</Text>
            <View style={styles.scoreWrap}>
              <ScoreRing score={frequencyScore} />
              <View style={styles.scoreValueBlock}>
                <Text style={styles.scoreOutOf}>Professional score summary</Text>
              </View>
            </View>
          </View>

          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Impact Score</Text>
            <View style={styles.scoreWrap}>
              <ScoreRing score={impactScore} />
              <View style={styles.scoreValueBlock}>
                <Text style={styles.scoreOutOf}>Professional score summary</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Questionnaire Responses</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.questionColumn}>
              <Text style={styles.tableHeaderText}>Symptom</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.tableHeaderText}>Frequency</Text>
            </View>
            <View style={styles.lastValueColumn}>
              <Text style={styles.tableHeaderText}>Impact</Text>
            </View>
          </View>

          {responses.map((response, index) => (
            <View
              key={response.id}
              style={index === responses.length - 1 ? [styles.tableRow, styles.tableRowLast] : styles.tableRow}
            >
              <View style={styles.questionColumn}>
                <Text style={styles.tableText}>{response.question}</Text>
              </View>
              <View style={styles.valueColumn}>
                <Text style={styles.tableText}>{response.frequency}</Text>
              </View>
              <View style={styles.lastValueColumn}>
                <Text style={styles.tableText}>{response.impact}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.disclaimer}>
          <Text>
            This report summarizes your questionnaire responses and is intended to support conversations with your healthcare team. It does not provide medical advice or a diagnosis.
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Generated using PRO-Kid</Text>
          <Text style={styles.footerText}>Patient responses are not stored after report generation.</Text>
        </View>
      </Page>
    </Document>
  );
}