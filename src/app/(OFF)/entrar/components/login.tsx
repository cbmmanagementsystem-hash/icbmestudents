"use client";

import * as React from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Link as MuiLink,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { colorsDefault } from "@/theme/colorsDefault";

type LoginPayload = {
  login: string;
  password: string;
  remember: boolean;
};

type LoginScreenProps = {
  logoSrc?: string;
  illustrationSrc?: string;
  onLogin?: (payload: LoginPayload) => Promise<void> | void;
  onResetPassword?: (email: string) => Promise<void> | void;
};

export default function LoginScreenUfesStyle({
  logoSrc = "/icbme-logo.svg",
  illustrationSrc = "/auth/ufes-illustration.png",
  onLogin,
  onResetPassword,
}: LoginScreenProps) {
  const [login, setLogin] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [remember, setRemember] = React.useState<boolean>(false);

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const [resetOpen, setResetOpen] = React.useState<boolean>(false);
  const [resetEmail, setResetEmail] = React.useState<string>("");

  const [loading, setLoading] = React.useState<boolean>(false);
  const [resetLoading, setResetLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const handleSubmit = async (e: { preventDefault: () => void; } ): Promise<void> => {
    e.preventDefault();
    
    setError("");

    if (!login.trim() || !password.trim()) {
      setError("Preencha login e senha.");
      return;
    }

    try {
      setLoading(true);
      await onLogin?.({ login: login.trim(), password, remember });
    } catch {
      setError("Não foi possível entrar. Verifique seus dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReset = (): void => {
    setResetEmail(login.trim());
    setResetOpen(true);
  };

  const handleCloseReset = (): void => {
    setResetOpen(false);
  };

  const handleSendReset = async (): Promise<void> => {
    setError("");
    const email = resetEmail.trim();

    if (!email) {
      setError("Informe seu e-mail para recuperar a senha.");
      return;
    }

    try {
      setResetLoading(true);
      await onResetPassword?.(email);
      setResetOpen(false);
    } catch {
      setError("Não foi possível enviar o e-mail de recuperação. Tente novamente.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <Box
  component="main"
  sx={{
    minHeight: "100vh",
    bgcolor: "#025f1e",
    display: "flex",
    alignItems: "center",
    overflowX: "hidden", 
    
  }}
>
  <Container maxWidth="lg" sx={{ py: 0 }}>
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.10)",
      }}
    >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
              minHeight: { xs: "auto", md: 640 },
            }}
          >
            {/* LADO ESQUERDO */}
            <Box
              component="section"
              aria-label="Área institucional"
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                bgcolor: "#ffffff",
                borderRight: { md: "1px solid rgba(0,0,0,0.06)" },
              }}
            >

              <Box sx={{ mt: { xs: 3, md: 5 } }}>
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "1.6rem", sm: "1.9rem", md: "2.1rem" },
                    color: "rgba(0,0,0,0.88)",
                    lineHeight: 1.1,
                  }}
                >
                  Bem-vindo de volta!
                </Typography>

                <Typography sx={{ mt: 1, color: "rgba(0,0,0,0.60)", fontSize: { xs: "0.98rem", md: "1.02rem" } }}>
                  Faça login para acessar o Portal do Aluno.
                </Typography>
              </Box>

              <Box
                sx={{
                  mt: { xs: 3, md: 5 },
                  position: "relative",
                  width: "100%",
                  height: 400,
                  maxWidth: 590,
                  aspectRatio: "16 / 10",
                 
                }}
              >
                <Image
                  src={illustrationSrc}
                  alt="Ilustração educacional"
                  fill
                  sizes="(max-width: 900px) 90vw, 900px"
                  style={{ objectFit: "contain"}}
                />
              </Box>
            </Box>

            {/* LADO DIREITO (FORM) */}
            <Box
              component="section"
              aria-label="Área de login"
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                bgcolor: "#ffffff",
                display: "flex",
                alignItems: "center",
                width: "100%"
              }}
            >
              
              <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ position: "relative", width: 280, height: 90, alignSelf: "center" }}>
                  <Image src={logoSrc} alt="Logo" fill sizes="220px" style={{ objectFit: "contain" }} />
                </Box>
                <Typography
                  component="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "1.35rem", sm: "1.5rem" },
                    color: colorsDefault.primaryGreenDark,
                  }}
                >
                  Acesse sua conta
                </Typography>

                <Typography sx={{ mt: 0.75, color: "rgba(0,0,0,0.60)", fontSize: "0.95rem" }}>
                  Informe seu email e senha para continuar.
                </Typography>

                <Divider sx={{ my: 2.5 }} />

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Stack spacing={2}>
                    <TextField
                      label="Email"
                      placeholder="Digite seu email"
                      value={login}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                      autoComplete="username"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineRoundedIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: 2 },
                      }}
                    />

                    <TextField
                      label="Senha"
                      placeholder="Digite sua senha"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlinedIcon fontSize="small" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                onClick={() => setShowPassword((v: boolean) => !v)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: 2 },
                      }}
                    />

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={remember}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRemember(e.target.checked)}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: "0.92rem", color: "rgba(0,0,0,0.70)" }}>
                            Manter-me conectado
                          </Typography>
                        }
                      />

                      <MuiLink
                        component="button"
                        type="button"
                        onClick={handleOpenReset}
                        sx={{
                          fontSize: "0.92rem",
                          fontWeight: 800,
                          color: colorsDefault.primaryGreenDark,
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        Esqueceu sua senha?
                      </MuiLink>
                    </Box>

                    {error ? (
                      <Typography sx={{ color: "#c62828", fontSize: "0.92rem", fontWeight: 700 }}>
                        {error}
                      </Typography>
                    ) : null}

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{
                        mt: 0.5,
                        height: 46,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 900,
                        bgcolor: colorsDefault.primaryGreenDark,
                        "&:hover": { bgcolor: colorsDefault.primaryGreen },
                      }}
                    >
                      {loading ? "Entrando..." : "Entrar"}
                    </Button>

                    <Typography sx={{ mt: 1.5, fontSize: "0.82rem", color: "rgba(0,0,0,0.55)" }}>
                      Em caso de problemas, consulte o suporte/FAQ do portal.
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* MODAL: Esqueceu sua senha */}
      <Dialog open={resetOpen} onClose={handleCloseReset} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          Recuperar senha
          <IconButton aria-label="Fechar" onClick={handleCloseReset}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography sx={{ color: "rgba(0,0,0,0.65)", mb: 2, fontSize: "0.95rem" }}>
            Informe seu e-mail para enviarmos o link de recuperação.
          </Typography>

          <TextField
            label="E-mail"
            placeholder="seuemail@exemplo.com"
            type="email"
            value={resetEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setResetEmail(e.target.value)}
            autoComplete="email"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseReset} sx={{ textTransform: "none", fontWeight: 800 }}>
            Cancelar
          </Button>

          <Button
            onClick={handleSendReset}
            disabled={resetLoading}
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: 900,
              borderRadius: 2,
              bgcolor: colorsDefault.accentOrangeDark,
              "&:hover": { bgcolor: colorsDefault.accentOrange },
            }}
          >
            {resetLoading ? "Enviando..." : "Enviar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}