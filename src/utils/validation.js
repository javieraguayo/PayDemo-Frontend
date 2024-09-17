export function validateCardNumber(number) {
    const regex = /^[0-9]{16}$/;
    return regex.test(number) && luhnCheck(number);
  }
  
  export function validateCardExpiry(expiryDate) {
    const [month, year] = expiryDate.split('/');
    const expiry = new Date(`${year}-${month}-01`);
    const now = new Date();
    return expiry > now;
  }
  
  export function validateCVV(cvv) {
    const regex = /^[0-9]{3}$/;
    return regex.test(cvv);
  }
  
  export function validateAmount(amount) {
    return parseFloat(amount) > 5000;
  }
  
  function luhnCheck(value) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = value.length - 1; i >= 0; i--) {
      let digit = parseInt(value.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }
  