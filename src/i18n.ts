import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to Tropea",
          select_flavor: "Select your flavor",
          add_to_order: "Add to Order",
          checkout: "Checkout",
          delivery_beach: "Delivery to Beach",
          total: "Total",
        },
      },
      it: {
        translation: {
          welcome: "Benvenuti a Tropea",
          select_flavor: "Scegli il tuo gusto",
          add_to_order: "Aggiungi all'ordine",
          checkout: "Pagamento",
          delivery_beach: "Consegna in Spiaggia",
          total: "Totale",
        },
      },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
