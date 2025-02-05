const fs = require('fs');
const path = require('path');

// Liste des fichiers à modifier
const files = [
    'projecteurs.html',
    'rubans-led.html',
    'plafonniers.html',
    'reglettes.html',
    'electrique.html',
    'domes.html',
    'promotions.html'
];

// Section catalogue à ajouter
const catalogueSection = `
            <!-- Catalogue Section -->
            <section id="catalogue" class="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <!-- Left Column - Image -->
                        <div class="catalogue-card rounded-2xl shadow-2xl mt-8" data-aos="fade-right">
                            <a href="https://view.publitas.com/49187/1685087/pdfs/3cbcbdbb-a1fe-4c10-ad6c-3c21b41832e6.pdf?response-content-disposition=attachment%3B+filename%2A%3DUTF-8%27%27VTAC%2520-%2520V-TAC%2520Catalogue%2520Interactive%2520Version%2520Q2-2024.pdf" class="relative h-[650px] rounded-2xl overflow-hidden block transition-all duration-300 transform hover:scale-105">
                                <img src="./images/catalogue/catalogue-cover-2024.png" 
                                    alt="Catalogue LED PRO 2024" 
                                    class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
                                    <h3 class="text-3xl font-bold mb-4">Catalogue LED PRO 2024</h3>
                                    <p class="text-lg mb-6">Découvrez notre gamme complète de solutions d'éclairage LED professionnelles. Plus de 500 produits avec fiches techniques détaillées.</p>
                                    <ul class="space-y-2">
                                        <li class="flex items-center">
                                            <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Fiches techniques complètes
                                        </li>
                                        <li class="flex items-center">
                                            <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Prix et stocks en temps réel
                                        </li>
                                        <li class="flex items-center">
                                            <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Guides d'installation
                                        </li>
                                    </ul>
                                </div>
                            </a>
                        </div>

                        <!-- Right Column - Form -->
                        <div class="lg:pl-12" data-aos="fade-left">
                            <div class="bg-white rounded-2xl shadow-xl p-8">
                                <div class="text-center mb-8">
                                    <h3 class="text-2xl font-bold text-gray-900 mb-2">Contactez nous</h3>
                                    <p class="text-gray-600">
                                        Remplissez le formulaire pour toutes demandes d'informations, devis, partenariats
                                    </p>
                                </div>

                                <form class="space-y-6">
                                    <div class="space-y-4">
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label for="firstname" class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                                <input type="text" id="firstname" name="firstname" 
                                                       class="form-input w-full px-4 py-3 rounded-lg bg-gray-50" required>
                                            </div>
                                            <div>
                                                <label for="lastname" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                                <input type="text" id="lastname" name="lastname" 
                                                       class="form-input w-full px-4 py-3 rounded-lg bg-gray-50" required>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label for="company" class="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                                            <input type="text" id="company" name="company" 
                                                   class="form-input w-full px-4 py-3 rounded-lg bg-gray-50" required>
                                        </div>

                                        <div>
                                            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email professionnel</label>
                                            <input type="email" id="email" name="email" 
                                                   class="form-input w-full px-4 py-3 rounded-lg bg-gray-50" required>
                                        </div>

                                        <div>
                                            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                            <input type="tel" id="phone" name="phone" 
                                                   class="form-input w-full px-4 py-3 rounded-lg bg-gray-50" required>
                                        </div>
                                    </div>

                                    <div class="flex items-center">
                                        <input type="checkbox" id="newsletter" name="newsletter" class="form-checkbox h-4 w-4 text-primary-600">
                                        <label for="newsletter" class="ml-2 block text-sm text-gray-700">
                                            J'accepte de recevoir des informations commerciales de LED PRO
                                        </label>
                                    </div>

                                    <div>
                                        <button type="submit" class="w-full flex justify-center items-center px-8 py-4 bg-teal-800 text-white font-semibold rounded-full hover:bg-teal-900 transition-colors duration-300">
                                            Contactez nous
                                            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                            </svg>
                                        </button>
                                    </div>
                                </form>

                                <div class="mt-6 text-center text-sm text-gray-500">
                                    Vos données sont traitées conformément à notre politique de confidentialité. Vous pouvez vous désinscrire à tout moment.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
`;

// Pour chaque fichier
files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    
    // Lire le contenu du fichier
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Erreur lors de la lecture de ${file}:`, err);
            return;
        }

        // Trouver la position où insérer la section catalogue (juste avant </main>)
        const insertPosition = data.lastIndexOf('</main>');
        if (insertPosition === -1) {
            console.error(`Tag </main> non trouvé dans ${file}`);
            return;
        }

        // Insérer la section catalogue
        const newContent = data.slice(0, insertPosition) + catalogueSection + data.slice(insertPosition);

        // Écrire le nouveau contenu dans le fichier
        fs.writeFile(filePath, newContent, 'utf8', err => {
            if (err) {
                console.error(`Erreur lors de l'écriture de ${file}:`, err);
                return;
            }
            console.log(`Section catalogue ajoutée à ${file}`);
        });
    });
});
