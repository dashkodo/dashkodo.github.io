(function() {
    var uakinoPlugin = {
        init: function() {
            Lampa.Template.add('uakino_button', `<div class="menu__item selector" data-action="uakino">UA Kino</div>`);
            
            // Додайте кнопку в головне меню
            Lampa.Listener.follow('app', function(e) {
                if (e.type === 'ready') {
                    $('.menu .menu__list').append(Lampa.Template.get('uakino_button', {}, true));
                }
            });

            // Додайте обробник натискання кнопки
            $('body').on('click', '.menu__item[data-action="uakino"]', function() {
                uakinoPlugin.fetchMovies();
            });
        },

        fetchMovies: function() {
            var url = 'https://uakino.best'; // Головна сторінка сайту
            fetch("https://example.com/data.json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.text(); // or response.text(), response.blob(), etc.
                  })
                .then(data => {
                    var movies = uakinoPlugin.parseMovies(response);
                    uakinoPlugin.showMovies(movies);
                })
                .catch(error => {
                    Lampa.Noty.show('Не вдалося завантажити дані з UA Kino');

                });
        },

        parseMovies: function(html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            var movies = [];
            
            // Напишіть логіку парсингу
            doc.querySelectorAll('.movie-item').forEach(function(item) {
                var title = item.querySelector('.title').textContent;
                var link = item.querySelector('a').href;
                var poster = item.querySelector('img').src;
                
                movies.push({ title: title, link: link, poster: poster });
            });

            return movies;
        },

        showMovies: function(movies) {
            var items = movies.map(function(movie) {
                return {
                    title: movie.title,
                    image: movie.poster,
                    url: movie.link
                };
            });

            Lampa.Activity.push({
                url: '',
                title: 'UA Kino',
                component: 'category',
                items: items,
                page: 1
            });
        }
    };

    uakinoPlugin.init();

})();
