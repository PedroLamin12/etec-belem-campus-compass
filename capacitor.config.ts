// Android APK wrapper. The app is server-rendered, so the native shell loads the published site.
// Set CAP_SERVER_URL to the published URL before `npx cap sync android`.
const config = {
  appId: "br.etec.parquebelem.tour",
  appName: "Tour ETEC Belém",
  webDir: "public",
  server: { url: process.env.CAP_SERVER_URL ?? "https://tour-etec-belem.lovable.app", cleartext: false },
  android: { backgroundColor: "#f4f7ef" },
};
export default config;
