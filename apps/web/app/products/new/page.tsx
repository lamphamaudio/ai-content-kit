"use client";

import { ProductForm } from "@/components/product-form";

export default function NewProductPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">New product</h1>
      <ProductForm onSubmit={(payload) => console.info(payload)} />
    </main>
  );
}

