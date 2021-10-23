const API_KEY = 'b4d4c8a33e0c1f881752e3bf66176029';
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async(endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async (page, genders) => {
        let genderString = '';
        if(!page) {
            page = 1;
        }

        if(genders && genders.length > 0) {
            let idGenders = '';

            genders.map((gender) => {
                idGenders+= gender + ',';
            });
            genderString='&with_genres='+idGenders;
        }

        return [
            {
                slug: 'popular',
                title: 'Daily popular',
                items: await basicFetch(`/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}${genderString}`)
            },
        ]
    },

    getMovieInfo: async (movieId) => {
        let info = {};
        info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                
        return info;
    },

    getMovieCategories: async() => {
        let categories = {};
        categories = await basicFetch(`/genre/movie/list?api_key=${API_KEY}&language=pt-BR`);
        return categories;
    }
}