'use client';

import { CardList } from "../project/CardList";

export default () => {
    return (
        <div className={`flex flex-col items-center gap-8 max-w-3xl mx-auto`}>
            <p className="text-4xl font-bold text-gray-700">
                PROJECTS
            </p>
            <CardList />
        </div>
    );
}