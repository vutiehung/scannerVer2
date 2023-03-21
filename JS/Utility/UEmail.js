
const  UEmail= {
    ConvertQRData2Json:(data)=>
    {
        const email = data.match(/MATMSG:TO:(.*?);SUB:(.*?);BODY:(.*?);;/);

        if (email) {    
            return {Email:email[1],Sub:email[2],Content:email[3]}
        }
        return {Email:"",Sub:"",Content:""}
    }
}

export {UEmail};