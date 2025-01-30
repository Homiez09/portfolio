'use client';

import { Tag } from 'antd';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { ITag } from '@/types/Tag';

export const CategoryList: FC<{ categorys: ITag[] }> = ({ categorys }) => {
    const query = useSearchParams().get("query");
    const router = useRouter();

    const onTagClick = (e: React.MouseEvent<HTMLSpanElement>, tag: ITag) => {
        e.stopPropagation();
        router.push(`/project?query=${tag.name}`);
    }

    return (
        <>
            {categorys.map((category: ITag, key: any) => (
                <Tag
                    key={key}
                    bordered={true}
                    color={category.name.toLowerCase().includes(query?.toLowerCase() || "$tag") ? "success" : "processing"}
                    className="hover:cursor-pointer hover:text-black"
                    onClick={(e) => onTagClick(e, category)}
                >
                    {category.name}
                </Tag>
            ))}
        </>
    )
}