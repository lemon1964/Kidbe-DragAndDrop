import './styles/globals.css';
import { Inter } from 'next/font/google';
import ReduxProvider from '../components/ReduxProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Kidbee Drag-and-Drop',
  description: 'Тестовое приложение для обучения',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
