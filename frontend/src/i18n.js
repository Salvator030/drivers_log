import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
        mainContainer: {
            title: "Driverslog"
          } ,
          Authentication: {registBtn:"Registration",loginBtn:"Login"},
          login: {title: "Login", username: "Username", password: "Password", loginBtn: "Login"},
          registration: {title: "Registration", username: "Username", password: "Password",passwordConfirm:"Confirm Password", registBtn:"Registrieren"},
          navbarSimple:{
            lable:{
                calendar:"Calendar",
                routes:"Routes",
                options:"Options"
            }
         },
}},
  de: {
    translation: {
      mainContainer: {
        title: "Fahrtenbuch"
      } ,
      Authentication: {registBtn:"Registrieren",loginBtn:"Anmelden"},
      login: {
        title: "Login",
         username: "Username",
          password: "Password",
           login: "Login",loginBtn:"Anmelden"},
      registration: {title: "Registration", username: "Username", password: "Password",passwordConfirm:"Password Bestaetigen",registBtn:"Registrieren"},
      navbarSimple:{lable:{
        calendar:"Kalender",
        routes:"Strecken",
        options:"Einstellungen",
        

      }}
    }
  }}
;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "de", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;