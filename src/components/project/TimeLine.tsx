"use client";

import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';
import { IWorkExperience } from '@/types/IWorkExperience';

const CardWorkTimeLine = (data: IWorkExperience) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-row items-center gap-3 hover:cursor-pointer" onClick={() => data.description.length !== 0 ? setIsShow(!isShow) : 0}>
        {data.description.length > 0 ? isShow ? <Icon icon="mingcute:down-line" /> : <Icon icon="mingcute:right-line" /> : <Icon icon="humbleicons:minus" />}
        <div>
          <p className="font-bold">{data.title}</p>
          <p className="font-bold">{data.position}</p>
        </div>
      </div>
      {isShow && <ul className="list-disc list-inside text-sm cursor-default space-y-3 pt-2">
        {data.description.map((desc, index) => <li className="list-outside ml-8 mr-3" key={index}>{desc}</li>)}
      </ul>}
    </>
  );
}

export function WorkTimeLine(props : {list: IWorkExperience[]}) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  },[]);

  return (
    <>
      <Timeline
        mode="left"
        className='w-full pt-4'
        items={props.list.map((data: IWorkExperience, index: number) => ({
          label: isMobile ? "" : data.date,
          dot: <div className={`h-3 w-3 border-4 ${data.date === "Present" ? "border-gray-500" : "border-green-500"} rounded-full`} />,
          children: <>{isMobile && data.date}<CardWorkTimeLine {...data} /></>,
        }))}
      />
    </>
  );
};