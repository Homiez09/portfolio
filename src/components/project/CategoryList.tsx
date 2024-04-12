'use client';

import { Tag } from 'antd';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useSearchParams } from 'next/navigation';

export const CategoryList: FC<{ categorys: string[] }> = ({ categorys }) => {
    const query = useSearchParams().get("query");
    const router = useRouter();

    return (
        <>
            {categorys.map((category: string, key: any) => (
            <Tag
              key={key}
              bordered={true}
              color={category.toLowerCase().includes(query?.toLowerCase() || "$tag") ? "success" : "processing"}
              className="hover:cursor-pointer hover:text-black"
              onClick={() => router.push(`/project?query=${category}`)}
            >
              {category}
            </Tag>
          ))}
        </>
    )
}