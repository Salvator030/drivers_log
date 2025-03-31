import { useState } from "react";
import {
  Icon2fa,
  IconCalendarWeek,
  IconRoute,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react";

import classes from "./NavbarSimple.module.css";
import { useMainContentStore } from "../../../hooks/useMainContentStore";



const data = [

  { link: "", label: "Kalender", icon: IconCalendarWeek },
  { link: "", label: "Strecken", icon: IconRoute },
  { link: "", label: "Einstellungen", icon: IconSettings },
];



export function NavbarSimple() {
  const  {content, setContent} = useMainContentStore();

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === content || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setContent(item.label);
     
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
