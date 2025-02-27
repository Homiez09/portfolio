import { pool } from "@/db/server";

const Healthz = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen container mx-auto absolute top-0 z-[-5]">
            <h1>Health: 1000/1000</h1>
        </div>
    )
}

export default Healthz;