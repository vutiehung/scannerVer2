import { UContact } from "./UContact";
const DecodeQR = (data) => {
    console.log(data)
    function isURL(content) {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(content);
    }
    
    function isVCard(content) {
        const vcardRegex = /^BEGIN:VCARD/;
        return vcardRegex.test(content);
    }
    function isWifi(content) {
        const wifiRegex = /^WIFI:/;
        return wifiRegex.test(content);
    }
    function isEmail(content) {
        const emailRegex = /^mailto:/;
        return emailRegex.test(content);
    }
    function isEmailAddress(content) {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(content);
    }
    function isSms(content) {
        const smsRegex = /^SMSTO:/;
        return smsRegex.test(content);
    }
    function isLocation(content) {
        const locationRegex = /^geo:/;
        return locationRegex.test(content);
    }
    function isEvent(content) {
        const eventRegex = /^BEGIN:VEVENT/;
        return eventRegex.test(content);
    }
    if (isURL(data)) return "URL";
   
    if (isVCard(data)) return "VCARD";
    if (isEmail(data)) return "EMAILTO";
    if (isEmailAddress(data)) return "EMAILADDRESS";
    if (isWifi(data)) return "WIFI";
    if (isSms(data)) return "SMSTO";
    if (isLocation(data)) return "LOCATION";
    if (isEvent(data)) return "EVENT";
    return null;
}

const GetIcon = (data) => {
    var iconName="";
    switch (data) {
        case "URL": iconName="earth-outline"
            break;        
        case "VCARD":
            iconName="card-outline"
            break;
        case "EMAILTO":
            iconName="send-outline"
            break;
        case "EMAILADDRESS":
            iconName="mail-outline"
            break;
        case "WIFI":
            iconName="wifi-outline"
            break;
        case "SMSTO":
            iconName="chatbubbles-outline"
            break;
        case "LOCATION":
            iconName="location-outline"
            break;
        case "EVENT":
            iconName="calendar-outline"
            break;
        default:
            iconName="qr-code-outline"
            break;
    }
    return(iconName)
}
const GetText = (data) => {
    var returnText=""; 
    switch (DecodeQR(data)) {
        case "URL":             
            returnText="Open "+data
            break;
        case "EMAILADDRESS":
            returnText="Add to Contact"
            break;
        case "VCARD":
            var vcard=UContact.vcardToJSON(data)      
            returnText="Add "+vcard.fullName+" to Contact"
            break;
        case "EMAILTO":
            returnText="Send Mail"
            break;
        case "WIFI":
            returnText="Join Wifi" 
            break;
        case "SMSTO":
            returnText="SMSTO"
            break;
        case "LOCATION":
            returnText="Open Map" 
            break;
        case "EVENT":
            returnText="add Event to Calendar"
            break;
        default:
            returnText="Search " +data
            break;
    }
    return(returnText)
}

const isUndefined =(object)=>
{
    if(object==undefined)
    return true;
    return false
}

export { DecodeQR,GetIcon,GetText,isUndefined }