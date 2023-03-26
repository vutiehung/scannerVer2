
const  UWifi= {
    ConvertQRData2Json:(data)=>
    {

        const wifi = data.match(/^WIFI:T:([A-Z0-9]+);S:([^\n;]+);P:([^\n;]+);(.+)?;$/i);
       
        if (wifi) {    
          return({Type:wifi[1],SSID:wifi[2],Password:wifi[3]});
        }
        return {Type:"",SSID:"",Password:""}

        
    },
    CreatedataQRData:(SSID,Password,Encryption)=>{
      return "WIFI:T:"+Encryption+";S:"+SSID+";P:"+Password+";H:;;"
    }
}

export {UWifi};