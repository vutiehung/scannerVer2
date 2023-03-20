
const  USms= {
    ConvertQRData2Json:(data)=>
    {
        var splitData = data.split(":");
        console.log(splitData);
        return {Phone:splitData[1],Content:splitData[2]}
    }
}

export {USms};