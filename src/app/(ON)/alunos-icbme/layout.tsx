// RootLayout.tsx
import styles from './styles.module.css'
import LeftMenu from '@/components/LeftMenu'

import CoreProvider from '@/hooks/coreProvider' 

import HomeIcon from '@mui/icons-material/Home';
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const menus = [
  { key: 1, name: "Início", url: "/alunos-icbme/start", icon: HomeIcon },
  { key: 2, name: "Notificações", url: "/teacher/notification", icon: NotificationsRoundedIcon },
  { key: 3, name: "Calendário", url: "/teacher/calendar", icon: CalendarMonthRoundedIcon },
  { key: 4, name: "Cursos", url: "/teacher/courses", icon: SchoolRoundedIcon },
  { key: 5, name: "Comunicação", url: "/teacher/communication", icon: ForumRoundedIcon },
];

  return (
    <div className={styles.layout}>
      <CoreProvider>
      <LeftMenu menuList={menus} />
      <main className={styles.content}>{children}</main>
      </CoreProvider>
    </div>
  )
}



// {
//   key: 4,
//   name: "Cursos",
//   url: "/teacher/courses",
//   icon: SchoolRoundedIcon,
//   subMenu: [
//     { name: "Meus cursos", url: "/teacher/courses", icon: SchoolRoundedIcon },
//     { name: "Novo curso", url: "/teacher/courses/new", icon: SchoolRoundedIcon },
//   ],
// }