import Image from 'next/image';
import { ibmbold } from '@/libs/font';
import { Tag } from 'antd';
import { useRouter } from 'next/navigation';

export const Card = ({ props }: any) => {
  const router = useRouter();
  return (
    <>
      <div className="w-full pb-5 lg:px-5 border-b">
        <div className="flex flex-row p-2 hover:cursor-pointer" onClick={() => router.push(`project/${props.id}`)}>
          <div className="flex flex-col w-2/3">
            <small className="text-gray-500">{props.createAt}</small>
            <p className={`text-xl ${ibmbold.className}`}>{props.title}</p>
            <div className="w-full items-center gap-3 block">
              <p className='text-ellipsis text-wrap overflow-hidden'>
                {props.detail}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end w-1/3 p-2">
            <Image
              src={props.image}
              alt="Project"
              className='rounded-md shadow-md'
              width="112" height="112"
            />
          </div>
        </div>
        <div className="px-2">
          {props.categorys.map((category: string, key:any) => (
            <Tag key={key} bordered={false} color="processing" className="hover:cursor-pointer">{category}</Tag>
          ))}
        </div>
      </div>
    </>
  );
}
