import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyBKLFJpHtTHWknMObzfADjTflyHycDXtUM",
    authDomain: "fir-bd-c0833.firebaseapp.com",
    databaseURL: "https://fir-bd-c0833.firebaseio.com",
    projectId: "fir-bd-c0833",
    storageBucket: "fir-bd-c0833.appspot.com",
    messagingSenderId: "394529463872",
    appId: "1:394529463872:web:8b75518ffd1c17496989a5",
    measurementId: "G-DRCTCR551M"
}

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
            this.app = app.database();
        }
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    async register(name, email, password) {
        await app.auth().createUserWithEmailAndPassword(email, password)
        const uid = app.auth().currentUser.uid
        return app.database().ref('users').child(uid).set({
            name: name
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }
}

export default new Firebase();