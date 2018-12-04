/**
 * Interface de configuração da API
 *
 */
interface ApiConfig {
    url: string;
    key: string;
}

/**
 * Objeto de configuração da API
 *
 */
const config: ApiConfig  = {
    'url': 'http://cantina.tecnologia.ws/api/',
    //'url': 'http://localhost/prj-Cantina/cantina-php/',
    'key': 'P5mb4weC6O8M3xYNjDiQMj96vwy3TSAE'
};

// exporta os valores
export default config;

