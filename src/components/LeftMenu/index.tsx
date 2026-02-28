"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import type { SvgIconComponent } from "@mui/icons-material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import styles from "./styles.module.css";
import UploadPhotoProfile from "../UploadPhotoProfile";
import { colorsDefault } from "@/theme/colorsDefault";
import Image from "next/image";

type SubMenuItem = {
  name: string;
  url: string;
  icon: SvgIconComponent;
};

type MenuItemLink = {
  key: number;
  name: string;
  url: string;
  icon: SvgIconComponent;
  subMenu?: SubMenuItem[];
};

type LeftMenuProps = {
  menuList: MenuItemLink[];
};

const drawerWidth = 280;

export default function LeftMenu({ menuList }: LeftMenuProps) {
  const pathname = usePathname() ?? "";

  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const openMenu = Boolean(anchorEl) && openIndex !== null;

  const handleOpenSubmenu = (event: React.MouseEvent<HTMLElement>, index: number): void => {
    setAnchorEl(event.currentTarget);
    setOpenIndex(index);
  };

  const handleCloseSubmenu = (): void => {
    setAnchorEl(null);
    setOpenIndex(null);
  };

  const currentSubmenu = React.useMemo((): SubMenuItem[] => {
    if (openIndex === null) return [];
    return menuList[openIndex]?.subMenu ?? [];
  }, [menuList, openIndex]);

  const isItemActive = React.useCallback(
    (m: MenuItemLink): boolean => {
      const direct = pathname.startsWith(m.url);
      const child = m.subMenu ? m.subMenu.some((s) => pathname.startsWith(s.url)) : false;
      return direct || child;
    },
    [pathname]
  );

  const NavList = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "90vh" }}>
      <Box className={styles.divInfo}>
        <UploadPhotoProfile />
        <p className={styles.funcao}>Aluno</p>
        <p className={styles.nome}>Thiago Gonçalves Silva</p>
      </Box>

      <Divider sx={{ my: 2.5, borderColor: "rgba(0,0,0,0.08)" }} />

      <List sx={{ p: 0, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {menuList.map((m, index) => {
          const active = isItemActive(m);
          const hasSubmenu = Boolean(m.subMenu && m.subMenu.length > 0);
          
          const a =a a=a=a=a=a=
          const Icon = m.icon;

          return (
            <Box key={m.key}>
              <ListItemButton
                component={hasSubmenu ? "button" : Link}
                href={hasSubmenu ? undefined : m.url}
                selected={active}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  if (hasSubmenu) {
                    e.preventDefault();
                    handleOpenSubmenu(e, index);
                    return;
                  }
                  setOpenDrawer(false);
                  handleCloseSubmenu();
                }}
                sx={{
                  borderRadius: 2,
                  px: 1.25,
                  py: 1.15,
                  border: "1px solid rgba(0,0,0,0.06)",
                  bgcolor: active ? "rgba(35,179,138,0.12)" : "transparent",
                  color: active ? colorsDefault.primaryGreenDark : "rgba(15,23,42,0.92)",
                  transition: "transform .08s ease, background .18s ease, border-color .18s ease",
                  "&:hover": {
                    bgcolor: "rgba(35,179,138,0.14)",
                    borderColor: "rgba(35,179,138,0.35)",
                    transform: "translateY(-1px)",
                  },
                  "&.Mui-selected": {
                    bgcolor: "rgba(35,179,138,0.16)",
                    borderColor: "rgba(35,179,138,0.45)",
                  },
                  "&.Mui-selected:hover": {
                    bgcolor: "rgba(35,179,138,0.18)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 34,
                    color: active ? colorsDefault.primaryGreenDark : "rgba(15,23,42,0.65)",
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>

                <ListItemText
                  primary={m.name}
                  slotProps={{
                    primary: {
                      component: "span",
                      sx: {
                        fontSize: 14,
                        fontWeight: 800,
                        letterSpacing: "0.2px",
                        fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                      },
                    },
                  }}
                />

                {hasSubmenu ? (
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      color: active ? colorsDefault.primaryGreenDark : "rgba(15,23,42,0.55)",
                      transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform .18s ease",
                    }}
                  >
                    <ExpandMoreRoundedIcon fontSize="small" />
                  </Box>
                ) : null}
              </ListItemButton>
            </Box>
          );
        })}
      </List>

      {/* Menu único (submenu) */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseSubmenu}
        disableScrollLock
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              borderRadius: 2,
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 16px 50px rgba(0,0,0,0.12)",
              minWidth: 260,
              overflow: "hidden",
            },
          },
        }}
      >
        {currentSubmenu.map((sub) => {
          const subActive = pathname.startsWith(sub.url);
          const SubIcon = sub.icon;

          return (
            <MenuItem
              key={sub.url}
              component={Link}
              href={sub.url}
              onClick={() => {
                handleCloseSubmenu();
                setOpenDrawer(false);
              }}
              sx={{
                gap: 1.25,
                py: 1.1,
                fontWeight: 800,
                color: subActive ? colorsDefault.primaryGreenDark : "rgba(15,23,42,0.9)",
                bgcolor: subActive ? "rgba(35,179,138,0.10)" : "transparent",
                "&:hover": { bgcolor: "rgba(35,179,138,0.12)" },
              }}
            >
              <Box sx={{ display: "inline-flex", alignItems: "center", color: "rgba(15,23,42,0.65)" }}>
                <SubIcon fontSize="small" />
              </Box>
              <Typography component="span" sx={{ fontSize: 13.5, fontWeight: 800 }}>
                {sub.name}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>

      <Box sx={{ mt: "auto", pt: 2 }}>
      <Box sx={{ position: "relative", width: "100%", height: 90 }}>
        <Image
          src="/icbme-logo.svg"
          alt="Logo ICBME"
          fill
          sizes="220px"
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Box>
    </Box>
  );

  return (
    <>
      {/* Header fixo (somente mobile/tablet) */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2000,
          bgcolor: "rgba(246,247,249,0.92)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          backdropFilter: "blur(10px)",
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.75,
          
        }}
      >
        <IconButton aria-label="Abrir menu" onClick={() => setOpenDrawer(true)} size="large">
          <MenuRoundedIcon />
        </IconButton>
        <Typography sx={{ fontWeight: 900, color: "rgba(15,23,42,0.9)" }}>Menu</Typography>
      </Box>

      {/* Espaçador do header fixo */}
      <Box sx={{ height: 56, display: { xs: "block", md: "none" } }} />

      {/* Drawer mobile/tablet */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: {
              width: drawerWidth,
              bgcolor: "#f6f7f9",
              borderRight: "1px solid rgba(0,0,0,0.08)",
            },
          },
        }}
      >
        <Box role="navigation" sx={{ p: 2 }}>
          {NavList}
        </Box>
      </Drawer>

      {/* Sidebar fixa desktop */}
      <Box
        component="aside"
        className={styles.divMain}
        sx={{ width: drawerWidth, display: { xs: "none", md: "block" } }}
        aria-label="Menu lateral"
      >
       <Box role="navigation" sx={{ p: 2,  }}>
  {NavList}
</Box>
      </Box>
    </>
  );
}