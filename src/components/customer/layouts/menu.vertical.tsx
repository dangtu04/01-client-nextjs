"use client";

import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./menu.vertical.scss";

interface IProps {
  data: any;
  isOpen: boolean;
  onClose: () => void;
}

const MenuVertical = (props: IProps) => {
  const { data, isOpen, onClose } = props;
  const [openMenus, setOpenMenus] = useState<number[]>([]);

  const toggleSubmenu = (id: number) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((menuId) => menuId !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`menu-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />

      {/* Menu Vertical */}
      <div className={`menu-vertical ${isOpen ? "open" : ""}`}>
        <div className="menu-header">
          <h3>Menu</h3>
          <button className="close-btn" onClick={onClose}>
            <CloseOutlined style={{ fontSize: "20px" }} />
          </button>
        </div>

        <nav className="menu-content">
          <ul className="menu-list">
            {data.map((item: any) => (
              <li key={item.id} className="menu-item">
                <div className="menu-item-header">
                  <a href={item.link} className="menu-link">
                    {item.title}
                  </a>
                  {item.submenu && (
                    <button
                      className="toggle-btn"
                      onClick={() => toggleSubmenu(item.id)}
                    >
                      {openMenus.includes(item.id) ? "−" : "+"}
                    </button>
                  )}
                </div>

                {/* Submenu cấp 2 */}
                {item.submenu && openMenus.includes(item.id) && (
                  <ul className="submenu-level-2">
                    {item.submenu.map((subItem: any) => (
                      <li key={subItem.id} className="submenu-item">
                        <div className="submenu-item-header">
                          <a href={subItem.link} className="submenu-link">
                            {subItem.title}
                          </a>
                          {subItem.submenu && (
                            <button
                              className="toggle-btn"
                              onClick={() => toggleSubmenu(subItem.id)}
                            >
                              {openMenus.includes(subItem.id) ? "−" : "+"}
                            </button>
                          )}
                        </div>

                        {/* Submenu cấp 3 */}
                        {subItem.submenu && openMenus.includes(subItem.id) && (
                          <ul className="submenu-level-3">
                            {subItem.submenu.map((subSubItem: any) => (
                              <li
                                key={subSubItem.id}
                                className="submenu-item-3"
                              >
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
      </div>
    </>
  );
};

export default MenuVertical;