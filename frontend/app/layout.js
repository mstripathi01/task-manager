import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
