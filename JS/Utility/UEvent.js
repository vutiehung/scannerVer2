
const UEvent = {
    ConvertQRData2Json: (data) => {
        var lines = data.split(/\r?\n/);
        var event = {}
        var summary="",dtStart="",dtEnd="",location="";
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (line.startsWith("BEGIN:VCARD") || line.startsWith("END:VCARD")) {
                continue;
            }
            var index = line.indexOf(":");
            if (index > -1) {
                var key = line.substr(0, index);
                var value = line.substr(index + 1);
                switch (key) {
                    case "SUMMARY": summary = value
                        break;
                    case "DTSTART": dtStart = value
                        break;
                    case "DTEND": dtEnd = value
                        break;
                    case "LOCATION": location = value
                        break;
                }

            }
           
        }
        event = {
            title: summary,
            startDate: dtStart,
            endDate: dtEnd,
            location: location,
        };       
        return event;
    }
}

export { UEvent };