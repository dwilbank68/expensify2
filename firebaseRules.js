{
    "rules": {
        ".read": false,                                               // no user can read from the root
        ".write": false,                                              // no user can write to the root
        "users": {
            "$user_id": {                                             // this dynamic var can be named anything,
                ".read": "$user_id === auth.uid",                     // and whatever you create in users folder
                ".write": "$user_id === auth.uid",                    // must be equal to your auth.uid
                "expenses": {
                    "$expense_id": {                                  // this dynamic var can be named anything,
                        ".validate": "newData.hasChildren(['description', 'note', 'createdAt', 'amount'])",
                        "description": {".validate":"newData.isString() && newData.val().length > 0"},
                        "note": {".validate":"newData.isString()"},   // but it must have these 4 props, validated,
                        "createdAt": {".validate":"newData.isNumber()"},
                        "amount": {".validate":"newData.isNumber()"},
                        "$other": {".validate": false}                // and no other props except the 4 above
                    }
                },
                "$other": {".validate": false}                        // user cannot write outside of expense directory
            }
        }
    }
}