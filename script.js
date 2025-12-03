// Ambil elemen HTML yang diperlukan
const userScoreSpan = document.getElementById('user-score');
const computerScoreSpan = document.getElementById('computer-score');
const messageElement = document.getElementById('message');

// Ambil semua tombol pilihan
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

// Ambil semua container pilihan untuk efek glow
const choicesContainer = document.querySelectorAll('.choice-container');

// Inisialisasi skor
let userScore = 0;
let computerScore = 0;

// Fungsi untuk menghilangkan efek glow sebelumnya dari semua pilihan
function cleanUpGlows() {
    choicesContainer.forEach(container => {
        container.classList.remove('green-glow', 'red-glow', 'gray-glow');
    });
}

// Fungsi untuk mendapatkan pilihan Komputer secara acak
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    // Membuat angka acak antara 0 dan 2
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Fungsi utama permainan yang dijalankan saat tombol diklik
function game(userChoice) {
    cleanUpGlows(); // Hapus efek glow dari permainan sebelumnya

    const computerChoice = getComputerChoice();
    const result = userChoice + computerChoice;

    let outcomeMessage = '';
    let messageClass = '';
    let userGlowClass = '';
    
    // Tentukan elemen container yang diklik user (berdasarkan ID 'r', 'p', atau 's')
    const userChoiceElement = document.getElementById(userChoice.charAt(0)); 

    // Logika permainan (Switch Case sangat rapi untuk perbandingan banyak string)
    switch (result) {
        // Kasus Menang (User Menang)
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            userScore++;
            outcomeMessage = `Anda menang! ${userChoice} mengalahkan ${computerChoice}.`;
            messageClass = 'win';
            userGlowClass = 'green-glow'; // Menang = Hijau
            break;
        
        // Kasus Kalah (Komputer Menang)
        case 'scissorsrock':
        case 'rockpaper':
        case 'paperscissors':
            computerScore++;
            outcomeMessage = `Anda kalah! ${computerChoice} mengalahkan ${userChoice}.`;
            messageClass = 'lose';
            userGlowClass = 'red-glow'; // Kalah = Merah
            break;
        
        // Kasus Seri
        case 'rockrock':
        case 'paperpaper':
        case 'scissorsscissors':
            outcomeMessage = `Seri! Keduanya memilih ${userChoice}.`;
            messageClass = 'draw';
            userGlowClass = 'gray-glow'; // Seri = Abu-abu
            break;
    }

    // Perbarui skor di HTML
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;

    // Tampilkan pesan hasil dengan gaya
    messageElement.textContent = outcomeMessage;
    messageElement.className = 'message ' + messageClass;
    
    // Terapkan efek glow pada pilihan user
    userChoiceElement.classList.add(userGlowClass);
}


// Tambahkan event listener ke setiap tombol untuk memulai permainan
rockButton.addEventListener('click', () => game('rock'));
paperButton.addEventListener('click', () => game('paper'));
scissorsButton.addEventListener('click', () => game('scissors'));