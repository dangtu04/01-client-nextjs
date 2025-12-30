"use client";

import { useState } from "react";
import "./menu.horizontal.scss";

interface IProps {
  data: any;
}

const MenuHorizontal = (props: IProps) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const { data } = props;
  return (
    <>
      <nav className="customer-menu">
        <ul className="menu-level-1">
          {data.map((item: any) => (
            <li
              key={item.id}
              className="menu-item"
              onMouseEnter={() => setActiveMenu(item.id)}
              onMouseLeave={() => {
                setActiveMenu(null);
                setActiveSubmenu(null);
              }}
            >
              <a href={item.link} className="menu-link">
                {item.title}
                {item.submenu && <span className="arrow">▼</span>}
              </a>

              {/* Menu cấp 2 */}
              {item.submenu && activeMenu === item.id && (
                <ul className="menu-level-2">
                  {item.submenu.map((subItem: any) => (
                    <li
                      key={subItem.id}
                      className="submenu-item"
                      onMouseEnter={() => setActiveSubmenu(subItem.id)}
                    >
                      <a href={subItem.link} className="submenu-link">
                        {subItem.title}
                        {subItem.submenu && <span className="arrow">►</span>}
                      </a>

                      {/* Menu cấp 3 */}
                      {subItem.submenu && activeSubmenu === subItem.id && (
                        <ul className="menu-level-3">
                          {subItem.submenu.map((subSubItem: any) => (
                            <li key={subSubItem.id} className="submenu-item-3">
                              <a
                                href={subSubItem.link}
                                className="submenu-link-3"
                              >
                                {subSubItem.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default MenuHorizontal;
