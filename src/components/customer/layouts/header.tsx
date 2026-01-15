// "use client";

// import React, { useState } from "react";
// import {
//   SearchOutlined,
//   UserOutlined,
//   ShoppingCartOutlined,
//   MenuOutlined,
// } from "@ant-design/icons";
// import { Badge } from "antd";
// import "./header.scss";

// const CustomerHeader = () => {
//   const [searchValue, setSearchValue] = useState("");
//   const cartItemCount = 2;

//   return (
//     <header className="customer-header">
//       <div className="header-container">
//         <div className="menu-toggle">
//           <MenuOutlined style={{ fontSize: "24px", color: "#fff" }} />
//         </div>

//         <div className="logo">
//           <img
//             src="https://placehold.co/120x40/000000/FFFFFF/png?text=iGO+STORE"
//             alt="iGO Store"
//           />
//         </div>

//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Bạn đang tìm gì..."
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             className="search-input"
//           />
//           <button className="search-button">
//             <SearchOutlined style={{ fontSize: "18px" }} />
//           </button>
//         </div>

//         <div className="header-actions">
//           <div className="action-item action-item-search">
//             <SearchOutlined style={{ fontSize: "24px" }} />
//             <span>Tìm kiếm</span>
//           </div>

//           <div className="action-item">
//             <UserOutlined style={{ fontSize: "24px" }} />
//             <span>Tài khoản</span>
//           </div>

//           <div className="action-item">
//             <Badge count={cartItemCount} offset={[5, 0]}>
//               <ShoppingCartOutlined
//                 style={{ fontSize: "24px", color: "#fff" }}
//               />
//             </Badge>
//             <span>Giỏ hàng</span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default CustomerHeader;

"use client";

import React, { useState } from "react";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import "./header.scss";
import MenuHorizontal from "./menu.horizontal";
import { menuData } from "@/utils/menu.data";
import MenuVertical from "./menu.vertical";
import Link from "next/link";

const CustomerHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemCount = 2;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const data: any = menuData;

  return (
    <>
      <header className="customer-header">
        <div className="header-container">
          <div className="menu-toggle" onClick={toggleMenu}>
            <MenuOutlined style={{ fontSize: "24px", color: "#fff" }} />
          </div>

          <div className="logo">
            <img
              src="https://placehold.co/120x40/000000/FFFFFF/png?text=iGO+STORE"
              alt="iGO Store"
            />
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Bạn đang tìm gì..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              <SearchOutlined style={{ fontSize: "18px" }} />
            </button>
          </div>

          <div className="header-actions">
            <div className="action-item action-item-search">
              <SearchOutlined style={{ fontSize: "24px" }} />
              <span>Tìm kiếm</span>
            </div>

            <div className="action-item">
              <UserOutlined style={{ fontSize: "24px" }} />
              <span>Tài khoản</span>
            </div>

            <Link
              href={"/cart"}
              className="action-item"
              style={{ textDecoration: "none" }}
            >
              <Badge count={cartItemCount} offset={[5, 0]}>
                <ShoppingCartOutlined
                  style={{ fontSize: "24px", color: "#fff" }}
                />
              </Badge>
              <span>Giỏ hàng</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Menu Component */}
      <MenuHorizontal data={data} />

      <MenuVertical data={data} isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};

export default CustomerHeader;
