import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AccountNotActived, InvalidEmailPasswordError } from "./utils/error";
import { sendRequest } from "./utils/api";
import { IAuthUser } from "./types/models/user.model";
import { UserRole } from "./utils/roles";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // provider đăng nhập bằng email và mật khẩu
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // kiểm tra credentials có đầy đủ không trước khi gọi api
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // gửi request đến backend để xác thực tài khoản
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
          body: {
            email: credentials.email,
            password: credentials.password,
          },
        });

        if (res.statusCode === 200) {
          const user = res?.data?.user;
          const data = res?.data;

          // nếu backend trả về thiếu thông tin thì từ chối đăng nhập
          if (!user || !data?.access_token) {
            return null;
          }

          // trả về object user để next-auth lưu vào token
          return {
            _id: user._id,
            name: user.name ?? "",
            email: user.email,
            role: user.role,
            access_token: data.access_token,
          };
        }

        // phân loại lỗi theo status code để hiển thị thông báo phù hợp
        if (res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (res.statusCode === 403) {
          throw new AccountNotActived();
        } else {
          throw new Error("Internal server error");
        }
      },
    }),

    // provider đăng nhập bằng tài khoản google
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  // trang đăng nhập tùy chỉnh thay cho trang mặc định của next-auth
  pages: {
    signIn: "/login",
  },

  callbacks: {
    // callback jwt được gọi mỗi khi tạo hoặc cập nhật token
    async jwt({ token, user, account }) {

      // luồng google: người dùng đăng nhập bằng google
      // next-auth nhận id_token từ google và gửi lên backend để xác thực
      // backend kiểm tra id_token với google, tạo hoặc tìm user trong db rồi trả về access_token nội bộ
      if (account?.provider === "google") {

        // gửi id_token nhận từ google lên backend để đổi lấy access_token của hệ thống
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login/google`,
          body: { id_token: account.id_token },
        });

        if (res.statusCode === 200) {
          const data = res.data;

          // đảm bảo backend trả về đầy đủ thông tin user và token
          if (!data?.user || !data?.access_token) {
            throw new Error("Invalid response from server");
          }

          // kiểm tra role hợp lệ để tránh lưu role không được định nghĩa vào session
          const role = data.user.role;
          if (!Object.values(UserRole).includes(role as UserRole)) {
            throw new Error("Invalid role from backend");
          }

          // đính kèm thông tin user vào jwt token để dùng ở callback session
          token.user = {
            _id: data.user._id,
            name: data.user.name ?? "",
            email: data.user.email,
            role: role as UserRole,
            access_token: data.access_token,
          } as IAuthUser;
        } else {
          throw new Error("Google login failed");
        }
      }

      // luồng credentials: user đã được xác thực ở bước authorize phía trên
      // chỉ cần gắn thông tin user vào token, không cần gọi api thêm
      if (account?.provider === "credentials" && user) {

        // kiểm tra role hợp lệ tương tự như luồng google
        const userRole = user.role;
        if (!Object.values(UserRole).includes(userRole as UserRole)) {
          throw new Error("Invalid role from backend");
        }

        // lưu user vào token để callback session có thể đọc
        token.user = user as IAuthUser;
      }

      return token;
    },

    // callback session được gọi mỗi khi client đọc session
    session({ session, token }) {

      // chuyển thông tin user từ jwt token sang session để client có thể sử dụng
      // thêm null-check để tránh crash nếu token.user undefined
      if (token.user) {
        (session.user as IAuthUser) = token.user;
      }
      return session;
    },
  },
});