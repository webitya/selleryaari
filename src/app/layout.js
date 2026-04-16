import './globals.css';

export const metadata = {
  title: 'SellerYaari — Launch & Scale Your E-commerce Business',
  description:
    'SellerYaari is your end-to-end e-commerce partner — from hero product research and supplier sourcing to Shopify store setup, GST registration, and scaling support.',
  keywords: 'ecommerce consulting, shopify setup, product research, GST registration, store launch, dropshipping India',
  openGraph: {
    title: 'SellerYaari — Launch & Scale Your E-commerce Business',
    description: 'From product research to full store setup — we handle everything.',
    type: 'website',
  },
};

import Providers from '@/components/Providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap"
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
