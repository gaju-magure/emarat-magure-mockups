/**
 * Main App Component
 * Uses responsive layout with header and navigation
 * Screens are now rendered via Layout component based on navigation state
 */

import { Layout } from '@/shared/layouts/Layout';

export default function App() {
  return <Layout defaultView="insights" />;
}
