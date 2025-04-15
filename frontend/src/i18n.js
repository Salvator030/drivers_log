import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      mainContainer: {
        title: "Driverslog",
      },
      Authentication: { registBtn: "Registration", loginBtn: "Login" },
      login: {
        title: "Login",
        username: "Username",
        password: "Password",
        loginBtn: "Login",
        validate: {
          username: "More than two characters",
          password: "min. 7 characters, one special character, one capital letter"
        }
      },
      registration: {
        title: "Registration",
        username: "Username",
        password: "Password",
        passwordConfirm: "Confirm Password",
        registBtn: "Registrieren",
        validate: {
          username: "More than two characters",
          password: "min. 7 characters, one special character, one capital letter",
          confirmPwd: "Passwords did not match"
        }
      },
      navbarSimple: {
        lable: {
          calendar: "Calendar",
          routes: "Routes",
          options: "Options",
        },
      },
      route:{
        btn:{
          addRote:"Add",
          newRoute:"New Route",
        }
      },
      routesTable: {
        startAddress: "Start Address",
        endAddress: "End Adresse",
        distance: "Distance"
      },
      newRouteModal:{
        validateDistance: "pleas add a number",
        lable: "Distance",
        saveBtn: "save",
        backBtn: "back",
      },
      addressTable: {
        name:"Name",
        street:"Street",
        hnr:"Hnr.",
        plz:"PLZ",
        place: "Place",
        info: "Info"
      },
      newAddressPopover:{
        name: "Name",
        street: "Street",
        hnr: "House Nr.",
        plz: "PLZ",
        place: "Place",
        info: "Info"
      },
      newRouteTimeline: {
        start: "Start Address",
        dest: "End Address",
        dist: "Destination"
      },
      drivenRoutes: {
        title: "Driven"
      }

    },
  },
  de: {
    translation: {
      mainContainer: {
        title: "Fahrtenbuch",
      },
      Authentication: { registBtn: "Registrieren", loginBtn: "Anmelden" },
      login: {
        title: "Login",
        username: "Username",
        password: "Password",
        login: "Login",
        loginBtn: "Anmelden",
        validate: {
          username: "Mehr als zwei zeichen",
          password: "min. 7 zeichen, ein Sonderzeichen, ein Großbuchstabe"
        }
      },
      registration: {
        title: "Registration",
        username: "Username",
        password: "Password",
        passwordConfirm: "Password Bestaetigen",
        registBtn: "Registrieren",
        validate: {
          username: "Mehr als zwei zeichen",
          password: "min. 7 zeichen, ein Sonderzeichen, ein Großbuchstabe",
          confirmPwd: "Passwords stimmt nicht überein"
        }
      },
      navbarSimple: {
        lable: {
          calendar: "Kalender",
          routes: "Strecken",
          options: "Einstellungen",
        },
      },
      route:{
        btn:{
          addRote:"Hinzufügen",
          newRoute:"neue Strecke",
        }
      },

      routesTable: {
        startAddress: "Start Adresse",
        endAddress: "Ziel Adresse",
        distance: "Entfernung"
      },
      newRouteModal:{
        validateDistance: "bitte eine zahl",
        lable: "Entfenung",
        saveBtn: "speichern",
        backBtn: "zurück",
      },
      addressTable: {
        name:"Name",
        street:"Straße",
        hnr:"Hnr.",
        plz:"PLZ",
        place: "Ort",
        info: "Info"
      },
      newAddressPopover:{
        name: "Name",
        street: "Straße",
        hnr: "Haus Nr.",
        plz: "PLZ",
        place: "Ort",
        info: "Info"
      },
      newRouteTimeline: {
        start: "Start Adresse",
        dest: "Ziel Adresse",
        dist: "Entfernung"
      },
      drivenRoutes: {
        title: "Gefahren"
      }
    },
  },
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "de", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
