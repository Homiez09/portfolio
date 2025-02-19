import { FC } from 'react';
import { ITag } from '@/types/Tag';
import Link from 'next/link';

export const CategoryList: FC<{ categorys: ITag[] }> = ({ categorys }) => {
    return (
        <div className="flex gap-2">
            {categorys.map((category: ITag, key: any) => (
                <Link href={`/search?tag=${category.name}`} key={key}>
                    <div className='border text-small px-4 py-1 rounded-full'>{category.name}</div>
                </Link>
            ))}
        </div>
    )
}