

const UContact = {

    vcardToJSON: (vcard) => {
        var lines = vcard.split(/\r?\n/);
        var json = {};
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();

            if (line.startsWith("BEGIN:VCARD") || line.startsWith("END:VCARD")) {
                continue;
            }

            var index = line.indexOf(":");
            if (index > -1) {
                var key = line.substr(0, index);
                var index1 = key.indexOf(";");
                var subtype = ''
                if (index1 > -1) {
                    subtype = key.substr(index1 + 1);
                    key = key.substr(0, index1)


                }
                var value = line.substr(index + 1);
                if (key === "VERSION") {
                    json.version = value;
                } else if (key === "N") {
                    var nameParts = value.split(";");
                    json.lastName = nameParts[0] ? nameParts[0] : "";
                    json.firstName = nameParts[1] ? nameParts[1] : "";
                    json.middleName = nameParts[2] ? nameParts[2] : "";
                    json.prefix = nameParts[3] ? nameParts[3] : "";
                    json.suffix = nameParts[4] ? nameParts[4] : "";
                } else if (key === "FN") {
                    json.fullName = value;
                } else if (key === "ORG") {
                    json.organization = value;
                } else if (key === "TITLE") {
                    json.title = value ? value : "";
                } else if (key === "PHOTO") {
                    json.photo = value;
                } else if (key === "TEL") {
                    if (subtype.indexOf("HOME") > -1)
                        json.homePhone = value.toString()
                    else
                        if (subtype.indexOf("WORK") > -1)
                            json.workPhone = value.toString()
                        else
                            if (subtype.indexOf("Phone") > -1)
                                json.workPhone = value.toString()
                            else
                                json.Cell = value.toString()
                } else if (key === "ADR") {

                    if (subtype.indexOf("WORK") > -1)
                        json.workAddress = value
                    else
                        json.Address = value

                } else if (key === "EMAIL") {
                    if (subtype.indexOf("WORK") > -1)
                        json.workEmail = value
                    else
                        json.Email = value
                }
            }
        }

        return json;
    },
    jsonToAndroidContact:(vcardJson)=>
    {
        return {
            company: vcardJson.organization,
            emailAddresses: [{
                label: 'work',
                email: vcardJson.workEmail,
            }, {
                label: 'home',
                email: vcardJson.Email,
            }
            ],
            displayName: vcardJson.fullName,
            familyName: vcardJson.lastName,
            givenName: vcardJson.firstName,
            middleName: vcardJson.middleName,
            jobTitle: vcardJson.title,
            phoneNumbers: [{
                label: 'work',
                number: vcardJson.workPhone,
            },
            {
                label: 'HOME',
                number: vcardJson.homePhone,
            }
                ,
            {
                label: 'Phone',
                number: vcardJson.Phone,
            }
            ],
            postalAddresses: [{
                label: 'WORK',
                street: vcardJson.workAddress

            },
            {
                label: 'Address',
                street: vcardJson.Address

            }
            ],
            prefix: vcardJson.prefix,
            suffix: vcardJson.suffix,
        }
        
    }

}

export {UContact};