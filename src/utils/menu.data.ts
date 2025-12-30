export const menuData = [
    {
      id: 1,
      title: "Trang chủ",
      link: "/",
    },
    {
      id: 2,
      title: "Sản phẩm",
      link: "/san-pham",
      submenu: [
        {
          id: 21,
          title: "Điện thoại",
          link: "/san-pham/dien-thoai",
          submenu: [
            { id: 211, title: "iPhone", link: "/san-pham/dien-thoai/iphone" },
            { id: 212, title: "Samsung", link: "/san-pham/dien-thoai/samsung" },
            { id: 213, title: "Xiaomi", link: "/san-pham/dien-thoai/xiaomi" },
          ],
        },
        {
          id: 22,
          title: "Laptop",
          link: "/san-pham/laptop",
          submenu: [
            { id: 221, title: "MacBook", link: "/san-pham/laptop/macbook" },
            { id: 222, title: "Dell", link: "/san-pham/laptop/dell" },
            { id: 223, title: "HP", link: "/san-pham/laptop/hp" },
          ],
        },
        {
          id: 23,
          title: "Phụ kiện",
          link: "/san-pham/phu-kien",
          submenu: [
            { id: 231, title: "Tai nghe", link: "/san-pham/phu-kien/tai-nghe" },
            { id: 232, title: "Sạc dự phòng", link: "/san-pham/phu-kien/sac" },
            { id: 233, title: "Ốp lưng", link: "/san-pham/phu-kien/op-lung" },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Khuyến mãi",
      link: "/khuyen-mai",
      submenu: [
        { id: 31, title: "Flash Sale", link: "/khuyen-mai/flash-sale" },
        { id: 32, title: "Giảm giá sốc", link: "/khuyen-mai/giam-gia" },
        { id: 33, title: "Mua 1 tặng 1", link: "/khuyen-mai/mua-1-tang-1" },
      ],
    },
    {
      id: 4,
      title: "Tin tức",
      link: "/tin-tuc",
      submenu: [
        { id: 41, title: "Công nghệ", link: "/tin-tuc/cong-nghe" },
        { id: 42, title: "Đánh giá", link: "/tin-tuc/danh-gia" },
        { id: 43, title: "Hướng dẫn", link: "/tin-tuc/huong-dan" },
      ],
    },
    {
      id: 5,
      title: "Liên hệ",
      link: "/lien-he",
    },
  ];