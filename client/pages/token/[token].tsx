import React from 'react';
import {GetServerSideProps} from "next";
import axios from "axios";

const Token = ({user} : any) => {
    console.log(user)
    return (
        <div>
            {user.message === "User verified" ? "Ви успішно підтвердили вашу електронну пошту" : "Токен некоректний"}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({params}: any) => {

        const user = await axios.get(
            `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/token/` + params.token
        );
        return {
            props: {
                user: user?.data,
            },
        };
    }
export default Token;


