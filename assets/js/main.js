const menuPhotosExpresso = document.querySelectorAll('#espresso-tab-pane img.card-img-top');
const menuPhotosCappuccino = document.querySelectorAll('#cappuccinos-tab-pane img.card-img-top');
const menuPhotosIcedCoffee = document.querySelectorAll('#iced-coffee-tab-pane img.card-img-top');
const menuPhotosSpecialCoffee = document.querySelectorAll('#specials-coffee-tab-pane img.card-img-top');
const menus = [menuPhotosExpresso, menuPhotosCappuccino, menuPhotosIcedCoffee, menuPhotosSpecialCoffee];
const accessKey = '_RklYDyQ7RE-_98sI9oHBmgxw343o1ExRniMZ_WJ8bQ'
const queries = ['coffee expresso', 'coffee cappuccino', 'iced coffee', 'special coffee']
const count = 6;
const orientation = 'landscape';

async function getPhotos() {
    // Garantindo que o número de menus e de queries será o mesmo
    const numLoops = Math.min(menus.length, queries.length)
    for (let i = 0; i < numLoops; i++) {
        const query = queries[i];
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&client_id=${accessKey}&orientation=${orientation}`);

            if (!response.ok) {
                throw new Error("Não conseguimos encontrar fotos.");
            }

            // não podemos esquecer do await para resolver a json da requisição.
            const data = await response.json();
            const photos = data.results;
            const menuItems = menus[i];

            numPhotos = Math.min(photos.length, menuItems.length);

            // aqui usamos j e não i, pois let não pode ser redeclarado no mesmo escopo.
            for (let j = 0; j < numPhotos; j++) {
                menuItems[j].src = photos[j].urls.regular;
                menuItems[j].alt = photos[j].alt_description || query;
            }

        }
        catch (error) {
            console.error(error);
        }
    }
}

getPhotos();


