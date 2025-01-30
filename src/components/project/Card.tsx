import Image from 'next/image';
import { ibmbold } from '@/libs/font';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
import { CategoryList } from './CategoryList';
import Link from 'next/link';

export const Card = ({ props, highlight }: any) => {
  const query = highlight;

  // useEffect(() => {
  //   let title = document.querySelector(`#title${props.id}`);
  //   let description = document.querySelector(`#description${props.id}`);

  //   if (query === "") return;
  //   title!.innerHTML = props.title.replace(new RegExp(query + '(?!([^<]+)?<)', 'gi'), '<mark>$&</mark>');
  //   description!.innerHTML = props.description.replace(new RegExp(query + '(?!([^<]+)?<)', 'gi'), '<mark>$&</mark>');
  // }, [query])

  return (
    <Link href={`project/${props.documentId}`}>
      <div className="flex flex-row w-full pb-5 lg:px-5 gap-3 select-none hover:scale-[1.02] hover:cursor-pointer"  /*onClick={() => router.push(`project/${props.documentId}`)}*/>
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
        <div className="ml-auto">
          <div className="relative flex flex-col items-end w-[150px] h-[84px] overflow-hidden rounded-md shadow-md bg-gray-100">
            <Image
              src={props.banner.url}
              alt="Project"
              className='object-contain'
              fill
            />
          </div>
        </div>
      </div>
    </Link>
  );
}