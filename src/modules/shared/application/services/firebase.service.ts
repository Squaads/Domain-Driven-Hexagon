import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {
    constructor() {
        this.initializeApps();
    }

    private initializeApps(): void {
        firebase.initializeApp({
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
        });
    }
}
