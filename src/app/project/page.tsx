'use client';

import { ShowCard } from "@/components/CardList";
import { ibmbold } from "@/libs/font";
import { Input, Tag } from 'antd';
import { useState } from 'react';

export default () => {
    const [inputText, setInputText] = useState('');
  
    const handleInputChange = (event:any) => {
      setInputText(event.target.value);
    };
  
    const formatHashtags = (text:any) => {
      // หากตำแหน่งแรกของ '#' ไม่อยู่ที่ตำแหน่งแรกของข้อความ ให้ลบ '#' แรกออกเพื่อป้องกันการค้นหาช่องว่างแบบไม่พึงประสงค์
      if (text.indexOf('#') !== 0) {
        text = text.replace('#', '');
      }
  
      // แยกข้อความเป็นส่วนๆ โดยใช้ '#' เป็นตัวแบ่ง
      const parts = text.split('#');
      return parts.map((part:any, index:any) => {
        if (index !== 0) {
          return (
            <span key={index}>
              <span className="text-blue-500">#{part}</span>
            </span>
          );
        }
        return part;
      });
    };
  
    return (
        <>
            <p className={`text-2xl ${ibmbold.className} pb-5`}>Project</p>
            <div className="flex flex-row justify-center gap-14 max-lg:gap-5 max-lg:flex-col-reverse">
                <ShowCard />
                <div className="flex flex-col flex-wrap p-3 gap-5 w-1/3 max-lg:w-full">
                    <Input placeholder="Search" value={inputText} onChange={handleInputChange} />
                    <div className="flex flex-row">
                        <Tag bordered={false} color="processing" closable>Tag 1</Tag>
                        <Tag bordered={false} color="processing" closable>Tag 2</Tag>
                        <Tag bordered={false} color="processing" closable>Tag 3</Tag>
                    </div>
                </div>
            
            </div>
        </>
    );
}