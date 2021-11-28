import React, { FC, useState } from "react";
import Link from "next/link";
import { isMobile } from "react-device-detect";
import { legal, links, social } from "data/menu";
import styles from "styles/Menu.module.css";

// @ts-ignore
import Burger from "@animated-burgers/burger-squeeze";

interface MenuProps {}

export const Menu: FC<MenuProps> = ({}: MenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleIsOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <button
        onClick={toggleIsOpen}
        className={
          "hamburger hamburger--squeeze" + (isOpen ? " is-active" : "")
        }
        type="button"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </button>
      {!isMobile && (
        <div className={styles.social}>
          {social.map((link) => {
            return (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                key={link.label}
              >
                <i className={link.label} />
              </a>
            );
          })}
        </div>
      )}
      {isOpen && (
        <div className={styles.menu}>
          <div>
            <img className={styles.logo} src="/img/menu/logo.png" alt="" />
          </div>
          <ul className={styles.links}>
            {links.map((link) => {
              return (
                <li key={link.href}>
                  <a onClick={toggleIsOpen}>
                    <Link href={link.href}>{link.label}</Link>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className={styles.legal}>
            {legal.map((link) => {
              return (
                <li key={link.href}>
                  <a>
                    <Link href={"pdf/" + link.href + ".pdf"}>{link.label}</Link>
                  </a>
                </li>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
