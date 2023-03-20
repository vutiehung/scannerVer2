
const DecodeQR = (data) => {

    function isURL(content) {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(content);
    }
    function isEmailAddress(content) {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(content);
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
    if (isEmailAddress(data)) return "EMAILADDRESS";
    if (isVCard(data)) return "VCARD";
    if (isEmail(data)) return "EMAILTO";
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
        case "EMAILADDRESS":
            iconName="mail-outline"
            break;
        case "VCARD":
            iconName="card-outline"
            break;
        case "EMAILTO":
            iconName="send-outline"
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
    //const qrCode = jsQR.decodeQR(data);

    //console.log(qrCode);

    var returnText="";
    
    return(returnText)
}

export { DecodeQR,GetIcon,GetText }