import Image from 'next/image';
import { ibmbold } from '@/libs/font';
import { Tag } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { CategoryList } from './CategoryList';

export const Card = ({ props, highlight }: any) => {
  const router = useRouter();
  // const query = useSearchParams().get("query");
  const query = highlight;

  useEffect(() => {
    let title = document.querySelector(`#title${props.id}`);
    let description = document.querySelector(`#description${props.id}`);

    title!.innerHTML = props.title.replace(new RegExp(query + '(?!([^<]+)?<)', 'gi'), '<mark>$&</mark>');
    description!.innerHTML = props.description.replace(new RegExp(query + '(?!([^<]+)?<)', 'gi'), '<mark>$&</mark>');
    console.log("query", query);

  }, [query])

  return (
    <>
      <div className="w-full pb-5 lg:px-5 border-b select-none hover:scale-[1.02]">
        <div className="flex flex-row p-2 hover:cursor-pointer" onClick={() => router.push(`project/${props.documentId}`)}>
          <div className="flex flex-col w-2/3">
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
          {/* Image */}
          <div className="flex flex-col items-end w-1/3 p-2">
            <Image
              src={props.banner.url}
              alt="Project"
              className='rounded-md shadow-md'
              width="112" height="112"
            />
          </div>
        </div>
        <div className="px-2">
          {/* Categorys */}
          <CategoryList categorys={props.tags} />
        </div>
      </div>
    </>
  );
}
