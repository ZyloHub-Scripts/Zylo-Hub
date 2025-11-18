// Zylo-Hub Key Verification API

async function handleVerify() {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");

    if (!key) {
        return respond({ success: false, message: "No key provided." });
    }

    try {
        const response = await fetch("https://raw.githubusercontent.com/TitaniumHQSscripts/Zylo-Hub/main/keys.txt");
        const text = await response.text();

        const keys = text.split(/\r?\n/).map(k => k.trim()).filter(k => k.length > 0);

        if (keys.includes(key)) {
            respond({ success: true, message: "Key valid." });
        } else {
            respond({ success: false, message: "Key invalid." });
        }

    } catch (err) {
        respond({ success: false, message: "Server error." });
    }
}

function respond(obj) {
    document.body.innerHTML = "<pre>" + JSON.stringify(obj, null, 4) + "</pre>";
}

handleVerify();
