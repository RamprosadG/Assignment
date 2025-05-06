'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Product } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductModal } from '../productModal';

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('product-id');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('product-id');
    router.push(`/products?${params.toString()}`);
  }, [router, searchParams]);

  useEffect(() => {
    if (productId) {
      const openedProduct = products.find((p) => p.id.toString() === productId);
      if (openedProduct) {
        setSelectedProduct(openedProduct);
      }
    }
    else {
      setSelectedProduct(null);
    }
  }, [productId, products]);

  const handleOpenModal = (product: Product) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('product-id', product.id.toString());
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="flex border p-2 justify-between">
          <div className="flex">
            <div>{product.id}</div>. {product.name}
          </div>
          <button onClick={() => handleOpenModal(product)}>Details</button>
        </div>
      ))}

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
