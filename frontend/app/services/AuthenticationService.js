app.service('AuthService',function ($rootScope, $location, $http) {
    let authToken = '';
    let userData = null;
    return {
        authenticate : (email, password) => {
            return new Promise((resolve, reject) => {
                $http.post('/auth/authenticate', {email: email, password: password})
                    .then((payload)=>{
                        authToken = payload.data.token
                        userData = payload.data.userInfo;
                        resolve(payload.data.userInfo);
                    })
                    .catch((error)=>{
                        reject(error);
                    });
            });
        },
        getUserdata: () => {
            return userData;
        }
    }

})