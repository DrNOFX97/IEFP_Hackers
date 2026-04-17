        // ── FIREBASE ────────────────────────────────────────────────────
        firebase.initializeApp({
            apiKey:            "AIzaSyCa5bu1aM6N1kiV6m1gLo8zf2sKcvcr4o0",
            authDomain:        "ligafaro-8000.firebaseapp.com",
            projectId:         "ligafaro-8000",
            storageBucket:     "ligafaro-8000.firebasestorage.app",
            appId:             "1:315653817267:web:19943348fb9aca311681c6"
        });
        const auth    = firebase.auth();
        const storage = firebase.storage();
        const db      = firebase.firestore();



