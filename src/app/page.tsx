"use client";

import dynamic from "next/dynamic";

const AppClient = dynamic(() => import("@/components/AppClient"), {
  ssr: false,
  loading: () => (
    <main className="relative min-h-screen w-full overflow-clip bg-[#F1EEF0]">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F1EEF0]" />
    </main>
  ),
});

export default function Home() {
  return <AppClient />;
}
