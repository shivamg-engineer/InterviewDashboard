import Image from "next/image";

export default function Page() {
    return (
        <div>
            <h1>Hero Section</h1>

            <div style={{width:"800px", height:"500px"}}>
                <Image
                    src="/solo_levelling.jpg"
                    alt="sung jin hu"
                    width={800}
                    height={500}
                    priority
                    style={{ objectFit: "cover" }}
                />
                {/* <img src="/solo_levelling.jpg" alt="Hero image"></img> */}
            </div>
        </div>
    );
}