const quotes = {
    motivasi: [
        "Terus maju meski langkah terasa kecil.",
        "Proses tidak akan mengkhianati hasil.",
        "Kamu lebih kuat dari yang kamu kira.",
        "Jangan menyerah hanya karena lelah.",
        "Hari ini adalah kesempatan baru.",
        "Usaha hari ini menentukan masa depanmu.",
        "Kamu sedang menuju sesuatu yang besar.",
        "Jangan takut gagal, takutlah tidak mencoba.",
        "Tetap konsisten walau pelan.",
        "Percaya pada prosesmu sendiri.",
        "Langkah kecil tetap membawa perubahan.",
        "Kamu pasti bisa melewati ini.",
        "Terus berjuang, hasil akan mengikuti.",
        "Jangan bandingkan dirimu dengan orang lain.",
        "Fokus pada progres, bukan kesempurnaan."
    ],

    santai: [
        "Santai aja, hidup bukan lomba lari.",
        "Pelan-pelan juga sampai.",
        "Nikmati prosesnya, jangan cuma hasilnya.",
        "Nggak apa-apa istirahat sebentar.",
        "Hidup itu dinikmati, bukan dikejar terus.",
        "Kadang santai itu juga produktif.",
        "Tarik napas, lanjut lagi nanti.",
        "Jangan terlalu keras sama diri sendiri.",
        "Semua ada waktunya.",
        "Santai tapi tetap jalan."
    ],

    lucu: [
        "Kalau capek, ya istirahat… bukan nyerah 😄",
        "Semangat! Ingat, mie instan aja butuh proses.",
        "Kalau gagal, coba lagi… siapa tahu gagal lagi 😆",
        "Hidup ini keras, makanya kamu jangan lembek.",
        "Kerja keras biar bisa rebahan dengan tenang.",
        "Jangan malas, nanti kamu kalah sama deadline.",
        "Kalau nggak sekarang, ya nanti… tapi nanti kapan?",
        "Semangat! Dompet butuh isi.",
        "Jangan menyerah, wifi aja kadang putus nyambung.",
        "Kalau kamu lelah, ingat cicilan 😭"
    ],

    deep: [
        "Tidak semua yang lambat itu tertinggal.",
        "Kesunyian seringkali mengajarkan yang tak diajarkan keramaian.",
        "Luka juga bagian dari proses bertumbuh.",
        "Kamu tidak harus selalu kuat, tapi harus tetap berjalan.",
        "Perjalananmu tidak harus sama dengan orang lain.",
        "Apa yang kamu cari, seringkali ada dalam dirimu.",
        "Diam bukan berarti kalah.",
        "Setiap orang punya waktunya sendiri.",
        "Kehilangan bisa jadi awal dari sesuatu yang baru.",
        "Hidup bukan tentang cepat, tapi tentang tepat."
    ],
    chaos: [
        "Tenang, gagal itu sudah jadi bagian dari branding kamu 😈",
        "Santai aja, hidupmu masih bisa lebih berantakan kok.",
        "Kalau hari ini buruk, tenang… besok bisa lebih buruk 😂",
        "Semangat! Dunia juga lagi bingung sama kamu.",
        "Jangan khawatir, kamu tidak sendiri… banyak yang tersesat 😆"
    ]
};

let lastQuote = "";

/* SOUND */
const sounds = {
    motivasi: new Audio("motivasi.mp3"),
    santai: new Audio("santai.mp3"),
    lucu: new Audio("lucu.mp3"),
    deep: new Audio("deep.mp3"),
    chaos: new Audio("chaos.mp3")
};

function getRandomQuote(arr) {
    let quote;
    do {
        quote = arr[Math.floor(Math.random() * arr.length)];
    } while (quote === lastQuote);

    lastQuote = quote;
    return quote;
}

function generateQuote() {
    const name = document.getElementById("nameInput").value;
    const category = document.getElementById("category").value;
    const output = document.getElementById("output");

    if (name.trim() === "") {
        output.innerText = "Masukkan nama dulu!";
        output.classList.add("show");
        return;
    }

    let selectedCategory = category;

    if (category === "random") {
        const categories = Object.keys(quotes);
        selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    }

    const randomQuote = getRandomQuote(quotes[selectedCategory]);

    /* 🎨 APPLY BACKGROUND CLASS */
    document.body.className = "";
    document.body.classList.add(selectedCategory);

        /* 🎵 STOP SEMUA SOUND */
        Object.values(sounds).forEach(s => {
            s.pause();
            s.currentTime = 0;
        });

    /* 🎵 PLAY SOUND BARU */
    const sound = sounds[selectedCategory];
    if (sound) {
        sound.play().catch(() => {});
    }

    /* 💥 TEXT ANIMATION */
    output.classList.remove("show");
    output.classList.add("hide");

    setTimeout(() => {
        output.innerText = `${name}, ${randomQuote}`;
        output.classList.remove("hide");
        output.classList.add("show");
    }, 200);

    const title = document.getElementById("title");

/* UBAH JUDUL */
let titleText = "Quote Generator";

switch (selectedCategory) {
    case "motivasi":
        titleText = "Quote Motivasi";
        break;
    case "santai":
        titleText = "Quote Santai";
        break;
    case "lucu":
        titleText = "Quote Lucu";
        break;
    case "deep":
        titleText = "Quote Deep";
        break;
    case "chaos":
        titleText = "Quote Chaotic 😈";
        break;
}

title.innerText = titleText;
}

/* ENTER KEY */
document.getElementById("nameInput")
.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        generateQuote();
    }

    
});
