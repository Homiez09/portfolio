import Image from 'next/image';
import { kanit } from '@/libs/fonts';
import Link from 'next/link';
import { timeCardFormat } from '@/libs/timeFormat';
import { Project } from '@/types/Project';

export const Card = ({ props, highlight }: { props: Project, highlight: string }) => {
  // const query = highlight;

  // useEffect(() => {
  //   let title = document.querySelector(`#title${props.id}`);
  //   let description = document.querySelector(`#description${props.id}`);

  //   if (query === "") return;
  //   title!.innerHTML = props.title.replace(new RegExp(query + '(?!([^<]+)?<)', 'gi'), '<mark>$&</mark>');
  //   description!.innerHTML = props.description.replace(new RegExp(query + '(?!([^<]+)?<)', 'gi'), '<mark>$&</mark>');
  // }, [query])

  return (
    <>
      <Link href={`project/${props.documentId}`} className="flex flex-row w-full pb-5 lg:px-5 gap-3 select-none hover:scale-[1.02] hover:cursor-pointer" /* onClick={() => router.push(`project/${props.documentId}`)} */>
        <div className="flex flex-col p-2 w-full gap-5">
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
          <div className="flex gap-4 flex-wrap">
            {/* <CategoryList categorys={props.tags} /> */}
            {props.tags.map((tag: any, key: any) => (
              <div key={key} className='flex gap-1 items-center'>
                <div className="w-2 h-2 rounded-full bg-red-500" /> {/* รอใสีสีให้ tag */}
                <div className='text-small'>{tag.name}</div>
              </div>
            ))}
            <div className="text-gray-500 text-small">Created on {timeCardFormat(props.createdAt)}</div>
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
      </Link>
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