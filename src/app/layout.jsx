import './globals.css';

export const metadata = {
  title: 'ForestSnap | Crowdsourced Fire Risk Estimation',
  description: 'Bridging the ground-truth gap for forest fire prediction.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}