"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import { colorsDefault } from "@/theme/colorsDefault";

type CourseExpositorProps = {
  title: string;
  imageSrc: string; // 500x500
  href: string;     // rota do curso
  imageAlt?: string;
  linkQuery?: Record<string, string | number | boolean | null | undefined>;
};

export default function CourseExpositor({
  title,
  imageSrc,
  href,
  imageAlt,
  linkQuery
}: CourseExpositorProps) {
  const altText = (imageAlt ?? title).trim();

  return (
    <Box
      component="article"
      sx={{
        width: "100%",
        maxWidth: 320,              // ✅ menor
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
        boxShadow: "0 14px 40px rgba(0,0,0,0.10)",
        transition: "transform .18s ease, box-shadow .18s ease",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 18px 55px rgba(0,0,0,0.14)",
        },
      }}
    >
      {/* imagem mais baixa */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "300px",
          aspectRatio: "16 / 10",   // ✅ menos alto que 1/1
          backgroundColor: "rgba(0,0,0,0.04)",
        }}
      >
        <Image
          src={imageSrc}
          alt={altText}
          fill
          sizes="(max-width: 600px) 90vw, 320px"
          style={{ objectFit: "cover" }}
        />


        
      </Box>

      {/* conteúdo */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          flex: 1,
        }}
      >
        <Typography
          component="h3"
          sx={{
            fontWeight: 900,
            fontSize: "1rem",
            lineHeight: 1.2,
            color: "rgba(0,0,0,0.88)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 40, // mantém altura consistente
          }}
        >
          {title}
        </Typography>

        {/* botão sempre embaixo */}
        <Box sx={{ mt: "auto" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: 900,
              borderRadius: 2,
              py: 1.1,
              bgcolor: colorsDefault.accentOrangeDark,
              boxShadow: "none",
              "&:hover": { boxShadow: "none", bgcolor: colorsDefault.accentOrange },
            }}
          >
           <Link href={{
            pathname: href,
            query: linkQuery
           }}>Acessar curso</Link> 
          </Button>
        </Box>
      </Box>
    </Box>
  );
}