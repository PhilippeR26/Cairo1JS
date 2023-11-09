"use client";

import { useState } from "react";
import { handleClick } from '../serverComponents/handleClick';
import { Box, Button } from "@chakra-ui/react";


export function SpecialButton() {
    const [message, setMessage] = useState<string>("");

    return (
        <Box>
        <br></br>
            <p>{

                "Message = " + message}</p>
            <Button
                onClick={async () => {
                    const  myMessage  = await handleClick();
                    setMessage(myMessage);
                }}
            >
                Button
            </Button>
        </Box>)
}