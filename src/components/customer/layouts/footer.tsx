import "./footer.scss";

const CustomerFooter = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <span className="footer__logo">NEXTSHOP</span>
          {/* <p className="footer__tagline">Thời trang tối giản — phong cách vĩnh cửu.</p> */}
          <div className="footer__socials">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="TikTok">TikTok</a>
          </div>
        </div>

        {/* Nav columns */}
        <nav className="footer__nav">
          <div className="footer__col">
            <span className="footer__col-title">Bộ sưu tập</span>
            <ul>
              <li><a href="#">Mới nhất</a></li>
              <li><a href="#">Áo</a></li>
              <li><a href="#">Quần</a></li>
              <li><a href="#">Phụ kiện</a></li>
              <li><a href="#">Sale</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <span className="footer__col-title">Hỗ trợ</span>
            <ul>
              <li><a href="#">Theo dõi đơn hàng</a></li>
              <li><a href="#">Đổi & Trả hàng</a></li>
              <li><a href="#">Hướng dẫn size</a></li>
              <li><a href="#">Câu hỏi thường gặp</a></li>
              <li><a href="#">Liên hệ</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <span className="footer__col-title">Về chúng tôi</span>
            <ul>
              <li><a href="#">Câu chuyện</a></li>
              <li><a href="#">Tính bền vững</a></li>
              <li><a href="#">Tuyển dụng</a></li>
              <li><a href="#">Cửa hàng</a></li>
            </ul>
          </div>
        </nav>

        {/* Newsletter */}
        <div className="footer__newsletter">
          <span className="footer__col-title">Nhận ưu đãi</span>
          <p>Đăng ký để nhận thông tin bộ sưu tập mới và ưu đãi độc quyền.</p>
          <div className="footer__form">
            <input type="email" placeholder="your@email.com" aria-label="Email" />
            <button type="button">→</button>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <span>© 2025 NextShop. All rights reserved.</span>
        <div className="footer__legal">
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Điều khoản sử dụng</a>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;