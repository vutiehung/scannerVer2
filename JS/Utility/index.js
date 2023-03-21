import { UContact } from "./UContact";
import { USms } from "./USms";
import { UEmail } from "./UEmail";
import { UWifi } from "./UWifi";
import { UEvent } from "./UEvent";
const DecodeQR = (data) => {

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
        const emailRegex = /^MATMSG:TO/;
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

    if (isWifi(data)) return "WIFI";
    if (isSms(data)) return "SMSTO";
    if (isEvent(data)) return "EVENT";
    return null;
}

const GetIcon = (data) => {
    var iconName = "";
    switch (data) {
        case "URL": iconName = "earth-outline"
            break;
        case "VCARD":
            iconName = "card-outline"
            break;
        case "EMAILTO":
            iconName = "send-outline"
            break;
        case "WIFI":
            iconName = "wifi-outline"
            break;
        case "SMSTO":
            iconName = "chatbubbles-outline"
            break;
        case "EVENT":
            iconName = "calendar-outline"
            break;
        default:
            iconName = "qr-code-outline"
            break;
    }
    return (iconName)
}
const GetText = (data) => {
    var returnText = "";
    switch (DecodeQR(data)) {
        case "URL":
            returnText = "Open " + data
            break;
        case "VCARD":
            var vcard = UContact.vcardToJSON(data)
            returnText = "Add " + vcard.fullName + " to Contact"
            break;
        case "EMAILTO":
            var emailto = UEmail.ConvertQRData2Json(data)
            returnText = "Send Mail " + emailto.Email
            break;
        case "WIFI":
            var wifi = UWifi.ConvertQRData2Json(data)
            returnText = "Join Wifi " + wifi.SSID
            break;
        case "SMSTO":
            var sms = USms.ConvertQRData2Json(data)
            returnText = "SMSTO " + sms.Phone
            break;
        case "EVENT":
            var event = UEvent.ConvertQRData2Json(data)
            returnText = "add " + event.title + " to Calendar"
            break;
        default:
            returnText = "Search " + data
            break;
    }
    return (returnText)
}

const isUndefined = (object) => {
    if (object == undefined)
        return true;
    return false
}

export { DecodeQR, GetIcon, GetText, isUndefined }