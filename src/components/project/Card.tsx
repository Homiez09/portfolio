'use client';

import Image from 'next/image';
import { ibmbold } from '@/libs/font';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { CategoryList } from './CategoryList';

export const Card = ({ props, highlight }: any) => {
  const router = useRouter();
  const query = highlight;

  useEffect(() => {
    let title = document.querySelector(`#title${props.id}`);
    let description = document.querySelector(`#description${props.id}`);

    title!.innerHTML = props.title.replace(new RegExp(query + '(?!([^<]+)?<)', 'gi'), '<mark>$&</mark>');
    description!.innerHTML = props.description.replace(new RegExp(query + '(?!([^<]+)?<)', 'gi'), '<mark>$&</mark>');
  }, [query])

  return (
    <>
      <div className="flex flex-row w-full pb-5 lg:px-5 gap-3 select-none hover:scale-[1.02] hover:cursor-pointer"  onClick={() => router.push(`project/${props.documentId}`)}>
        <div className="flex flex-col p-2">
          <div className="flex flex-col">
            {/* Date */}
            <small className="text-gray-500">{props.createAt}</small>
            {/* Title */}
            <div id={`title${props.id}`} className={`text-xl ${ibmbold.className}`}>{props.title}</div>
            <div className="w-full items-center gap-3 block">
              {/* Description */}
              <div id={`description${props.id}`} className="text-ellipsis text-wrap overflow-hidden">
                {props.description}
              </div>
            </div>
          </div>
          {/* Categorys */}
          <div className="pt-2">
            <CategoryList categorys={props.tags} />
          </div>
        </div>
        {/* Image */}
        <div>
          <div className="relative flex flex-col items-end w-[150px] h-[84px] ml-auto">
            <Image
              src={props.banner.url}
              alt="Project"
              className='rounded-md shadow-md'
              fill
            />
          </div>
        </div>
      </div>
    </>
  );
}
