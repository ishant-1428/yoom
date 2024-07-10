import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"


export const useGetCallById = (id: string | string[]) => {
    
    const [call, setCall] = useState<Call>();
    const [isCallLoading, setIsCallLoading] = useState(true);

    const client = useStreamVideoClient();
console.log("CLEINT ", client);
console.log("ID inside", id);
    useEffect(()=>{
        console.log("Client :::",client)
        if(!client) return;

        const loadCall = async () => {
            try {
                const {calls} = await client.queryCalls({
                    filter_conditions: {
                        id,
                    }
                });
                if(calls.length > 0) setCall(calls[0]);
    
                setIsCallLoading(false);
            } catch (error) {
                console.log("Error inside useGetCallById::::",error);
                setIsCallLoading(false);
            }
        }
        loadCall();
    },[client,id]);

    return { call, isCallLoading };
}