export class User {
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public email: string,
        public phone_number: string,
        public birth_date: string,
        public password: string,
        public confirm_password: string
    ){

    }
}
