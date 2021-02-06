const functions = require('firebase-functions');
const admin     = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.incrementTotalEmployees = functions.firestore.document('/employees')
    .onCreate((snap, context) => {
        return db.doc('/dataCounter')
            .update({
                totalEmployees: admin.firestore.FieldValue.increment(1)
            });
    });