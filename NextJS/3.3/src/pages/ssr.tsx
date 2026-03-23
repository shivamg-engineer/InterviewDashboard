import { GetServerSideProps } from "next";

type SSRPageProps = {
  time: string;
};


export const getServerSideProps:GetServerSideProps<SSRPageProps> = async()=>{
    const time= new Date().toISOString();

    return {
        props:{time}
    }
}

export default function SSRPage({time}:SSRPageProps){
    return (
        <div>
        <h1>SSR page</h1>
        <p>Rendered at : {time}</p>
        </div>
    )
}