import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {

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