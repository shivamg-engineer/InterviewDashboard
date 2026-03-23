import Image from "next/image";

export default function Page() {
    return (
        <>
            <div>
                <h1>Hero Section</h1>

                <Image
                    src="/solo_levelling.jpg"
                    alt="Solo Levelling"
                    width={800}
                    height={500}
                    priority
                />

            </div>

            <div style={{ position: "relative", width: "100%", height: "400px" }}>
                <Image
                    src="/solo_levelling.jpg"
                    alt="Solo Levelling"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
                    style={{ objectFit: "cover" }}
                />
            </div>
        </>

    );
}