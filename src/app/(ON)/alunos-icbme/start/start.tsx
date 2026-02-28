import { Box } from "@mui/material";
import CourseExpositor from "./components/CourseExpositor";
import Image from "next/image";

export default function Start() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
     
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 1240, // opcional: respeita o tamanho real no desktop
          mx: "auto",
          aspectRatio: "1240 / 320", // ✅ proporção exata
          overflow: "hidden",
          backgroundColor: "rgba(0,0,0,0.04)",
        }}
      >
        <Image
          src="/bgh.png"
          alt="Banner"
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1280px) 100vw, 1240px"
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>

      <Box sx={{ display: "flex", gap: 10, alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap" }}>
        <CourseExpositor
          title="Pós-graduação: Musicoterapia Comportamental"
          imageSrc="/curso1.png"
          href="/alunos-icbme/start/course"
          linkQuery={{idCourse: "course1"}}
        />
        <CourseExpositor
          title="Pós-graduação: Musicoterapia Comportamental"
          imageSrc="/curso1.png"
          href="/alunos-icbme/cursos/curso-01"
        />
        <CourseExpositor
          title="Pós-graduação: Musicoterapia Comportamental"
          imageSrc="/curso1.png"
          href="/alunos-icbme/cursos/curso-01"
        /><CourseExpositor
          title="Pós-graduação: Musicoterapia Comportamental"
          imageSrc="/curso1.png"
          href="/alunos-icbme/cursos/curso-01"
        />
        <CourseExpositor
          title="Pós-graduação: Musicoterapia Comportamental"
          imageSrc="/curso1.png"
          href="/alunos-icbme/cursos/curso-01"
        />
        <CourseExpositor
          title="Pós-graduação: Musicoterapia Comportamental"
          imageSrc="/curso1.png"
          href="/alunos-icbme/cursos/curso-01"
        />
      </Box>
    </Box>
  );
}
