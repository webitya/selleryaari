import './globals.css';

export const metadata = {
  title: 'SellerYaari — India\'s #1 Dropshipping & E-commerce Platform',
  description:
    'SellerYaari is your end-to-end e-commerce partner — from hero product research and supplier sourcing to store setup, GST registration, and scaling support. Trusted by 5,000+ Indian sellers.',
  keywords: 'dropshipping india, ecommerce platform, shopify setup, product research, GST registration, store launch, selleryaari, winning products',
  openGraph: {
    title: 'SellerYaari — India\'s #1 Dropshipping Platform',
    description: 'Find winning products, launch your store, and scale — all in one place.',
    type: 'website',
    siteName: 'SellerYaari',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SellerYaari — India\'s #1 Dropshipping Platform',
    description: 'Find winning products, launch your store, and scale — all in one place.',
  },
};

import Providers from '@/components/Providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;1,14..32,700;1,14..32,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
