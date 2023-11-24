import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Logo from "../../assets/logo.png";
import { TicketType } from "../../redux/features/ticket";

// Créer un style pour notre document PDF

// Fonction pour générer le contenu du PDF
const PdfExitVoucher = (ticket: TicketType) => {
  console.log("ticket : ", ticket);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Image
            src={Logo}
            style={{
              width: 250,
            }}
          />
        </View>

        {/* Deuxième ligne */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              flex: 1,
            }}
          >
            Société {ticket.Client.name}
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              textAlign: "right",
            }}
          >
            Date {new Date(ticket.createdAt).toLocaleDateString()}
          </Text>
        </View>

        {/* Tableau */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            border: "1px solid #000",
            padding: 5,
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Désignation
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Référence
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Quantité demandée
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Numéro de devis
          </Text>
        </View>
        {/* Exemple de données */}
        {ticket.item?.map((item, index) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              border: "1px solid #000",
              padding: 5,
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {ticket.articles[index].name}
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {ticket.articles[index].type} {ticket.articles[index].diameter}{" "}
              {ticket.articles[index].operatingPressure}{" "}
              {ticket.articles[index].fluid}
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {item.withdraw}
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {ticket.purchaseOrder}
            </Text>
          </View>
        ))}

        {/* Dernière ligne */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              textAlign: "left",
              textDecoration: "underline",
            }}
          >
            Demandeur :
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            Chef d'atelier :
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              textAlign: "right",
              textDecoration: "underline",
            }}
          >
            Responsable matériel :
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              textAlign: "left",
            }}
          >
            {ticket.applicant}
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              textAlign: "center",
            }}
          ></Text>
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              textAlign: "right",
            }}
          ></Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
});

export default PdfExitVoucher;
