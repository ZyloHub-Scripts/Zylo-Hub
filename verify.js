async function validateKey(key) {
    const response = await fetch("https://raw.githubusercontent.com/TitaniumHQSscripts/Zylo-Hub/main/keys.txt");
    const text = await response.text();

    const keys = text.split("\n").map(k => k.trim());

    if (keys.includes(key.trim())) {
        return { success: true, message: "Valid key" };
    } else {
        return { success: false, message: "Invalid key" };
    }
}

// API endpoint (GitHub Pages friendly)
const url = new URL(window.location.href);
const key = url.searchParams.get("key");

validateKey(key).then(result => {
    document.body.innerHTML = `
        <h1>${result.success ? "✔️ VALID KEY" : "❌ INVALID KEY"}</h1>
        <p>${result.message}</p>
    `;
});
