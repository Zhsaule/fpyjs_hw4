  function getPasswordChecker(password) {
    return function(passwordToCheck) {
          return password === passwordToCheck;
    };
  }
  
  // Тестовые вызовы
  
  const checkPassword = getPasswordChecker("qwerty");
  
  console.log(checkPassword("qwerty")); // true
  console.log(checkPassword("123456")); // false
  console.log(checkPassword("321654")); // false