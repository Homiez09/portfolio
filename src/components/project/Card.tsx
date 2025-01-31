'use client'

import Image from 'next/image';
import { kanit } from '@/libs/fonts';
import { CategoryList } from './CategoryList';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const Card = ({ props, highlight }: any) => {
  const query = highlight;
  const router = useRouter();

  useEffect(() => {
    let title = document.querySelector(`#title${props.id}`);
    let description = document.querySelector(`#description${props.id}`);

    if (query === "") return;
    title!.innerHTML = props.title.replace(new RegExp(query + '(?!([^<]+)?<)', 'gi'), '<mark>$&</mark>');
    description!.innerHTML = props.description.replace(new RegExp(query + '(?!([^<]+)?<)', 'gi'), '<mark>$&</mark>');
  }, [query])

  return (
    <>
      <div className="flex flex-row w-full pb-5 lg:px-5 gap-3 select-none hover:scale-[1.02] hover:cursor-pointer" onClick={() => router.push(`project/${props.documentId}`)}>
        <div className="flex flex-col p-2">
          <div className="flex flex-col">
            {/* Title */}
            <div id={`title${props.id}`} className={`text-xl ${kanit.className} font-bold`}>{props.title}</div>
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
        <div className="ml-auto">
          <div className="relative flex flex-col items-end w-[150px] h-[84px] overflow-hidden rounded-md shadow-md bg-gray-100">
            <Image
              src={props.banner.url}
              alt="Project"
              className='object-contain'
              fill
              sizes='(min-width: 640px) 150px, 100px'
            />
          </div>
        </div>
      </div>
    </>
  );
}

export const CardSkeleton = () => {
  return (
    <>
      <div className="flex flex-row w-full pb-5 lg:px-5 gap-3 select-none hover:scale-[1.02] hover:cursor-pointer">
        <div className="flex flex-col p-2 w-2/3">
          <div className="flex flex-col gap-2">
            {/* Title */}
            <div className="w-32 h-4 bg-gray-300"></div>
            <div className="w-full h-4 bg-gray-300"></div>
          </div>
          {/* Categorys */}
          <div className="pt-2 flex flex-row gap-2">
            <div className="w-6 h-3 bg-gray-300"></div> 
            <div className="w-6 h-3 bg-gray-300"></div>
            <div className="w-6 h-3 bg-gray-300"></div>
          </div>
        </div>
        {/* Image */}
        <div className="ml-auto">
          <div className="relative flex flex-col items-end w-[150px] h-[84px] overflow-hidden rounded-md shadow-md bg-gray-100">
            <div className='w-full h-full bg-gray-300'>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}