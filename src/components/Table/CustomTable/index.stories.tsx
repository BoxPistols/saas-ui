// Table/CustomTable/index.stories.tsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CustomTable from './index';

export default {
  title: 'Component/Table/CustomTable',
  component: CustomTable,
} as ComponentMeta<typeof CustomTable>;

export const Default: ComponentStory<typeof CustomTable> = () => <CustomTable />;

// カスタムストーリー（ダミーデータを使用）
export const WithData: ComponentStory<typeof CustomTable> = () => {
  // ここに必要なダミーデータを定義してください。
  const dummyData = [
    // ダミーデータを定義
    {
      id: 1,
      title: 'Product 1',
      description: 'Description 1',
      price: 100,
      discountPercentage: 5,
      rating: 4.5,
      stock: 10,
      brand: 'Brand 1',
      category: 'Category 1',
      thumbnail: 'https://example.com/thumbnail1.jpg',
      images: ['https://example.com/image1.jpg'],
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description 2',
      price: 200,
      discountPercentage: 10,
      rating: 4.7,
      stock: 20,
      brand: 'Brand 2',
      category: 'Category 2',
      thumbnail: 'https://example.com/thumbnail2.jpg',
      images: ['https://example.com/image2.jpg'],
    },

  ];

  return <CustomTable rows={dummyData} />;
};
