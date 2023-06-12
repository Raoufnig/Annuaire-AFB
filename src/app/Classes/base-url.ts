export class URL {
    static readonly API_VERSION = 'v1';
    static readonly BASE_URL = 'http://localhost:8080';
    
    static readonly API_URL = this.BASE_URL + '/api/' + this.API_VERSION;

}