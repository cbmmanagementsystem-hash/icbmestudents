export const colorsDefault = {
  primaryGreen: "#23b38a", // verde principal
  primaryGreenDark: "#1c9470", // (opcional) tom mais escuro do verde
  background: "#373334", // cinza escuro (background)
  text: "#727778", // cinza claro (texto secundário)
  accentOrangeLight: "#e79c63ff", // laranja vibrante
  accentOrange: "#f48634", // laranja vibrante
  accentOrangeDark: "#f2783d", // laranja mais escuro
  white: "#fff",

  surface: "#403C3D", // 1: card/sections (um step +claro que o background)
  surfaceMuted: "#2E2B2C", // 2: barras/side nav (um step +escuro)
  border: "#4A4748", // 3: divisórias, strokes sutis
  textPrimary: "#ECEDEE", // 4: texto principal em fundo escuro

  // estados semânticos
  success: "#2FBE8B", // 5: sucesso (primo do teu primaryGreen)
  danger: "#E05A6B", // 6: erro/critico (vermelho levemente dessaturado p/ dark UI)
  dangerDark: "#c44858ff",
  warning: "#F2C84B", // 7: alerta (âmbar que conversa com o laranja)
  warningDark: "#ddb640ff",
  info: "#3BA6F0", // 8: info (azul claro que contrasta com o fundo)
  infoDark: "#2d83c0ff", // 8: info (azul claro que contrasta com o fundo)

  // acentos auxiliares
  accentPurple: "#9C7FEA", // 9: roxo p/ gráficos, tabs, empty states
  accentPurpleDark: "#9276dfff",
  accentCyan: "#2BD4C3", // 10: ciano p/ badges, hovers “frescos”
};

export type colorsDefaultType = keyof typeof colorsDefault